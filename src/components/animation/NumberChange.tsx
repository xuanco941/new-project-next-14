"use client"

import { formatNumber, formatShortNumber } from "@/utils/helpers";
import { Box, SxProps } from "@mui/material"
import { animate, useMotionValue, useTransform } from "framer-motion";
import React from "react";
import { useEffect, useState } from "react"

function NumberChange({ sx, value, maxDecimalDigits, minDecimalDigits, isShortNum, duration, floor }: { sx?: SxProps, value: number, maxDecimalDigits?: number, minDecimalDigits?: number, isShortNum?: boolean, duration?: number, floor?: boolean }) {

    const motionValue = useMotionValue(value ? value : 0);
    const roundedValue = useTransform(motionValue, (latest) => {
        if (isShortNum) {
            return formatShortNumber(latest, maxDecimalDigits, minDecimalDigits);

        }
        else {
            return formatNumber(latest, maxDecimalDigits, minDecimalDigits, floor);
        }
    })

    const [displayValue, setDisplayValue] = useState("");

    // Cập nhật displayValue khi roundedValue thay đổi
    useEffect(() => {
        const unsubscribe = roundedValue.on('change', (latest) => {
            setDisplayValue(latest.toString());
        });

        return () => unsubscribe();
    }, [roundedValue]);

    useEffect(() => {
        const controls = animate(motionValue, value ? value : 0, {
            duration: duration ? duration : 1,
            ease: "easeOut",
        });

        return controls.stop;
    }, [value, motionValue]);


    return <Box component={"span"} sx={{ ...sx }}>
        {displayValue == "" ? 0 : displayValue}
    </Box>
}

export default React.memo(NumberChange);
