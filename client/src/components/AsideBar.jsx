import React, {useState} from "react";
import s from "./AsideBar.module.css"
import * as actionCreators from "../actions/index"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function Asidebar (props){
    const [bred,setBred] = useState("")
    const [DB, setDB] =useState(false)
    function handleChange (e){
        setBred(e.target.value)
    }
    function handleChangeDB (){
        setDB(!DB)
    }
    function handleSubmit(e){
        e.preventDefault()
        if (!DB) return props.initStore("http://localhost:3001/dogs?name="+bred)
        props.initStore("http://localhost:3001/dogs?name="+bred+"&DB="+DB)

    }
    return <aside className={s.aside}>
    <form onSubmit={e=>handleSubmit(e)}>
    <input type="text" name = "bred" placeholder="Search a bred" onChange={e=>handleChange(e)} value={bred} className={s.text}/><br></br> 
    My dogs <input type="checkbox" name="DB" onChange={handleChangeDB} value={DB} className={s.checkbox}/> 
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