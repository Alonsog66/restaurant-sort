import { useState, useEffect, useRef } from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from './Components/Grid'

import './App.css';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

function App() {
  const name = useRef('');
  const city = useRef('');
  const genre = useRef('');
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetch('https://code-challenge.spectrumtoolbox.com/api/restaurants', {
      headers: {
        Authorization: 'Api-Key q3MNxtfep8Gt',
      },
    })
      .then(res => res.json())
      .then(res => res.sort((a, b) => a.name > b.name ? 1 : -1))
      .then(res => { setAllRestaurants(res); setFilteredRestaurants(res); });

  }, []);

  function updateFilter(e, filter) {
    if (filter === 'name') name.current = e.target.value;
    else if (filter === 'city') city.current = e.target.value;
    else if (filter === 'genre') genre.current = e.target.value;
  }
  function filterRestaurants() {
    const filteredRestaurants = allRestaurants
      .filter((restaurant) => restaurant.name.toLowerCase().includes(name.current.toLowerCase()))
      .filter((restaurant) => restaurant.city.toLowerCase().includes(city.current.toLowerCase()))
      .filter((restaurant) => restaurant.genre.toLowerCase().includes(genre.current.toLowerCase()));
    setFilteredRestaurants(filteredRestaurants);
  }

  const labels = ['name', 'city', 'genre'];
  const labelComponents = labels.map(el => (
    <TextField
      label={el[0].toUpperCase() + el.slice(1)}
      className={classes.textField}
      margin="dense"
      onChange={(e) => { updateFilter(e, el); filterRestaurants(); }}
    />))

  return (
    <div id="App">
      <header id="header">
        <h1>Restaurant Search</h1>
        <div>
          {labelComponents}
        </div>
      </header>
      {filteredRestaurants.length > 0 ? <Grid restaurants={filteredRestaurants} /> : "No restaurants found"}
    </div>
  );
}

export default App;
