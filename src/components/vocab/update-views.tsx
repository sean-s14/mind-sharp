"use client";

import { useState } from "react";
import { incrementViews, decrementViews } from "@/app/vocab/actions";
import { getViewColor } from "@/utils/tailwind";
import { TUserWordMeta } from "@/types/userWordMeta";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function UpdateViews({
  userWordMeta,
}: {
  userWordMeta: TUserWordMeta;
}) {
  const { toast } = useToast();
  const [views, setViews] = useState(userWordMeta.views);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenuOpen = () => setMenuOpen((prev) => !prev);

  return (
    <div className="">
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className={`min-w-6 px-1.5 rounded ${getViewColor(views)}`}
              aria-label="view count"
              onClick={toggleMenuOpen}
            >
              {views}
            </button>
          </TooltipTrigger>
          <TooltipContent
            className="dark:bg-zinc-900 dark:text-zinc-100 border border-zinc-700"
            side="right"
          >
            <p>Views</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Increment/Decrement Menu */}
      {menuOpen && (
        <div className="flex flex-col mt-2">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"outline"}
                  className="rounded-none w-6 h-6 p-0"
                  onClick={async () => {
                    const updatedViews = await incrementViews(userWordMeta.id);
                    if ("error" in updatedViews) {
                      toast({
                        title: `Error`,
                        description: updatedViews.error,
                      });
                    } else {
                      setViews(updatedViews.views);
                    }
                  }}
                >
                  +
                </Button>
              </TooltipTrigger>
              <TooltipContent
                className="dark:bg-zinc-900 dark:text-zinc-100 border border-zinc-700"
                side="right"
              >
                <p>Increment</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"outline"}
                  className="rounded-none w-6 h-6 p-0"
                  onClick={async () => {
                    const updatedViews = await decrementViews(userWordMeta.id);
                    if ("error" in updatedViews) {
                      toast({
                        title: `Error`,
                        description: updatedViews.error,
                      });
                    } else {
                      setViews(updatedViews.views);
                    }
                  }}
                >
                  -
                </Button>
              </TooltipTrigger>
              <TooltipContent
                className="dark:bg-zinc-900 dark:text-zinc-100 border border-zinc-700"
                side="right"
              >
                <p>Decrement</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
}
