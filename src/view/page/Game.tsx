'use client'

import Loading from "@/components/loading/Loading";
import MainLayout from "@/layout/MainLayout";
import { Box, Container } from "@mui/material";
import { useSearchParams, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import NotFound from "../not-found/NotFound";
import React from "react";
import { useTheme } from "@/providers/theme/ThemeProvider";
import { jwtDecode } from "jwt-decode";
import { useI18n } from "@/locales/clients";

import { usePageVisibilityTimeout } from "@/hooks/usePageVisibilityTimeout";

function isTokenExpired(token: string) {
    if (!token || token.split('.').length !== 3) {
        return true;
    }
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp && decodedToken.exp - 10 < currentTime;
}

interface GameInfo {
    id: string | null;
    name: string | null;
    renderGame: (accessToken: string) => React.ReactNode;
    imagePreLoadUrls: string[];
}

const LIST_GAMES: GameInfo[] = [
    
]

function Game() {

    const { setThemeName } = useTheme();
    const searchParams = useSearchParams();
    const t = useI18n();
    const params = useParams();
    const [loadGame, setLoadGame] = useState(true);
    const [gameInfo, setGameInfo] = useState<GameInfo | undefined>();
    const [accessToken, setAccessToken] = useState("");

    usePageVisibilityTimeout(30000, () => {
        // Hành động khi người dùng rời tab quá 30 giây
        window.location.reload();
    });

    useEffect(() => {
        const gameName = params.gameName;
        const theme = searchParams.get("theme");
        const token = searchParams.get("accessToken");

        setGameInfo(LIST_GAMES.find((item) => item.name?.toLowerCase() == gameName.toString().toLowerCase()));
        if (theme && (theme == "dark" || theme == "light")) {
            setThemeName(theme);
        }

        if (token && !isTokenExpired(token)) {
            setAccessToken(token);
        }

        const timeout = setTimeout(() => {
            setLoadGame(false);
        }, 500);

        return () => {
            if (timeout) { clearTimeout(timeout) }
        }

    }, [searchParams])

    if (loadGame) {
        return (<Loading fullPage />)
    }
    if (!accessToken) {
        return (<Box sx={{ textAlign: "center", paddingY: "100px" }}>
            {t("Token không hợp lệ hoặc đã hết hạn")}
        </Box>)
    }

    return (
        <MainLayout>
            <Container maxWidth="xl" sx={{ height: "fit-content", padding: { xs: "4px", md: "16px", xl: "24px" } }}>
                <Box sx={{ paddingY: "12px" }}>

                    {gameInfo ?
                        <ChipProvider accessToken={accessToken}>
                            <BalanceProvider accessToken={accessToken}>
                                <WrapperLoadImg imageUrls={gameInfo.imagePreLoadUrls}>
                                    {gameInfo.renderGame(accessToken)}
                                </WrapperLoadImg>
                            </BalanceProvider>
                        </ChipProvider>


                        :
                        <NotFound />}
                </Box>
            </Container>
        </MainLayout>
    )
}

export default Game;