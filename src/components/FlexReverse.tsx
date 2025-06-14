import { Box, SxProps, Theme } from "@mui/material";
import React, { ReactNode } from "react";

type FlexReverseProps = React.ComponentPropsWithRef<typeof Box> & {
  children?: ReactNode;
  sx?: SxProps<Theme>;
};

function FlexReverse({ children, sx, ...props }: FlexReverseProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

export default FlexReverse;
