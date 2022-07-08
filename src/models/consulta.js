import mongoose from "mongoose";

const schema = new mongoose.Schema({
  paciente: {
    id: String,
    name: String,
    phone: String,
  },
  date: {
    type: String,
  },
});

export default mongoose.models.consultas || mongoose.model("consultas", schema);
