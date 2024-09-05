import React from "react";
import './CustomStyles/StoryPage.css';

export const StoryPage = ({image, descHandler, editMode}) => {

  return (
    <div className="notepad">
        <div className="top"></div>
        <div className="paper" >
            <div style={{padding: "6px", fontSize: "large"}}>
                {image.date}
            </div>
            <div style={{padding: "6px", fontSize: "large"}}>
                {image.title}
            </div>
            <div style={{padding: "6px", fontSize: "large"}} suppressContentEditableWarning={true} contentEditable={editMode} onInput={descHandler} >
                {image.shortDesc}
            </div>
        </div>
    </div>
  );
}