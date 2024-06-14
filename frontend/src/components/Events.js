import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listEvents } from "../actions/eventAction";
function Events() {
  const dispatch = useDispatch();
  const eventList = useSelector((state) => state.eventList);
  const { error, loading, events } = eventList;
  useEffect(() => {
    dispatch(listEvents());

  }, [dispatch]);
  const eventsList = events["events"];
 

  return (
    <section className="py-5">
      <div className="container py-5">
        <div
          className="row row-cols-1 row-cols-md-2 mx-auto"
          style={{ maxWidth: "900px" }}
        >
          {eventsList?.map((event) => {
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
