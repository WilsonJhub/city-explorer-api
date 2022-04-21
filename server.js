'use strict';

console.log('Jason\'s very first server');

const { response } = require('express');
const { request } = require('express');





// REQUIRES 
// In our servers, we have to 'require' instead of import. 
// Here we will list the requirement for a server. 

const cors = require('cors')
const express = require('express');
require('dotenv').config();
const weatherData = require('./weather.json');
const {default: axios} = require('axios');





// USE
// Once we have requeired something, we have to use it. 
// This is where we assign the required 'import', it says we must use it and assign to a variable. Express takes 2 steps, 'require' and 'use'. 
// this is just how express works
const app = express();
app.use(cors())
// define PORT and validate that my env is working
const PORT = process.env.PORT || 3002;
const weatherKey = process.env.WEATHER_API_KEY;
// const movieKey = process.env.MOVIE_API_KEY


// I know that something is wrong with my env or how i'm importing it if my server is running on 3002.

// ROUTES
// We will use these as our *** ENDPOINT ***
// create a basic default route. 
// app.get correlate to axios.get
// the first parameter is the URL in quotes

app.get('/weather', async (request, response) => {
  let searchQuery = request.query.searchQuery
  // let foundCity = url.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase())



  let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${weatherKey}`
console.log(url);
  
  try{
    let dataToSend = await axios.get(url)
      console.log('*********** THIS IS YOUR PROBLEM ***********', dataToSend, '*********** THIS IS YOUR PROBLEM ***********');
     
      response.send(dataToSend.data)

      
    // let forcastArr = url.data.map(day => new Forcast (day))
      
      
    }catch(error){
      console.log('Could not find city', error);
    }
    
    console.log(request.query.lat);
    
    
  })

function Forcast(day) {
  this.date = day.datetime
  this.description = day.weather.description
}

  
  


// at the bottom of all of our routes
app.get('*', (request, response) => {
  response.send('Double check your search. I do not think you typed that in correctly');
})

// ERRORS
// Handle any errors

// LISTEN
// Start the server
// listen is an Express method that takes in a Port (value and a (callback function))
app.listen(PORT, () => console.log(`listening on ${PORT}`) );