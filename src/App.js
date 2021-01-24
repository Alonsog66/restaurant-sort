import { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from './Components/Grid'
import SearchBar from './Components/SearchBar'


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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function App() {
  const name = useRef('');
  const city = useRef('');
  const genre = useRef('');
  const state = useRef('All');
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
    else if (filter === 'state') state.current = e.target.value;
    filterRestaurants();
  }

  function filterRestaurants() {
    const filteredRestaurants = allRestaurants
      .filter(restaurant => restaurant.name.toLowerCase().includes(name.current.toLowerCase()))
      .filter(restaurant => restaurant.city.toLowerCase().includes(city.current.toLowerCase()))
      .filter(restaurant => restaurant.genre.toLowerCase().includes(genre.current.toLowerCase()))
      .filter(restaurant => (state.current === "All" || restaurant.state === state.current))
    setFilteredRestaurants(filteredRestaurants);
  }



  // Creating state options
  const states = [...(new Set(filteredRestaurants.map(el => el.state).sort()))];

  return (
    <div id="App">
      <header id="header">
        <h1>Restaurant Search</h1>
        <SearchBar classes={classes} updateFilter={updateFilter} states={states} />
      </header>
      <div id='container-wrapper'>
        {filteredRestaurants.length > 0 ? <Grid restaurants={filteredRestaurants} /> : "No restaurants found"}
      </div>
    </div>
  );
}

export default App;
