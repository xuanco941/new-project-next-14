"use client"

import Flex from "@/components/Flex";
import { useEffect } from "react";

const LoadingGame = ({ scrollTop }: { scrollTop?: boolean }) => {

    useEffect(() => {
        if (scrollTop) {
            const appContainer = document.getElementById("app-container-center");
            if (appContainer) {
                appContainer.scrollTo(0, 0);
            }
        }

    }, []);

    return (<Flex
        sx={{
            width: "100%",
            height: "100dvh",
            background: "transparent",
            justifyContent: "center",
            alignItems: "center",
            userSelect: "none"
        }}
    >
        <img src="/images/logo/logo.png" className="animate-ping w-36 md:w-48 lg:w-60 xl:w-72" />
    </Flex>);
}

export default LoadingGame;