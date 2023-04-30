import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/latestProducts.css';
import {Link} from 'react-router-dom';

function LatestProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/books")
      .then(response => setProducts(response.data))
      .catch(error => console.log(error));
  }, []);


  const latestProducts = products.slice(-3).reverse();

  return (
    <div>
      <div className='text-center'>
<<<<<<< HEAD
  <h1>Our Latest Products</h1>
</div>
<div className='latest-products-container'>
  {latestProducts.map(product => (
    <div key={product.id} className='latest-product'>
      <img src={product.image} alt={product.title} />
      <h2>Title: {product.title}</h2>
      <h3>Author: {product.author}</h3>
      <h4>Category: {product.category}</h4>
      <div className='button-booksi'>
        <button>
          <Link to={`/ProductDetails/${product.id}`}>Details</Link>
        </button>
=======
        <h1>Our Latest Products</h1>
      </div>
      <div className='latest-products-container'>
        {latestProducts.map(product => (
          <div key={product.id}>
            <img src={product.image} alt={product.title} />
            <h2>Title: {product.title}</h2>
            <h3>Author: {product.author}</h3>
            <h4>Category: {product.category}</h4>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            <p>Created at: {product.created_at}</p>
          </div>
        ))}
>>>>>>> 760a60bb4527fbce0f5f7bee9327380a874e08f0
      </div>
    </div>
  ))}
</div>
    </div>
  );
}

export default LatestProducts;

