//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Temperament } = require('./src/db.js');
const axios = require("axios")

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001,  function ()  {

    const initTemperaments= ["Stubborn", "Curious", "Playful", "Adventurous", "Active", "Fun loving","Friendly", "Energetic", "Loyal", "Gentle", "Confident", "Loving", "Protective", "Trainable", "Dutiful", "Responsible"]
    const promises =[]
    for (const i in initTemperaments){
      promises.push(Temperament.create({temperament:initTemperaments[i]})) 
    }
    

   

    
    Promise.all(promises)
      .then(res => {
        console.log("running");
      });
    
  

    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
}); 
 


 