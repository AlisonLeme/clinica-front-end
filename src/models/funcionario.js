import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
  },
});

export default mongoose.models.funcionarios || mongoose.model("funcionarios", schema);