
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface PageHeroProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function PageHero({ title, description, icon }: PageHeroProps) {
  return (
    <div className="bg-linear-to-br from-primary to-primary/70 text-primary-foreground">
      <div className="container mx-auto px-4 py-10 sm:py-14">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-primary-foreground/40" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-primary-foreground font-medium">
                {title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30 shrink-0">
            {icon}
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {title}
            </h1>
            <p className="text-primary-foreground/80 mt-1">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
