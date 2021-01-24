import Box from '@material-ui/core/Box';


function Card({ info: { city, genre, name, state, telephone, } }) {
  const formatGenre = genre.split(',').join(', ');
  return (
    <Box className='box'>
      <h2>{name}</h2>
      <p>{`${city}, ${state}`}</p>
      <p>{telephone}</p>
      <h6>{formatGenre}</h6>
    </Box>
  )
}

export default Card