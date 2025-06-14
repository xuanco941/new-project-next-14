import { Box, SxProps, Theme } from "@mui/material";
import React, { ReactNode } from "react";

type FlexRowProps = React.ComponentPropsWithRef<typeof Box> & {
  children?: ReactNode;
  sx?: SxProps<Theme>;
};

function Flex({ children, sx, ...props }: FlexRowProps) {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

export default Flex;
