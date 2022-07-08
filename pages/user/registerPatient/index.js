import { Formik } from "formik";
import axios from "axios";
import { useRouter } from "next/router";

import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Typography,
  CircularProgress,
} from "@mui/material";

import TemplateDefault from "../../../src/templates/Default";
import { initialValues, validationSchema } from "./formValues";
import useSnackBar from "../../../src/contexts/SnackBar";

import styles from "./RegisterPatient.module.css";

const RegisterPatient = () => {
  const router = useRouter();

  const { setSnackBar } = useSnackBar();

  const handleFormSubmit = (values) => {
    axios.post("/api/paciente", values).then(handleSuccess).catch(handleError);
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
      text: "Paciente cadastrado com sucesso!",
    });

    router.push("/user/dashboard");
  };

  return (
    <TemplateDefault>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
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
              <Container
                component="section"
                maxWidth="lg"
                className={styles.containerTitle}
              >
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  gutterBottom
                  color={"primary"}
                  className={styles.titlePaciente}
                >
                  Cadastrar Paciente
                </Typography>
              </Container>

              <Container maxWidth="md" className={styles.boxContainer}>
                <Box className={styles.box}>
                  <Typography
                    component="h6"
                    variant="h6"
                    color="primary"
                    gutterBottom
                    className={styles.title}
                  >
                    Nome Paciente
                  </Typography>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={errors.name && touched.name}
                  >
                    <InputLabel>Ex: Alison Leme</InputLabel>
                    <OutlinedInput
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      label="Ex: Alison Leme"
                    ></OutlinedInput>
                    <FormHelperText>
                      {errors.name && touched.name ? errors.name : null}
                    </FormHelperText>
                  </FormControl>

                  <Typography
                    component="h6"
                    variant="h6"
                    color="primary"
                    gutterBottom
                    className={styles.title}
                  >
                    Telefone
                  </Typography>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={errors.phone && touched.phone}
                  >
                    <InputLabel>
                      Digite o telefone do paciente - ex: (99)99999-9999
                    </InputLabel>
                    <OutlinedInput
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      label="Digite o telefone do paciente - ex: (99)99999-9999"
                    />
                    <FormHelperText>
                      {errors.phone && touched.phone ? errors.phone : null}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Container>

              <Container maxWidth="md">
                <Box textAlign="right">
                  {isSubmitting ? (
                    <CircularProgress />
                  ) : (
                    <Button type="submit" variant="contained" color="primary">
                      Cadastrar paciente
                    </Button>
                  )}
                </Box>
              </Container>
            </form>
          );
        }}
      </Formik>
    </TemplateDefault>
  );
};

RegisterPatient.requireAuth = true;

export default RegisterPatient;
