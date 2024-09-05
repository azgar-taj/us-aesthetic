import React from "react";

import { Modal, Fade, Button } from "@mui/material";
import { TaperedPhoto } from "./TaperedPhoto";
import "./CustomStyles/Modal.css"
import Cookies from 'universal-cookie';

const loginInputStyle = {
    padding: "6px",
    fontSize: "large",
}

const cookies = new Cookies("auth", { path: '/', expires: new Date(Date.now() + 1000*3600) });

export const LoginModal = ({open, handleClose}) => {
    async function setCookie(token) {
        cookies.set('token', token);
    }
    const Submit = () => {
        fetch('https://auth.smruthitaj.life/token/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username, password: password}),
        })
        .then((response) => response.json())
        .then((token) => setCookie(token))
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

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
                        <div className='charted-paper' style={{ display: 'flex', maxHeight: "80%", maxWidth:"80%", zIndex: 1}}>
                            <div style={{width: '50%'}}>
                                <TaperedPhoto imageUrl={"https://marketplace.canva.com/EAFlBlYxWGY/1/0/900w/canva-pink-white-minimalist-aesthetic-quotes-phone-wallpaper-JD5lEpJ6VRc.jpg"} />
                            </div>
                            <div style={{  display: 'flex', flex: 1, margin: 12, zIndex: 2, flexDirection: "column", justifyContent: 'center' }}>
                                <input style={loginInputStyle} type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                                <input style={loginInputStyle} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                                <Button onClick={Submit} style={{backgroundColor: 'green', color: 'white'}}>Login</Button>
                            </div>
                        </div>
                </Fade>
            </Modal>
        </div>
    )
}
