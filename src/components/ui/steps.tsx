import { cn } from "@/lib/utils";

interface StepsProps {
  currentStep: number;
  className?: string;
  steps: Array<{
    title: string;
    description: string;
  }>;
}

export function Steps({ currentStep, className, steps }: StepsProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      {steps.map((step, index) => (
        <Step
          key={index}
          title={step.title}
          completed={index < currentStep}
          current={index === currentStep}
        />
      ))}
    </div>
  );
}

interface StepProps {
  title: string;
  completed?: boolean;
  current?: boolean;
}

export function Step({ title, completed, current }: StepProps) {
  return (
    <div className="flex items-center">
      <div
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full border-2",
          {
            "border-primary bg-primary text-primary-foreground": completed || current,
            "border-gray-300": !completed && !current,
            "bg-primary": completed,
            "bg-background": current,
          }
        )}
      >
        {completed ? (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <span className={cn(
            "text-sm font-medium",
            current ? "text-primary" : "text-gray-500"
          )}>
            {title[0]}
          </span>
        )}
      </div>
      <span
        className={cn(
          "ml-2 text-sm font-medium",
          current ? "text-primary" : "text-gray-500"
        )}
      >
        {title}
      </span>
    </div>
  );
}