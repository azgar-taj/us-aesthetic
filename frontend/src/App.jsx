import { Button } from '@mui/material';
import React from 'react';
import './App.css';
import CustomTimeline from './Components/CustomTimeline';
import { ParallaxProvider } from 'react-scroll-parallax';
import { LoginModal } from './Components/LoginModal';

function App() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  return (
    <div className="App">
      <ParallaxProvider>
            <night-sky
              id="nightSky"
              layers="2"
              density="15"
              velocity-x="60"
              velocity-y="60"
              star-color="#FFF"
            >
            </night-sky>
            <div className='foreground'>
              <div style={{fontFamily:'customCursiveMini', color:'#ECE3CE', fontSize: '6vw', paddingTop: 20, alignContent: 'center'}}>
                It all starts here...
              </div>
              <Button style={{ 
                right:0, top:0, position: 'fixed', padding: 20, 
                fontSize: '3vw', fontFamily:'customCursiveMini', color: "#FFEEEE"}} onClick={() => setOpen(true)}>
                Login
              </Button>
              <CustomTimeline />
              <LoginModal open={open} handleClose={handleClose}/>
            </div>
      </ParallaxProvider>
    </div>
  );
}

export default App;
