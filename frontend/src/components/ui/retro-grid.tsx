import { cn } from "@/lib/utils";

export default function RetroGrid({
  className,
  angle = 160,
}: {
  className?: string;
  angle?: number;
}) {
  return (
    <div
      className={cn(
        "absolute size-full overflow-hidden bg-opacity-100 [perspective:100px] ",
        className,
      )}
      style={{ "--grid-angle": `${angle}deg` } as React.CSSProperties}
    >
      {/* Grid */}
      <div className="absolute inset-0  [transform:rotateX(var(--grid-angle))]">
        <div
          className={cn(
            "animate-grid",
            "[background-repeat:repeat] [background-size:6px_60px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]",
            // Light Styles
            "[background-image:linear-gradient(to_right,rgba(0,0,0,0.8)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.8)_1px,transparent_0)]",
            // Dark Styles
            "dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.4)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.4)_1px,transparent_0)]",
          )}
        />
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black  to-90% dark:from-black" />
    </div>
  );
}
