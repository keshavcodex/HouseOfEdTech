'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createLearningPath } from '@/actions/learningPaths';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';
export default function NewPathPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Controlled form state
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [description, setDescription] = useState('');

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    const result = await createLearningPath(formData);

    if (!result.success) {
      setError(result.error as string);
      setLoading(false);
    } else {
      router.push(`/paths/${result.pathId}`);
    }
  }

  function handleDemoFill() {
    setTitle('Advanced React Patterns');
    setSubject('Web Development');
    setDifficulty('Advanced');
    setDescription('Learn how to build scalable and performant React applications using advanced patterns like Compound Components, Render Props, and Custom Hooks.');
  }
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8">
        <Link href="/paths">
          <Button variant="ghost" className="mb-4 -ml-4 text-muted-foreground hover:text-foreground cursor-pointer">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Paths
          </Button>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Create Learning Path</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Design a new educational journey for your students.
            </p>
          </div>
          <Button type="button" variant="outline" onClick={handleDemoFill} className="shrink-0 text-primary border-primary/20 hover:bg-primary/10">
            <Sparkles className="h-4 w-4 mr-2" />
            Fill Demo Data
          </Button>
        </div>
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle>Path Details</CardTitle>
          <CardDescription>Fill in the foundational information for this course.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Introduction to Next.js 16"
                required
                minLength={3}
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject Area <span className="text-red-500">*</span></Label>
              <Input
                id="subject"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Web Development"
                required
                minLength={2}
                maxLength={50}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty Level <span className="text-red-500">*</span></Label>
              <select
                id="difficulty"
                name="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
              <Textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe what students will learn..."
                className="min-h-[120px]"
                required
                minLength={10}
                maxLength={500}
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-border/50">
              <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Learning Path'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
