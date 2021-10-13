import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar'
import Container from '@material-ui/core/Container';
import { useLocation } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountBox from '@material-ui/icons/AccountBox';
import Typography from '@material-ui/core/Typography';

const intialDiet = {
	id: '',
	description: '',
	path: ''

}

function Diet() {

	const location = useLocation()
	const { dietId } = location.state

	const [diet, setDiet] = useState(intialDiet)
	useEffect(() => {

		fetch(`https://onesportbev1.herokuapp.com/diets/${dietId}`)
			.then(response => response.json())
			.then(data => setDiet(data))
			.catch(error => console.error('Error:', error));

	}, [dietId]);


	return (
		<React.Fragment>
			<Navbar />
			<Container component="main" maxWidth="md">
				<div style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}
				}>
					<Typography variant="h5" component="div" gutterBottom >
						Dieta recomendada:
					</Typography>
					<List>
						<ListItem>
							<ListItemIcon>
								<AccountBox />
							</ListItemIcon>
							<ListItemText >
								{diet.description}
							</ListItemText>
						</ListItem>
					</List>
					<img style={{ width: 600 }} src={diet.path} alt="dieta" />;
				</div>
			</Container>
		</React.Fragment>
	);
}

export default Diet;