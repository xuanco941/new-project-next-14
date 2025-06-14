import { useEffect, useRef } from "react";

/**
 * Hook dùng để theo dõi người dùng rời khỏi tab trong một khoảng thời gian
 * @param timeoutMs - Thời gian tối đa được phép rời tab (ms)
 * @param onTimeout - Callback sẽ gọi nếu người dùng rời tab quá lâu
 */
export function usePageVisibilityTimeout(timeoutMs: number, onTimeout: () => void) {
    const hiddenAtRef = useRef<number | null>(null);
    const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === "hidden") {
                hiddenAtRef.current = Date.now();
                console.log("Tab hidden");

                // timeoutIdRef.current = setTimeout(() => {
                //     console.log("Timeout bị gọi do rời tab quá lâu");
                //     onTimeout();
                // }, timeoutMs);
            } else {
                console.log("Tab display");
                const now = Date.now();
                const hiddenAt = hiddenAtRef.current;

                if (timeoutIdRef.current) {
                    clearTimeout(timeoutIdRef.current);
                }

                if (hiddenAt && now - hiddenAt >= timeoutMs) {
                    onTimeout();
                }

                hiddenAtRef.current = null;
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }
        };
    }, [timeoutMs, onTimeout]);
}
