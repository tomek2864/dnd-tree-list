import React from "react";
import Image from "next/image";

import { ActionProps, ActionSSR } from "../Action";

export function RemoveSSR(props: ActionProps) {
  return (
    <ActionSSR {...props}>
      <Image
        aria-hidden
        src="/icons/ic_trash.svg"
        alt="remove element"
        width={16}
        height={16}
      />
    </ActionSSR>
  );
}

RemoveSSR.displayName = "RemoveSSR";
