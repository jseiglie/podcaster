import React, { useContext, useState } from "react";
import { Context } from "../state/context";
import { CardComponent } from "./Card.component";

export const PodcastListComponent = () => {
  const { store } = useContext(Context);
  // console.log("store latest on home", store.latest);
  
  // console.log(JSON.parse(localStorage.getItem("latest") ).data);
  const [search, setSearch] = useState("");
  //const [data] = useState(store.latest ? store.latest : []);

  const filterBy = (el) =>
    el["im:artist"].label.toLowerCase().includes(search.toLowerCase());
  return (
    <section className="podcastList--wrapper d-flex flex-column">
      <section className="navbar">
        <span className="counter">
          {store.latest && store.latest.entry.length }
        </span>
        <input
          className="search"
          type="text"
          placeholder="Filter podcasts..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>
      <section className="d-flex podcast--holder">
        {store.latest &&
          store.latest.entry
            .filter((el) => filterBy(el))
            .map((el, i) => <CardComponent key={i} obj={el} />)}
      </section>
    </section>
  );
};
