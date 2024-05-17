import * as mongoose from 'mongoose';

export const LeadSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  userId: { type: String, required: true }
});
