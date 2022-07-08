import dbConnect from "../utils/dbConnect";
import PacienteModel from "../models/paciente";

const post = async (req, res) => {
  const { name, phone } = req.body;

  await dbConnect();

  const paciente = new PacienteModel({
    name,
    phone,
  });
  paciente.save();

  res.status(201).json({
    success: true,
  });
};

export { post };
