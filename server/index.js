const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mysql = require('mysql');
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const crypto = require('crypto');
const nodemailer = require('nodemailer');


const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

const db = require("./db");

// app.options('*', cors());

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST","PUT","DELETE"],
    credentials: true,
  })
);


app.use(cookieParser());
// app.use(bodyParser.json({ limit: '5000mb' }));
app.use(bodyParser.urlencoded({extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    }, 
  })
);


app.post("/register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const repeatPassword = req.body.repeatPassword;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }


      // Check if username already exists in the database
      db.query("SELECT * FROM users WHERE username = ?", username, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Internal server error");
        }

        if (result.length > 0) {
          return res.status(400).send("Username already exists");
        }

        db.query(
          "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
          [username, email, hash],
          (err, result) => {
            if (err) {
              console.log(err);
              return res.status(500).send("Internal server error");
            }

            return res.status(200).send("User registered successfully");
          }
        );
      });
  });
});

app.post("/createUserDash", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    // Check if username already exists in the database
    db.query("SELECT * FROM users WHERE username = ?", username, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
      }

      if (result.length > 0) {
        return res.status(400).send("Username already exists");
      }

      db.query(
        "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
        [username, email, hash, role],
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).send("Internal server error");
          }

          return res.status(200).send("Created user successfully");
        }
      );
    });
  });
});


app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});


app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }
    return res.status(200).send(result);
  });
});


app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  db.query("SELECT * FROM users WHERE id = ?", userId, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }
    return res.status(200).send(result);
  });
});

app.post("/users", (req, res) => {
  const { username, email, password } = req.body;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }
    db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hash],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Internal server error");
        }
        return res.status(200).send("User added successfully");
      }
    );
  });
});


app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const {username, email, role } = req.body;
  db.query(
    "UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?",
    [username, email, role, userId],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
      }
      return res.status(200).send("User updated successfully");
      
    }
  );
});




app.delete('/users/:id', (req, res) => {
  const id = req.params.id;

  db.query(
    'DELETE FROM users WHERE id = ?',
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Internal server error');
      }

      if (result.affectedRows === 0) {
        return res.status(404).send('User not found');
      }

      return res.status(200).send('User deleted successfully');
    }
  );
});



app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.clearCookie("userId");
    res.send({ message: "Logged out successfully" });
  });
});


// Generate confirmation token
function generateConfirmationToken() {
  return crypto.randomBytes(20).toString('hex');
}

// Handle subscription confirmation
app.get('/confirm/:confirmationToken', (req, res) => {
  const { confirmationToken } = req.params;

  db.query(
    'SELECT * FROM subscribers WHERE confirmation_token = ?',
    [confirmationToken],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Internal server error');
      }

      if (result.length === 0) {
        return res.status(400).send('Invalid confirmation token');
      }

      // Update confirmed status in the database
      db.query(
        'UPDATE subscribers SET confirmed = 1 WHERE confirmation_token = ?',
        [confirmationToken],
        (err) => {
          if (err) {
            console.log(err);
            return res.status(500).send('Internal server error');
          }

          return res.status(200).send('Email subscription confirmed successfully');
        }
      );
    }
  );
});

// Handle subscription request
app.post('/subscribe', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).send('Please fill out all fields');
  }

  db.query(
    'SELECT * FROM subscribers WHERE email = ?',
    [email],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Internal server error');
      }

      if (result.length > 0) {
        // Email already exists
        const message = 'Email already subscribed';
        return res.status(200).send({ message });
      }

      // Generate confirmation token
      const confirmationToken = generateConfirmationToken();

      // Insert a new record with confirmation token
      db.query(
        'INSERT INTO subscribers (name, email, confirmation_token) VALUES (?, ?, ?)',
        [name, email, confirmationToken],
        (err) => {
          if (err) {
            console.log(err);
            return res.status(500).send('Internal server error');
          }

          // Send email notification with confirmation link
          sendEmailNotification(name, email, confirmationToken);

          return res.status(200).send('Email subscription saved successfully');
        }
      );
    }
  );
});


app.get('/subscribers/confirmed', (req, res) => {
  db.query('SELECT email FROM subscribers WHERE confirmed = ?', [true], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Internal server error');
    }

    const emails = result.map((row) => row.email);
    return res.status(200).send(emails);
  });
});



