import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './cssComponenets/HomeCard.css';

function Card({ title, image, buttonText1, buttonText2 }) {
  return (
    <div className="card" >
      <h3 >{title}</h3>
      <img  src={image} alt="Product"  />
      <div className="button-container">
        <span  className="button">{buttonText1}</span>
      </div>
    </div>
  );
}

function Home(props) {
  const [cardContainerClass, setCardContainerClass] = useState('');

  useEffect(() => {
    // Update the card container class based on the number of categories
    const categoriesCount = props.categories.length;
    if (categoriesCount === 2) {
      setCardContainerClass('two-cards');
    } else if(categoriesCount === 3){
      setCardContainerClass('three-cards');
    }
    else {
      setCardContainerClass('four-cards');
    }
  }, [props.categories]);

  localStorage.removeItem("user");

  return (
    
    <div className={`first-container-${cardContainerClass}`} >
      <div className={`container-${cardContainerClass}`} >
        {props.categories.map((category) => (
          <Link key={category.id} to={`/productCatalogue/${category.id}`} style={{textDecoration: 'none' ,color:'#5F264A'}} >
            <Card 
              title={category.name}
              image={`http://127.0.0.1:8000/storage/images/${category.image}`}
              buttonText1="Show products"
              
            />
          </Link>
        ))}
      </div>
    </div>
    
  );
}

export default Home;
