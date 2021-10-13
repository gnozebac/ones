import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Comment from '@mui/icons-material/Comment';
import FitnessCenter from '@mui/icons-material/FitnessCenter';
import { useHistory } from "react-router-dom";
import logo from "../images/logo1.jpeg";

function Navbar() {
  const history = useHistory();

  const back = () => {
    history.goBack();
  }
  const [value, setValue] = React.useState(0);
  return (

    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom:35      
    }
    }>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue((newValue));
          console.log(newValue)
        }}
        style={{ width: 1024 }}

      >
        <BottomNavigationAction
          label="Atras"
          icon={<ArrowBack />}
          onClick={() => { back() }}
        />
        <BottomNavigationAction label="OneSport" icon={<FitnessCenter />} />
        <BottomNavigationAction label="Sugerencias" icon={<Comment />} />
      </BottomNavigation>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop :35 
      }
      }>
        <img src={logo} style={{ width: 300 }} alt='logo' />
      </div>
    </div>

  );

}

export default Navbar;