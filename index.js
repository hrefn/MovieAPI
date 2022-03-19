
const express = require('express'),
  morgan = require('morgan'),
  uuid = require('uuid');
const req = require('express/lib/request');
const app = express();

app.use(express.json())

let users = [
  {
    username: 'Chris',
    favorites: [
      {
        title: 'The Shawshank Redemption'
      },
      {
        title: 'The Godfather'
      }
    ]
  }
]

let movies = [
  {
    title: 'The Shawshank Redemption',
    year: '1994',
    genre : {
      name: 'Drama',
      description: 'dramatic films'
    },
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
    genre : {
      name: 'Crime',
      descpription: 'movies about crim'
    },
    director : {
      name: 'Francis Ford Coppola',
      birth: '4/7/1939',
      death: '',
    },
    actors: {},
    imgURL: ''
  },
  {
    title: 'Interstellar',
    test: 'test',
    genre: {
      name: 'test',
      description: 'test'
    },
    director: {
      name: 'test',
      birth: '1/1/1999',
      death: '2/2/2000'
    }
  }
];

app.use(morgan('common'))

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.get('/movies/:title', (req, res) => {
  let movie = movies.find((movie) => {
    return movie.title === req.params.title
  });

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(404).send(req.params.name + ' not found.');
  };
});

app.get('/movies/genres/:genre', (req, res) => {
  let genre = movies.find(movie => movie.genre.name === req.params.genre).genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(404).send(req.params.genre + ' not found');
  };
});

app.get('/movies/director/:name', (req, res) => {
  let director = movies.find(movie => movie.director.name === req.params.name).director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(404).send(req.params.director + ' not found');
  };
});

app.post('/users', (req, res) => {
  const newUser = req.body;

  if (!newUser.username) {
    const message = 'Missing username in request body';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser)
  }
});

app.put('/users/:username', (req, res) => {
  let usernameChange = req.body

  let user = users.find((user) => {
    return user.username === req.params.username
  });

  if (user) {
    user.username = usernameChange.username;
    res.status(200).json(user);
  } else {
    res.status(400).send(req.params.username + ' not found');
  };
});

app.post('/users/:username/:title', (req, res) => {
  let newMovie = req.body;

  let user = users.find((user) => {
    return user.username === req.params.username
  });



  if (!newMovie.title) {
    const message = 'Missing new favorite movie title';
    res.status(400).send(message);
  } else {
    user.favorites.push(newMovie);
    res.status(201).send(newMovie);
  }

});

app.delete('/users/:username/:title', (req, res) => {
  let user = users.find((user) => {
    return user.username === req.params.username
  });

  if (user) {
    user.favorites = user.favorites.filter((movie) => {
      return movie !== req.params.title
    });
    res.status(200).send(req.params.title + ' was removed from ' + user.username + "'s favorites list.")
  } else {
    res.status(404).send('user not found')
  }
});

app.delete('/users/:username', (req, res) => {
  let user = users.find((user) => {
    return user.username === req.params.username
  });

  if (user) {
    users = users.filter((user) => {
      return users.username !== req.params.username
    })
    res.status(200).send(req.params.username + ' was deleted')
  } else {
    res.status(404).send(req.params.username + ' was not found')
  }
});

app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('something broke')
})

app.listen(8080, () => {
  console.log('App listening on port 8080')
})