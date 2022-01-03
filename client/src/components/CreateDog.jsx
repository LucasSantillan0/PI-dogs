import React, {useState} from "react";
import { useEffect } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import ImageList from "./imageList";
import * as actionCreators from "../actions/index"
import s from "./CreateDog.module.css"




function CreateDog (props){
    const [allTemperaments, setAllTemperaments]=useState([])
    const [temperaments, setTemperaments]=useState([])
    const [data,setData] =useState({})
    const [error, setError] =useState("")
    const [image,setImage]= useState("")

    useEffect(()=>{
        fetch("http://localhost:3001/temperament")
        .then(response=>response.json())
        .then(data=>setAllTemperaments(data.map(e=>{return{temperament:e.temperament, active:false}})))
    },[])

    useEffect(()=>{
        setTemperaments(allTemperaments.filter(e=>e.active).map(e=>e.temperament))
    },[allTemperaments])
    function validate(data){
        if(data.height>50 || data.weight>100 || data.life_span>50 ){
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

            body: JSON.stringify({...data, temperaments, reference_image_id:image})
          })
          .then(props.initStore("http://localhost:3001/dogs"))
        
    }

    function onChangeTemperament(e,i){
        e.preventDefault()

        setAllTemperaments(allTemperaments.map((element,index)=>{
            if (i==index){
                return {...element, active:!element.active}
            }
            return element
        }))

        
    }


    return <div className={s.flex}><form onSubmit={e=>onSubmit(e)} className={s.container}>
        <label for="name">Name: </label> <input type="text" name="name" id="name" onChange={(e)=>inputChange(e)}/> <br></br>
        <label for="height">Height: </label> <input type="number" name="height" id="height"onChange={(e)=>inputChange(e)}/><br></br>
        <label for="weight">Weight: </label> <input type="number" name="weight" id="weight"onChange={(e)=>inputChange(e)}/><br></br>
        <label for="life_span">Life span: </label> <input type="number" name="life_span" id="life_span"onChange={(e)=>inputChange(e)}/><br></br>
        <div >
        {allTemperaments.map((element,i)=><button onClick={e=>onChangeTemperament(e,i)} className={element.active?s.active:s.inactive } key={i}>{element.temperament}</button>)}
        </div>

        <button type="submit">SUBMIT</button><span>{error}</span>
        
    </form><ImageList setImage={setImage}/></div>
}
function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators,dispatch)
}

export default connect(null,mapDispatchToProps)(CreateDog)