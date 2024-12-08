import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import './cssDashbord/EditCategory.css'

export default function EditCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  console.log(image)

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
    fetchCategories();
    // Disable scroll when the component mounts
    document.body.style.overflow = 'hidden';

    // Re-enable scroll when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [udata]);
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/categories/${id}`);
      console.log(response.data.category)

      setName(response.data.category.name);
      setDescription(response.data.category.description)
      setImage(response.data.category.image);

    } catch (error) {
      console.log(error.response.data.message);
    }
  };


  const changeHandler = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage !== null) {
      setImage(selectedImage);
    }
  };


  const updateCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/categories/${id}`,
        formData
      );
      alert("category updated successfully")
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
    <div className="container-EditCategory">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-8">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Edit Category</h3>
              <hr />
              <div className="form-wrapper">
                <form onSubmit={updateCategory}>
                  <div className="mb-3"></div>
                  <div className="mb-3">
                    <label className="form-label">name</label>
                    <input
                      type="text"
                      className="form-control" required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">description</label>
                    <textarea
                      type="text"
                      className="form-control" required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Image  </label>
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