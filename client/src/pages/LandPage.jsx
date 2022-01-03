import React from "react";
import ButtonLink from "../components/ButtonLink";
import s from "./LandPage.module.css"
import Zoom from 'react-reveal/Zoom';

export default function LandPage (){

    return <div className={s.bg}>


        <div className={s.container}>

            <div className={s.title}>
            <Zoom left cascade>
            <h1 className={s.titleBox}>Puppies </h1>
            <h4 className={s.titleBox}>Search a dog</h4>
            <h4 className={s.titleBox}>Add your dog</h4>

            </Zoom>
            
            </div>
            <div className={s.button}>
        <ButtonLink to="/home" text="Start" />
        </div>
        </div>
    </div>
}

