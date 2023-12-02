import './App.css';
import CustomizedTimeline from './Components/CustomizedTimeline';

function App() {
  return (
    <div className="App">
      
      <div className='custom-backgound'>
        <div style={{fontFamily:'customCursiveMini', color:'#ECE3CE', fontSize: '6vw', paddingTop: 20}}>
          It all starts here...
        </div>
        <CustomizedTimeline />
      </div>
      
    </div>
  );
}

export default App;
