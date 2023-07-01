import React, { useContext, useEffect } from "react";
import { Context } from "../state/context";
import { PodcastListComponent } from "../components/PodcastList.component";

export const Home = () => {
  const { actions } = useContext(Context);

  useEffect(() => {
    if (!actions.checkValidity("latest")) actions.getLatestPodcast();
  }, []);

  return (
    <article>
      <PodcastListComponent />
    </article>
  );
};
