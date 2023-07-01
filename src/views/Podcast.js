import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../state/context";
import { PodcastEpisodes } from "../components/PodcastEpisodes.component";
import { PodcastDetailsComponent } from "../components/PodcastDetails.component";
export const Podcast = () => {
  const { actions } = useContext(Context);
  const params = useParams();

  useEffect(() => {
    actions.checkValidity("podcast", params.pod_id);
    actions.getPodcastEpisodes(params.pod_id);
    actions.clearDescription();
  }, []);
  return (
    <article className="podcast--wrapper">
      <section className="col-40 d-flex justify-content-center">
        {<PodcastDetailsComponent />}
      </section>
      <section className="col-60 d-flex justify-content-center">
        <PodcastEpisodes pod_id={params.pod_id} />
      </section>
    </article>
  );
};
