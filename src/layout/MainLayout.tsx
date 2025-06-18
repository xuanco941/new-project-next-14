"use client";

import Flex from "@/components/common/Flex";
import Loading from "@/components/common/loading/Loading";
import { useTheme } from "@/providers/theme/ThemeProvider";
import { useAuthStore } from "@/stores/authStore";
import { Box } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import LayoutAssetManagement from "./LayoutAssetManagement/LayoutAssetManagement";
import LayoutApplicationManagement from "./LayoutApplicationManagement/LayoutApplicationManagement";


export const APPLICATION_ROUTE = [
    { name: "Quản lý ứng dụng", path: "/application-management", isDev: true, renderLayout: ({ children }: { children: ReactNode }) => <LayoutApplicationManagement>{children}</LayoutApplicationManagement> },
    { name: "Quản lý tài sản", path: "/asset-management", isDev: false, renderLayout: ({ children }: { children: ReactNode }) => <LayoutAssetManagement>{children}</LayoutAssetManagement> },
    { name: "Quản lý dự án", path: "/project-management", isDev: true, renderLayout: ({ children }: { children: ReactNode }) => <LayoutApplicationManagement>{children}</LayoutApplicationManagement> },
];


function MainLayout({ children }: { children: ReactNode }) {

    const { theme } = useTheme();
    const router = useRouter();
    const pathname = usePathname();

    const [stateGlobalReloaded, setStateGlobalReloaded] = useState(false);
    const checkAuth = useAuthStore((state) => state.checkAuth);
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        //check auth on load
        //if access token is valid, set user and reload state
        //giả sử hàm checkAuth mất 0.5 giây để kiểm tra
        const timeout = setTimeout(() => {
            checkAuth(() => { setStateGlobalReloaded(true); });
        }, 500);
        return () => {
            clearTimeout(timeout);
        }
    }, []);

    //redirect user if user is not logged in
    useEffect(() => {
        if (stateGlobalReloaded && !user) {
            router.replace("/login");
        }
    }, [user, stateGlobalReloaded]);

    if (!stateGlobalReloaded) {
        return (<Flex
            sx={{
                width: "100dvw",
                height: "100dvh",
                background: theme.bgDefault,
                justifyContent: "center",
            }}
        >
            <Loading />
        </Flex>)
    }

    //get layout component based on current pathname
    const appCurrent = APPLICATION_ROUTE.find(item => pathname.includes(item.path));
    const LayoutComponent = appCurrent ? appCurrent.renderLayout : null;

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
        {LayoutComponent ? <LayoutComponent>{children}</LayoutComponent> : children}
    </Box>
}

export default MainLayout;
