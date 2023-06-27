import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../state/context";
import { PodcastEpisodes } from "../components/PodcastEpisodes.component";
import { PodcastDetailsComponent } from "../components/PodcastDetails.component";

export const Podcast = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  useEffect(() => {
    actions.getPodcastEpisodes(params.id);
  }, []);
  return (
    <article>
      {/* {console.log(store.episodes)} */}
      <PodcastDetailsComponent />
      <PodcastEpisodes />
    </article>
  );
};
