import React from "react";
import { SxProps, Theme } from "@mui/material/styles";
import { Button } from "@mui/material";
import { useTheme } from "@/providers/theme/ThemeProvider";
import { baseFonts } from "@/utils/fonts";

type TextProps = React.ComponentPropsWithRef<typeof Button> & {
  sx?: SxProps<Theme>;
  isOutLine?: boolean;
  color?: React.CSSProperties["color"];
};

const CustomButton: React.FC<TextProps> = ({
  children,
  sx,
  isOutLine = false,
  ...props
}) => {
  const { theme } = useTheme();
  return isOutLine ? (
    <Button
      {...props}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        gap: "6px",
        borderRadius: "8px",
        height: "35px",
        padding: "0 12px",
        textTransform: "inherit",
        fontSize: "14px",
        fontWeight: "400",
        boxShadow: "none",
        lineHeight: "normal",
        "&:hover": {
          opacity: "0.8",
          background: theme.bgColorPrimary,
          borderColor: theme.colorPrimary,
        },
        "&:disabled": {
          color: theme.fgTertiary
        },
        transition: "0.2s",
        color: theme.colorPrimary,
        background: "transparent",
        fontFamily: baseFonts.archivo,
        border: `1px solid ${theme.borderColorPrimary}`,
        ...sx,
      }}
    >
      {children}
    </Button>
  ) : (
    <Button
      {...props}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        gap: "6px",
        borderRadius: "8px",
        height: "35px",
        padding: "0 12px",
        textTransform: "inherit",
        fontSize: "14px",
        fontWeight: "400",
        "&:hover": {
          // opacity: "0.8",
          // background: theme.bgBlueLinear,
          boxShadow:
            `0px 0px 0px 1px rgba(16, 24, 40, 0.18) inset, 0px 0px 0px 2px rgba(253, 234, 18, 0.24)`,
        },
        transition: "0.2s",
        color: '#ffffff',
        background: theme.bgBlueLinear,
        fontFamily: baseFonts.archivo,
        // boxShadow: "0px 2px 14px -1px #FFF inset, 0px 2px 8px -2px rgba(255, 255, 255, 0.20) inset",
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};

export default React.memo(CustomButton);
