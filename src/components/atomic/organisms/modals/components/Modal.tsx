import React, { ReactNode, useEffect, useRef, useState } from "react";

import { useClickOutsideEffect } from "@/modules/hooks/useClickOutsideEffect";

import { FaXmark } from "react-icons/fa6";

interface Props {
  visible: boolean;
  width: string;
  closeModal: () => void;
  children: ReactNode;
  alignTop?: boolean;
  coverAllMobile?: boolean;
  disableOverlayClick?: boolean;
  title?: string;
}

export function Modal(props: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  const onClickOutside = () => {
    if (!props.disableOverlayClick) {
      setTimeout(() => {
        props.closeModal();
      }, 100);
    }
  };

  useEffect(() => {
    if (props.visible) {
      document.body.setAttribute("style", "overflow: hidden;");
      overlayRef!.current!.scrollTo(0, 0);
    } else {
      document.body.setAttribute("style", "overflow: auto;");
    }
  }, [props.visible]);

  useClickOutsideEffect(windowRef, onClickOutside, props.visible);

  return (
    <div
      ref={overlayRef}
      className={`h-[100vh] w-[100vw] fixed left-0 top-0 bg-black/60 transition-all duration-200 ease-in-out z-20 overflow-y-scroll px-4 ${
        props.visible
          ? "opacity-100 !pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Window Wrapper */}
      <div
        className={`py-12 min-h-full flex flex-col items-center ${
          props.alignTop ? "justify-start" : "justify-center"
        }`}
      >
        {/* Window */}
        <div
          className={`background rounded-lg transition-all duration-200 w-full ${
            props.visible
              ? "opacity-1 translate-y-0"
              : "opacity-0 translate-y-5"
          }`}
          style={{ width: props.width, maxWidth: "100%" }}
          ref={windowRef}
        >
          <div
            onClick={props.closeModal}
            className="z-10 absolute top-2 right-2 flex items-center justify-center hover:bg-white/10 w-7 h-7 rounded-full clickable"
          >
            <FaXmark className="text-white text-lg opacity-50" />
          </div>

          {props.title && (
            <div className="flex items-center text-fore opacity-70 justify-center h-11 text-sm">
              {props.title}
            </div>
          )}

          {props.children}
        </div>
      </div>
    </div>
  );
}
