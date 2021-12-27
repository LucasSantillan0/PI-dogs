const { Router, response } = require('express');
const {Dog, Temperament, DogTemperament}= require("../db")
const axios = require('axios');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
var fetchApi= null
let dogList =[]
let fetches = 0

const asc = (a, b) => {
  if(Number(a.weight.metric.substr(0,2)) == Number(b.weight.metric.substr(0,2))) {
    return 0; 
  }
  if(Number(a.weight.metric.substr(0,2)) < Number(b.weight.metric.substr(0,2))) {
    return -1;
  }
  return 1;
};

const desc = (a, b) => {
  if(Number(a.weight.metric.substr(0,2)) == Number(b.weight.metric.substr(0,2))) {
    return 0; 
  }
  if(Number(a.weight.metric.substr(0,2)) > Number(b.weight.metric.substr(0,2))) {
    return -1;
  }
  return 1;
};

const orderFunctions = {
  1:asc,
  2:desc
}

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get("/dogs",   async (req, res)=>{
  try{
  let { name, DB, page, reverse, weight } = req.query;

  let start=0

  page = Number(page)
    console.log(page)

  if (page!=0){
     start = page*8
  }

  console.log(start," ", start+8) 
  

  const condition = name 
    ? {where: {name: name}} 
    : {}

  const dogs= await Dog.findAll(condition)  
  for (let i in dogs){

    let tempString=""
    const temperament=await dogs[i].getTemperaments()

    temperament.forEach(e=>{
      tempString= tempString+ e.dataValues.temperament+ " "
      console.log(tempString)
    })
    
    dogs[i]={...dogs[i].dataValues,temperament: tempString }
    console.log(dogs[i])
  }
  if(DB){
      res.send(dogs.length?dogs.splice(start,8):[{name:"prueba", weight:"10"}])
  } 

  
  axios.get("https://api.thedogapi.com/v1/breeds")
  .then(response=>{
    if(name){
    console.log("filtered")
    return response.data.filter(e=>e.name.toLowerCase().includes(name.toLowerCase())) 
    }
    else{
      fetches++
      console.log("unfiltered")
      if (weight!=0){
        return response.data.sort(orderFunctions[weight])
      }
      return response.data
    }
    })
  .then(data=>{
      if (reverse=="true"){ 
        res.send (data.reverse().splice(start+1,8))       
      }
      res.send(data.splice(start,8))
    })
    .catch(e=>console.log(e))


  
  // axios.get("https://api.thedogapi.com/v1/breeds")
  // .then(response=>{
  //   if (name)return response.data.filter(e=>e.name.toLowerCase().includes(name.toLowerCase()))  
  //   return response.data
  // })
  // .then(data=> res.send(data.splice(start,8)))

  }

  catch (e){
    res.status(404).send(e)

  }
   
})

router.get("/dogs/:idRaza",   async (req, res)=>{

  try{
  const { DB } = req.query;  
  const { idRaza } = req.params;

  if(DB!="false"){
  const dogs= await Dog.findOne({
    where:{id:idRaza},
    include: {
      model: Temperament,
      through: {
        attributes: []
      }
    }
  })
  console.log("DataBase")
  res.send(dogs)
  }

  axios.get("https://api.thedogapi.com/v1/breeds")
  .then(response=>
    response.data.find(e=>e.id==idRaza)      
  )
  .then(data=> res.send(data))
  }
  catch (e){
    res.status(404).send(e)

  }
   
})

router.post("/dog",   async (req, res)=>{
   try{
     console.log(DogTemperament)
  const { name, height, weight, life_span, origin, description, temperaments} = req.body;
  let arr =[]
  const dog = await Dog.create({name:name, height:height, weight:weight, life_span:life_span, origin, description, DB:true})
  for (const element in temperaments){
    let temp =await Temperament.findOrCreate({
      where:{
        temperament:temperaments[element]
      }})
    arr.push(temp[0].dataValues.id)
  }
  
  for (const element in arr){
    await dog.addTemperament(arr[element])
  }

  // Promise.all([Dog.create(), City.findOrCreate({where:})])
  //   .then(([dog, city]) => UserCity.create({userId: user.id, cityId: city.id}))
    
    res.send(dog)
  }

  catch(e){
    res.send(e)
  }
})
router.get("/temperament",   async (req, res)=>{
  try{
  const temperaments =await Temperament.findAll()
  res.json(temperaments)
  }
  catch(e){
    res.send(e)
  }
})

module.exports = router;
