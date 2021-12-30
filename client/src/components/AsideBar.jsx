import React, {useState, useEffect} from "react";
import s from "./AsideBar.module.css"
import * as actionCreators from "../actions/index"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import alphabetic from "../../src/order_alphabetical.png"
import numeric from "../../src/order_numeric.png"

const weightSetter={
    0:1,
    1:2,
    2:0
}

function Asidebar (props){
    const [bred,setBred] = useState("")
    const [DB, setDB] =useState(false)
    const [page, setPage] =useState(0)
    const [reverse, setReverse]=useState(0)
    const [weight, setWeight]=useState(0)

    useEffect(()=>{
        updateStore(bred,page,DB, reverse)}, [page])

    function updateStore(){ 
    console.log(DB)
        if (!DB) return props.initStore("http://localhost:3001/dogs?name="+bred+"&page="+page+ "&reverse="+reverse+ "&weight="+weight)
        props.initStore("http://localhost:3001/dogs?name="+bred+"&DB="+DB+"&page="+page)
    }
    function handleChange (e){
        setBred(e.target.value)
    }
    function handleWeight (e){
        setPage(0)
        setReverse("false")
        setWeight(weightSetter[weight])
    }
    function handleChangeDB (){
        console.log("change DB")
        setDB(!DB)
    }
    function handleReverse (e){

        setPage(0)
        setWeight(0)        
        if (reverse==0) return setReverse(1)
        setReverse(0)
    }
    function handleSubmit(e){

        e.preventDefault()   
        updateStore(bred, DB)
    }

    return <aside className={s.aside}>
    <div className={s.pages}>
    <span>Page: </span>
    <button onClick={()=>{if (page>0)setPage(page-1)}}>-</button>    
    <span>{page+1}</span>
    <button onClick={()=>{if (page<15)setPage(page+1)}}>+</button>
    </div>

    <form onSubmit={e=>handleSubmit(e)}>
    <input type="text" name = "bred" placeholder="Search a bred" onChange={e=>handleChange(e)} value={bred} className={s.text}/><br></br> 
    Only my dogs <input type="checkbox" name="DB" onChange={handleChangeDB} value={DB} className={s.checkbox}/> <br></br>
    <div>
    <button onClick={e=>handleReverse(e)} className={s.nobackground}> <img className={reverse==1?s.iconActive: s.icon}  src={alphabetic}></img> </button>
    <button onClick={e=>handleWeight(e)} className={s.nobackground}><img className={weight!=0?s.iconActive: s.icon}  src={numeric}></img> </button>
    </div>   
    <button type="submit" className={s.button}>Search</button> 
    </form>
           
    </aside>
}
function mapStateToProps(state){
    return {dogs:state}
}
function mapDispatchToProps (dispatch){
    return bindActionCreators(actionCreators,dispatch)
}
export default connect (mapStateToProps,mapDispatchToProps)(Asidebar)