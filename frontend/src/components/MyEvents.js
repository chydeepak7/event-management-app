import React, {useEffect, useState} from 'react';
import Header from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {listEvents} from "../actions/eventAction";
import axios from "axios"
// import { Link } from "react-router-dom";
import {Link, useNavigate} from "react-router-dom";

const MyEvents = () => {
    const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin
  // const selector = useSelector()
  const eventList = useSelector((state) => state.eventList);
  const { error, loading, events } = eventList;
    const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listEvents());
  }, [dispatch]);
const history = useNavigate()
  const eventsList = events["events"];
  let setId = 0
  const deleteHandler = async (e) => {
      // e.preventDefault();
      const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userInfo.access}`,
            },
        };
      await axios.delete(`/event/delete/${e}/`, config)
      // history("/myevent")
window.location.reload()

  }
  const updateHandler = async (e) => {
      const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userInfo.access}`,
            },
        };

      history(`/update/${e}`)


  }

    return (
        <div>
            <Header/>
            <section className="py-5">
                <div className="container py-5">
                    <div
                        className="row row-cols-1 row-cols-md-2 mx-auto"
                        style={{maxWidth: "900px"}}
                    >
                        {eventsList?.map((event) => {
                            if (event["email"] == userInfo.username ) {
                                const id = event["id"];
                            return (
                                <div className="col mb-4" key={event["id"]}>
                                    <div>
                                        <Link to={`/events/${event['id']}`}>
                                            <img
                                                className="rounded img-fluid shadow w-100 fit-cover"
                                                src={event["image"]}
                                                style={{height: "250px"}}
                                            />
                                        </Link>
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
                                    <a
                                        className="btn btn-primary shadow"
                                        role="button"
                                        onClick={() => deleteHandler(id)}
                                    >
                                        Delete
                                    </a>
                                    <a
                                        className="btn btn-primary shadow"
                                        role="button"
                                        onClick={() => updateHandler(id)}
                                    >
                                        Update
                                    </a>
                                </div>
                            );
                            }
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MyEvents;