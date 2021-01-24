import Box from '@material-ui/core/Box';
import Card from './Card';


function Grid({ restaurants }) {
  const boxes = restaurants.map((el, i) => (<Card key={`Card-${i}`} info={el} />))
  return (
    <Box id='grid'>
      {boxes}
    </Box>
  )
}

export default Grid