import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useField } from 'formik';

const TextInput = ({label, disabled, ...props})=>{
    const [field, meta] = useField(props);

    return (
        <TextField
        variant="outlined"
        margin="normal"
        disabled={disabled? true:false}
        fullWidth        
        label={label}        
        error={(meta.error) && true}
        helperText={meta.error}
        {...field}          

      />


    );

}

export default TextInput

/*

        variant="outlined"
        margin="normal"
        fullWidth
        id="systemId"
        label={label}
        name="systemId"
        autoComplete="systemId"
        autoFocus
        onChange={formik.handleChange}
        value={formik.values.systemId}
        error={formik.touched.systemId && Boolean(formik.errors.systemId)}
        helperText={formik.touched.systemId && formik.errors.systemId}
*/ 