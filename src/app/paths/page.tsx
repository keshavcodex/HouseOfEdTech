import { getLearningPaths } from "@/actions/learningPaths";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Compass, BookOpen, Clock, Plus } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function PathsPage() {
  const paths = await getLearningPaths();

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Explore Paths</h1>
          <p className="text-muted-foreground text-lg">
            Discover curated learning paths or build your own.
          </p>
        </div>
        <Link href="/paths/new">
          <Button className="rounded-full px-6 cursor-pointer">
            <Plus className="h-5 w-2 mr-1" />
            Create Path
          </Button>
        </Link>
      </div>

      {paths.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-16 text-center border border-dashed rounded-3xl bg-muted/30">
          <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Compass className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-bold mb-2">No paths found</h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            There are currently no learning paths available. Be the first to create one and share your knowledge!
          </p>
          <Link href="/paths/new">
            <Button className="cursor-pointer">Create Your First Path</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paths.map((path: any) => (
            <Card key={path._id} className="flex flex-col hover:border-primary/50 transition-colors group">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium 
                    ${path.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      path.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                    {path.difficulty}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium px-2 py-1 bg-muted rounded-md">
                    {path.subject}
                  </span>
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors line-clamp-1">{path.title}</CardTitle>
                <CardDescription className="line-clamp-2 mt-2">
                  {path.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex items-center text-sm text-muted-foreground gap-4">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>Modules</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(path.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/paths/${path._id}`} className="w-full">
                  <Button variant="secondary" className="w-full cursor-pointer">View Path</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
