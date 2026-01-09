"use client";

import { ChevronRight } from "lucide-react";
import { cn } from "~/lib/utils";

interface Props {
  text: string;
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
}

function TextReadMore({ text, isExpanded, setIsExpanded }: Readonly<Props>) {
  return (
    <div className="relative mb-2">
      <p
        className={cn(
          "text-muted-foreground text-sm leading-relaxed",
          !isExpanded && "line-clamp-2",
        )}
      >
        {text}
      </p>
      {!isExpanded && text.length > 150 && (
        <div className="from-card text-muted-foreground absolute right-0 bottom-0 left-0 h-6" />
      )}
      {text.length > 150 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary hover:text-primary/80 group/btn mt-2 flex items-center gap-1 text-sm font-semibold transition-colors"
        >
          {isExpanded ? "Show less" : "Read more"}
          <ChevronRight
            className={cn(
              "h-3.5 w-3.5 transition-transform",
              isExpanded ? "-rotate-90" : "rotate-90",
            )}
          />
        </button>
      )}
    </div>
  );
}

export default TextReadMore;
