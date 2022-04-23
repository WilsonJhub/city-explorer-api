'use strict'

const axios = require('axios')
const weatherKey = process.env.WEATHER_API_KEY;

// //***************************************************************** */


const weather = async (request, response) => {       
  let searchQuery = request.query.searchQuery            
  // This is querying through .searchQuery 
console.log(searchQuery);
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${weatherKey}`
  // console.log(url);
  try{
    // Setting variable that accesses the weather bit API (dataToSend)
    let dataToSend = await axios.get(url)
    console.log(dataToSend.data);

    let forcastArr = dataToSend.data.data.map(day => new Forcast (day))
    response.send(forcastArr)
    // console.log(forcastArr);
    
  }catch(error){
    next(error);
    // console.log('Could not find city', error);
  }
}


function Forcast(day) {
  this.date = day.datetime
  this.description = day.weather.description
  // console.log(day);
}







module.exports = weather