import React, { useContext, useEffect } from "react";
import { Context } from "../state/context";
import { PodcastListComponent } from "../components/PodcastList.component";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getLatestPodcast();
  }, []);

  const handleSearch = (e) => {};

  return (
    <article>
       <section className="navbar">
        <span className="counter">
          {JSON.parse(localStorage.getItem("latest"))
            ? JSON.parse(localStorage.getItem("latest")).entry.length
            : ""}
        </span>
        <input className="search" type="text" placeholder="Filter podcasts..." onChange={(e) => handleSearch(e)} />
      </section>
      <PodcastListComponent />
    </article>
  );
};
