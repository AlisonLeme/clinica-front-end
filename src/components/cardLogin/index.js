import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  FormControl,
  Input,
  FormHelperText,
  InputLabel,
  CircularProgress,
} from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import ModalForm from "../modalForm";

import styles from "./Card.module.css";

const CardLogin = ({ title }) => {
  const [open, setOpen] = useState(false);
  const [isSuccess, SetIsSuccess] = useState();

  const handleModalOpen = async (values) => {
    const res = await axios.post("/api/verifyFuncionario", values);

    if (res.data.success) {
      SetIsSuccess(true);
    } else {
      SetIsSuccess(false);
    }

    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Campo obrigatório"),
  });

  return (
    <Formik
      initialValues={{
        name: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleModalOpen}
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
            <Card sx={{ maxWidth: 500, height: 480 }} className={styles.card}>
              <CardContent className={styles.cardContent}>
                <Typography
                  gutterBottom
                  variant="h3"
                  component="div"
                  color={"primary"}
                  textAlign="center"
                >
                  {title}
                </Typography>
                <FormControl
                  fullWidth
                  className={styles.formName}
                  error={errors.name}
                >
                  <InputLabel>Nome</InputLabel>
                  <Input
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                  <FormHelperText>{errors.name}</FormHelperText>
                </FormControl>
              </CardContent>
              <CardActions>
                {isSubmitting ? (
                  <CircularProgress />
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    className={styles.btn}
                    endIcon={<ArrowForwardIcon />}
                    disabled={values.name == "" || errors.name ? true : false}
                  >
                    Continuar
                  </Button>
                )}
              </CardActions>
            </Card>
            <ModalForm
              open={open}
              handleModalClose={handleModalClose}
              name={values.name}
              isSuccess={isSuccess}
            />
          </form>
        );
      }}
    </Formik>
  );
};

export default CardLogin;
