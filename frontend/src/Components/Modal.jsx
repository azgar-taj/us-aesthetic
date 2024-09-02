import * as React from 'react';
import Modal from '@mui/material/Modal';
import { Fade } from '@mui/material';
import { StoryPage } from './StoryPage';
import { TaperedPhoto } from './TaperedPhoto';
import './CustomStyles/Modal.css';

export const BasicModal = ({open, handleClose, imageUrl, content, date}) => {
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
                            <TaperedPhoto imageUrl={imageUrl} content={content} />
                        </div>
                        <div style={{  display: 'flex', flex: 1, margin: 12, zIndex: 2 }}>
                            <StoryPage />
                        </div>
                    </div>
            </Fade>
        </Modal>
    </div>
);
}
