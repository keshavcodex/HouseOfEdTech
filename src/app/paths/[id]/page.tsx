import { getLearningPathById, deleteLearningPath } from "@/actions/learningPaths";
import { getModulesForPath } from "@/actions/modules";
import AICurriculumGenerator from "./AICurriculumGenerator";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit, Trash2, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function PathDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const path = await getLearningPathById(id);

  if (!path) {
    notFound();
  }

  const modules = await getModulesForPath(id);

  // Define Server Action for deleting this specific path
  async function handleDelete() {
    'use server';
    const res = await deleteLearningPath(id);
    if (res.success) {
      redirect('/paths');
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href="/paths">
        <Button variant="ghost" className="mb-8 -ml-4 text-muted-foreground hover:text-foreground cursor-pointer">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Paths
        </Button>
      </Link>

      <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium 
                ${path.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                  path.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : 
                  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                {path.difficulty}
              </span>
              <span className="text-sm text-muted-foreground font-medium px-3 py-1 bg-muted rounded-full">
                {path.subject}
              </span>
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">{path.title}</h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {path.description}
            </p>

            <div className="flex items-center text-sm text-muted-foreground gap-6 border-t border-border/50 pt-6 mt-6">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span>{modules.length} Modules attached</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Created {new Date(path.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-row md:flex-col gap-3 min-w-[140px]">
            <Link href={`/paths/${path._id}/edit`} className="w-full">
              <Button variant="default" className="w-full cursor-pointer">
                <Edit className="h-4 w-4 mr-2" />
                Edit Path
              </Button>
            </Link>
            <form action={handleDelete} className="w-full">
              <Button type="submit" variant="destructive" className="w-full cursor-pointer">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </form>
          </div>
        </div>
      </div>

      {modules.length > 0 ? (
        <div className="mt-12 space-y-4">
          <h2 className="text-2xl font-bold mb-6">Curriculum</h2>
          {modules.map((mod: any, i: number) => (
            <div key={mod._id} className="p-6 bg-card border border-border/50 rounded-2xl flex items-center shadow-sm">
              <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mr-4 shrink-0">
                {i + 1}
              </div>
              <div>
                <h3 className="text-lg font-bold">{mod.title}</h3>
                {mod.content && (
                  <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                    {mod.content}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-12">
          <AICurriculumGenerator 
            pathId={path._id} 
            pathTitle={path.title} 
            pathDescription={path.description} 
            pathDifficulty={path.difficulty} 
          />
        </div>
      )}
    </div>
  );
}
