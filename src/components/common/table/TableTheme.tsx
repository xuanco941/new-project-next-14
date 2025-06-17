import { useTheme } from "@/providers/theme/ThemeProvider";
import {
    Box,
    createTheme,
    ThemeProvider,
} from "@mui/material";
import React, { ReactNode } from "react";

const TableTheme = ({ children }: { children: ReactNode }) => {
    const { theme } = useTheme();
    const themeTable = createTheme({
        components: {
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        borderBottom: "none",
                        padding: "8px",
                        ["@media (max-width:600px)"]: {

                        },
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderRadius: "0px",
                        background: theme.bgSecondary,
                        overflowY: "auto",
                        overflowX: "auto",
                        "&::-webkit-scrollbar-thumb:horizontal": {
                            backgroundColor: `#ffffff !important`, // Màu thanh cuộn
                        },
                    },
                },
            },
            MuiTableHead: {
                styleOverrides: {
                    root: {
                        background: "transparent",
                        // borderBottom: "1px solid #393C49",
                    },
                },
            },
        },
    });


    return (
        <ThemeProvider theme={themeTable}>
            <Box sx={{ position: "relative" }}>
                {children}
            </Box>
        </ThemeProvider>
    );
}

export default TableTheme;