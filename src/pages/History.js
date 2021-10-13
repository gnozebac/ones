import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar'
import Container from '@material-ui/core/Container';
import { useLocation } from "react-router-dom";

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


import { getHistoryByCustomerId } from '../services/HistoryService';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
        <TableCell component="th" scope="row"> {row.dateControl}
        </TableCell>
        <TableCell align="right">{row.weight}</TableCell>
        <TableCell align="right">{row.bmi}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ flexGrow: 1 }}  style={{ paddingBottom: 10, paddingTop: 10 }} >
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Item>Pecho: {row.chest}</Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>Brazo Izquierdo: {row.leftArm} </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>Brazo Derecho: {row.rightArm}</Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>Cintura: {row.waist}</Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>Cadera: {row.hips}</Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>Muslo Izquierda: {row.leftThigh}</Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>Muslo Derecha: {row.rightThigh}</Item>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
function History() {

  const location = useLocation()
  const [histories, setHistories] = useState([])
  const { customerId } = location.state

  useEffect(() => {
    getHistoryByCustomerId(customerId)
      .then(data => {
        setHistories(data);
      });

  }, [customerId]);

  return (
    <React.Fragment>
      <Navbar />
      <Container component="main" maxWidth="sm">

        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Fecha</TableCell>
                <TableCell align="right">Peso</TableCell>
                <TableCell align="right">IMC</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {histories.map((history) => (
                <Row key={history.id} row={history} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Container>
    </React.Fragment>
  );
}

export default History;