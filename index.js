
const express = require('express'),
  morgan = require('morgan');
const app = express();

let topTenMovies = [
  {
    title: 'The Shawshank Redemption',
    year: '1994',
    genre : 'Drama',
    director : {
      name: 'Frank Darabont',
      birth: '1/28/1959',
      death: '',
    },
    actors: {},
    imgURL: ''
  },
  {
    title: 'The Godfather',
    year: '1972',
    genre : 'Crime, Drama',
    director : {
      name: 'Francis Ford Coppola',
      birth: '4/7/1939',
      death: '',
    },
    actors: {},
    imgURL: ''
  }
];


app.use(morgan('common'));

app.get('/movies', (req, res) => {
  res.send(topTenMovies);
});

app.get('/', (req, res) => {
  res.send('Thanks for visiting my site');
});

app.use(express.static('public'))

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});