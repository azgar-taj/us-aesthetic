import * as React from 'react';
import './CustomStyles/StoryImage.css'

export const StoryImage = ({index, imageUrl, title}) => {
    return (
        <div style={{backgroundImage: `url(${imageUrl})`}}
            className={'image-cropper'+ (Number(index)%2 !== 0 ? ' margin-me-left' : ' ') +' animate-hover'}>
            <p className='para-text' style={{fontSize: '4vw'}}>
                {title.split(' ').map((word, index) => {return (<React.Fragment key={index}>{word} <br/></React.Fragment>)})}
            </p>
        </div>
    )
}