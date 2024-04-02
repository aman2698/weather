import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

interface AnimationWrapperProps {
  type?: string;
}
export const AnimationWrapper = ({
  children,
  type = "fade",
}: PropsWithChildren<AnimationWrapperProps>) => {
  const animationType: Record<string, any> = {
    fade: {
      "@keyframes fade": {
        "0%": {
          opacity: "0",
        },
        "100%": {
          opacity: "1",
        },
      },
    },
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        ...animationType[type],
        animation: `${type} 500ms ease`,
      }}
    >
      {children}
    </Box>
  );
};