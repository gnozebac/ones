import React from "react";
import './styles/Intro.css';
import YouTube from 'react-youtube';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

 

function Navbar (){
    const wrapper = {
        textDecoration: 'none'
      }
    return (
        <>
        
        <Container  maxWidth="lg"
          direction="column"
          style={{
            display: 'flex',
            justifyContent:'center'
            }}
        >
            <YouTube 
                videoId={'vi1-4fcX_ig'}
                
            />
        <Link to="/search" style={wrapper}>
        <Button
          variant="contained"
          color="primary"
        >
          Entrar
        </Button>
      </Link>
        </Container>
        </>
        );
}

export default Navbar;