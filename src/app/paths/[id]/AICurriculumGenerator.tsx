'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateCurriculum } from '@/actions/ai';
import { bulkCreateModules } from '@/actions/modules';
import { Loader2, Sparkles, Bot, CheckCircle } from 'lucide-react';

interface Props {
  pathId: string;
  pathTitle: string;
  pathDescription: string;
  pathDifficulty: string;
}

export default function AICurriculumGenerator({ pathId, pathTitle, pathDescription, pathDifficulty }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // 1. Generate with AI
      const aiResult = await generateCurriculum(pathTitle, pathDescription, pathDifficulty);
      
      if (!aiResult.success || !aiResult.data) {
        throw new Error(aiResult.error || "Failed to generate curriculum from AI");
      }

      // 2. Save modules to DB
      const saveResult = await bulkCreateModules(pathId, aiResult.data);
      
      if (!saveResult.success) {
        throw new Error(saveResult.error || "Failed to save generated modules");
      }

      setSuccess(true);
      router.refresh();
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return null; // Will unmount itself or get replaced by the fetched modules anyway
  }

  return (
    <Card className="border-border/50 shadow-sm mt-8 bg-primary/5 border-primary/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-xl text-primary">
          <Bot className="h-6 w-6 mr-2" />
          Generate Curriculum
        </CardTitle>
        <CardDescription className="text-base">
          Looks like this path doesn't have any modules yet. Let Gemini instantly draft a complete, step-by-step curriculum outline based on your path details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}
        <Button 
          type="button" 
          size="lg"
          onClick={handleGenerate} 
          disabled={loading}
          className="sm:w-auto w-full whitespace-nowrap"
        >
          {loading ? (
            <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing & Generating...</>
          ) : (
            <><Sparkles className="mr-2 h-5 w-5" /> Auto-Generate Curriculum</>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
