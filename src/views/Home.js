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
      <div>
        <span>
          {JSON.parse(localStorage.getItem("latest"))
            ? JSON.parse(localStorage.getItem("latest")).entry.length
            : ""}
        </span>
        <input type="text" onChange={(e) => handleSearch(e)} />
      </div>
      <PodcastListComponent />
    </article>
  );
};
