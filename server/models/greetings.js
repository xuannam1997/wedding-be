import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const greetingsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Greetings", greetingsSchema);
