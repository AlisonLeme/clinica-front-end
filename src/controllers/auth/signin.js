import FuncionarioModel from "../../models/funcionario";
import dbConnect from "../../utils/dbConnect";
import { compare } from "../../utils/password";

const post = async (req, res) => {
  const { name, password } = req.body;

  await dbConnect();

  const funcionario = await FuncionarioModel.findOne({ name });

  if (!funcionario) {
    return res.status(401).json({ success: false, message: "invalid" });
  }

  const passIsCorrect = await compare(password, funcionario.password);

  if (passIsCorrect) {
    return res.status(200).json({
      id: funcionario._id,
      name: funcionario.name,
    });
  }

  return res.status(401).json({ success: false, message: "invalid" });
};

export { post };
