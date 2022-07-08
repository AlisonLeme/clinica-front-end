import { useRouter } from "next/router";
import axios from "axios";
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

import styles from "./FormCadastro.module.css";

const ModalForm = ({ name }) => {
  const router = useRouter();

  const { setSnackBar } = useSnackBar();

  const validationSchema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),

    password: yup
      .string()
      .required("Campo obrigatório")
      .min(8, "Senha muito fraca"),

    confPassword: yup
      .string()
      .required("Campo obrigatório")
      .oneOf([yup.ref("password"), null], "As senhas não conferem"),
  });

  const hanldeFormSubmit = async (values) => {
    const response = await axios.post("/api/funcionario", values);

    if (response.data.success) {
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
    }
  };

  const handleError = () => {
    setSnackBar({
      open: true,
      severity: "error",
      text: "Erro! Tente novamente",
    });
  };

  const handleSuccess = () => {
    setSnackBar({
      open: true,
      severity: "success",
      text: "Cadastro realizado com sucesso!",
    });

    router.push("/user/dashboard");
  };

  return (
    <Formik
      initialValues={{
        name: `${name}`,
        password: "",
        confPassword: "",
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
              >
                <strong>Faça seu cadastro</strong>
              </Typography>

              <Typography
                gutterBottom
                variant="body1"
                component="body1"
                align="center"
                className={styles.msgSpan}
              >
                Nome não encontrado, cadastre-se
              </Typography>

              <FormControl
                className={styles.formControlCadastro}
                error={errors.name && touched.name}
              >
                <InputLabel>Nome</InputLabel>
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

              <FormControl
                className={styles.formControlCadastro}
                error={errors.confPassword && touched.confPassword}
              >
                <InputLabel>Confirmar senha</InputLabel>
                <OutlinedInput
                  name="confPassword"
                  value={values.confPassword}
                  onChange={handleChange}
                  type="password"
                  label="Confirmar senha"
                />
                <FormHelperText>
                  {errors.confPassword && touched.confPassword
                    ? errors.confPassword
                    : null}
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
                  Cadastrar
                </Button>
              )}
            </Box>
          </form>
        );
      }}
    </Formik>
  );
};

export default ModalForm;
