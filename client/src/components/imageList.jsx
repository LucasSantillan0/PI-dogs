import s from "./imageList.module.css"
import {useEffect} from "react"
import React, {useState} from "react";
import Bounce from 'react-reveal/Bounce';

export default function ImageList({setImage}){
    const [images, setImages]=useState([])
    useEffect(()=>{
        fetch("http://localhost:3001/images")
        .then(response => response.json())
        .then(data=>setImages (data.map(e=>e.reference_image_id)))
    },[])
    function handleClick(e,imageId){
        e.preventDefault()
        setImage(imageId)
    }

    return <div className={s.container}>
      {images.map(imageId=><Bounce left><img src={`https://cdn2.thedogapi.com/images/${imageId}.jpg`} className={s.card} onClick={e=>handleClick(e,imageId)}/></Bounce>)}
    </div>
}