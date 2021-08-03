import React from 'react'
import { TextField, Grid } from '@material-ui/core'
import { useFormContext, Controller } from 'react-hook-form'

const FormInput = ({ name, label }) => {
    const { control } = useFormContext()

    return (
        <Grid item xs={12} sm={6}>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <TextField {...field} label={label} fullWidth required />
                )}
            />
        </Grid>
    )
}

export default FormInput

/* 
Controller can use material ui text field as its own
-This is a custom component

- ...field contains all data in all fields (firstname, lastName etc)

fullWidth label and required are regular TextField component props
*/
