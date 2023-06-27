import React from "react";
import { useNavigate } from "react-router-dom";

export const CardComponent = (props) => {
 // console.log(props.obj.id.attributes["im:id"]);
  //console.log(props.obj["im:image"]);
  const navigate = useNavigate()
  const handleClick = (e) => {
    navigate(`/podcast/${e.target.id}`);
  };

  return (
    <article className="card">
      <figure className="card__inner">
        <img
          id={`${props.obj.id.attributes["im:id"]}`}
          onClick={(e) => handleClick(e)}
          className="card__img"
          src={props.obj["im:image"][0].label}
          alt={props.obj["im:artist"].label}
        />
        <figcaption className="card__title">
          {props.obj["im:artist"].label.toUpperCase()}
        </figcaption>
      <p className="card__author">
        Author: {props.obj["im:artist"].label}
      </p>
      </figure>
    </article>
  );
};
