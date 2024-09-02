import React from "react";
import './CustomStyles/StoryPage.css';

export const StoryPage = () => {
  return (
    <div className="notepad">
        <div className="top"></div>
        <div className="paper" >
            <div style={{padding: "6px", fontSize: "large"}}>
            Hello, this is a paper.
            Click to write your message.
            And I can write more and more
            Until the world ends 
            And then I will write some more.
            </div>
        </div>
    </div>
  );
}