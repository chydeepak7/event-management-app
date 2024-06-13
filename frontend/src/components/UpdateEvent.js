import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory,useNavigate } from "react-router-dom";
import Header from './Header';

import {useSelector} from "react-redux";

function UpdateEvent() {
  const { id } = useParams();
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin
  const [event, setEvent] = useState({
    id: "",
    name: "",
    description: "",
    location: "",
    price: "",
    category: "",
    date: "",
    time: "",
    image: null,
  });

  useEffect(() => {
    async function fetchEvent() {
      try {
        const { data } = await axios.get(`/getevent/${id}`);
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    }
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", event.id);
    formData.append("name", event.name);
    formData.append("description", event.description);
    formData.append("location", event.location);
    formData.append("price", event.price);
    formData.append("category", event.category);
    formData.append("date", event.date);
    formData.append("time", event.time);
    if (event.image) {
      formData.append("image", event.image);
    }

    try {
      await axios.put(`/updateevent/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.access}`,
        },
      });
      // Redirect or inform the user about the successful update
      history('/events');  // Redirect to events page or wherever appropriate
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          value={event.name}
          placeholder="Event Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={event.description}
          placeholder="Description"
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          value={event.location}
          placeholder="Location"
          onChange={handleChange}
        />
        <input
          type="text"
          name="price"
          value={event.price}
          placeholder="Price"
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          value={event.category}
          placeholder="Category"
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          value={event.date}
          placeholder="Date"
          onChange={handleChange}
        />
        <input
          type="time"
          name="time"
          value={event.time}
          placeholder="Time"
          onChange={handleChange}
        />
        <input type="file" name="image" onChange={handleFileChange} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateEvent;
