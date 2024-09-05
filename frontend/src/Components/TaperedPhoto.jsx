import React from "react";
import './CustomStyles/TaperedPhoto.css';


export const TaperedPhoto = ({imageUrl}) => {
    return (
        <div className="image-paper pink">
            <div className="tape-section"></div>
                <img src={imageUrl} style={{height: "90%", width: "90%"}} alt="Story" />
            <div className="tape-section"></div>
        </div>
    )
}
