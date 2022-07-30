import {Slider} from '@mui/material';

export default function MinPlayerSlider(props) {
	const marks = [
	  {
	    value: 0,
	    label: '0',
	  },
	  {
	    value: 2,
	    label: '2',
	  },
	  {
	    value: 5,
	    label: '5',
	  },
	  {
	    value: 10,
	    label: '10',
	  },
	    {
	    value: 20,
	    label: '20',
	  },
	  {
	    value: 30,
	    label: '30',
	  },
	];
	return (
		<Slider
		  sx = {{width: '100%',   marginRight: '5%', color:"#003f5c"}}
		  valueLabelDisplay="auto"
		  onChange = {props.handleSlideChange}
		  value = {props.value}
		  marks = {marks}
		  min={0}
		  max={40}
		/>
		)
}