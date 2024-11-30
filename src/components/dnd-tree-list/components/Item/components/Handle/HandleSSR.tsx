import React, { forwardRef } from "react";
import Image from "next/image";

import { ActionSSR, ActionProps } from "../Action";

export const HandleSSR = forwardRef<HTMLButtonElement, ActionProps>(
  (props, ref) => {
    return (
      <ActionSSR
        ref={ref}
        cursor="grab"
        data-cypress="draggable-handle"
        {...props}
      >
        <Image
          aria-hidden
          src="/icons/ic_move-all-directions.svg"
          alt="move element"
          width={16}
          height={16}
        />
      </ActionSSR>
    );
  }
);

HandleSSR.displayName = "HandleSSR";
