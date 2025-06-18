"use client";
import React from "react";
import { Box, Container, Grid } from "@mui/material";
import { useTheme } from "@/providers/theme/ThemeProvider";
import { useRouter } from "next/navigation";
import Flex from "@/components/common/Flex";
import { APPLICATION_ROUTE } from "@/layout/MainLayout";
import FlexReverse from "@/components/common/FlexReverse";

function Home() {
    const { theme } = useTheme();
    const router = useRouter();

    return (
        <FlexReverse sx={{ justifyContent: "center", height: "100%", paddingY: 2, paddingX: { xs: 2, md: "40px", lg: "120px", xl: "200px" } }}>
            <Grid container spacing={2} sx={{width: "100%"}}>
                {APPLICATION_ROUTE.map((item, index) =>
                    <Grid key={index} size={{ xs: 6, md: 4 }}>
                        <Flex onClick={() => { router.push(item.path) }} sx={{
                            position: "relative",
                            background: theme.bgSecondary,
                            textTransform: "uppercase",
                            borderRadius: "10px",
                            cursor: "pointer",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: theme.bgTertiary,
                            width: "100%",
                            height: { xs: "180px", sm: "220px", md: "300px" },
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            fontSize: { xs: "18px", sm: "20px", md: "24px" },
                            "&:hover": { background: theme.bgColorPrimary, borderColor: theme.colorPrimary },
                            color: theme.fgPrimary,
                            transition: "all 0.3s ease-in-out",
                            boxShadow: `0 4px 8px rgba(0, 0, 0, 0.2), inset 0 0 10px ${theme.colorPrimary}`,
                            "&:active": {
                                transform: "scale(0.98)",
                            }
                        }}>
                            {item.name}
                            {item.isDev && <Box sx={{ position: "absolute", color: theme.colorDanger, top: "7px", right: "7px", fontSize: "12px", textTransform: "none", background: theme.bgColorDanger, paddingX: "6px", paddingY: "4px", border: `1px solid ${theme.borderComponent}`, borderRadius: "6px" }}>
                                Undeveloped
                            </Box>}
                        </Flex>

                    </Grid>
                )}

            </Grid>
        </FlexReverse>

    );
}

export default Home;