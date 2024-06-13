import React, {useEffect} from 'react';
import Header from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {listEvents} from "../actions/eventAction";

const MyEvents = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin
  // const selector = useSelector()
  const eventList = useSelector((state) => state.eventList);
  const { error, loading, events } = eventList;
  useEffect(() => {
    dispatch(listEvents());
  }, [dispatch]);
  const eventsList = events["events"];
  const deleteHandler = (e) => {
      e.preventDefault();

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
                            return (
                                <div className="col mb-4" key={event["id"]}>
                                    <div>
                                        <a href="/">
                                            <img
                                                className="rounded img-fluid shadow w-100 fit-cover"
                                                src={event["image"]}
                                                style={{height: "250px"}}
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
                                    <a
                                        className="btn btn-primary shadow"
                                        role="button"
                                        onClick={deleteHandler}
                                    >
                                        Delete
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