import * as mongoose from 'mongoose';

export const LeadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  userId: String
});