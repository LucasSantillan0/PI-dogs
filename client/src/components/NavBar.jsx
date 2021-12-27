import React from "react";
import ButtonLink from "./ButtonLink";
import AsideBar from "./AsideBar"
import s from "./NavBar.module.css"
import { Routes, Route } from "react-router";
import CreateDog from "./CreateDog";

export default function NavBar (){
    return<nav className={s.nav}>
        <div className={s.links}>
        <ButtonLink to="create" text="Add your dog"/>
        <ButtonLink to="/home" text="Search"/>
        </div>
        <Routes>
            <Route path="/*" element={<AsideBar/>}/>
            <Route path="create" element={<CreateDog/>}/>
        </Routes>
</nav>
}