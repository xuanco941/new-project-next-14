import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { useTheme } from '@/providers/theme/ThemeProvider';
import React from 'react';
import { SxProps, Theme } from "@mui/material/styles";

type SwitchButtonProps = React.ComponentPropsWithRef<typeof Switch> & {
    sx?: SxProps<Theme>;
};

const SwitchButton: React.FC<SwitchButtonProps> = ({ sx, ...props }) => {
    const { theme } = useTheme();
    return <Switch sx={{
        width: 58,
        height: 28,
        padding: 0,
        display: 'flex',
        '&:active': {
            '& .MuiSwitch-thumb': {
                width: 15,
            },
            '& .MuiSwitch-switchBase.Mui-checked': {
                transform: 'translateX(9px)',
            },
        },
        '& .MuiSwitch-switchBase': {
            paddingY: "4px",
            paddingX: "6px",
            '&.Mui-checked': {
                transform: 'translateX(28px)',
                color: '#fff',
                boxShadow: "inset 0 2px 4px 0 rgb(0 0 0 / 0.0.5)",
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: theme.colorPrimary,
                },
            },
        },
        '& .MuiSwitch-thumb': {
            boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
            width: 20,
            height: 20,
            borderRadius: "100%",
        },
        '& .MuiSwitch-track': {
            borderRadius: 20 / 2,
            opacity: 1,
            backgroundColor: theme.bgTertiary,
            boxSizing: 'border-box',
        },
        ...sx
    }} {...props} />
};
export default SwitchButton;