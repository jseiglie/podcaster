import React, { useContext, useEffect, useState } from "react";
import { Context } from "../state/context";
import { PodcastListComponent } from "../components/PodcastList.component";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (!actions.checkValidity()) actions.getLatestPodcast();
  }, []);

  return (
    <article>
      <PodcastListComponent />
    </article>
  );
};
