"use client";

import { useTheme } from "@/providers/theme/ThemeProvider";
import { Box } from "@mui/material";
import React, { ReactNode } from "react";
function MainLayout({ children }: { children: ReactNode }) {

    const { theme } = useTheme();

    // const [stateGlobalLoaded, setStateGlobalLoaded] = useState(false);
    // const checkAuthOnLoad = useAuthStore((state) => state.checkAuthOnLoad);
    // const user = useAuthStore((state) => state.user);
    // const fetchWallet = useWalletStore((state) => state.fetchWallets);

    // useEffect(() => {
    //     async function LoadGlobalStateBeforeRender() {
    //         await checkAuthOnLoad();
    //         setStateGlobalLoaded(true);
    //     }
    //     LoadGlobalStateBeforeRender();
    // }, [checkAuthOnLoad]);

    // useEffect(() => {
    //     if (!user) return;
    //     const timer = setInterval(() => {
    //         fetchWallet();
    //     }, 5000);
    //     return () => clearInterval(timer);
    // }, [fetchWallet, user]);

    // if (stateGlobalLoaded === false) {
    //     return (<Flex
    //         sx={{
    //             width: "100vw",
    //             height: "100dvh",
    //             background: "#0c111d",
    //             justifyContent: "center",
    //         }}
    //     >
    //         <Loading />
    //     </Flex>)
    // }

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
