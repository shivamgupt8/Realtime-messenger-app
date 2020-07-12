import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik';
import * as Yup from 'yup';

import history from '../Utilities/history';
import { useRegister } from '../Services/authenticationService';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Register = props => {
    const register = useRegister();

    const classes = useStyles();

    return (
        <div className={classes.paper}>
            <Grid container>
                <Grid item>
                    <Typography component="h1" variant="h5" align="center">
                        Register
                    </Typography>
                    <Formik
                        initialValues={{
                            name: '',
                            username: '',
                            password: '',
                            password2: '',
                        }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string()
                                .required('Name is required')
                                .max(40, 'Too Long!'),
                            username: Yup.string()
                                .required('Username is required')
                                .max(40, 'Username address too long'),
                            password: Yup.string()
                                .required('Password is Required')
                                .max(100, 'Password too long')
                                .min(
                                    6,
                                    'Password should be at least 6 characters long'
                                ),
                            password2: Yup.string().oneOf(
                                [Yup.ref('password'), null],
                                'Passwords do not match'
                            ),
                        })}
                        onSubmit={(
                            { name, username, password, password2 },
                            { setStatus, setSubmitting }
                        ) => {
                            setStatus();
                            register(name, username, password, password2).then(
                                user => {
                                    const { from } = history.location.state || {
                                        from: { pathname: '/chat' },
                                    };
                                    history.push(from);
                                },
                                error => {
                                    setSubmitting(false);
                                    setStatus(error);
                                }
                            );
                        }}
                        validateOnChange={false}
                        validateOnBlur={false}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            values,
                            touched,
                            isValid,
                            errors,
                        }) => (
                            <form
                                onSubmit={handleSubmit}
                                className={classes.form}
                            >
                                <TextField
                                    id="name"
                                    className={classes.textField}
                                    name="name"
                                    label="Name"
                                    fullWidth={true}
                                    variant="outlined"
                                    margin="normal"
                                    required={true}
                                    helperText={touched.name ? errors.name : ''}
                                    error={touched.name && Boolean(errors.name)}
                                    value={values.name}
                                    onChange={handleChange}
                                />

                                <TextField
                                    id="username"
                                    className={classes.textField}
                                    name="username"
                                    label="Username"
                                    fullWidth={true}
                                    variant="outlined"
                                    margin="normal"
                                    required={true}
                                    helperText={
                                        touched.username ? errors.username : ''
                                    }
                                    error={
                                        touched.username &&
                                        Boolean(errors.username)
                                    }
                                    value={values.username}
                                    onChange={handleChange}
                                />

                                <TextField
                                    id="password"
                                    className={classes.textField}
                                    name="password"
                                    label="Password"
                                    fullWidth={true}
                                    variant="outlined"
                                    margin="normal"
                                    required={true}
                                    helperText={
                                        touched.password ? errors.password : ''
                                    }
                                    error={
                                        touched.password &&
                                        Boolean(errors.password)
                                    }
                                    value={values.password}
                                    onChange={handleChange}
                                    type="password"
                                />

                                <TextField
                                    id="password2"
                                    className={classes.textField}
                                    name="password2"
                                    label="Confirm Password"
                                    fullWidth={true}
                                    variant="outlined"
                                    margin="normal"
                                    required={true}
                                    helperText={
                                        touched.password2
                                            ? errors.password2
                                            : ''
                                    }
                                    error={
                                        touched.password2 &&
                                        Boolean(errors.password2)
                                    }
                                    value={values.password2}
                                    onChange={handleChange}
                                    type="password"
                                />

                                <Button
                                    type="submit"
                                    fullWidth={true}
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Register
                                </Button>
                            </form>
                        )}
                    </Formik>
                </Grid>
                <Grid item xs={9}>
                    <Typography>
                        <Link
                            onClick={() => props.handleClick('login')}
                            href="#"
                        >
                            Already have an account?
                        </Link>
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default Register;






// import React from 'react';
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';

// import { Formik } from 'formik';
// import * as Yup from 'yup';

// import history from '../Utilities/history';
// import { useRegister } from '../Services/authenticationService';
// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(3),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

//   const Register = props => {
//          const register = useRegister();
//          const classes = useStyles();        
//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <div className={classes.paper}>
//         <Avatar className={classes.avatar}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Sign up
//         </Typography>
//         <form className={classes.form} noValidate>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 autoComplete="fname"
//                 name="firstName"
//                 variant="outlined"
//                 required
//                 fullWidth
//                 id="firstName"
//                 label="First Name"
//                 autoFocus
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 id="lastName"
//                 label="Last Name"
//                 name="lastName"
//                 autoComplete="lname"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <FormControlLabel
//                 control={<Checkbox value="allowExtraEmails" color="primary" />}
//                 label="I want to receive inspiration, marketing promotions and updates via email."
//               />
//             </Grid>
//           </Grid>
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submit}
//           >
//             Sign Up
//           </Button>
//           <Grid container justify="flex-end">
//             <Grid item>
//               <Link 
//               onClick={() => props.handleClick('login')}
//                             href="#"
//               >
//                 Already have an account? Sign in
//               </Link>
//             </Grid>
//           </Grid>
//         </form>
//       </div>
//       <Box mt={5}>
//         <Copyright />
//       </Box>
//     </Container>
//   );
// }
// export default Register;