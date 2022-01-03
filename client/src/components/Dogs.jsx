import React from "react";
import DogCard from "./DogCard";
import * as actionCreators from "../actions/index"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import s from "./Dogs.module.css"


function Dogs (props){

    if(props.dogs[0]==="LOADING"){
        return <div className={s.spinner}></div>
    }
    return <div className={s.container}>

        {props.dogs.map(dog=><DogCard data={dog} key={dog.id}/>)}

    </div>
}

const mapStateToProps = (state) =>{
    return {dogs:state}
}
const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators(actionCreators, dispatch)
}
export default connect (mapStateToProps,mapDispatchToProps)(Dogs)
  