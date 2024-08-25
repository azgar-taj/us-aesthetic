import './App.css';
import './Components/CustomStyles/ParallaxBackground.scss';
import CustomTimeline from './Components/CustomTimeline';

function App() {
  return (
    <div className="App">
      <div class="bg"></div>
      <div class="parallax">
        <div class="parallax-group">
          <div class="layer"></div>
          <div class="layer"></div>
          <div class="layer"></div>
          <div class="layer"></div>
          <div class="layer"></div>
          <div class="layer fill"></div>
        </div>
        <div class="content">
          <div style={{fontFamily:'customCursiveMini', color:'#ECE3CE', fontSize: '6vw', paddingTop: 20}}>
            It all starts here...
          </div>
          <CustomTimeline />
        </div>
      </div>
    </div>
  );
}

export default App;
