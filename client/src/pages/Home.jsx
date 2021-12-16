import React from "react";


import { Routes } from "react-router";
import { Route } from "react-router";
import HomeContainer from "../components/HomeContainer";
import NavBar from "../components/NavBar";
import CreateDog from "../components/CreateDog";
export default function Home (){

    return <div>
        <NavBar/>
        <HomeContainer/>    
     
    </div>
}

