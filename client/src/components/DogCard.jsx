import React from "react";
import s from "./DogCard.module.css"

export default function DogCard ({data}){

    return <article className={s.container}>
        <div>
            <h5>Bread: {data.name}</h5>
            <p>
            <span>Bred for: </span> {data.bred_for} <br/>
            <span>Temperament: </span>{data.temperament}
            </p>
        </div>
        <img src={data.image.url || "x"}></img>
        </article>
}