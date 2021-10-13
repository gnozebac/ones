import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { useLocation } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import AccountBox from '@material-ui/icons/AccountBox';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { getOneCustomer } from '../services/CustomerService';
import ReactSpeedometer from "react-d3-speedometer"
import ButtonGroup from '@mui/material/ButtonGroup';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}
const intialCustomer = {
	id: '',
	systemId: '',
	firstname: '',
	lastname: '',
	username: '',
	password: '',
	height: '',
	weight: '',
	bmi: '',
	workoutId: '',
	dietId: '',
	status: '',
	deleted: ''
}

function Results() {
	const query = useQuery();
	const systemId = query.get('systemId');
	const [customer, setCustomer] = useState(intialCustomer)
	const [loading, setLoading] = useState(true)
	const [indicator, setIndicator] = useState('')
	const [error, setError] = useState(null)
	useEffect(() => {
		getOneCustomer(systemId)
			.then(response => {
				if (!response.ok) {

					throw Error('No se encuentra el codigo');

				}
				return response.json();
			})
			.then(data => {
				const x = data.bmi;
				if (data.sex) {
					switch (true) {
						case (x < 20):
							setIndicator('Desnutrición');
							break;
						case (x < 25):
							setIndicator('Normal');
							break;
						case (x < 30):
							setIndicator('Sobrepeso');
							break;
						case (x < 40):
							setIndicator('Obesidad');
							break;
						default:
							setIndicator('Obesidad grave');
							break;
					}
				}
				else {
					switch (true) {
						case (x < 19):
							setIndicator('Desnutrición');
							break;
						case (x < 23):
							setIndicator('Normal');
							break;
						case (x < 27):
							setIndicator('Sobrepeso');
							break;
						case (x < 32):
							setIndicator('Obesidad');
							break;
						default:
							setIndicator('Obesidad grave');
							break;
					}
				}
				setCustomer(data);
				setLoading(false);
			})
			.catch(err => {
				setLoading(false);
				setError(err.message);
			});

	}, [systemId]);

	//const textColor = '#AAA'
	return (
		<React.Fragment>
			<Navbar />
			<Container component="main" maxWidth="sm">
				<Grid
					container
					direction="column"
					justifyContent="flex-start"
					alignItems="flex-start"
				>
				</Grid>
				<List>
					<ListItem>
						<ListItemIcon>
							<AccountBox />
						</ListItemIcon>
						<ListItemText>
							Usuario:	{customer.firstname.substring(0, 1).toUpperCase() + '.' + customer.lastname.substring(0, 1).toUpperCase()}
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<ArrowForwardIos />
						</ListItemIcon>
						<ListItemText>
							IMC: {indicator}
						</ListItemText>
					</ListItem>
				</List>
				<div style={{
                      display: 'flex',
					  flexDirection: 'column',
					  alignItems: 'center',                
              }
              }>
				<ReactSpeedometer				

					maxValue={50}
					value={Number(customer.bmi)}
					needleColor="yellow"
					startColor="green"
					segments={30}
					endColor="red"
					height={200}
					maxSegmentLabels={0}

				/>
				
				
				{error && (
					<Typography component="h6" variant="h6" style={{ marginBottom: 40 }}>
						{error}
					</Typography>
				)}
				{loading && (
					<Typography component="h6" variant="h6" style={{ marginBottom: 40 }}>
						Cargando datos ...
					</Typography>
				)}
				<ButtonGroup variant="contained" aria-label="outlined primary button group">
					<Button
						style={{ marginTop: 0 }}
						color="primary"
						variant="contained"
						disabled={(error) && true}
						fullWidth
						component={Link}
						to={{
							pathname: '/routine',
							state: {
								routineId: customer.workoutId
							}
						}
						}
					>
						Rutinas</Button>
					<Button
						style={{ marginTop: 0 }}
						variant="contained"
						color="primary"
						fullWidth
						disabled={(error) && true}
						component={Link}
						to={{
							pathname: '/diet',
							state: {
								dietId: customer.dietId
							}
						}
						}
					>
						Dietas</Button>

					<Button
						style={{ marginTop: 0 }}
						variant="contained"
						fullWidth
						color="primary"
						disabled={(error) && true}
						component={Link}
						to={{
							pathname: '/history',
							state: {
								customerId: customer.id
							}
						}
						}
					>
						Historial</Button>
					<Button
						variant="outlined"
						fullWidth
						color="primary"
						disabled={(error) && true}
						style={{ marginTop: 0 }}
						component={Link}
						to={{
							pathname: `/updateall`,
							state: {
								systemId: customer.systemId
							}
						}
						}

					>
						Actualizar
					</Button>



				</ButtonGroup>
				</div>
			</Container>
		</React.Fragment>
	);
}

export default Results;