import * as yup from "yup";

const FormValues = () => {
  return <></>;
};

const initialValues = {
  name: "",
  date: "",
  hour: "",
};

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(6, "Escreva um nome maior")
    .max(30, "Nome muito grande")
    .required("Campo obrigatório"),

  date: yup
    .string()
    .min(10, "Data inválida")
    .max(10, "Data inválida")
    .required("Campo obrigatório"),

  hour: yup
    .string()
    .min(5, "Hora inválida")
    .max(5, "Hora inválida")
    .required("Campo obrigatório"),
});

export { initialValues, validationSchema };

export default FormValues;
