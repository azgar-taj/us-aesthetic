import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import StarIcon from '@mui/icons-material/AutoAwesome';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import NightlightRoundRoundedIcon from '@mui/icons-material/NightlightRoundRounded';
import NightsStayRoundedIcon from '@mui/icons-material/NightsStayRounded';
import './CustomStyles/CustomizedTimeline.css'
import CustomTimelineItem from './CustomTimelineItem';
import dandeliImage from '../assests/dandeli.jpeg'
import wayToHerImage from '../assests/way-to-her.jpeg'
import collegeDayImage from '../assests/collegeDay.jpeg'
import daysOfWorkImage from '../assests/daysOfWork.jpeg'

const icons = [<StarIcon htmlColor='#eee8aa' />,
               <DarkModeRoundedIcon htmlColor='#eee8aa' />,
               <NightsStayRoundedIcon htmlColor='#eee8aa' />,
               <NightlightRoundRoundedIcon htmlColor='#eee8aa' />]


const dictData = {  0: {date: '27th January 2023', title: 'The First Sight', imageUrl: dandeliImage},
                1: {date: '3rd February 2023', title: 'Way to Her', imageUrl: wayToHerImage},
                2: {date: '29th March 2023', title: 'The College Day', imageUrl: collegeDayImage},
                3: {date: '29th April 2023', title: 'Days of Work', imageUrl: daysOfWorkImage},
                4: {date: '15th May 2023', title: 'The First Gift', imageUrl: wayToHerImage},
                5: {date: '23rd June 2023', title: 'The First Night', imageUrl: wayToHerImage}}

export default function CustomizedTimeline() {
  return (
    <Timeline position="alternate">
      {Object.entries(dictData).map((entry) => {
        console.log(entry[1].date);
        return <CustomTimelineItem 
                            imageUrl={entry[1].imageUrl}
                            id={entry[0]}
                            date={entry[1].date} 
                            content={entry[1].title}
                            icon={icons[Math.floor(Math.random() * icons.length)]}/>})}
    </Timeline>
  );
}