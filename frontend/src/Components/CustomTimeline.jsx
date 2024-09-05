import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import StarIcon from '@mui/icons-material/AutoAwesome';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import NightlightRoundRoundedIcon from '@mui/icons-material/NightlightRoundRounded';
import NightsStayRoundedIcon from '@mui/icons-material/NightsStayRounded';
import './CustomStyles/CustomTimeline.css'
import CustomTimelineItem from './CustomTimelineItem';


const icons = [<StarIcon htmlColor='#eee8aa' />,
               <DarkModeRoundedIcon htmlColor='#eee8aa' />,
               <NightsStayRoundedIcon htmlColor='#eee8aa' />,
               <NightlightRoundRoundedIcon htmlColor='#eee8aa' />]

export default function CustomTimeline() {
  const [storyData, setStoryData] = React.useState([]);
  React.useEffect(() => {
    console.log('Fetching data');
    fetch('https://apis.smruthitaj.life/storyservice/story_items')
      .then(response => response.json())
      .then(data => setStoryData(data))
      .catch(error => console.log(error));
    console.log('Data fetch triggered');
  }, []);
  return (
    <Timeline position="alternate">
      {storyData.map((data, index) => {
        return <CustomTimelineItem key={index} index={index} image={data} icon={icons[index%4]} />
      })}
    </Timeline>
  );
}