import dbConnect from "../utils/dbConnect";
import FuncionarioModel from "../models/funcionario";
import { crypto } from "../utils/password";

const post = async (req, res) => {
  const { name, password } = req.body;

  await dbConnect();

  const passwordCrypto = await crypto(password);

  const funcionario = new FuncionarioModel({
    name,
    password: passwordCrypto,
  });
  funcionario.save();

  res.status(201).json({
    success: true,
  });
};

export { post };
