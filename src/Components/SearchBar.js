import { TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


function SearchBar({ classes, updateFilter, states }) {

  const labels = ['name', 'genre', 'city'];
  const labelComponents = labels.map((el, i) => (
    <TextField
      key={`TextField-${i}`}
      label={el[0].toUpperCase() + el.slice(1)}
      className={classes.textField}
      margin="dense"
      onChange={(e) => updateFilter(e, el)}
    />))

  return (
    <div>
      {labelComponents}
      <FormControl className={classes.formControl}>
        <InputLabel >State</InputLabel>
        <Select
          native
          onChange={(e) => updateFilter(e, 'state')}
        >
          <option aria-label="None" value="All">All</option>
          {states.map((state, i) => (<option value={state} key={`stateChoice-${i}`}>{state}</option>))}
        </Select>
      </FormControl>
    </div>
  )
}
export default SearchBar;
