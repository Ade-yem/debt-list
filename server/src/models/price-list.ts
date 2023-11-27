import mongoose, { Schema } from "mongoose";

const priceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  variation: String,
  bulk_price: Number,
  unit_price: Number
})

export default mongoose.model("Price", priceSchema);
