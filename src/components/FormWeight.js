import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Link } from "react-router-dom";
import { useFormik} from 'formik';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function FormWeight({ codeCustomer }) {
  const [customer, setCustomer] = useState('')
  const formik = useFormik({
    initialValues: {
      weight: ""
    },
    onSubmit: x => console.log(x)
  });
  
  useEffect(()=>{
    fetch(`https://besport.herokuapp.com/customers/${codeCustomer}`)
    .then(response => response.json())
    .then(data => setCustomer(data))
  },[codeCustomer])
  
    const wrapper = {
      textDecoration: 'none'
    };
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
     
      <div className={classes.paper}>
      <form className={classes.form} >
      <Typography component="h1" variant="h5">
          Peso actual
        </Typography>
            <Grid container spacing={3}>   
            <h3> Cedula: ****** {customer.firstname}</h3>              
                 <TextField
                  autoComplete="fweight"            
                  variant="outlined"
                  required
                  fullWidth
                  name="weight"                
                  id="weight"
                  label="Peso"
                  autoFocus
                  onChange ={formik.handleChange('weight')}
                  value={formik.values.weight}
              />
            </Grid>
            <Link to={{
            pathname: '/results/current',
            state: {
              code: customer.id,
              weight: formik.values.weight
            }
            }} style={wrapper} 
          >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Calcular
              </Button>
            </Link>          
        </form>
      </div>

    </Container>
  );
}

export default FormWeight;