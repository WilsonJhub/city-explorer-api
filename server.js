'use strict';

console.log('Jason\'s very first server');

const { response } = require('express');
const { request } = require('express');




// ***************************************************************** REQUIRES *****************************************************************
// REQUIRES 
// In our servers, we have to 'require' instead of import. 
// Here we will list the requirement for a server. 

const cors = require('cors')
const express = require('express');
const weatherData = require('./weather.json');
const {default: axios} = require('axios');
require('dotenv').config();
// ***************************************************************** REQUIRES *****************************************************************



// ***************************************************************** USE *****************************************************************
// USE
// Once we have requeired something, we have to use it. 
// This is where we assign the required 'import', it says we must use it and assign to a variable. Express takes 2 steps, 'require' and 'use'. 
// this is just how express works.
// I know that something is wrong with my env or how i'm importing it if my server is running on 3002.
// define PORT and validate that my .env is working

const app = express();
app.use(cors())
const PORT = process.env.PORT || 3002;
const weatherKey = process.env.WEATHER_API_KEY;
const movieKey = process.env.MOVIE_API_KEY;
// ***************************************************************** USE /> *****************************************************************

// ***************************************************************** <ROUTES *****************************************************************
// We will use these as our *** ENDPOINT ***
// create a basic default route. 
// app.get correlate to axios.get
// the first parameter is the URL in quotes


// WEATHER---WEATHER---WEATHER---WEATHER---WEATHER---WEATHER---WEATHER---WEATHER---WEATHER---WEATHER---WEATHER---WEATHER---WEATHER---WEATHER---WEATHER---
app.get('/weather', async (request, response) => {       
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
    // console.log('Could not find city', error);
  }
})



// MOVIES---MOVIES---MOVIES---MOVIES---MOVIES---MOVIES---MOVIES---MOVIES---MOVIES---MOVIES---MOVIES---MOVIES---MOVIES---MOVIES---MOVIES---MOVIES---MOVIES  

// searchMovies will request a query through the movies available from the API key once the URL is created. NOTE: We are only using .searchQuery because that is what we called it ---let url = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${name}`)--- inside of our front-end. So we want to make sure that we are keeping that .searchQuery the same. 

app.get('/movies', async (request, response) => {
  let searchQuery = request.query.searchQuery;
  console.log(`searchQuery: ${searchQuery}`);

  let url = `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${searchQuery}`;
  console.log(url);
  try{
    let movieResponse = await axios.get(url)
    console.log(movieResponse);

    let movieArr = movieResponse.data.results.map(theatre => new Showing(theatre))
    response.send(movieArr);
    // response.send(movieResponse.data.results)
  }catch(error){
    // console.log('Theatre not available');
  }

})




  // Forecast is constructing a new data sets from the API for each 'day' and then pulling the specific data that I am looking for by saying day.daytime   and day.weather.decription.
function Forcast(day) {
  this.date = day.datetime
  this.description = day.weather.description
  // console.log(day);
}

// 
function Showing(movie) {
  let someVariable = movie.poster_path !== null? movie.poster_path: ''
  // 'https://image.tmdb.org/t/p/w300' + poster_path ORRR image_url
  this.title = movie.title
  this.overview = movie.overview
  this.vote_average = movie.vote_average
  this.total_votes = movie.vote_count
  this.image_url = someVariable
  this.popularity = movie.popularity
  this.released_on = movie.release_date
}

  
// at the bottom of all of our routes
app.get('*', (request, response) => {
  response.send('Double check your search. I do not think you typed that in correctly');
})

// ***************************************************************** ROUTES /> *****************************************************************




// ***************************************************************** <ERRORS *****************************************************************
// Handle any errors




// ***************************************************************** ERRORS /> *****************************************************************



// ***************************************************************** <LISTEN *****************************************************************

// Start the server
// listen is an Express method that takes in a Port (value and a (callback function))
app.listen(PORT, () => console.log(`listening on ${PORT}`) );
// ***************************************************************** LISTEN /> *****************************************************************
