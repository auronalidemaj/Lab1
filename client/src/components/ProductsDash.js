import React,{useState,useEffect} from 'react'
import axios from "axios";
import '../components/style/products.css'
import { Link } from 'react-router-dom';
import './style/dashboard.css'

function ProductsDash() {

    const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/books')
      .then((res) => {
        console.log(res.data)
        setBooks(res.data)
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id)=>{
    try{
      await axios.delete("http://localhost:3001/books/"+id)
      window.location.reload()
    }catch(err){
      console.log(err)
    }
  }
  return (

    <div>
        <button ><Link to="/BookForm">Add new book</Link></button>
        <div>
      <h1 className="book-list-header">Book List</h1>
<ul className="book-list">
  {books.length > 0 && books.map((book) => (
    <li key={book.id} className="book-item">
        {book.image && <img src={book.image} alt="" className='book-image' />}
      <p className="book-title">Title: {book.title}</p>
      <p className="book-price">Price: {book.price}</p>
      <p className="book-stock">{book.numBooks} in stock</p>
      <button className="bookForm-btn"><Link to={`/EditBookForm/${book.id}`}>Edit</Link></button>
      <button onClick={()=> handleDelete(book.id)}>Delete</button>
    </li>
  ))}
</ul>
    </div>
    </div>
  )
}

export default ProductsDash