import React, { useState, useEffect,  Fragment} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Checkbox from '@mui/material/Checkbox';
import Instrux from './Instrux'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(true);
  const [openAgain, setOpenAgain] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const openAgainHandler = ((ev) => {

    console.log(CheckOpenAgain.checked)
    localStorage.setItem('showAgain', openAgain);
    localStorage.getItem("showAgain");
  })
  return (
    <div>
    <Box sx = {{display: "flex", flexDirection: 'row', justifyContent: 'space-around'}}>
    <Box sx = {{width: '.2vw'}}>
      <Button onClick={handleOpen}>About</Button>
    </Box>

    </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}  overflow="auto">
        <Box sx = {{display: 'flex', justifyContent: 'space-around'}}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            MLB Agents
          </Typography> 
          </Box>
          <Typography  sx={{ mt: 2 }}>
          This project aggregates MLB players' contract information by the agency that represents them. By default, it only displays agencies that represent 5 or more players. You can adjust the size of the agencies using the blue slide bar.
          </Typography>
           <Instrux />
          <Typography  sx={{ mt: 2 }}>
            Hover over the graph to see how many players are represented by an agency, the average AAV for pitchers and hitters, and the average length of their contracts.
          </Typography>
          <Typography  sx={{ mt: 2 }}>
            Click on an agency's bar to launch a sortable list of each player, with a summary of their contract terms.
          </Typography>
          <Typography  sx={{ mt: 2 }}>
            Data is scraped from Baseball Reference, Trade Rumors, and Sportrac websites using Puppeteer, and inserted into a MySQL database.
          </Typography>
          <Box sx = {{display: 'flex', justifyContent: 'space-around'}}>
          <Typography  sx={{ mt: 2, fontWeight: 'bold' }}>
           Click anywhere outside this window to dismiss it.
          </Typography>
          </Box>
          <Box sx = {{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
        </Box>
        </Box>

      </Modal>
    </div>
  );
}