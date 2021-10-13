import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useHistory } from "react-router-dom";

const validationSchema = yup.object({
  systemId: yup    
    .number()
    .required('Requerido')
    .typeError('Deber ser numero')

});

export default function FormSearch() {
  const history = useHistory();
  const classes = useStyles();
  const push = (url) => {
    history.push(url);
  }
  const formik = useFormik({
    initialValues: { systemId: '' },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      push(`/updateall?id=${values.systemId}`);
    }
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form onSubmit={formik.handleSubmit} className={classes.form} >
          <Typography component="h3" variant="h5">
            Ingresar código
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="systemId"
            label="Código"
            name="systemId"            
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.systemId}
            error={formik.touched.systemId && Boolean(formik.errors.systemId)}
            helperText={formik.touched.systemId && formik.errors.systemId}
          />


          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Buscar
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