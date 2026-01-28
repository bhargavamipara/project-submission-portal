import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  gradient?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning';
  className?: string;
}

const gradientClasses = {
  primary: 'gradient-primary',
  secondary: 'gradient-secondary',
  accent: 'gradient-accent',
  success: 'gradient-success',
  warning: 'gradient-warning',
};

export function StatsCard({
  title,
  value,
  icon,
  description,
  gradient = 'primary',
  className,
}: StatsCardProps) {
  return (
    <Card className={cn('card-shadow hover:card-shadow-lg transition-shadow', className)}>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              'flex h-14 w-14 items-center justify-center rounded-xl text-white shrink-0',
              gradientClasses[gradient]
            )}
          >
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-muted-foreground truncate">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
