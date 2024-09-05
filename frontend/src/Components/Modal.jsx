import * as React from 'react';
import Modal from '@mui/material/Modal';
import { Button, Fade } from '@mui/material';
import { StoryPage } from './StoryPage';
import { TaperedPhoto } from './TaperedPhoto';
import './CustomStyles/Modal.css';

export const BasicModal = ({open, handleClose, image}) => {
    const [editMode, setEditMode] = React.useState(false);
    const [buttonAction, setButtonAction] = React.useState("Edit");
    const handleEdit = () => {
        setEditMode(!editMode);
        setButtonAction(buttonAction === "Save" ? "Edit" : "Save");
        if (editMode) {
            console.log(image);
            fetch(`https://api.smruthitaj.life/storyservice/story_items/${image.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(image),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }

    const descHandler = (e) => {
        console.log(e.target.innerText);
        image.shortDesc = e.target.innerText
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1}}
            >
                <Fade in={open} timeout={500}>
                        <div className='charted-paper' style={{ display: 'flex', height: "80%", width:"80%", zIndex: 1}}>
                            <div style={{ flex: 1, zIndex: 3, display: 'flex'}}>
                                <TaperedPhoto imageUrl={image.imageUrl} content={image.title} />
                            </div>
                            <div style={{  display: 'flex', flex: 1, margin: 12, zIndex: 2, flexDirection: "column" }}>
                                <StoryPage image={image} descHandler={descHandler} editMode={editMode}/>
                                <Button onClick={handleClose}>Close</Button>
                                <Button onClick={handleEdit}>{buttonAction}</Button>
                            </div>
                        </div>
                </Fade>
            </Modal>
        </div>
    );
}
