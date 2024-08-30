import * as React from 'react';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import './CustomStyles/CustomTimelineItem.css';
import { StoryImage } from './StoryImage';

const CustomTimelineItem = (props) => {
    const onClickEvent = (props) => {
        console.log(props);
    }

    return (
        <TimelineItem key={props.id} onClick={() => onClickEvent(props)}>
            <TimelineOppositeContent
            sx={{ m: 'auto', width: "45vw"}}
            color="white">
                <div className='text-hoverer text-limiter'>
                    {props.date}
                </div>
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineConnector sx={{ bgcolor: '#eee8aa' }} />
                <TimelineDot style={{backgroundColor:'#3A4D39'}}>
                    {props.icon}
                </TimelineDot>
                <TimelineConnector sx={{ bgcolor: '#eee8aa' }} />
            </TimelineSeparator>
            <TimelineContent 
                sx={{ p: 2, width: "45vw" }}>
                <StoryImage imageUrl={props.imageUrl} id={props.id} content={props.content} />
            </TimelineContent>
        </TimelineItem>
    )
}

export default CustomTimelineItem;