"use client"

import { useTheme } from "@/providers/theme/ThemeProvider";
import { Box, CircularProgress, SxProps, Typography } from "@mui/material";
import { useEffect } from "react";

function Loading({ title, size, fullPage, sx, scrollTop }: { title?: string, size?: string, fullPage?: boolean , sx?: SxProps, scrollTop?: boolean }) {
  const {theme} = useTheme();

      useEffect(() => {
          if (scrollTop) {
              const appContainer = document.getElementById("app-container-center");
              if (appContainer) {
                  appContainer.scrollTo(0, 0);
              }
          }
  
      }, []);
  return (
     <Box
      sx={{
        height: fullPage ? '100dvh' : 'auto',
        width: fullPage ? '100vw' : 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        ...sx,
      }}
    >
      <CircularProgress
        size={size}
        thickness={4}
        sx={{
          color: theme.fgPrimary,
        }}
      />
      {title && (
        <Typography sx={{ mt: 2 }}>
          {title}
        </Typography>
      )}
    </Box>
  );
}

export default Loading