// Function to send email notification
function sendEmailNotification(name, email, confirmationToken) {
  // Create a transporter for sending emails
  const transporter = nodemailer.createTransport({
    service: 'Outlook',
    auth: {
      user: 'onlinebookstoreabr@outlook.com',
      pass: 'Onlinebookstore1',
    },
  });

  // Configure the email content
  const mailOptions = {
    from: 'onlinebookstoreabr@outlook.com',
    to: email,
    subject: 'Subscription Confirmation',
    text: `Dear ${name},
    
    Thank you for subscribing to our newsletter! We're excited to have you on board and look forward to sharing the latest news, updates, and exclusive offers with you.
    
    To ensure that you receive our emails and stay up-to-date with all the exciting content we have planned, we kindly ask you to confirm your subscription by clicking the link below:
    
    http://localhost:3001/confirm/${confirmationToken}
    
    By confirming your subscription, you'll be among the first to hear about our upcoming promotions, new releases, helpful resources, and much more. We value your privacy and promise to keep your information secure and confidential.
    
    If you did not subscribe to our newsletter or believe this email was sent to you by mistake, please disregard this message, and no further action is required.
    
    We appreciate your trust in us and can't wait to start delivering valuable content straight to your inbox. If you have any questions or need assistance, feel free to contact our friendly support team at onlinebookstoreabr@outlook.com.
    
    Thank you once again for joining our community!
    
    Warm regards,
    Blerina
    Bookworms!`,
    };
    
    // Send the email
    transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
    console.log('Error sending email:', err);
    } else {
    console.log('Email sent:', info.response);
    }
    });
   }


// Function to send email notification
function sendArticleNotification(title, author, content, email) {
  // Create a transporter for sending emails
  const transporter = nodemailer.createTransport({
    service: 'Outlook',
    auth: {
      user: 'onlinebookstoreabr@outlook.com',
      pass: 'Onlinebookstore1',
    },
  });

  // Configure the email content
  const mailOptions = {
    from: 'onlinebookstoreabr@outlook.com',
    to: email,
    subject: 'New News Article',
    text: `Dear subscriber,
    
    We have published a new news article:
    
    Title: ${title}
    Author: ${author}
    Content: ${content}
    
    Check it out on our website for more details.
    
    Thank you for your continued support!
    
    Warm regards,
    Blerina
    Bookworms!`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log('Error sending email:', err);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

//Products CRUD

// app.post("/books",  (req, res) => {
//   try {
//     const { title, category, author, description, price, numBooks, image } = req.body;

//      db.query(
//       "INSERT INTO books (image, title, category, author, description, price, numBooks) VALUES (?, ?, ?, ?, ?, ?, ?)",
//       [image, title, category, author, description, price, numBooks]
//     );
//     return res.status(200).send("Book added successfully");
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Internal server error");
//   }
// });


  // app.put("/books/:id", (req, res) => {
  //   const bookId = req.params.id;
  //   const {image, title, category, author, description, price, numBooks } = req.body;
  
  //   if (!image || !title || !category || !author || !description || !price || !numBooks) {
  //     return res.status(400).send("Missing required fields");
  //   }
  //   db.query(
  //     "UPDATE books SET image=?, title=?, category=?, author=?, description=?, price=?, numBooks=? WHERE id=?",
  //     [image, title, category, author, description, price, numBooks, bookId],
  //     (err, result) => {
  //       if (err) {
  //         console.log(err);
  //         return res.status(500).send("Internal server error");
  //       }
  //       if (result.affectedRows === 0) {
  //         return res.status(404).send("Book not found");
  //       }
  //       return res.status(200).send("Book updated successfully");
  //     }
  //   );
  // });
  

  // app.get("/books", (req, res) => {
  //   db.query("SELECT * FROM books", (err, result) => {
  //     if (err) {
  //       console.log(err);
  //       return res.status(500).send("Internal server error");
  //     }
  //     return res.status(200).json(result);
  //   });
  // });

  // app.get("/books/:id", (req, res) => {
  //   const bookId = req.params.id;
  //   db.query("SELECT * FROM books WHERE id = ?", [bookId], (err, result) => {
  //     if (err) {
  //       console.log(err);
  //       return res.status(500).send("Internal server error");
  //     }
  //     if (result.length === 0) {
  //       return res.status(404).send("Book not found");
  //     }
  //     return res.status(200).json(result[0]);
  //   });
  // });
  

  // app.delete("/books/:id", (req, res) => {
  //   const booksId = req.params.id;
  //   db.query("DELETE FROM books WHERE id = ?", booksId, (err, result) => {
  //     if (err) {
  //       console.log(err);
  //       return res.status(500).send("Internal server error");
  //     }
  //     return res.status(200).send("User deleted successfully");
  //   });
  // });

//contact CRUD

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send('Please fill out all fields');
  }

  db.query(
    'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
    [name, email, message],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Internal server error');
      }

      return res.status(200).send('Contact message saved successfully');
    }
  );
});

