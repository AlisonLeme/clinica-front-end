import { useRouter } from "next/router";
import { Formik } from "formik";
import * as yup from "yup";
import { signIn } from "next-auth/react";

import useSnackBar from "../../contexts/SnackBar";

import {
  Button,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  Box,
  OutlinedInput,
  CircularProgress,
} from "@mui/material";

import styles from "./FormLogin.module.css";

const ModalLogin = ({ name }) => {
  const router = useRouter();

  const { setSnackBar } = useSnackBar();

  const validationSchema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),

    password: yup.string().required("Campo obrigatório"),
  });

  const hanldeFormSubmit = async (values) => {
    await signIn("credentials", {
      name: values.name,
      password: values.password,
      redirect: false,
    }).then(async ({ error }) => {
      if (error) {
        handleError();
      } else {
        handleSuccess();
      }
    });
  };

  const handleError = () => {
    setSnackBar({
      open: true,
      severity: "error",
      text: "nome ou senha inválidos",
    });
    console.log(erro);
  };

  const handleSuccess = () => {
    setSnackBar({
      open: true,
      severity: "success",
      text: "Login realizado com sucesso!",
    });
    router.push("/user/dashboard");
  };

  return (
    <Formik
      initialValues={{
        name: `${name}`,
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={hanldeFormSubmit}
    >
      {({
        touched,
        values,
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Box className={styles.boxForm}>
              <Typography
                gutterBottom
                variant="h3"
                component="h3"
                align="center"
                color={"primary"}
              >
                <strong>Fazer Login</strong>
              </Typography>

              <Typography
                gutterBottom
                variant="body1"
                component="body1"
                align="center"
                className={styles.msgSpan}
                color="primary"
              >
                Nome encontrado, faça login
              </Typography>

              <FormControl
                className={styles.formControlCadastro}
                error={errors.name && touched.name}
              >
                <InputLabel>name</InputLabel>
                <OutlinedInput
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  label="name"
                />
                <FormHelperText>
                  {errors.name && touched.name ? errors.name : null}
                </FormHelperText>
              </FormControl>

              <FormControl
                className={styles.formControlCadastro}
                error={errors.password && touched.password}
              >
                <InputLabel>Senha</InputLabel>
                <OutlinedInput
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  type="password"
                  label="Senha"
                />
                <FormHelperText>
                  {errors.password && touched.password ? errors.password : null}
                </FormHelperText>
              </FormControl>

              {isSubmitting ? (
                <CircularProgress />
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  endIcon={""}
                  className={styles.btnCadastrar}
                >
                  Entrar
                </Button>
              )}
            </Box>
          </form>
        );
      }}
    </Formik>
  );
};

export default ModalLogin;
