import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../state/context'
import { useParams } from 'react-router-dom';

export const PodcastDetailsComponent = () => {
  const {store, actions} = useContext(Context);
  const params = useParams()
  const [rss, setRss ] = useState()

  useEffect(()=>{
    actions.getPodcastDetails(params.id)
    store.podcastDetails && setRss(actions.getFeed(store.podcastDetails.feedUrl)) 
  },[])
  return (
    <article>
      {/* {console.log(store.podcastDetails)} */}
      {console.log("ESTADO", rss)}
      <img src={store.podcastDetails&&store.podcastDetails.artworkUrl600} alt=''/>
      <hr/>
      <h2>{store.podcastDetails&&store.podcastDetails.collectionName}</h2>
      <span>by: {store.podcastDetails&&store.podcastDetails.artistName}</span>
      <hr/>
      <h3>Description:</h3>
      <p>lorem ip`sum`lorem ip`sum`lorem ip`sum`lorem ip`sum`lorem ip`sum`lorem ip`sum`lorem ip`sum`lorem ip`sum`lorem ip`sum`lorem ip`sum`lorem ip`sum`lorem ip`sum`
      </p>
     
    </article>
  )
}
