import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../state/context";
import { PlayerComponent } from "../components/Player.component";
import { PodcastDetailsComponent } from "../components/PodcastDetails.component";

export const Episodes = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  return <article className="d-flex">
      <section className="col-40 d-flex justify-content-center">
    <PodcastDetailsComponent/>
</section>
<section className="col-60 d-flex justify-content-center">
    <PlayerComponent ep={store.episodeDetails}/>
      </section>
  </article>;
};
