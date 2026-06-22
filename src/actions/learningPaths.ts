'use server';

import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/mongodb';
import LearningPath from '@/models/LearningPath';
import Module from '@/models/Module';
import Resource from '@/models/Resource';
import { z } from 'zod';

const LearningPathSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  description: z.string().min(10, "Description must be at least 10 characters").max(500),
  subject: z.string().min(2, "Subject must be at least 2 characters").max(50),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
});

export async function getLearningPaths() {
  await dbConnect();
  try {
    const paths = await LearningPath.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(paths));
  } catch (error) {
    console.error('Failed to fetch learning paths:', error);
    return [];
  }
}

export async function getLearningPathById(id: string) {
  await dbConnect();
  try {
    const path = await LearningPath.findById(id).lean();
    return JSON.parse(JSON.stringify(path));
  } catch (error) {
    console.error(`Failed to fetch learning path with id ${id}:`, error);
    return null;
  }
}

export async function createLearningPath(formData: FormData) {
  await dbConnect();
  
  const rawData = {
    title: formData.get('title'),
    description: formData.get('description'),
    subject: formData.get('subject'),
    difficulty: formData.get('difficulty'),
  };

  const validation = LearningPathSchema.safeParse(rawData);

  if (!validation.success) {
    return { success: false, error: validation.error.issues[0].message };
  }

  try {
    const newPath = new LearningPath(validation.data);
    const savedPath = await newPath.save();
    revalidatePath('/');
    revalidatePath('/paths');
    return { success: true, pathId: savedPath._id.toString() };
  } catch (error) {
    console.error('Failed to create learning path:', error);
    return { success: false, error: 'Database error occurred while creating learning path.' };
  }
}

export async function updateLearningPath(id: string, formData: FormData) {
  await dbConnect();

  const rawData = {
    title: formData.get('title'),
    description: formData.get('description'),
    subject: formData.get('subject'),
    difficulty: formData.get('difficulty'),
  };

  const validation = LearningPathSchema.safeParse(rawData);

  if (!validation.success) {
    return { success: false, error: validation.error.issues[0].message };
  }

  try {
    await LearningPath.findByIdAndUpdate(id, validation.data);
    revalidatePath(`/paths/${id}`);
    revalidatePath('/paths');
    return { success: true };
  } catch (error) {
    console.error(`Failed to update learning path ${id}:`, error);
    return { success: false, error: 'Database error occurred while updating learning path.' };
  }
}

export async function deleteLearningPath(id: string) {
  await dbConnect();
  try {
    await LearningPath.findByIdAndDelete(id);
    const modules = await Module.find({ learningPathId: id });
    const moduleIds = modules.map(m => m._id);
    await Module.deleteMany({ learningPathId: id });
    await Resource.deleteMany({ moduleId: { $in: moduleIds } });

    revalidatePath('/');
    revalidatePath('/paths');
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete learning path ${id}:`, error);
    return { success: false, error: 'Database error occurred while deleting learning path.' };
  }
}
