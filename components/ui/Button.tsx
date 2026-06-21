import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type Variant = "gold" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-[0.16em] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-[0.7rem]",
  lg: "px-8 py-4 text-xs",
};

const variants: Record<Variant, string> = {
  gold: "bg-gold-gradient text-ink hover:brightness-110 hover:shadow-[0_10px_34px_-8px_rgba(212,175,55,0.55)]",
  outline:
    "border border-gold/40 text-gold hover:border-gold hover:bg-gold/10",
  ghost: "text-white/80 hover:text-gold",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsAnchor = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

export function Button(props: ButtonAsButton | ButtonAsAnchor) {
  const variant = props.variant ?? "gold";
  const size = props.size ?? "md";
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${props.className ?? ""}`;

  if ("href" in props && props.href !== undefined) {
    const { variant: _v, size: _s, className: _c, ...rest } = props;
    void _v;
    void _s;
    void _c;
    return <a className={cls} {...rest} />;
  }

  const { variant: _v, size: _s, className: _c, ...rest } = props;
  void _v;
  void _s;
  void _c;
  return <button className={cls} {...rest} />;
}
