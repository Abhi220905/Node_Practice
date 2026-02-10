import React from "react";

const Home = () => {
  return (
    <div>
      <form className="col-md-6 shadow my-5 p-5 mx-auto">
        <label className="form-label">Name</label>
        <input type="number" className="form-control " />

        <label className="form-label">Age</label>
        <input type="text" className="form-control " />

        <label className="form-label">Description</label>
        <input type="text" className="form-control " />

        <label className="form-label">Image</label>
        <input type="text" className="form-control " />

        <button className="btn btn-info mt-4">Submit</button>
      </form>
    </div>
  );
};

export default Home;
