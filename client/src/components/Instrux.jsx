import {Box, Card, InputLabel, Paper,  Typography} from '@mui/material';
import SouthIcon from '@mui/icons-material/South';
import samplebar from '../assets/samplebar.png';
export default function Instrux()  {
		return (

      <Box sx = {{ display: 'flex', justifyContent: 'space-around'}} >
  			<Box sx = {{flexDirection: 'column',
                    height: '40%',
                    width: '20%', 
                    display: 'flex', 
                    justifyContent: 'space-around', 
                    marginTop: '4%'
                    }}>
        <Box>
        <Box sx = {{display: 'flex', flex: '1', flexDirection: 'row', justifyContent: 'space-around'}}>
        <Box sx = {{display: 'flex', flexDirection: 'column'}}>
        <Typography 
            sx = {{marginLeft: '1%'}}
            variant ='caption' >
            Hitters</Typography> 
        <SouthIcon sx = {{marginLeft: '20%'}} />
        </Box>
        <Box sx = {{display: 'flex', flexDirection: 'column'}}>
        <Typography 
            sx = {{marginRight: '35%'}}
            variant ='caption' 
            gutterBottom = {true}>
            Pitchers</Typography> 
                  <SouthIcon sx = {{marginLeft: '30%'}} />
        </Box>
        </Box>
        </Box>
  			<Box  sx = {{position: 'bottom', width: '100%'}} component="img"  src = {samplebar} width = '100%'/>
        </Box>
      </Box>

			)
}



