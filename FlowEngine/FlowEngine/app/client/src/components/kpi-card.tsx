import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: "primary" | "success" | "warning" | "info";
}

const colorClasses = {
  primary: "bg-primary bg-opacity-10 text-primary",
  success: "bg-success bg-opacity-10 text-success",
  warning: "bg-warning bg-opacity-10 text-warning", 
  info: "bg-info bg-opacity-10 text-info",
};

export default function KpiCard({ title, value, icon: Icon, color }: KpiCardProps) {
  return (
    <Card className="kpi-card hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-center">
          <div className={cn("p-3 rounded-full mr-4", colorClasses[color])}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-secondary-color text-sm font-medium mb-1" data-testid={`text-kpi-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
              {title}
            </p>
            <h3 className={cn("text-2xl font-bold", {
              "text-primary": color === "primary",
              "text-success": color === "success", 
              "text-warning": color === "warning",
              "text-info": color === "info",
            })} data-testid={`text-kpi-value-${title.toLowerCase().replace(/\s+/g, '-')}`}>
              {value}
            </h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
