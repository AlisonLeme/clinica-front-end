import { useState } from "react";
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
import { difference } from "../../../src/utils/dateDifference";

import styles from "./RegisterQuery.module.css";

const RegisterQuery = () => {
  const router = useRouter();

  const { setSnackBar } = useSnackBar();
  const [status, setStatus] = useState(false);

  const handleFormSubmit = async (values) => {
    const res = await axios.post("/api/verifyPatient", values);

    if (res.data.success) {
      const data = new Date();
      const dia = String(data.getDate()).padStart(2, "0");
      const mes = String(data.getMonth() + 1).padStart(2, "0");
      const ano = data.getFullYear();
      const dataAtual = `${ano}/${mes}/${dia}`;
      const formatDate = values.date.split("/").reverse().join("/");

      const date1 = new Date(dataAtual);
      const date2 = new Date(formatDate);
      const timeDifference = difference(date1, date2);

      const hour = parseInt(values.hour.substr(0, 2));

      const newValues = {
        values,
        paciente: res.data.paciente,
      };

      setStatus(true);

      if (timeDifference < 0) {
        setSnackBar({
          open: true,
          severity: "error",
          text: "Erro! Data da consulta inválida.",
        });
        setStatus(false);
      }

      if (hour < 7 || hour > 17) {
        setSnackBar({
          open: true,
          severity: "error",
          text: "Erro! Hora da consulta inválida.",
        });
        setStatus(false);
      }

      if (status) {
        axios
          .post("/api/consulta", newValues)
          .then(handleSuccess)
          .catch(handleError);
      }
    } else {
      setSnackBar({
        open: true,
        severity: "error",
        text: "Erro! Paciente não encontrado no sistema.",
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
      text: "Consulta cadastrada com sucesso!",
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
                  Cadastrar Consulta
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
                    <InputLabel>Ex: Pedro</InputLabel>
                    <OutlinedInput
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      label="Ex: Pedro"
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
                    Data
                  </Typography>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={errors.date && touched.date}
                  >
                    <InputLabel>Digite a data ex: 22/09/2022</InputLabel>
                    <OutlinedInput
                      name="date"
                      value={values.date}
                      onChange={handleChange}
                      label="Digite a data ex: 22/09/2022"
                      gutterBottom
                    />
                    <FormHelperText>
                      {errors.date && touched.date ? errors.date : null}
                    </FormHelperText>
                  </FormControl>

                  <Typography
                    component="h6"
                    variant="h6"
                    color="primary"
                    gutterBottom
                    className={styles.title}
                  >
                    Hora
                  </Typography>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={errors.hour && touched.hour}
                  >
                    <InputLabel>Digite a hora ex: 08:30</InputLabel>
                    <OutlinedInput
                      name="hour"
                      value={values.hour}
                      onChange={handleChange}
                      label="Digite a hora ex: 08:30"
                      gutterBottom
                    />
                    <FormHelperText>
                      {errors.hour && touched.hour ? errors.hour : null}
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
                      Cadastrar Consulta
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

RegisterQuery.requireAuth = true;

export default RegisterQuery;
