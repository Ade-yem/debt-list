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
  tag: {
    type: String,
    enum: ['transfer', 'normal']
  },
  history: {
    type: [String]
  }
  
})

export default mongoose.model("Debt", debtSchema);
