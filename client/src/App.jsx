import React, { useState, useEffect,  Fragment} from 'react';
import axios from 'axios'
import { ResponsiveContainer } from 'recharts';
import {Box, Card, InputLabel, Paper,  Typography} from '@mui/material';
import BattingDetail from './components/BattingDetail';
import PitchingDetail from './components/PitchingDetail';
import MinPlayerSlider from './components/MinPlayerSlider';
import BChart from './components/BChart';
import BasicModal from './components/StatDrawer'
import AgentLabel from './components/AgentLabel'
import SquareIcon from '@mui/icons-material/Square';
import custlogotxt from './assets/custlogotxt.png';

const legendStyle = {display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}
function App() {
    const [battingDetail, setBattingDetail] = useState([])
    const [pitchingDetail, setPitchingDetail] = useState([])
    const [sliderVal, setSliderVal] = useState([5, 100])
    const [graph, setGraph] = useState({})
    const [agent, setAgent] = useState('')

    function getAgent(ag) {
      useEffect(() => {
        setAgent(ag)
      })
    }
    const rootUrl = "https://aqueous-spire-55432.herokuapp.com"
    async function getAgentStats(num) {
          const reform = (amt) => {
            return parseFloat(parseFloat((amt.replace(/,/g, '')) / 1000000).toFixed(3))
          }
      try {
          const allPlayerPromise = axios.get('/api/allSummary', {params: {num}})
          // const allPlayerPromise = axios.get(`${rootUrl}/api/allSummary`, {params: {num}})
          const [allPlayerSum] = await Promise.all([allPlayerPromise]);  

          const stackAll = allPlayerSum.data[4].map((row) => {
            // console.log(row.agent)
            if(row.b_ann_val != null || row.b_ann_val != null) {             
           return {'agent':row.agent,
                    'bplayers':
                    {'val': row.batters, 'desc': 'BPlayers'},
                    'bamount':
                      {'val': reform(row.b_ann_val), 'desc': 'BMillions'},
                      'byears':
                      {'val': row.b_yrs, 'desc': 'BYears'},
                          'pplayers':
                          {'val': row.pitchers, 'desc': 'PPlayers'},
                          'pamount':
                            {'val': reform(row.p_ann_val), 'desc': 'PMillions'},
                            'pyears':
                            {'val': row.p_yrs, 'desc': 'PYears'}
                          }
                  }
          })
          setGraph({
            graph: {
              graphAll: stackAll
            }
          })
       }        
       catch (e) {
          console.error(e);
      };
  }  
const handleSlideChange = (event, value, activeThumb) => {
    setSliderVal(value)
    getAgentStats(value)
  }
async function getBatDetail(agent) {
  // console.log(agent)
  try {
    const batAgnt = agent.agent
  const batDetailPromise = axios.get('/api/batdetail', {params:{batAgnt}})
  // const batDetailPromise = axios.get(`${rootUrl}/api/batdetail`, {params:{batAgnt}})
  var batDetail = await batDetailPromise
      setBattingDetail({
      battingDetail: batDetail.data
    })
      // console.log(batDetail.data)
  }
         catch (e) {
        console.error(e);
    };
}
async function getPitchDetail(agent) {
  const pitchAgnt = agent.agent
  try {
  const pitchDetailPromise = axios.get('/api/pitchdetail', {params:{pitchAgnt}})
  // const pitchDetailPromise = axios.get(`${rootUrl}/api/pitchdetail`, {params:{pitchAgnt}})
  var pitchDetail = await pitchDetailPromise
    setPitchingDetail({
      pitchingDetail: pitchDetail.data
    })
  }
         catch (e) {
        console.error(e);
    };
}
    useEffect(() => {
    getAgentStats(sliderVal)
}, []);

  return (
    <>

    <Box  sx = {{  display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginBottom: '2%'}} >
      <BasicModal />
      <Box  sx = {{position: 'bottom', width: '20%', marginLeft: '17%'}} component="img"  src = {custlogotxt} />
        <Box sx = {{  display: 'flex', flexDirection: 'column'}} >    
        <Typography  variant = "overline" > Hover over bars for agent info.</Typography>
        <Typography  variant = "overline" > Click bar to view players.</Typography>
    </Box>
    </Box>
    
    <Box sx = {{flexDirection: 'column', marginLeft: '10%', marginRight: '10%', marginTop: '2%', flexWrap: 'wrap'}}>
        <InputLabel sx = {{ display: 'flex', justifyContent: 'center', fontWeight: 'bold'}}>Players per Agent</InputLabel>
        <MinPlayerSlider handleSlideChange = {handleSlideChange} value={sliderVal} />
        </Box>
    <Box sx = {{ marginLeft: '5%', marginRight: '5%'}} >
    <BChart  data = {graph.graph}  
              getBatDetail = {getBatDetail} 
              getPitchDetail = {getPitchDetail} 
              getAgent = {getAgent}
              setAgent = {setAgent}/>
     </Box>
    <Box sx = {{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
    <SquareIcon sx = {{color: "#003f5c"}}/><Typography sx = {{paddingRight: '2vw'}}>No. of Hitters / Pitchers</Typography>
    <SquareIcon sx = {{color: "#bc5090"}}/><Typography sx = {{paddingRight: '2vw'}}>Salary (million)</Typography>
    <SquareIcon sx = {{color: "#ff7f50"}}/><Typography sx = {{paddingRight: '2vw'}}>Average Years</Typography>
    </Box>
      <AgentLabel agent = {agent} />
       <Box sx = {{display: 'flex',  flexDirection: 'row', marginTop: '3%'}}>
          <BattingDetail data = {battingDetail.battingDetail} />
          <PitchingDetail data = {pitchingDetail.pitchingDetail} />
        </Box>

      </>
  );
}
export default App;

