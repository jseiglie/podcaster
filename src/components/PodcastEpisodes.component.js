import React, { useContext } from "react";
import { Context } from "../state/context";
import { Navigate, useNavigate } from "react-router-dom";

export const PodcastEpisodes = (props) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const handleSetEpisode = (e, el) => {
    actions.setEpisodeDetails(el);
    navigate(`/podcast/${props.pod_id}/episode/${e.target.id}`);
  };
  return (
    <article className="episodes--wrapper">
      <section className="episodes__header">
        {console.log("episodes", store.episodes)}
        <h2>Episodes: {store.episodes && store.episodes.length}</h2>
      </section>
      <section className="table--wrapper">

      
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Date</th>
            <th scope="col">Duration</th>
          </tr>
        </thead>
        <tbody>
          {/*console.log(store.episodes)*/}
          {/*console.log(props.pod_id)} */}
          {store.episodes &&
            store.episodes.map((el, i) => (
              <tr key={i}>
                <td className="text-start" id={el.trackId} onClick={(e) => handleSetEpisode(e, el)}>
                  {el.trackName}
                </td>
                <td>{actions.dateFormat(el.releaseDate)}</td>
                <td>{actions.duration(el.trackTimeMillis)}</td>
              </tr>
            ))}
        </tbody>
      </table>
      </section>
    </article>
  );
};
