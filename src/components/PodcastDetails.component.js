import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../state/context'
import { useParams } from 'react-router-dom';

export const PodcastDetailsComponent = () => {
  const {store, actions} = useContext(Context);
  const params = useParams()
  const [rss, setRss ] = useState()

  useEffect(()=>{
    actions.getPodcastDetails(params.pod_id)
    store.podcastDetails && setRss(actions.getFeed(store.podcastDetails.feedUrl)) 
  },[])
  return (
    <article className='details--wrapper'>
      {/* {console.log(store.podcastDetails)} */}
      {/* {console.log("ESTADO", rss)} */}
      <img className='details__img ' src={store.podcastDetails&&store.podcastDetails.artworkUrl600} alt=''/>
      <hr/>
      <h2 className='details__title'>{store.podcastDetails&&store.podcastDetails.collectionName}</h2>
      <p className='details__author'>by: {store.podcastDetails&&store.podcastDetails.artistName}</p>
      <hr/>
      <h3 className='details_description'>Description:</h3>
      <p className='details__description__text'>lorem ip`sum`lorem ip`sum`lorem ip`sum`lorem ip`sum`lorem ip`sum`lorem ip`sum`lorem ip`sum`lorem ip`sum`lorem ip`sum`lorem ip`sum`lorem ip`sum`lorem ip`sum`
      </p>
     
    </article>
  )
}
