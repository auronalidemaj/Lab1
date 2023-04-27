import React ,{ useState, useEffect }from 'react'
import BookForm from '../components/BookForm'
import axios from "axios";
import '../components/style/products.css'
import { Link } from 'react-router-dom';
// import EditBookForm from '../components/EditBookForm';



function Products() {
    const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/books")
      .then((res) => {
        console.log(res.data)
        setBooks(res.data)
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id)=>{
    try{
      await axios.delete("http://localhost:3001/books"+id)
      window.location.reload()
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="container">
  <div className="sidebar">
    <div className="categories-authors-container">
      <div className="categories">
        <h2>Categories</h2>
        <ul>
          <li>Category 1</li>
          <li>Category 2</li>
          <li>Category 3</li>
          <li>Category 4</li>
          <li>Category 5</li>
        </ul>
      </div>
      <div className="authors">
        <h2>Authors</h2>
        <ul>
          <li>Author 1</li>
          <li>Author 2</li>
          <li>Author 3</li>
          <li>Author 4</li>
          <li>Author 5</li>
        </ul>
      </div>
    </div>
  </div>
  <div className="content">
    <h1 className="book-list-header">Book List</h1>
    <ul className="book-list">
      {books.length > 0 &&
        books.map((book) => (
          <li key={book.id} className="book-item">
            {book.image && <img src={book.image} alt="" className='book-image' />}
            <p className="book-title">Title: {book.title}</p>
            <p className="book-price">Price: {book.price}</p>
            <p className="book-stock">{book.numBooks} in stock</p>
            <div className="book-buttons">
            <button className="details-btn">
              <Link to={`/ProductDetails/${book.id}`}>Details</Link>
            </button>
              <button className="wishlist-btn">
                <Link to="/wishlist">Add to Wishlist</Link>
              </button>
            </div>
          </li>
        ))}
    </ul>
  </div>
</div>

  );
}

export default Products