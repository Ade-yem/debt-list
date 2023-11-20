import mongoose, { Schema } from "mongoose";

const priceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})

export default mongoose.model("Price", priceSchema);
