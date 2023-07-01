import React, { useContext, useState } from "react";
import { Context } from "../state/context";

export const PlayerComponent = (props) => {
  const [ep] = useState(props.ep.data);
  const { actions } = useContext(Context);
  
  return (
    <article className="player--wrapper">
      <h2>{ep.trackName}</h2>
      <section className="player--description">
        <p>{ep.description}</p>
      </section>
      <section className="text-center my-4">
        <audio controls onPlay={actions.playing} onPause={actions.notPlaying}
        >
          <source src={ep.episodeUrl} type="audio/mp4" />
        </audio>
      </section>
    </article>
  );
};
