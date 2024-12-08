
import {Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './cssComponenets/ProductDisplay.css'


const ProductDisplay = () => {

  localStorage.removeItem("user")
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [name, setName] = useState([]);
  const [description, setDescription] = useState([]);
  const [image, setImage] = useState([]);
  
  useEffect(() => {
    fetchProducts();
    fetchCategories()
  }, []);
  

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/categories/${id}`);
    
      setName(response.data.category.name);
      setDescription(response.data.category.description)
      setImage(response.data.category.image);
 
    } catch (error) {
      console.log(error.response.data.message);
    }
  };



  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/products');
      const filteredProducts = response.data.filter(
        (product) => product.category_id === parseInt(id)
      );
      setProducts(filteredProducts);
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="product-display">
      <div className='product-image-info'>
        <div className="">
          <img src={`http://127.0.0.1:8000/storage/images/${image}`} alt="" />
        </div>
        <div className="product-info">
          <h2>{name}</h2>
          <p>{description}</p>
        
        </div>
      </div>
      <div className="product-thumbnails">
        {products.length > 0 && (
          products.map((row, key) => (
            <div className="product-item" key={key}>
              <img src={`http://127.0.0.1:8000/storage/images/${row.image}`} alt="" />
              <p className="name">{row.name}</p>
              <p>
              <Link className="button" to={`/product/${row.id}`}>
              Show details
              </Link>
              </p>
            </div>
          ))
        )}
      </div>
     
    </div>
  );
};

export default ProductDisplay;
