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
        
      </div>
    </div>
  ))}
</div>
    </div>
  );
}

export default LatestProducts;

