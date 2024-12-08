import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import './cssDashbord/editProduit.css'
export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [user, setUser] = useState(null);
  const udata = localStorage.getItem('user')
  const odata = JSON.parse(udata)
  const [isLoggedIn, setIsLoggedIn] = useState(udata !== null);

  useEffect(() => {
    if (udata !== null) {
      setUser(odata.user);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    fetchProduct();
    fetchCategories();
    // Disable scroll when the component mounts
    document.body.style.overflow = 'hidden';

    // Re-enable scroll when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [udata]);
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);



      setName(response.data.product.name);
      setDescription(response.data.product.description);
      setImage(response.data.product.image);
      setSelectedCategory(response.data.product.category_id);


    } catch (error) {
      console.log(error.response.data.message);
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

  const changeHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category_id", selectedCategory);
    formData.append("image", image);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/products/${id}`,
        formData
      );
      alert("product updated successfully")
      navigate("/dashboard");
    } catch (error) {
      if (error.response.status === 422) {
        console.log(error.response.data.errors);
      } else {
        console.log(error.response.data.message);
      }
    }
  };
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="container-editProduit">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-8">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Edit Produit</h3>
              <hr />
              <div className="form-wrapper">
                <form onSubmit={updateProduct}>
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select
                      className="form-control" required
                      value={selectedCategory || ""}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories.map((category) => (
                        <option value={category.id} key={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>

                  </div>

                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control" required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">

                    <label className="form-label">Description</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" required
                      value={description}
                      onChange={(e) => { setDescription(e.target.value) }}
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">choose image </label>
                    <input type="file" className="form-control" required

                      onChange={changeHandler}
                    />
                  </div>

                  <div className="mb-3">
                    <button type="submit" className="btn btn-save mb-3">  Update</button>
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