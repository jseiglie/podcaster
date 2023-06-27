import React, { useContext } from "react";
import { Context } from "../state/context";

export const PodcastEpisodes = () => {
  const { store, actions } = useContext(Context);

  return (
    <article>
      <section>
        {/* {console.log("episodes", store.episodes)} */}
        <h2>Episodes: {store.episodes && store.episodes.length}</h2>
      </section>
      <table className="table">
        <thead>
          <tr>
            
            <th scope="col">Title</th>
            <th scope="col">Date</th>
            <th scope="col">Duration</th>
          </tr>
        </thead>
        <tbody>
      {store.episodes && store.episodes.map((el, i) => 
          <tr key={i}>
            
          <td>{el.trackName}</td>
          <td>{actions.dateFormat(el.releaseDate)}</td>
          <td>{actions.duration(el.trackTimeMillis)}</td>
        </tr>
      )}
      
        </tbody>
      </table>
    </article>
  );
};
