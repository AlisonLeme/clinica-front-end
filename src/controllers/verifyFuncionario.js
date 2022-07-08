import FuncionarioModel from "../models/funcionario";
import dbConnect from "../utils/dbConnect";

const post = async (req, res) => {
  const { name } = req.body;

  await dbConnect();

  const funcionario = await FuncionarioModel.findOne({ name });

  if (!funcionario) {
    return res.status(200).json({ success: false, message: "invalid" });
  }

  return res.status(200).json({ success: true, message: "success" });
};

export { post };
