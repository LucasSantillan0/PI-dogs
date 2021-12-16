import React, {useState} from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as actionCreators from "../actions/index"

function CreateDog (props){
    const [data,setData] =useState({})
    const [error, setError] =useState("")

    function validate(data){
        if(data.height>50 || data.weight>100 || data.lifeSpan>50 ){
            return "Error, invalid data"
        }
    }

    function inputChange(e){
        setData({
          ...data,
          [e.target.name]: e.target.value
        })
        setError(validate({
            [e.target.name]: e.target.value
        }))
    }

     function onSubmit(e){
        e.preventDefault()

        fetch("http://localhost:3001/dog", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

            body: JSON.stringify(data)
          })
          .then(props.initStore("http://localhost:3001/dogs"))
        
    }

    return <form onSubmit={e=>onSubmit(e)}>
        <label for="name">Name: </label> <input type="text" name="name" id="name" onChange={(e)=>inputChange(e)}/> <br></br>
        <label for="height">Height: </label> <input type="number" name="height" id="height"onChange={(e)=>inputChange(e)}/><br></br>
        <label for="weight">Weight: </label> <input type="number" name="weight" id="weight"onChange={(e)=>inputChange(e)}/><br></br>
        <label for="life_span">Life span: </label> <input type="number" name="life_span" id="life_span"onChange={(e)=>inputChange(e)}/><br></br>
        <button type="submit">SUBMIT</button><span>{error}</span>
    </form>
}
function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators,dispatch)
}

export default connect(null,mapDispatchToProps)(CreateDog)