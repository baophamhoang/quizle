import React, { ReactNode } from "react";
import { trpc } from "../../utils/trpc";

const TrpcWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export default trpc.with(TrpcWrapper);
