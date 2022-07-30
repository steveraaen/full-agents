import {Box, Grid, Typography, Paper}  from '@mui/material';
// import './components.css'

const contStyle = {
  backgroundColor: 'black',
  opacity: '90%',
  width: '300px',
  paddingLeft: '5%',
  paddingBottom: '5%'
}


export default function CustTip({props,  active, color, payload, label }) {
  const lineStyle = {color: color}

  if (active  && payload && payload.length) {
    // console.log(color)
  return (
     <Box sx = {contStyle}>  
      <Typography sx = {{color: 'white', textAlign: 'center'}}>{`${label}`}</Typography>
        <Grid container direction = 'column' >
          <Grid container direction = 'row'>
            <Grid item xs={6}>
            <Typography style={{color:"#6495ED"}}>{`Hitters:   ${payload[0].value}`}</Typography>
              
            </Grid> 
            <Grid item xs={6}>
            <Typography style={{color:"#6495ED"}}>{`Pitchers:   ${payload[3].value}`}</Typography>
             
             
            </Grid>             
            <Grid item xs={6}>
               <Typography style={{color:"#bc5090"}}>{`AAV:   ${payload[1].value} M`}</Typography>
              
            </Grid>
            <Grid item xs={6}>
             <Typography style={{color:"#bc5090"}}>{`AAV:   ${payload[4].value} M`}</Typography>
              
            </Grid> 
            <Grid item xs={6}>
           <Typography style={{color:"#ff7f50"}}>{`AvgYears:   ${payload[2].value}`}</Typography>
             
           
            </Grid>
            <Grid item xs={6}>
            <Typography style={{color:"#ff7f50"}}>{`Avg Years:   ${payload[5].value}`}</Typography>
            </Grid> 

          
          </Grid>
        </Grid>
    </Box>
    )
  }
}

