import React, { useState } from "react";
import axios from "axios";

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    location: "",
    price: "",
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    setSelectedFile({ ...selectedFile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile({ ...selectedFile, image: e.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", selectedFile.name);
    formData.append("description", selectedFile.description);
    formData.append("location", selectedFile.location);
    formData.append("price", selectedFile.price);
    formData.append("category", selectedFile.category);
    formData.append("date", selectedFile.date);
    formData.append("time", selectedFile.time);
    formData.append("image", selectedFile.image);
    try {
      await axios.post("/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        name="name"
        placeholder="Event Name"
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        onChange={handleChange}
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        onChange={handleChange}
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        onChange={handleChange}
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        onChange={handleChange}
      />
      <input
        type="date"
        name="date"
        placeholder="Date"
        onChange={handleChange}
      />
      <input
        type="time"
        name="time"
        placeholder="Time"
        onChange={handleChange}
      />
      <input type="file" name="image" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default ImageUpload;
