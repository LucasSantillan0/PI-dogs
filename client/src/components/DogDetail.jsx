import { useState } from "react";
import { useEffect } from "react"
import { connect } from 'react-redux';
import { useParams,   } from "react-router";
import { NavLink } from "react-router-dom";
import { bindActionCreators } from 'redux';
import * as actionCreators from "../actions/index"
import s from "./DogDetail.module.css"

const dogeImage ="https://phantom-marca.unidadeditorial.es/252acdd64f48851f815c16049a789f23/resize/1320/f/jpg/assets/multimedia/imagenes/2021/04/19/16188479459744.jpg"

function DogDetail ({dogs}){

    const {id, DB}=useParams()
    const [dog,setDog]=useState({loading:true})

    useEffect(()=>{
       setDog({loading:true})
       fetch(`http://localhost:3001/dogs/${id}?DB=${ Number(DB)===1?"true":"false"}`)
       .then(response => response.json())
       .then(data=>setDog(data))
    },[id,DB])

    if (dog.loading) return <div className={s.container}> <article>Loading</article></div>
    return <div className={s.container}>
        <article> 
        <img src={dog.reference_image_id?`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`: dogeImage }  alt =""></img>
        <div className={s.text}> 
            <NavLink to="/home" className={s.exit}>X</NavLink>
            <h2>{dog.name}</h2>
            <p>
            <span>Temperament: </span> {dog.temperament?dog.temperament:dog.temperaments.map(e=>`${e.temperament} `)}   <br></br>
            <span>Height: </span> {dog.height.metric?dog.height.metric:dog.height} Cm  <br></br>
            <span>Weight: </span> {dog.weight.metric?dog.weight.metric:dog.weight} Kg<br></br>
            <span>Life span: </span> {typeof dog.life_span =="string"?dog.life_span:dog.life_span+" years"}   <br></br>
            {
            dog.origin?
            <p>
            <span>Origin: </span> {dog.origin}   <br></br> </p>:""
            }
            </p>
        </div>
        </article>
        </div>
}


const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators(actionCreators, dispatch)
}

export default connect(null,mapDispatchToProps)(DogDetail)