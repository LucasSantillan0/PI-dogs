import React from "react";
import { NavLink } from "react-router-dom";
import s from "./ButtonLink.module.css"
export default function ButtonLink (props){

    return <NavLink className={s.button} to={props.to}>
        {props.text}     
        </NavLink>
}