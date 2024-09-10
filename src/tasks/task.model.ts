import { Schema, Document } from 'mongoose';

export interface Task extends Document {
  title: string;
  description: string;
}

export const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});
