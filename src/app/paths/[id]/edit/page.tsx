'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { getLearningPathById, updateLearningPath } from '@/actions/learningPaths';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function EditPathPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    async function fetchPath() {
      const data = await getLearningPathById(id);
      if (data) {
        setInitialData(data);
      } else {
        router.push('/paths');
      }
    }
    fetchPath();
  }, [id, router]);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    
    const result = await updateLearningPath(id, formData);
    
    if (!result.success) {
      setError(result.error as string);
      setLoading(false);
    } else {
      router.push(`/paths/${id}`);
    }
  }

  if (!initialData) {
    return (
      <div className="flex justify-center items-center py-32">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8">
        <Link href={`/paths/${id}`}>
          <Button variant="ghost" className="mb-4 -ml-4 text-muted-foreground hover:text-foreground cursor-pointer">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Path
          </Button>
        </Link>
        <h1 className="text-4xl font-extrabold tracking-tight">Edit Learning Path</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Update the details of your educational journey.
        </p>
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle>Path Details</CardTitle>
          <CardDescription>Modify the foundational information below.</CardDescription>
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
                defaultValue={initialData.title}
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
                defaultValue={initialData.subject}
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
                defaultValue={initialData.difficulty}
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
                defaultValue={initialData.description}
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
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
