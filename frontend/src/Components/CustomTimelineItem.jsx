import * as React from 'react';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import './CustomStyles/CustomTimelineItem.css';
import { StoryImage } from './StoryImage';
import { BasicModal } from './Modal'

const CustomTimelineItem = ({index, image, icon}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
        <>
            <TimelineItem key={image.id} >
                <TimelineOppositeContent
                sx={{ m: 'auto', width: "30vw"}}
                color="white">
                    <div className='text-hoverer text-limiter'>
                        {image.date}
                    </div>
                </TimelineOppositeContent>
                <TimelineSeparator sx={{ width: "10vw"}}>
                    <TimelineConnector sx={{ bgcolor: '#eee8aa' }} />
                    <TimelineDot style={{backgroundColor:'#3A4D39'}}>
                        {icon}
                    </TimelineDot>
                    <TimelineConnector sx={{ bgcolor: '#eee8aa' }} />
                </TimelineSeparator>
                <TimelineContent onClick={() => handleOpen()}
                    sx={{ p: 2, width: "30vw" }}>
                    <StoryImage index={index} imageUrl={image.imageUrl} title={image.title} />
                </TimelineContent>
            </TimelineItem>
            <BasicModal open={open} handleClose={() => handleClose()} image={image}/>
        </>
    )
}

export default CustomTimelineItem;