import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Card from './Card';
import Button from '@material-ui/core/Button';


function Grid({ restaurants }) {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);

  useEffect(() => {
    setStartIndex(0);
    setEndIndex(10);
  }, [restaurants]);

  const prevPage = () => {
    setStartIndex(startIndex - 10);
    setEndIndex(endIndex - 10);
  }

  const nextPage = () => {
    setStartIndex(startIndex + 10);
    setEndIndex(endIndex + 10);
  }

  const boxes = restaurants.map((el, i) => (<Card key={`Card-${i}`} info={el} />))
  const trimmedBoxes = boxes.slice(startIndex, endIndex);
  return (
    <Box id='grid'>
      {trimmedBoxes}
      <div id='buttons'>
        {startIndex === 0 ||
          <Button
            variant="contained"
            color="primary"
            id='prev-button'
            onClick={prevPage}>
            Previous
      </Button>}
        {
          endIndex >= restaurants.length ||
          <Button
            variant="contained"
            color="primary"
            id='next-button'
            onClick={nextPage}>
            Next
      </Button>}
      </div>
    </Box>
  )
}

export default Grid