import {InputLabel} from '@mui/material';
// import './components.css'

export default function AgentLabel(props) {
	// console.log(props)
	return (
		<InputLabel sx = {{fontWeight: 'bold', textAlign: 'center', marginTop: '1%'}}>{props.agent}</InputLabel>
		)
}

