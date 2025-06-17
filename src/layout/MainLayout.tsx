"use client";

import Flex from "@/components/common/Flex";
import Loading from "@/components/common/loading/Loading";
import { useTheme } from "@/providers/theme/ThemeProvider";
import { useAuthStore } from "@/stores/authStore";
import Login from "@/view/Login";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
function MainLayout({ children }: { children: ReactNode }) {

    const { theme } = useTheme();
    const router = useRouter();

    const [stateGlobalLoaded, setStateGlobalLoaded] = useState(false);
    const checkAuthOnLoad = useAuthStore((state) => state.checkAuthOnLoad);
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        async function LoadGlobalStateBeforeRender() {
            await checkAuthOnLoad();
            setStateGlobalLoaded(true);
        }
        LoadGlobalStateBeforeRender();
    }, [checkAuthOnLoad]);

    if (!stateGlobalLoaded) {
        return (<Flex
            sx={{
                width: "100vw",
                height: "100dvh",
                background: "#0c111d",
                justifyContent: "center",
            }}
        >
            <Loading />
        </Flex>)
    }
    if (!user) {
        // return <Login />;
        router.push("/login");
    }


    return <Box
        id="app-container-center"
        sx={{
            backgroundColor: theme.bgDefault,
            color: theme.fgSecondary,
            height: '100dvh',
            width: "100dvw",
            flex: "1",
            overflowX: "hidden",
            overflowY: "auto",
            maxHeight: '100%',
            flexShrink: '0',
            "&::-webkit-scrollbar": {
                width: "5px",
            },
            "&::-webkit-scrollbar-track": {
                backgroundColor: theme.bgSecondary,
            },
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: theme.bgTertiary,
                borderRadius: "8px",
            },
        }}
    >
        {children}
    </Box>
}

export default MainLayout;
