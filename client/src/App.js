import './App.css';
import { Routes, Route } from 'react-router';
import LandPage from './pages/LandPage';
import Home from './pages/Home';
import { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from "./actions/index"
import CreateDog from './components/CreateDog';

function App(props) {
  useEffect(()=>{props.initStore("http://localhost:3001/dogs")}, [])
  return (
    <div className="App">
      <Routes>
      <Route path="/home*" element={<Home/>}/>
      <Route path="/" element={<LandPage/>}/>
      </Routes>
    </div>
  );
}
const mapStateToProps = (state) =>{
  return {dogs:state}
}
const mapDispatchToProps = (dispatch)=>{
  return bindActionCreators(actionCreators, dispatch)
}
export default connect (mapStateToProps,mapDispatchToProps)(App)

