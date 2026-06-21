import { Sparkle } from "./ui/brand";

export function Logo({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const word =
    size === "lg"
      ? "text-3xl md:text-4xl"
      : size === "sm"
        ? "text-lg"
        : "text-xl md:text-2xl";
  const sub =
    size === "lg" ? "text-[0.65rem]" : "text-[0.5rem] md:text-[0.55rem]";

  return (
    <span className="inline-flex select-none flex-col items-center leading-none">
      <span className="relative inline-flex items-start">
        <span
          className={`text-gold-gradient shimmer-gold font-display font-semibold tracking-[0.16em] ${word}`}
        >
          SILKORA
        </span>
        <Sparkle className="ml-0.5 mt-0.5 h-2.5 w-2.5 text-gold-light animate-twinkle" />
      </span>
      <span
        className={`mt-1.5 flex items-center gap-2 tracking-[0.5em] text-gold/80 ${sub}`}
      >
        <span className="h-px w-4 bg-gold/50" />
        TRAVEL
        <span className="h-px w-4 bg-gold/50" />
      </span>
    </span>
  );
}
