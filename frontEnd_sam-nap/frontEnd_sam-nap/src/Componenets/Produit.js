
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import './cssComponenets/produit.css'
const Produit = () => {
  localStorage.removeItem("user")
  const { id } = useParams();


  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  useEffect(() => {
    fetchProduct();
  }, []);
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);
      setName(response.data.product.name);
      setDescription(response.data.product.description)
    
      setImage(response.data.product.image);
 
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <div className="definition-with-image">
      <div className="image-container">
      <img src={`http://127.0.0.1:8000/storage/images/${image}`}  alt="" />
      </div>
      <div className="definition-container">
    
        <h3>{name}</h3>
        <hr />
        <h4>{description}</h4>
      
  
      </div>
      <div className="icon-container">
       
      </div>
    </div>
  );
};
export default Produit