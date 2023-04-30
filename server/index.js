const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mysql = require('mysql');

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

const db = require("./db");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST","PUT","DELETE"],
    credentials: true,
  })
);


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

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


//Products CRUD

app.post("/books",  (req, res) => {
  try {
    const { title, category, author, description, price, numBooks, image } = req.body;

     db.query(
      "INSERT INTO books (image, title, category, author, description, price, numBooks) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [image, title, category, author, description, price, numBooks]
    );
    return res.status(200).send("Book added successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});


  app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const {image, title, category, author, description, price, numBooks } = req.body;
  
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
  

  app.delete("/books/:id", (req, res) => {
    const booksId = req.params.id;
    db.query("DELETE FROM books WHERE id = ?", booksId, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
      }
      return res.status(200).send("User deleted successfully");
    });
  });




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
//update
app.put('/contacts/:id', (req, res) => {
  const id = req.params.id;
  const { name, email, message } = req.body;

 
  if (!name || !email || !message) {
    return res.status(400).send('Please fill out all fields');
  }


  db.query(
    'UPDATE contacts SET name = ?, email = ?, message = ? WHERE id = ?',
    [name, email, message, id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Internal server error');
      }

      if (result.affectedRows === 0) {
        return res.status(404).send('Contact message not found');
      }

      return res.status(200).send('Contact message updated successfully');
    }
  );
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


app.listen(3001, () => {
  console.log("running server");
});

