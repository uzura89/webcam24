import clsx from "clsx";
import { ComponentProps } from "react";

export const PrimaryButton = ({
  children,
  disabled,
  ...buttonProps
}: ComponentProps<"button">) => {
  return (
    <button
      {...buttonProps}
      className={clsx(
        "w-full rounded-full border-[2px] border-neutral-950 bg-gradient-to-b from-amber-600/80 to-amber-900 p-[1px]",
        "active:from-amber-950 active:to-amber-900",
        disabled && "from-amber-950 to-amber-900 pointer-events-none"
      )}
    >
      <div
        className={clsx(
          "w-full h-full flex items-center gap-2 justify-center bg-gradient-to-b from-amber-900 to-amber-800 rounded-full px-4 py-2 text-sm text-white/90",
          "active:from-amber-950 active:to-amber-900 active:opacity-60",
          disabled ? "from-amber-950 to-amber-900 opacity-50" : "opacity-100"
        )}
      >
        {children}
      </div>
    </button>
  );
};
