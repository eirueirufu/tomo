"use client";

import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Spinner label="Loading..." color="danger" />
    </div>
  );
}
