import React from "react";
import YouTube from 'react-youtube';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

function Splash() {
    const opts = {
        height: '590',
        width: '1024',
        playerVars: {
            autoplay: 1,
        },
    };
    return (
        <Container maxWidth="lg">
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <YouTube
                    opts={opts}
                    videoId={'vi1-4fcX_ig'}
                />
                <Link to="/search" style={{ marginTop: 35, textDecoration: 'none' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{
                            width: 200,
                            height: 80,
                            fontSize: '2rem'
                        }}
                    >
                        Entrar
                    </Button>
                </Link>
            </div>
        </Container>

    );
}

export default Splash;

