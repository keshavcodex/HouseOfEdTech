'use server';

import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/mongodb';
import Module from '@/models/Module';

export async function getModulesForPath(learningPathId: string) {
  await dbConnect();
  try {
    const modules = await Module.find({ learningPathId }).sort({ order: 1 }).lean();
    return JSON.parse(JSON.stringify(modules));
  } catch (error) {
    console.error(`Failed to fetch modules for path ${learningPathId}:`, error);
    return [];
  }
}

export async function bulkCreateModules(learningPathId: string, modulesData: { title: string, content: string }[]) {
  await dbConnect();
  try {
    // Delete existing modules if we are completely replacing curriculum
    // But since this is a generation, we'll assume we start fresh or append.
    // To be safe, if we generate curriculum, let's just append or create them.
    // Usually AI generation is done once, so we just append.
    
    // Find highest order to append
    const existing = await Module.find({ learningPathId }).sort({ order: -1 }).limit(1);
    let startOrder = existing.length > 0 ? existing[0].order + 1 : 1;

    const moduleDocs = modulesData.map((mod, index) => ({
      title: mod.title,
      content: mod.content,
      learningPathId,
      order: startOrder + index
    }));

    await Module.insertMany(moduleDocs);
    
    revalidatePath(`/paths/${learningPathId}`);
    return { success: true };
  } catch (error) {
    console.error('Failed to bulk create modules:', error);
    return { success: false, error: 'Database error occurred while saving modules.' };
  }
}
