import React, { useState } from "react";

export const PlayerComponent = (props) => {
  const [ep] = useState(props.ep);
  console.log("PLAYER", ep);

  return (
    <article>
      <h2>{ep.trackName}</h2>
      <section>
        <p>{ep.description}</p>
      </section>
      <section>
        <audio src={ep.episodeUrl} controls />
      </section>
    </article>
  );
};
