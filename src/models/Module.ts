import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IModule extends Document {
  title: string;
  content: string;
  learningPathId: Types.ObjectId;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ModuleSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: false },
    learningPathId: { type: Schema.Types.ObjectId, ref: 'LearningPath', required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Module || mongoose.model<IModule>('Module', ModuleSchema);
