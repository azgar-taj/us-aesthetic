import './App.css';
import CustomTimeline from './Components/CustomTimeline';
import { ParallaxProvider } from 'react-scroll-parallax';

function App() {
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
              <CustomTimeline />
            </div>
      </ParallaxProvider>
      {/* </Parallax> */}
    </div>
  );
}

export default App;
