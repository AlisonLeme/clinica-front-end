import PacienteModel from "../models/paciente";
import dbConnect from "../utils/dbConnect";

const post = async (req, res) => {
  const { name } = req.body;

  await dbConnect();

  const paciente = await PacienteModel.findOne({ name });

  if (!paciente) {
    return res.status(200).json({ success: false, message: "invalid" });
  }

  return res.status(200).json({ success: true, message: "success", paciente });
};

export { post };
