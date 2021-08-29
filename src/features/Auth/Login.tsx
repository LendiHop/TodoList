import React from 'react'
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    Paper,
    TextField,
    Typography
} from '@material-ui/core'
import {FormikHelpers, useFormik} from 'formik'
import {useSelector} from 'react-redux'
import {login} from './auth-reducer'
import {Redirect} from 'react-router-dom'
import {selectIsLoggedIn} from './selectors'
import {authActions} from './index'
import {useAppDispatch} from '../../utils/redux-utils'

type FormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {
    const dispatch = useAppDispatch()

    const isLoggedIn = useSelector(selectIsLoggedIn);

    const formik = useFormik({
        initialValues: {
            email: 'free@samuraijs.com',
            password: 'free',
            rememberMe: false
        },
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'Email is required'
                }
            }
            if (!values.password) {
                return {
                    password: 'Password is required'
                }
            }

        },
        onSubmit: async (values: FormValuesType, formikHelpers: FormikHelpers<FormValuesType>) => {
            const resultAction = await dispatch(authActions.login(values));

            if (login.rejected.match(resultAction)) {
                if (resultAction.payload?.fieldsErrors?.length) {
                    const error = resultAction.payload?.fieldsErrors[0];
                    formikHelpers.setFieldError(error.field, error.error);
                }
            }
        },
    })

    if (isLoggedIn) {
        return <Redirect to={"/"}/>
    }


    return <Grid container justify="center" alignItems="center" style={{height: '93vh', textAlign: 'center'}}>
        <Grid item xs={4}>
            <Paper style={{padding: 25, height: 260, width: 300}}>
                <Typography variant="h6">Sign In</Typography>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormGroup style={{height: 260, width: 280}}>
                            <TextField
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps("email")}
                            />
                            {formik.errors.email ? <div style={{color: "red"}}>{formik.errors.email}</div> : null}
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                {...formik.getFieldProps("password")}
                            />
                            {formik.errors.password ? <div style={{color: "red"}}>{formik.errors.password}</div> : null}
                            <FormControlLabel
                                label={'Remember me'}
                                control={<Checkbox
                                    {...formik.getFieldProps("rememberMe")}
                                    checked={formik.values.rememberMe}
                                />}
                            />
                            <Button type={'submit'} variant={'contained'} color={'secondary'} style={{width: '50%', alignSelf: 'center'}}>Login</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Paper>
        </Grid>
    </Grid>
}
