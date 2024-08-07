import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import StarIcon from '@mui/icons-material/AutoAwesome';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import NightlightRoundRoundedIcon from '@mui/icons-material/NightlightRoundRounded';
import NightsStayRoundedIcon from '@mui/icons-material/NightsStayRounded';
import './CustomStyles/CustomTimeline.css'
import CustomTimelineItem from './CustomTimelineItem';
import dandeliImage from '../assests/dandeli.jpeg'
import wayToHerImage from '../assests/way-to-her.jpeg'
import collegeDayImage from '../assests/collegeDay.jpeg'
import daysOfWorkImage from '../assests/daysOfWork.jpeg'

const icons = [<StarIcon htmlColor='#eee8aa' />,
               <DarkModeRoundedIcon htmlColor='#eee8aa' />,
               <NightsStayRoundedIcon htmlColor='#eee8aa' />,
               <NightlightRoundRoundedIcon htmlColor='#eee8aa' />]



export default function CustomTimeline() {
  const [storyData, setStoryData] = React.useState([]);
  React.useEffect(() => {
    console.log('Fetching data');
    fetch('http://api.starandmoon.life/GetAllStoriesData')
      .then(response => response.json())
      .then(data => setStoryData(data))
      .catch(error => console.log(error));
    console.log('Data fetched');
  }, []);
  return (
    <Timeline position="alternate">
      {storyData.map((data, index) => {
        return <CustomTimelineItem key={index} id={index} date={data.date} content={data.title} imageUrl={data.imageUrl} icon={icons[index%4]} />
      })}
    </Timeline>
  );
}