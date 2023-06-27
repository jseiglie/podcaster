import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../state/context";
import { PodcastEpisodes } from "../components/PodcastEpisodes.component";
import { PodcastDetailsComponent } from "../components/PodcastDetails.component";

export const Podcast = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  //console.log(params.pod_id)
  useEffect(() => {
    actions.getPodcastEpisodes(params.pod_id);
  }, []);
  return (
    <article className="podcast--wrapper">
      {/* {console.log(store.episodes)} */}
      <section className="col-40 d-flex justify-content-center">
        <PodcastDetailsComponent />
      </section>
      <section className="col-60 d-flex justify-content-center">
        <PodcastEpisodes pod_id={params.pod_id} />
      </section>
    </article>
  );
};
