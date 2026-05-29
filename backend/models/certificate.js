const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  user: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "User",
   default: null,
},
  name: { type: String, required: true },
  email: { type: String, required: true },
  domain: { type: String, required: true },
  certificateId: { type: String, required: true, unique: true, uppercase: true },
  issueDate: { type: Date, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },


  downloads: { type: Number, default: 0 },
  verified: {
  type: Number,
  default: 0,
},
  status: { type: String, default: "valid" }
}, { timestamps: true });

module.exports = mongoose.model("Certificate", certificateSchema);