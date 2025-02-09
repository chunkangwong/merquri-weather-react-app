import {
  Tooltip as STooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipProps {
  children: React.ReactNode;
  title: string;
}

export function Tooltip({ children, title }: TooltipProps) {
  return (
    <TooltipProvider>
      <STooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{title}</TooltipContent>
      </STooltip>
    </TooltipProvider>
  );
}
