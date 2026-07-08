"use client";

import type { CSSProperties, ReactNode } from "react";

export default function OpenAonikIABtn({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("open-aonikia"))}
      className={className}
      style={style}
    >
      {children}
    </button>
  );
}
