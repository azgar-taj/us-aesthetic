import React from "react";
import CustomTimeline from "./CustomTimeline";

export const HomeTimeline = () => {
    return (
        <>
            <div className='foreground'>
                <div style={{fontFamily:'customCursiveMini', color:'#ECE3CE', fontSize: '6vw', paddingTop: 20, alignContent: 'center'}}>
                It all starts here...
                </div>
                <CustomTimeline />
            </div>
        </>
    )
}