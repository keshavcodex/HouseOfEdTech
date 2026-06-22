import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IResource extends Document {
  title: string;
  url: string;
  type: 'Video' | 'Article' | 'Document' | 'Interactive';
  moduleId: Types.ObjectId;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ResourceSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ['Video', 'Article', 'Document', 'Interactive'],
      default: 'Article',
    },
    moduleId: { type: Schema.Types.ObjectId, ref: 'Module', required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Resource || mongoose.model<IResource>('Resource', ResourceSchema);
