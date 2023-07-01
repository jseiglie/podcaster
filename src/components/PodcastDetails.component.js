import React, { useContext, useEffect, useState } from "react";
import { Context } from "../state/context";
import { useParams } from "react-router-dom";
import { LoadingComponent } from "./Loading.component";

export const PodcastDetailsComponent = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [rss, setRss] = useState("");

  const getFeed = async (url) => {
    const corsProxy = "https://cors.eu.org/";

    await fetch(corsProxy + url)
      .then((res) =>
        res
          .text()
          .then((str) =>
            new window.DOMParser().parseFromString(str, "text/xml")
          )
          .then((feed) => {
            const items = feed.querySelectorAll("description");
            setRss(items[0].childNodes[0].wholeText);
          })
      )
      .catch((err) => console.warn("res err", err));
  };

  useEffect(() => {
    actions.getPodcastDetails(params.pod_id);
    actions.clearDescription();
    store.podcastDetails && getFeed(store.podcastDetails.data.feedUrl);
    actions.notPlaying();
  }, []);
  return (
    <article className="details--wrapper">
      <img
        className="details__img "
        src={store.podcastDetails && store.podcastDetails.data.artworkUrl600}
        alt=""
      />
      <hr />
      <h2 className="details__title">
        {store.podcastDetails && store.podcastDetails.data.collectionName}
      </h2>
      <p className="details__author">
        by: {store.podcastDetails && store.podcastDetails.data.artistName}
      </p>
      <hr />
      <h3 className="details_description">Description:</h3>
      {rss ? (
        <p
          className="details__description__text"
          dangerouslySetInnerHTML={{ __html: rss && rss }}
        />
      ) : (
        <LoadingComponent />
      )}
    </article>
  );
};
