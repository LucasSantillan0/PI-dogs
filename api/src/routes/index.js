const { Router, response } = require('express');
const {Dog}= require("../db")
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
var fetchApi= null


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/dogs",   async (req, res)=>{

  try{

  const { name, DB } = req.query;
  const condition = name 
    ? {where: {name: name}}
    : {}

  const dogs= await Dog.findAll(condition)  
  if(DB){
      res.send(dogs.length?dogs:[{name:"prueba"}])
  } 
  axios.get("https://api.thedogapi.com/v1/breeds")
  .then(response=>{
    if (name)return response.data.filter(e=>e.name.toLowerCase().includes(name.toLowerCase()))  
    return response.data
  })
  .then(data=> res.send([...data, ...dogs]))
  }

  catch (e){
    res.status(404).send(e)

  }
   
})

router.get("/dogs/:idRaza",   async (req, res)=>{

  try{
  const { DB } = req.query;  
  const { idRaza } = req.params;
  const condition = idRaza 
    ? {where: {id: idRaza}}
    : {}

  if(DB){
  const dogs= await Dog.findAll(condition)
  res.send(dogs.length?dogs:[])
  }

  axios.get("https://api.thedogapi.com/v1/breeds")
  .then(response=>
    response.data.filter(e=>e.id==idRaza)      
  )
  .then(data=> res.send(data))
  }
  catch (e){
    res.status(404).send(e)

  }
   
})

router.post("/dog",   async (req, res)=>{
   try{
  const { name, height, weight, life_span, origin, description} = req.body;

   const dog = await Dog.create({name:name, height:height, weight:weight, life_span:life_span, origin, description})
   res.send(dog)}
   catch(e){res.send(e)}
})


module.exports = router;
