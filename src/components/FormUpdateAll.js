import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import TextInput from '../components/TextInput';
import { getOneCustomer, updateAllCustomer } from '../services/CustomerService';
import { getMeasureByCustomerId } from '../services/MeasureService';

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
  sex: yup
    .string('M o F')
    .oneOf(['M', 'F'])
    .required('Requerido'),
  yearBirth: yup
    .string('Ingrese año')    
    .required('Requerido'),
  monthBirth: yup
    .string('Ingrese Mes')    
    .required('Requerido'),
  dayBirth: yup
    .string('Ingrese Mes')    
    .required('Requerido'),
  bloodPressure: yup
    .string('Ingrese Mes')    
    .required('Requerido'),
  heartRate: yup
    .string('Ingrese Mes')    
    .required('Requerido'),
  chest: yup
    .string('Ingrese Mes')    
    .required('Requerido'),
  leftArm: yup
    .string('Ingrese Mes')    
    .required('Requerido'),
  rightArm: yup
    .string('Ingrese Mes')    
    .required('Requerido'),
  waist: yup
    .string('Ingrese Mes')    
    .required('Requerido'),
  hips: yup
    .string('Ingrese Mes')    
    .required('Requerido'),
  leftThigh: yup
    .string('Ingrese Mes')    
    .required('Requerido'),
  rightThigh: yup
    .string('Ingrese Mes')    
    .required('Requerido'),
});

const intialCustomer = {
  id: '',
  systemId: '',
  firstname: '',
  lastname: '',
  sex: '',
  yearBirth: '',
  monthBirth: '',
  dayBirth: '',
  bloodPressure: '',
  heartRate: '',
  height: '0',
  weight: '0',
  bmi: '0',
  workoutId: '0',
  dietId: '0',
  dateControl: '',
  chest: '',
  leftArm: '',
  rightArm: '',
  waist: '',
  hips: '',
  leftThigh: '',
  rightThigh: ''
}

export default function FormUpdateAll() {
  const history = useHistory();

  const push = (url) => {
    history.push(url);
  }
  const location = useLocation()	
  const {  systemId } = location.state

  const [customer, setCustomer] = useState(intialCustomer)
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
        //setCustomer(data);
        getMeasureByCustomerId(data.id)
        .then(measure => {
          data.chest=measure.chest;    
          data.leftArm=measure.leftArm;    
          data.rightArm=measure.rightArm;    
          data.waist=measure.waist;    
          data.hips=measure.hips;              
          data.leftThigh=measure.leftThigh;    
          data.rightThigh=measure.rightThigh; 
          data.sex= (data.sex)? 'M': 'F'
          setCustomer (data)
        })
      })
      .catch(err => {
        console.log(err.message);
        setError('No disponible')
      });

  }, [systemId]);


  const classes = useStyles();
  const fecha= new Date();
  const dateControl = fecha.getFullYear()+'-'+fecha.getMonth()+1+'-'+fecha.getDate();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Actulizar informacion
        </Typography>
        {error && error}
        <Formik
          initialValues={customer}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={(values) => {
            
            values.bmi = (values.weight / (values.height * values.height));
            values.dateControl=dateControl;
            values.workoutId = 1;
            values.dietId = 1;
            setCustomer(values);
            console.log(values);
            values.sex= (values.sex==='M')? true : false
            updateAllCustomer(values);
            push(`/search`);
          }

        }
        >
          <Form >
            <Typography component="h1" variant="h5">
  
            </Typography>
            <Divider>
              <Chip label="Datos personales" />
            </Divider>
            <Grid container spacing={1}>
              <Grid item xs={4} >
                <TextInput name="id" label="Codigo" disabled={true} />
              </Grid>
              <Grid item xs={4} >
                <TextInput name="systemId" label="Codigo Cliente" />
              </Grid>
              <Grid item xs={6}>
                <TextInput name="firstname" label="Nombre" />
              </Grid>
              <Grid item xs={6} >
                <TextInput  name="lastname" label="Apellido" />
              </Grid>
              <Grid item xs={2} >
                <TextInput name="sex" label="Sexo" />
              </Grid>
              <Grid item xs={4}>
                <TextInput name="yearBirth" label="Año de nacimiento" />
              </Grid>
              <Grid item xs={3} >
                <TextInput name="monthBirth" label="Mes de nacimiento" />
              </Grid>
              <Grid item xs={3} >
                <TextInput name="dayBirth" label="Dia de nacimiento" />
              </Grid>
            </Grid>
            <Divider>
              <Chip label="Medidas" />
            </Divider>
            <Grid container spacing={1}>
              <Grid item xs={3} >
                <TextInput name="weight" label="Peso" />
              </Grid>
              <Grid item xs={3} >
                <TextInput name="height" label="Talla" />
              </Grid>
              <Grid item xs={3} >
                <TextInput name="bloodPressure" label="Presió Sanguínea" />
              </Grid>
              <Grid item xs={3}>
                <TextInput name="heartRate" label="Pulso Cardiáco" />
              </Grid>
              <Grid item xs={3} >
                <TextInput name="chest" label="Pecho" />
              </Grid>
              <Grid item xs={3}>
                <TextInput name="leftArm" label="Brazo Izquierdo" />
              </Grid>
              <Grid item xs={3} >
                <TextInput name="rightArm" label="Brazo Derecho" />
              </Grid>
              <Grid item xs={3} >
                <TextInput name="waist" label="Cintura" />
              </Grid>
              <Grid item xs={4} >
                <TextInput name="hips" label="Cadera" />
              </Grid>
              <Grid item xs={4}>
                <TextInput name="leftThigh" label="Pierna Izquierda" />
              </Grid>
              <Grid item xs={4} >
                <TextInput name="rightThigh" label="Pierna Derecha" />
              </Grid>


              <Grid item xs={3} >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Actualizar
                </Button>

              </Grid>
            </Grid>

          </Form>
        </Formik>

      </div>

    </Container >
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