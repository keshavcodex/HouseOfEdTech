import mongoose, { Schema, Document } from 'mongoose';

export interface ILearningPath extends Document {
  title: string;
  description: string;
  subject: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  createdAt: Date;
  updatedAt: Date;
}

const LearningPathSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    subject: { type: String, required: true },
    difficulty: {
      type: String,
      required: true,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
  },
  { timestamps: true }
);

export default mongoose.models.LearningPath ||
  mongoose.model<ILearningPath>('LearningPath', LearningPathSchema);
