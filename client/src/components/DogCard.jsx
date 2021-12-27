import React from "react";
import s from "./DogCard.module.css"
import { NavLink } from "react-router-dom";

export default function DogCard ({data}){

    return <article className={ s.card}> 
    <NavLink to={data.DB? "/home/"+data.id+"/1":"/home/"+data.id+"/0"} className={s.link}>
        <div className = {s.cardHeader}>
        <img src={data.image?data.image.url: "https://phantom-marca.unidadeditorial.es/252acdd64f48851f815c16049a789f23/resize/1320/f/jpg/assets/multimedia/imagenes/2021/04/19/16188479459744.jpg" } ></img>
        </div>
        <div>
            
            <h5>{data.name}</h5>
            <p>
            <span>Temperament: </span>{data.temperament} <br/>
            <span >Weight: </span>  {data.weight.metric?data.weight.metric:data.weight} Kg<br/>
            
            </p>
            
        </div>
    </NavLink>
    </article>
}