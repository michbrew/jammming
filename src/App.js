
import './App.css';



import { useState, useEffect } from 'react';

const CLIENT_ID ="c91254d218c74afcaac5a02721928c55";
const CLIENT_SECRET ="0950915d16f24522a3f53142c958f31f";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  
  const [tracks, setTracks] = useState([]);


  useEffect(()=> {
    // API Access Token

    var authParameters = {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    }

    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token));

    //console.log(accessToken)


  }, [])

  //Search

  


async function search() {
 

  var searchParameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }

  }

 
var returnedTracks = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=track&market=US`, searchParameters)
.then(response => response.json())
.then(data => setTracks(data.tracks.items))




/// data.tracks.items[0].artists[0].name /// artist name
/// data.tracks.items[0].name  /// song name
//  data.tracks.items[0].album.name   //album name
/// data.tracks.items[0].uri   // spotify uri
/// data.tracks.items[0].external_urls.spotify   ////spotify link


//console.log(tracks)
}





  return (
    <div className="App">
      <input type="search" placeholder="Enter Your Search" onChange={
        (e) => setSearchInput(e.target.value)
          
      }/>
      <button type="button" onClick={ (event)=> search()}>Search</button>

      <div>
        {tracks.map((track)=> 
        <div id="container">
          <p><span>Artist:</span> {track.artists[0].name}</p>
          <p><span>Song Title:</span> {track.name}</p>
          <p><span>Album:</span> {track.album.name}</p>
          
          <a href={track.external_urls.spotify} target="_blank" rel='noreferrer'>{track.external_urls.spotify}</a>
          
        </div>)}
      </div>
    </div>
  );
}

export default App;