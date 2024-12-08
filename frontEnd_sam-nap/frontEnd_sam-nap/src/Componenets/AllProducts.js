
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import './cssComponenets/ProductDisplay.css'

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetchProducts()
    // Disable scroll 
    document.body.style.overflow = 'auto';

    
  }, []);
  
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="product-display">
    <h1>SAM-NAP.sarl est une Unité de Transformation de Papier</h1>
    <div className="product-thumbnails">
        {products.length > 0 && (
          products.map((row, key) => (
            <div className="product-item" key={key}>
              <img src={`http://127.0.0.1:8000/storage/images/${row.image}`} alt="" />
              <p className="name">{row.name}</p>
              <p>
              <Link className="button" to={`/product/${row.id}`}>
                View Details
              </Link>
              </p>
            </div>
          ))
        )}
      </div>
     
    </div>
  );
};

export default AllProduct;
