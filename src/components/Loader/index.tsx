import { CircularProgress } from "@mui/material";
import React from "react";

type Props = {
  size?: number;
  thickness?: number;
};

export const Loader = ({ size = 30, thickness = 4 }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={size} color={"inherit"} thickness={thickness} />
    </div>
  );
};

export default Loader;