app.get('/contacts', (req, res) => {
  db.query('SELECT * FROM contacts', (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Internal server error');
    }

    return res.status(200).send(result);
  });
});

// Delete 
app.delete('/contacts/:id', (req, res) => {
  const id = req.params.id;

  db.query(
    'DELETE FROM contacts WHERE id = ?',
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Internal server error');
      }

      if (result.affectedRows === 0) {
        return res.status(404).send('Contact message not found');
      }

      return res.status(200).send('Contact message deleted successfully');
    }
  );
});


//multer
const uploadDir = path.join(__dirname, "public", "uploads");
app.use(express.static(path.join(__dirname, "public")));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const fileName =
      file.originalname.replace(fileExtension, "").toLowerCase().split(" ").join("-") +
      "-" +
      Date.now() +
      fileExtension;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

//news

app.get("/news", (req, res) => {
  db.query("SELECT *, DATE_FORMAT(published_at, '%M %D, %Y at %h:%i %p') AS formatted_published_at FROM news", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving news");
    } else {
      res.send(results);
    }
  });
});

app.post("/news", upload.single("image"), (req, res) => {
  const { title, author, content } = req.body;
  const imageFilename = req.file ? req.file.filename : null;

  const query =
    "INSERT INTO news (title, author, content, image_filename) VALUES (?, ?, ?, ?)";
  const values = [title, author, content, imageFilename];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error creating news");
    } else {
      // Get the list of confirmed subscribers
      db.query('SELECT email FROM subscribers WHERE confirmed = ?', [true], (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Internal server error');
        }

        const emails = result.map((row) => row.email);

        // Send email notification to each confirmed subscriber
        emails.forEach((email) => {
          sendArticleNotification(title, author, content, email);
        });
      });

      res.send("News created successfully");
    }
  });
});


app.get("/news/:id", (req, res) => {
  const id = req.params.id;

  db.query("SELECT *, DATE_FORMAT(published_at, '%M %D, %Y at %h:%i %p') AS formatted_published_at FROM news WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving news");
    } else if (results.length === 0) {
      res.status(404).send("News not found");
    } else {
      res.send(results[0]);
    }
  });
});

app.put("/news/:id", upload.single("image"), (req, res) => {
  const id = req.params.id;
  const { title, author, content } = req.body;
  let imageFilename = null;

  db.query("SELECT * FROM news WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error updating news");
    } else if (results.length === 0) {
      res.status(404).send("News not found");
    } else {
      if (req.file) {
        imageFilename = req.file.filename;
      } else {
        imageFilename = results[0].image_filename;
      }

      const query =
        "UPDATE news SET title = ?, author = ?, content = ?, image_filename = ? WHERE id = ?";
      const values = [title, author, content, imageFilename, id];
      db.query(query, values, (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error updating news");
        } else {
          res.send("News updated successfully");
        }
      });
    }
  });
});

app.delete("/news/:id", (req, res) => {
const id = req.params.id;

db.query("SELECT * FROM news WHERE id = ?", [id], (err, results) => {
if (err) {
console.error(err);
res.status(500).send("Error deleting news");
} else if (results.length === 0) {
res.status(404).send("News not found");
} else {
const imageFilename = results[0].image_filename;


  db.query("DELETE FROM news WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting news");
    } else {
      if (imageFilename) {
        const imagePath = path.join(uploadDir, imageFilename);
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
      res.send("News deleted successfully");
    }
  });
}
});
});

//books

