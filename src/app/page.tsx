import Link from "next/link";
import { ArrowRight, BookOpen, Layers, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20 px-4 py-20 text-center">
      <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
          Design your ideal{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
            Learning Path
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          House of Edtech empowers educators to build structured, engaging courses. Combine videos, articles, and interactive resources into a seamless learning experience for your students.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/paths/new" className="w-full sm:w-auto">
            <Button size="lg" className="rounded-full px-8 w-full h-14 text-base shadow-lg shadow-primary/20 transition-all hover:scale-105 cursor-pointer">
              Start Building <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/paths" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="rounded-full px-8 w-full h-14 text-base transition-all hover:bg-muted cursor-pointer">
              Explore Paths
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-8 max-w-5xl mt-32 w-full">
        <FeatureCard
          icon={<Layers className="h-10 w-10 text-primary" />}
          title="Structured Modules"
          description="Organize your curriculum into logical steps and modules, making it easier for students to follow."
        />
        <FeatureCard
          icon={<BookOpen className="h-10 w-10 text-primary" />}
          title="Rich Resources"
          description="Attach videos, articles, and documents. Create a centralized hub for all learning materials."
        />
        <FeatureCard
          icon={<Users className="h-10 w-10 text-primary" />}
          title="Impactful Outcomes"
          description="Transform the way you teach. Move beyond basic lists and create deeply engaging courses."
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="group flex flex-col items-center text-center p-8 rounded-3xl bg-card border border-border/50 shadow-sm transition-all hover:shadow-md hover:border-primary/20 hover:-translate-y-1">
      <div className="mb-5 p-4 rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
