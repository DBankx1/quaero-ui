import Image from "next/image";

export function Logo({
  small,
  icon,
  inline = true,
  src = "/api/logo",
}: Readonly<{
  small?: boolean;
  icon?: boolean;
  inline?: boolean;
  src?: string;
}>) {
  return (
    <h3 className={`${inline && "inline"}`}>
      <strong>
        {icon ? (
          <Image
            className="mx-auto w-9 dark:invert"
            alt="Quaero"
            title="Quaero"
            src={`${src}?type=icon`}
          />
        ) : (
          <Image
            className={`${small ? "h-4 w-auto" : "h-5 w-auto"},dark:invert`}
            alt="Quaero"
            title="Quaero"
            src={src}
          />
        )}
      </strong>
    </h3>
  );
}
