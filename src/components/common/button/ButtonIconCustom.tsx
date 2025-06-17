import { useTheme } from "@/providers/theme/ThemeProvider";
import { IconButton, SxProps, Theme } from "@mui/material";
import React, { ReactNode } from "react";

type Props = React.ComponentPropsWithRef<typeof IconButton> & {
  children: ReactNode;
  sx?: SxProps<Theme>;
};
function ButtonIconCustom({ children, sx, ...props }: Props) {
  const { theme } = useTheme();
  return (
    <IconButton
      {...props}
      sx={{
        color: theme.fgTertiary,
        "&:hover": {
          color: theme.colorPrimary,
          background: theme.bgColorPrimary,
        },
        ...sx,
      }}
    >
      {children}
    </IconButton>
  );
}

export default ButtonIconCustom;
