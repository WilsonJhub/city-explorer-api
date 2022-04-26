'use strict'

const axios = require('axios')
const movieKey = process.env.MOVIE_API_KEY;

const cache = require ('./cache');

//***************************************************************** */


const movies = async (request, response) => {
  let searchQuery = request.query.searchQuery;
  // console.log(`searchQuery: ${searchQuery}`);

  let url = `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${searchQuery}`;
  // console.log(url);


  let key = 'movie: ' + request.query.searchQuery;
  // 1month = tooOld
  let tooOld = 1000 * 60 
  if (cache[key] && (Date.now() - cache[key].timestamp < tooOld)){
    console.log('cachehit');
  } else{
  cache[key]= {};
  cache[key].timestamp = Date.now();
  try{
    let movieResponse = await axios.get(url)
    // console.log(movieResponse);

    let movieArr = movieResponse.data.results.map(theatre => new Showing(theatre))
    cache[key].data = movieArr;
    

    response.send(cache[key].data);

    

  }catch(error){
    console.log(error);
  }

}}


function Showing(movie) {
  let someVariable = movie.poster_path !== null? movie.poster_path: ''
  // 'https://image.tmdb.org/t/p/w300' + poster_path ORRR image_url
  // this.title = movie.title is referring to .....
  this.title = movie.title                
  this.overview = movie.overview
  this.vote_average = movie.vote_average
  this.total_votes = movie.vote_count
  this.image_url = 'https://image.tmdb.org/t/p/w200' + someVariable
  this.popularity = movie.popularity
  this.released_on = movie.release_date
}

module.exports = movies
