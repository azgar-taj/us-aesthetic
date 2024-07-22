import './App.css';
import CustomTimeline from './Components/CustomTimeline';

function App() {
  return (
    <div className="App">
      
      <div className='custom-backgound'>
        <div style={{fontFamily:'customCursiveMini', color:'#ECE3CE', fontSize: '6vw', paddingTop: 20}}>
          It all starts here...
        </div>
        <CustomTimeline />
      </div>
      
    </div>
  );
}

export default App;
