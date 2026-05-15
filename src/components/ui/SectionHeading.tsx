import type { CSSProperties, ReactNode } from "react";

type SectionHeadingProps = {
  pageTitle?: string;
  defaultText: string;
  id?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

/** Renders h1 when pageTitle matches document title; otherwise h2 with defaultText. */
export function SectionHeading({
  pageTitle,
  defaultText,
  id,
  className,
  style,
  children,
}: SectionHeadingProps) {
  const text = pageTitle ?? defaultText;
  const Tag = pageTitle ? "h1" : "h2";

  return (
    <Tag id={id} className={className} style={style}>
      {text}
      {children}
    </Tag>
  );
}
