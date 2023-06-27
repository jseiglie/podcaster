import React, { useContext } from "react";
import { Context } from "../state/context";
import { CardComponent } from "./Card.component";

export const PodcastListComponent = () => {
  const { store, actions } = useContext(Context);
  return <section className="podcastList--wrapper">
    {/* {console.log(JSON.parse(localStorage.getItem("latest")))} */}
    {JSON.parse(localStorage.getItem("latest")).entry.map((el, i)=><CardComponent key={i} obj={el}/>)}
  </section>;
};
