import * as React from 'react';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import './CustomStyles/CustomTimelineItem.css';

const CustomTimelineItem = (props) => {
    return (
        <TimelineItem>
            <TimelineOppositeContent
            sx={{ m: 'auto 0'}}
            color="white"
            >
                <div className='text-hoverer text-limiter' style={{marginLeft: Number(props.id)%2 === 0 ? 'auto' : '0'}}>
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
                sx={{ py: '12px', px: 2 }}>
                <div style={{backgroundImage: `url(${props.imageUrl})`}}
                    className={'image-cropper'+ (Number(props.id)%2 !== 0 ? ' margin-me-left' : '') +' animate-hover'}>
                    <p className='para-text' style={{fontSize: '4vw'}}>
                        {props.content.split(' ').map((word) => {return (<>{word} <br/></>)})}
                    </p>
                </div>
            </TimelineContent>
        </TimelineItem>
    )
}

export default CustomTimelineItem;