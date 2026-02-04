import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DateFormat } from "./date";
import { FaTrash } from "react-icons/fa";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const { register, handleSubmit, reset } = useForm();

  async function showApi() {
    try {
      const res = await axios.get("http://localhost:8000/api/blogs");
      setBlogs(res?.data?.records);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // console.log(import.meta.env.VITE_IMAGE_URL);
    showApi();
  }, []);

  function AddData(data) {
    // console.log(data.b_image[0])

    // FormData is a built-in JavaScript object that allows you to easily construct a set of key/value pairs representing
    // form fields and their values, which can then be sent using methods like XMLHttpRequest or the Fetch API.

    // Append the form fields and their values to the FormData object
    // here b_image is the name of the field in the backend
    // and data.b_image[0] is the file selected by the user
    // we use [0] because data.b_image is an array of files, and we want the first file
    // if multiple files are selected then we can use a loop to append all the files
    // here b_title and b_cat are the names of the fields in the backend
    // and data.b_title and data.b_cat are the values entered by the user
    // we are appending all the fields to the formData object
    // this formData object will be sent to the backend
    // using axios post method

    const formData = new FormData();

    formData.append("b_title", data.b_title);
    formData.append("b_cat", data.b_cat);
    formData.append("b_image", data.b_image[0]);

    axios
      .post("http://localhost:8000/api/blogs", formData)
      .then((res) => {
        console.log(res.data);
        reset();
        showApi();
      })
      .catch((err) => console.log(err));
  }

  async function trash(id) {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/blogs?id=${id}`,
      );
      alert(res.data.message);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
    showApi();
  }

  return (
    <>
      <div className="col-lg-6 mx-auto my-5 p-5 shadow ">
        <form action="" method="post" onSubmit={handleSubmit(AddData)}>
          <div className="mt-4">
            <h2 className="text-center mb-4">Add Blog</h2>
            <select name="" id="" className="form-select">
              <option value="" disabled selected>
                ----Select Category----
              </option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Lifestyle">Lifestyle</option>
            </select>
          </div>

          <div className="mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Blog Title"
              {...register("b_title")}
            />
          </div>
          <div className="mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Blog Category"
              {...register("b_cat")}
            />
          </div>
          <div className="mt-4">
            <input
              type="file"
              className="form-control"
              placeholder="Blog Image URL"
              {...register("b_image")}
            />
          </div>
          <div className="mt-4">
            <button className="btn btn-primary w-100">Add Blog</button>
          </div>
        </form>
      </div>

      <div className="container my-5">
        <h1 className="text-center mb-4">Blog Posts</h1>

        <div className="row mb-4 row gap-5 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2">
          {blogs &&
            blogs.map((blog, index) => (
              <div key={index} className="card mb-3 col-md-4 shadow border-0">
                <div className="card border-0 img-top">
                  <img src={blog?.b_image} alt={blog.b_title} />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{blog.b_title}</h5>
                  <h6 className="card-title">{blog.b_cat}</h6>
                  <p className="card-text">{DateFormat(blog.createdAt)}</p>
                  <p className="card-text">{DateFormat(blog.updatedAt)}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => trash(blog._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default App;
