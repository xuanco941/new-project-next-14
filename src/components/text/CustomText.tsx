import React from "react";
import Typography from "@mui/material/Typography";
import { SxProps, Theme } from "@mui/material/styles";
import { useTheme } from "@/providers/theme/ThemeProvider";
import { baseFonts } from "@/utils/fonts";

type TextProps = React.ComponentPropsWithRef<typeof Typography> & {
  sx?: SxProps<Theme>;
  fw?: React.CSSProperties["fontWeight"];
  fs?: React.CSSProperties["fontSize"];
  color?: React.CSSProperties["color"];
};
const CustomText: React.FC<TextProps> = ({
  children,
  sx,
  fw,
  fs,
  ...props
}) => {
  const { theme } = useTheme();
  return (
    <Typography
      {...props}
      sx={{
        fontWeight: fw || "400",
        fontSize: fs || "14px",
        color: theme.fgSecondary,
        fontFamily: baseFonts.archivo,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

export default CustomText;
