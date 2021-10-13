import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';

import { createCustomer } from '../services/CustomerService';
import TextInput from '../components/TextInput';

const initValuesCustomer = {
  systemId: '',
  firstname: '',
  lastname: '',
  sex: '',
  yearBirth: '',
  monthBirth: '',
  dayBirth: '',
  bloodPressure: '',
  heartRate: '',
  height: '',
  weight: '',
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

const validationSchema = yup.object({  

  systemId: yup
    .string('Ingrese código')
    .required('Requerido'),
  firstname: yup
    .string('Enter your nombre')
    .required('Requerido'),
  sex: yup
    .string('M o F')
    .oneOf(['M', 'F'])
    .required('Requerido'),
  height: yup
    .string('Ingrese talla')
    .required('Requerido'),
  weight: yup
    .string('Ingrese peso')
    .required('Requerido'),

});

export default function FormNew(props) {
  const fecha= new Date();
  const dateControl = fecha.getFullYear()+'-'+fecha.getMonth()+1+'-'+fecha.getDate();
  function onSubmit(values) {
    values.bmi = (values.weight / (values.height * values.height));
    values.dateControl=dateControl
    const x = values.bmi;
    switch (true) {
      case (x < 18.5):
        values.workoutId = 1;
        values.dietId = 4;
        break;
      case (x < 25):
        values.workoutId = 1;
        values.dietId = 3;
        break;
      case (x < 30):
        values.workoutId = 1;
        values.dietId = 2;
        break;
      default:
        values.workoutId = 1;
        values.dietId = 1;
        break;
    }
    values.sex = (values.sex==='M') ? true:false;
    
    console.log(values);
    createCustomer(values)

  }

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Formik
          initialValues={initValuesCustomer}
          validationSchema={validationSchema}
          onSubmit={(values) => onSubmit( values )}
        >
          <Form >
            <Typography component="h1" variant="h5" style={{display: 'flex', justifyContent: 'center',   marginBottom:30}}>
              Nuevo usuario
            </Typography>
            <Divider>
              <Chip label="Datos personales" />
            </Divider>
            <Grid container spacing={1}>
              <Grid item xs={2} >
                <TextInput name="systemId" label="Codigo" />
              </Grid>
              <Grid item xs={5}>
                <TextInput name="firstname" label="Nombre" />
              </Grid>
              <Grid item xs={5} >
                <TextInput name="lastname" label="Apellido" />
              </Grid>
              <Grid item xs={3} >
                <TextInput name="sex" label="Sexo" />
              </Grid>
              <Grid item xs={3}>
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
                <TextInput name="bloodPressure" label="Presión Sanguínea" />
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

              </Grid>
              <div style={{
                    display: 'flex',
                    justifyContent: 'center',                    
              }
              }>
              <Grid item xs={3} >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Guardar
                </Button>
                <Link to="/search"   style={{ textDecoration: 'none' }}>
                    <Button
                    fullWidth
                        variant="outlined"
                        color="primary"
                      
                    >
                        Regresar
                    </Button>
                </Link>
              </Grid>
              </div>


          </Form>
        </Formik>
      </div>

    </Container >
  );
}