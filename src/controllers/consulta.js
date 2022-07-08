import ConsultasModel from "../models/consulta";
import dbConnect from "../utils/dbConnect";

const post = async (req, res) => {
  await dbConnect();

  const { date, hour } = req.body.values;
  const { _id, name, phone } = req.body.paciente;

  const parsedData = date + "-" + hour;

  const consulta = new ConsultasModel({
    paciente: {
      id: _id,
      name,
      phone,
    },
    date: parsedData,
  });

  const register = await consulta.save();

  if (register) {
    res.status(201).json({ success: true });
  } else {
    res.status(201).json({ success: false });
  }
};

const remove = async (req, res) => {
  await dbConnect();

  const id = req.body.id;

  const deleted = await ConsultasModel.findOneAndRemove({ _id: id });

  if (deleted) {
    return res.status(200).json({ success: true });
  }

  return res.status(500).json({ success: false });
};

const put = async (req, res) => {
  await dbConnect();

  const { id } = req.query;

  const consulta = await ConsultasModel.findById(id);

  const { date, hour } = req.body;

  const parsedData = date + "-" + hour;

  consulta.date = parsedData;

  const update = await consulta.save();

  if (update) {
    res.status(201).json({ success: true });
  } else {
    res.status(201).json({ success: false });
  }
};

export { post, remove, put };
