import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../state/context'
import { useParams } from 'react-router-dom';

export const PodcastDetailsComponent = (props) => {
  const {store, actions} = useContext(Context);
  const params = useParams()
  const [rss, setRss ] = useState("")
  const [description, setDescription] = useState(store.podcastDetails && store.description && store.description )
  

  const getFeed =  async (url) => {
    const corsProxy = "https://cors.eu.org/";
    
    await fetch(corsProxy +  url)
      .then((res) =>
        res
          .text()
          //.then((data) => console.info("data", data))
          
          )
          .then((str) =>
            new window.DOMParser().parseFromString(str, "text/xml")
          )
          .then((feed) => {
            const items = feed.querySelectorAll("description");
            setRss(items[0].childNodes[0].wholeText) 
          })
      .catch((err) => console.warn("res err", err))
      .finally(() => console.info("res complete")); 
  }





  useEffect(()=>{
    actions.getPodcastDetails(params.pod_id)
    actions.clearDescription()
    store.podcastDetails && getFeed(store.podcastDetails.data.feedUrl)
    //console.log(store.podcastDetails)
    store.podcastDetails && actions.getFeed(store.podcastDetails.data.feedUrl) 
  },[])  
  return (
    <article className='details--wrapper'>
      {/* {console.log(store.podcastDetails)} */}
      {console.log("ESTADO", typeof rss)}
      <img className='details__img ' src={store.podcastDetails&&store.podcastDetails.data.artworkUrl600} alt=''/>
      <hr/>
      <h2 className='details__title'>{store.podcastDetails&&store.podcastDetails.data.collectionName}</h2>
      <p className='details__author'>by: {store.podcastDetails&&store.podcastDetails.data.artistName}</p>
      <hr/>
      <h3 className='details_description'>Description:</h3>
      {/* {console.log(description)} */}
RSS
      <p className='details__description__text' dangerouslySetInnerHTML = { {__html: rss && rss}}>  
    
      </p>
STATE
           <p className='details__description__text' dangerouslySetInnerHTML = { {__html: description && description}}>  
           </p>
    </article>
  )
}
