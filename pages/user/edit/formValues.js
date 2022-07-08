import * as yup from "yup";

const initialValues = {
  date: "",
  hour: "",
};

const validationSchema = yup.object().shape({
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
