import React from "react";
import ButtonLink from "../components/ButtonLink";
import s from "./LandPage.module.css"
export default function LandPage (){

    return <div className={s.bg}>
        <div className={s.container}>
        <div className={s.title}>
        <h1>Puppies 🐾</h1>    
        </div>
        <ButtonLink to="/home" text="Home"/>
        </div>
    </div>
}

