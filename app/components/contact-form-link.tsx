"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { markContactFormIntent } from "./contact-form-nav";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href?: ComponentProps<typeof Link>["href"];
};

/** Client link that opens Contact on the form after navigation. */
export function ContactFormLink({
  href = "/contact#form",
  onClick,
  ...props
}: Props) {
  return (
    <Link
      href={href}
      scroll={false}
      {...props}
      onClick={event => {
        markContactFormIntent();
        onClick?.(event);
      }}
    />
  );
}
