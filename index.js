//import http
const http = require('http');
const request = require('request');
import fetch from "node-fetch"
// port# 
const PORT = 3500;
const API_URL = 'https://swapi.dev/api/people';

//server with HTTP
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write(200,'<h1>Welcome to my StarWars API!</h1>');
    res.write('<img src="https://via.placeholder.com/175">');
    res.end();
  }

//list 
  else if (req.url === '/list') {
    request(API_URL, { json: true }, (err, apiRes, body) => {
      if (err) {
        res.write(500,'Error retreiving API data');
      } 
      else {
        res.write(200,'<h1>StarWars Characters</h1>');
        res.write('<table>');
        res.write('<thead><tr><th>Name</th><th>Height</th><th>Mass</th><th>Hair Color</th><th>Skin Color</th><th>Eye Color</th><th>Gender</th></tr></thead>');
        res.write('<tbody>');
        body.results.forEach((character) => {
          res.write(`<tr><td>${character.name}</td><td>${character.height}</td><td>${character.mass}</td><td>${character.hair_color}</td><td>${character.skin_color}</td><td>${character.eye_color}</td><td>${character.gender}</td></tr>`);
        });
        res.write('</tbody>');
        res.write('</table>');
        res.end();
      }
    });
  } else {
    res.write(404,'<h1>Page Not Found</h1>');
    res.end();
  }
});

//listen to server 
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
