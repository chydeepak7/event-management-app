import React, { useState, useEffect } from "react";
import axios from "axios";

function Events() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    async function fetchEvent() {
      const { data } = await axios.get("/getevent/");
      setEvents(data.events);
    }
    fetchEvent();
    
  }, []);

  
  return (
    <section className="py-5">
      <div className="container py-5">
        <div
          className="row row-cols-1 row-cols-md-2 mx-auto"
          style={{ maxWidth: "900px" }}
        >
          {events.map((event) => {
            return (
              <div className="col mb-4" key={event["id"]}>
                <div>
                  <a href="/">
                    <img
                      className="rounded img-fluid shadow w-100 fit-cover"
                      src={event["image"]}
                      style={{ height: "250px" }}
                    />
                  </a>
                  <div className="py-4">
                    <span className="badge bg-primary mb-2">
                      {event["category"]}
                    </span>
                    <h4 className="fw-bold">{event["name"]}</h4>
                    <p className="text-muted">{event["location"]}</p>

                    <p className="text-muted">{event["description"]}</p>
                    <p className="text-muted">{event["date"]}</p>
                    <p className="text-muted">{event["time"]}</p>
                    <p className="text-muted">{event["price"]}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Events;
