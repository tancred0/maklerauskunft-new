import type { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300">
      {/* Icon container */}
      <div className="mb-5">
        <div className="w-14 h-14 flex items-center justify-center">
          {icon}
        </div>
      </div>

      {/* Content */}
      <h3 className="text-lg md:text-xl font-semibold text-primary mb-3 leading-tight">
        {title}
      </h3>
      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
