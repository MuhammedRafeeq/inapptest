import {
  Button,
  Container,
  createStyles,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { authenticate } from "../redux/actions/auth";
import { useEffect } from "react";

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
      marginRight: 20,
    },
  })
);

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  
  const loginForm = useFormik({
    initialValues: { email: "", password: "" },

    validationSchema: Yup.object().shape({
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      dispatch(authenticate(values));
    },
  });

  useEffect(() => {
    if (isLoggedIn) history.push("/");
  }, [isLoggedIn]);
  return (
    <Container maxWidth="md" className={classes.container}>
      <form className="form" onSubmit={loginForm.handleSubmit}>
        <h1>Login</h1>
        <div className={classes.formControl}>
          <TextField
            id="outlined-basic"
            label="email"
            variant="outlined"
            name="email"
            value={loginForm.values.email}
            onChange={loginForm.handleChange}
            error={Boolean(loginForm.touched.email && loginForm.errors.email)}
            helperText={loginForm.touched.email && loginForm.errors.email}
          />
        </div>
        <div className={classes.formControl}>
          <TextField
            type="password"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            name="password"
            value={loginForm.values.password}
            onChange={loginForm.handleChange}
            error={Boolean(
              loginForm.touched.password && loginForm.errors.password
            )}
            helperText={loginForm.touched.password && loginForm.errors.password}
          />
        </div>
        <div className={classes.formControl}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
          >
            Login
          </Button>
          <Link to="/register">Signup</Link>
        </div>
      </form>
    </Container>
  );
};

export default Login;
