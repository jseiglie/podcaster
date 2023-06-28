import React, { useContext, useState } from "react";
import { Context } from "../state/context";
import { CardComponent } from "./Card.component";

export const PodcastListComponent = () => {
  const { store, actions } = useContext(Context);
  const [search, setSearch] = useState("");
  const [data] = useState(localStorage.getItem("latest") ? JSON.parse(localStorage.getItem("latest")).entry : []  )
  const filterBy = (el) => (el["im:artist"].label).toLowerCase().includes(search.toLowerCase())
  return (
    <section className="podcastList--wrapper d-flex flex-column">
      <section className="navbar">
        <span className="counter">
          {JSON.parse(localStorage.getItem("latest"))
            ? JSON.parse(localStorage.getItem("latest")).entry.length
            : ""}
        </span>
        <input
          className="search"
          type="text"
          placeholder="Filter podcasts..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>
      <section className="d-flex podcast--holder">

      {data && data.filter(el=>filterBy(el)).map((el, i) => (
        <CardComponent key={i} obj={el} />
        ))}
        </section>
    </section>
  );
};
