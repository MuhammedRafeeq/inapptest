import {
  Button,
  Container,
  createStyles,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { setUserData } from "../redux/actions/auth";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
    },
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
        marginRight: 20
    }
  })
);

const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let history = useHistory();

  const loginForm = useFormik({
    initialValues: { email: "", password: "", confirmPassword: "", name: "" },

    validationSchema: Yup.object().shape({
      email: Yup.string().required("Email is required").email("Inavlid email"),
      name: Yup.string().required("Name is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string()
        .required("Password is required")
        .oneOf([Yup.ref("password"), null], "Passwords does not match"),
    }),
    onSubmit: (values) => {
      delete values.confirmPassword;
      dispatch(setUserData(values));
      history.push("/");
    },
  });

  return (
    <Container maxWidth="md" className={classes.container}>
      <form className="form" onSubmit={loginForm.handleSubmit}>
        <h2>Register</h2>
        <div className={classes.formControl}>
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={loginForm.values.email}
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            error={Boolean(loginForm.touched.email && loginForm.errors.email)}
            helperText={loginForm.touched.email && loginForm.errors.email}
          />
        </div>
        <div className={classes.formControl}>
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={loginForm.values.name}
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            error={Boolean(loginForm.touched.name && loginForm.errors.name)}
            helperText={loginForm.touched.name && loginForm.errors.name}
          />
        </div>
        <div className={classes.formControl}>
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            name="password"
            value={loginForm.values.password}
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            error={Boolean(
              loginForm.touched.password && loginForm.errors.password
            )}
            helperText={loginForm.touched.password && loginForm.errors.password}
          />
        </div>
        <div className={classes.formControl}>
          <TextField
            type="password"
            label="Confirm Password"
            variant="outlined"
            name="confirmPassword"
            value={loginForm.values.confirmPassword}
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            error={Boolean(
              loginForm.touched.confirmPassword &&
                loginForm.errors.confirmPassword
            )}
            helperText={
              loginForm.touched.confirmPassword &&
              loginForm.errors.confirmPassword
            }
          />
        </div>
        <div className={classes.formControl}>
          <Button  className={classes.button} variant="contained" color="primary" type="submit">
            Signup
          </Button>
          <Link to="/login">Signin</Link>
        </div>
      </form>
    </Container>
  );
};

export default Register;
