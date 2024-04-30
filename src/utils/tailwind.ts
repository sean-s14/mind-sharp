export const getViewColor = (views: number) => {
  let color = "";

  if (views > 2) {
    color = "bg-cyan-400";
  } else if (views > 1) {
    color = "bg-emerald-400";
  } else if (views > 0) {
    color = "bg-amber-400";
  } else {
    color = "bg-zinc-300 dark:bg-zinc-600";
  }

  if (views > 0) {
    color += " text-zinc-800 font-bold";
  }

  return color;
};
