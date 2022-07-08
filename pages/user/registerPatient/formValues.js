import * as yup from "yup";

const initialValues = {
  name: "",
  phone: "",
};

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(6, "Escreva um nome maior")
    .max(30, "Nome muito grande")
    .required("Campo obrigatório"),

  phone: yup.number().required("Campo obrigatório"),
});

export { initialValues, validationSchema };
