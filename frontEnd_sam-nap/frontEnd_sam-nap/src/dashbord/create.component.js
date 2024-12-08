import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import './cssDashbord/CreateProduit.css'


export default function CreateProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});

  const [user, setUser] = useState(null);
  const udata = localStorage.getItem('user')
  const odata = JSON.parse(udata)
  const [isLoggedIn, setIsLoggedIn] = useState(udata !== null);

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/categories");

      setCategories(response.data.data);

    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    if (udata !== null) {
      setUser(odata.user);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    fetchProducts();
    fetchCategories();
    // Disable scroll when the component mounts
    document.body.style.overflow = 'hidden';

    // Re-enable scroll when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [udata]);

  const changeHandler = (e) => {
    setImage(e.target.files[0]);
  };
  const createProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("category_id", selectedCategory);


    await axios
      .post("http://127.0.0.1:8000/api/products", formData)
      .then(({ data }) => {
        alert("product created successfully")
        navigate("/dashboard");
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          console.log(response.data.errors);
        } else {
          console.log(response.data.message);
        }
      });
  };



  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container-createProduit">

      <div className="row justify-content-center">
        <div className="conl-12 col-sm-12 col-md-12">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title"> Create Produit</h3>
              <hr></hr>
              <div className="from-wrapper">

                <form onSubmit={createProduct}>

                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select required
                      className="form-control"
                      value={selectedCategory}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                      }}
                    >
                      <option value="">Select all category</option>
                      {categories.map((category) => (
                        <option value={category.id} key={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>



                  </div>
                  <div className="mb-3">
                    <label className="form-label">Name </label>
                    <input type="text" className="form-control" required
                      value={name}
                      onChange={(e) => { setName(e.target.value) }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">description</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" required
                      value={description}
                      onChange={(e) => { setDescription(e.target.value) }}
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Chose Image  </label>
                    <input type="file" className="form-control" required

                      onChange={changeHandler}
                    />
                  </div>

                  <div className="mb-3">
                    <button type="submit" className="btn btn-save mb-3">  Save</button>
                  </div>

                </form>



              </div>


            </div>
          </div>
        </div>

      </div>

    </div>
  )




}