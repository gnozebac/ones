import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useFormik, } from 'formik';
import * as yup from 'yup';

import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';

import { getOneCustomer, updateCustomer } from '../services/CustomerService';


import { useHistory } from "react-router-dom";


const validationSchema = yup.object({
  systemId: yup
    .string('Enter your code')
    .required('Requerido'),
  firstname: yup
    .string('Enter your nombre')
    .required('Requerido'),
  lastname: yup
    .string('Enter your apellido')
    .required('Requerido'),
  height: yup
    .string('Ingrese talla')
    .min(1, 'Password should be of minimum 1 characters length')
    .required('Requerido'),
  weight: yup
    .string('Ingrese Peso')
    .min(1, 'Password should be of minimum 1 characters length')
    .required('Requerido'),
});

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

export default function FormUpdate({ systemIdc }) {
  const history = useHistory();
  const [customer, setCustomer] = useState(intialCustomer)
  
  const back = () => {
    history.goBack();
  }

  useEffect(() => {
		getOneCustomer(systemIdc)
		.then(response => {
			if(!response.ok)
			{
				throw Error('No se encuentra el codigo');
			}
			return response.json();
		})
		.then(data => {
			setCustomer(data);

		})
		.catch(err => {
			console.log(err.message);
		});

  }, [systemIdc]);

  const formik = useFormik({
    initialValues: customer,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {  
      values.bmi=(values.weight/(values.height*values.height));   
      values.workoutId=1;
      values.dietId=1;
      setCustomer(values);
      updateCustomer(values);
    },
  });

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form onSubmit={formik.handleSubmit} className={classes.form} >
          <Typography component="h4" variant="h5" style={{marginBottom:40}}>
            Actualizar datos
          </Typography>
          <Divider>
            <Chip label="Datos personales" />
          </Divider>
          <Grid container spacing={1}>
            <Grid item xs={3} sm={3}>
              <TextField

                disabled
                variant="outlined"
                margin="normal"

                id="id"
                name="id"
                onChange={formik.handleChange}
                value={formik.values.id}
                error={formik.touched.id && Boolean(formik.errors.id)}
                helperText={formik.touched.id && formik.errors.id}
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <TextField
                disabled
                variant="outlined"
                margin="normal"

                id="systemId"
                label="Código"
                name="systemId"
                autoComplete="systemId"

                onChange={formik.handleChange}
                value={formik.values.systemId}
                error={formik.touched.systemId && Boolean(formik.errors.systemId)}
                helperText={formik.touched.systemId && formik.errors.systemId}
              />
            </Grid>
            <Grid item xs={5} sm={5}>
              <TextField
                disabled
                variant="outlined"
                margin="normal"

                id="firstname"
                label="Nombre"
                name="firstname"
                autoComplete="firstname"

                onChange={formik.handleChange}
                value={formik.values.firstname.substring(0, 1).toUpperCase() + ' ' + formik.values.lastname.substring(0, 1).toUpperCase()}
                error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                helperText={formik.touched.firstname && formik.errors.firstname}
              />
            </Grid>
          </Grid>
          <Divider>
            <Chip label="Indice masa corporal" />
          </Divider>
          <Grid container spacing={1}>
          <Grid item xs={4} sm={4}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="height"
            label="Talla en metros"
            name="height"
            autoComplete="height"
            onChange={formik.handleChange}
            value={formik.values.height}
            error={formik.touched.height && Boolean(formik.errors.height)}
            helperText={formik.touched.height && formik.errors.height}
          />
        </Grid>
           <Grid item xs={4} sm={4}>
          <TextField 
            variant="outlined"
            margin="normal"
            fullWidth
            id="weight"
            label="Peso KG"
            name="weight"
            autoComplete="weight"
            onChange={formik.handleChange}
            value={formik.values.weight}
            error={formik.touched.weight && Boolean(formik.errors.weight)}
            helperText={formik.touched.weight && formik.errors.weight}
          />
        </Grid>
        <Grid item xs={4} sm={4}>
          <TextField
          disabled
            variant="outlined"
            margin="normal"
            fullWidth
            id="bmi"
            label="Indice"
            name="bmi"      
            onChange={formik.handleChange}
            value={formik.values.bmi}
            error={formik.touched.bmi && Boolean(formik.errors.bmi)}
            helperText={formik.touched.bmi && formik.errors.bmi}
          />
               </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Actualizar
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=>back()}
          >
            Regresar
          </Button>

        </form>

      </div>

    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));