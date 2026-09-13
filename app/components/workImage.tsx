import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
};

/**
 * Uploads live under /uploads, so next/image can optimise them. A work whose
 * image_url was pointed at another host is rendered plainly instead, since
 * next/image would reject an unconfigured domain.
 */
export function WorkImage({ src, alt, className = "", sizes, priority = false }: Props) {
  if (!src.startsWith("/")) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} className={`absolute inset-0 h-full w-full ${className}`} loading="lazy" src={src} />;
  }

  return <Image alt={alt} className={className} fill priority={priority} sizes={sizes} src={src} />;
}
