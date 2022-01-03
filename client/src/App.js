import './App.css';
import { Routes, Route } from 'react-router';
import LandPage from './pages/LandPage';
import Home from './pages/Home';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from "./actions/index"


function App(props) {
  
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

