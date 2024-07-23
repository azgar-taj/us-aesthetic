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


const dictData = [ {date: '27th January 2023', title: 'The First Sight', imageUrl: dandeliImage},
                {date: '3rd February 2023', title: 'Way to Her', imageUrl: wayToHerImage},
                {date: '29th March 2023', title: 'The College Day', imageUrl: collegeDayImage},
                {date: '29th April 2023', title: 'Days of Work', imageUrl: daysOfWorkImage},
                {date: '15th May 2023', title: 'The Job Interview', imageUrl: wayToHerImage},
                {date: '23rd June 2023', title: 'Julious July', imageUrl: wayToHerImage}]

export default function CustomTimeline() {
  return (
    <Timeline position="alternate">
      {dictData.map((data, index) => {
        return <CustomTimelineItem key={index} id={index} date={data.date} content={data.title} imageUrl={data.imageUrl} icon={icons[index%4]} />
      })}
    </Timeline>
  );
}