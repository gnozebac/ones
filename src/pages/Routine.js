import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar'
import Container from '@material-ui/core/Container';
import { useLocation } from "react-router-dom";
import YouTube from 'react-youtube';

//import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { getExercicesByWorkoutId } from '../services/ExerciseService';


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row"> {row.description}
        </TableCell>        
		<TableCell align="right">{row.repetitions}</TableCell>
        <TableCell align="right">{row.series}</TableCell>

        
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
         
			  <YouTube 
                videoId={row.path}               
            />
			    <Typography variant="subtitle1" gutterBottom component="div">
				{row.details} 
      </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

 
function Routine() {

	const location = useLocation()
	const [exercises, setExercises] = useState([])
    const { routineId } = location.state

	useEffect(() => {		
		getExercicesByWorkoutId(routineId)
		.then(data => {
			setExercises(data);			
		});

	}, [routineId]);

	return (
		<React.Fragment>
			<Navbar />
			<Container component="main" maxWidth="sm">
	
			<TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Ejercicio</TableCell>
            <TableCell align="right">Series</TableCell>
            <TableCell align="right">Repetir</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {exercises.map((exercise) => (
            <Row key={exercise.id} row={exercise} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>

			</Container>
		</React.Fragment>
	);
}

export default Routine;