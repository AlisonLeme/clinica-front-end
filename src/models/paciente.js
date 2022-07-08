import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
});

export default mongoose.models.pacientes || mongoose.model("pacientes", schema);