app.post("/books", upload.single('image'), (req, res) => {
  try {
    const { title, category, author, description, price, numBooks } = req.body;

  const image_f = req.file ? req.file.filename : "No_Image_Available.jpg";


    db.query(
      "INSERT INTO books (image, title, category, author, description, price, numBooks) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [image_f, title, category, author, description, price, numBooks],
      (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).send("Internal server error");
        }
        return res.status(200).send("Book added successfully");
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});


  app.get("/books", (req, res) => {
    db.query("SELECT * FROM books", (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
      }
      return res.status(200).json(result);
    });
  });

  
  app.get("/books/:id", (req, res) => {
    const bookId = req.params.id;
    db.query("SELECT * FROM books WHERE id = ?", [bookId], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
      }
      if (result.length === 0) {
        return res.status(404).send("Book not found");
      }
      return res.status(200).json(result[0]);
    });
  });

app.put("/books/:id", upload.single("image"), (req, res) => {
  const bookId = req.params.id;
  const { title, category, author, description, price, numBooks } = req.body;
  // let image = null;
  const image = req.file ? req.file.filename : "No_Image_Available.jpg";
  

  if (!image || !title || !category || !author || !description || !price || !numBooks) {
    return res.status(400).send("Missing required fields");
  }
  db.query(
    "UPDATE books SET image=?, title=?, category=?, author=?, description=?, price=?, numBooks=? WHERE id=?",
    [image, title, category, author, description, price, numBooks, bookId],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
      }
      if (result.affectedRows === 0) {
        return res.status(404).send("Book not found");
      }
      return res.status(200).send("Book updated successfully");
    }
  );
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  db.query("SELECT image FROM books WHERE id = ?", bookId, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }
    if (result.length === 0) {
      return res.status(404).send("Book not found");
    }
    const imageFilename = result[0].image;
    db.query("DELETE FROM books WHERE id = ?", bookId, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
      }
      fs.unlink(path.join(uploadDir, imageFilename), (err) => {
        if (err) {
          console.log(err);
        }
        return res.status(200).send("Book deleted successfully");
      });
    });
  });
});

app.post('/cart/add', (req, res) => {
  const { productId,quantity } = req.body;

  // Insert the product into the cart table
  const sql = 'INSERT INTO cart (productId,quantity) VALUES (?,?)';
  db.query(sql, [productId,quantity], (err, result) => {
    if (err) {
      console.error('Error adding item to cart:', err);
      return res.status(500).json({ error: 'Failed to add item to cart' });
    }

    // Item added to cart successfully
    return res.json({ message: 'Item added to cart' });
  });
});

app.get('/cart', (req, res) => {
  const sql = 'SELECT * FROM cart';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error retrieving cart items:', err);
      return res.status(500).json({ error: 'Failed to retrieve cart items' });
    }

    const cartItems = result.map((row) => {
      return {
        id: row.id,
        productId: row.productId,
        quantity: row.quantity,
      };
    });

    return res.json(cartItems);
  });
});

app.delete('/cart/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM cart WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting item from cart:', err);
      return res.status(500).json({ error: 'Failed to delete item from cart' });
    }

    return res.status(200).send('Book deleted successfully');
  });
});

app.get('/cart/buy', (req, res) => {
  const sqlSelect = 'SELECT * FROM cart';
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.error('Error retrieving selected books:', err);
      return res.status(500).json({ error: 'Failed to retrieve selected books' });
    }

    const selectedBooks = result.map((row) => {
      return {
        productId: row.productId,
        quantity: row.quantity,
      };
    });

    const sqlInsert = 'INSERT INTO dashboard_cart (productId, quantity) VALUES ?';
    db.query(sqlInsert, [selectedBooks.map((book) => [book.productId, book.quantity])], (err, result) => {
      if (err) {
        console.error('Error adding selected books to dashboard:', err);
        return res.status(500).json({ error: 'Failed to add selected books to dashboard' });
      }

      const sqlDelete = 'DELETE FROM cart';
      db.query(sqlDelete, (err, result) => {
        if (err) {
          console.error('Error emptying the cart:', err);
          return res.status(500).json({ error: 'Failed to empty the cart' });
        }

        return res.json({ message: 'Purchase completed successfully' });
      });
    });
  });
});

app.get('/dashboard/cart', (req, res) => {
  const sql = 'SELECT * FROM dashboard_cart';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error retrieving dashboard cart:', err);
      return res.status(500).json({ error: 'Failed to retrieve dashboard cart' });
    }

    const cartItems = result.map((row) => {
      return {
        productId: row.productId,
        quantity: row.quantity,
      };
    });

    return res.json(cartItems);
  });
});




//newsletter





app.listen(3001, () => {
  console.log("running server");
});

