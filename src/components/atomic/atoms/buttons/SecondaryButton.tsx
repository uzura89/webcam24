import clsx from "clsx";
import { ComponentProps } from "react";

export const SecondaryButton = ({
  children,
  disabled,
  ...buttonProps
}: ComponentProps<"button">) => {
  return (
    <button
      {...buttonProps}
      className={clsx(
        "w-full rounded-full border-[2px] border-neutral-950 bg-gradient-to-b from-neutral-600 to-neutral-900 p-[1px]",
        "active:from-neutral-900 active:to-neutral-800",
        disabled && "from-neutral-900 to-neutral-800 pointer-events-none"
      )}
    >
      <div
        className={clsx(
          "w-full h-full flex items-center gap-2 justify-center bg-gradient-to-b from-neutral-800 to-neutral-700 rounded-full px-4 py-2 text-sm text-white/90",
          "active:from-neutral-900 active:to-neutral-800 active:opacity-60",
          disabled
            ? "from-neutral-900 to-neutral-800 opacity-50"
            : "opacity-100"
        )}
      >
        {children}
      </div>
    </button>
  );
};
