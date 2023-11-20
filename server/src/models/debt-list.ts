import mongoose, { Schema } from "mongoose";

const debtSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  amount_paid: {
    type: Number,
    required: true
  },
  paid: {
    type: Boolean,
    required: true
  },
  written_by: {
    type: String,
    required: true
  },
  comment: {
    type: String,
  },
  
})

export default mongoose.model("Debt", debtSchema);
