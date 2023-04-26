import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/latestProducts.css';

function LatestProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/products")
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
          <div key={product.id}>
            <img src={product.imageURL} alt={product.title} />
            <h2>Title: {product.title}</h2>
            <h3>Author: {product.author}</h3>
            <h4>Category: {product.category}</h4>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            <p>Created at: {product.created_at}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestProducts;

