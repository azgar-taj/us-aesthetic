import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Fade } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "75vw",
  height: "75vh",
  bgcolor: 'background.paper',
  p: 4,
};

export const BasicModal = ({open, handleClose, imageUrl, content, date}) => {
return (
    <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Fade in={open} timeout={500}>
                <Box borderRadius={2} sx={style}>
                    <div style={{ display: 'flex', height: "100%", width:"100%" }}>
                        <div style={{ flex: 1 }}>
                            <img style={{ height:"100%", width:"100%"}} src={imageUrl} alt="" />
                        </div>
                        <div style={{ flex: 1, margin: 12 }}>
                            <Typography variant="h6">{content}</Typography>
                            <Typography variant="subtitle1">{date}</Typography>
                            <Typography variant="body1">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                vitae nunc id nunc tincidunt tincidunt. Nulla facilisi. Nullam
                                nec nunc ac nunc lacinia lacinia. Sed auctor, nunc non
                                ullamcorper tincidunt, nunc mauris semper nunc, id aliquam
                                mauris nunc id libero. Sed auctor, nunc non ullamcorper
                                tincidunt, nunc mauris semper nunc, id aliquam mauris nunc id
                                libero.
                            </Typography>
                        </div>
                    </div>
                </Box>
            </Fade>
        </Modal>
    </div>
);
}
