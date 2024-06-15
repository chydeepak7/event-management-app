// EventDetails.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "./Header";

function EventDetails() {
  const [event, setEvent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/getevent/${id}/`);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) {
    return <div>Loading...</div>;  // Add loading state if necessary
  }

  return (
    <div>
        <Header />
        <div style={{ display: "flex", gap: "20rem", flexDirection:"row", marginLeft:"20rem" }}>

        <div>
            {/*{event.image}*/}
            <img src={event.image} width="400px" />
        </div>
            <div style={{display:"flex", justifyContent:"space-between", flexDirection:"column"}}>

      <h2>{event.name}</h2>
      <p>Description: {event.description}</p>
      <p>Start Date: {event.date}</p>
      <p>End Date: {event.endDate}</p>
      <p>Time: {event.time}</p>
      <p>Location: {event.location}</p>
      <p>Total Participants: {event.totalParticipants}</p>
            </div>
        </div>

    </div>
  );
}

export default EventDetails;
