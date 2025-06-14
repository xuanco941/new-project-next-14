import Flex from '@/components/Flex';
import { useTheme } from '@/providers/theme/ThemeProvider';
import { ReactNode, useCallback } from 'react';
import CustomText from './text/CustomText';
import React, { memo, useRef, useState } from "react";
import {
    Box,
    FormControl,
    MenuItem,
    Popper,
    Paper,
    ClickAwayListener,
    IconButton,
    SxProps,
    Theme,
    styled,
    Fade,
} from "@mui/material";
import FlexReverse from "./FlexReverse";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export interface ItemSelectTypeAny {
    label: ReactNode;
    value: any;
}
type TextMenuItem = React.ComponentPropsWithRef<typeof MenuItem> & {
    sx?: SxProps<Theme>;
};

type CustomSelectProps = {
    list: any[];
    value: string;
    handleChange: (value: string) => void;
    renderValue: (value: string) => React.ReactNode;
    renderListItem: (
        item: any,
        value: string,
        handleSelectChange: (value: string) => void
    ) => React.ReactNode;
    hoverBorder?: string;
    borderColor?: string;
    sx?: SxProps<Theme>;
    sxChosse?: SxProps<Theme>;
    disabled?: boolean;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
    handleChange,
    list,
    value,
    renderValue,
    renderListItem,
    hoverBorder,
    borderColor,
    sx,
    sxChosse,
    disabled
}) => {
    const [open, setOpen] = useState(false);
    const { theme } = useTheme();

    const anchorRef = useRef<HTMLDivElement | null>(null);

    const handleSelectChange = (value: string) => {
        handleChange(value);
        setOpen(false);
    };

    const handleClickAway = (event: MouseEvent | TouchEvent) => {
        if (
            anchorRef.current &&
            !anchorRef.current.contains(event.target as Node)
        ) {
            setOpen(false);
        }
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Box ref={anchorRef} sx={{ width: "100%", position: "relative" }}>
                <FormControl fullWidth>
                    <Box
                        // onClick={handleOpen}
                        onClick={() => setOpen(!open)}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "10px 12px",
                            background: theme.bgDefault,
                            border: `1px solid ${borderColor || theme.borderColorPrimary}`,
                            borderRadius: "8px",
                            "&:hover": { borderColor: hoverBorder || theme.borderColorPrimary },
                            height: "40px",
                            boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
                            filter: disabled ? "brightness(0.8)" : "unset",
                            cursor: disabled ? "not-allowed" : "pointer",
                            pointerEvents: disabled ? "none" : "auto",
                            ...sx,
                        }}
                    >
                        {renderValue(value)}

                        <IconButton sx={{ color: theme.fgTertiary }}>
                            <ChevronLeftIcon
                                sx={{
                                    transition: "0.25s",
                                    transform: (disabled ? false : open) ? "rotate(90deg)" : "rotate(-90deg)",
                                }}
                            />
                        </IconButton>
                    </Box>
                </FormControl>

                <Popper
                    open={disabled ? false : open}
                    anchorEl={anchorRef.current}
                    placement="bottom-start"
                    sx={{
                        zIndex: 999999,
                    }}
                    transition
                >
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={150}>
                            <Paper
                                sx={{
                                    width: anchorRef.current
                                        ? anchorRef.current.clientWidth
                                        : undefined,
                                    marginTop: "6px",
                                    overflow: "hidden",
                                    boxShadow: 6,
                                    outline: "none",
                                    transition: ".15s",
                                    borderRadius: "8px",
                                    border: `1px solid ${theme.borderColorPrimary}`,
                                    background: theme.bgDefault,
                                }}
                            >
                                <FlexReverse
                                    sx={{
                                        width: "100%",
                                        maxHeight: "400px",
                                        overflow: "auto",
                                        padding: "6px",
                                        gap: "6px",
                                        background: theme.bgDefault,
                                        ...sxChosse,
                                    }}
                                >
                                    {list.length > 0 &&
                                        list.map((item) =>
                                            renderListItem(item, value, handleSelectChange)
                                        )}
                                </FlexReverse>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </Box>
        </ClickAwayListener>
    );
};

export const ListSelect: React.FC<TextMenuItem> = ({ children, ...props }) => {
    const { theme } = useTheme();
    const CustomMenuItem = styled(MenuItem)({
        background: theme.bgDefault,
        borderRadius: "8px",
        padding: "10px 12px",
        "&:last-child": {
            marginBottom: "0",
        },
        "&:hover": {
            background: theme.bgSecondary,
            // color: `${theme.cardForeground} !important`,
        },
    });
    return <CustomMenuItem {...props}>{children}</CustomMenuItem>;
};


export const CustomSelectTypeAny: React.FC<{ placeholder?: string, listItems: ItemSelectTypeAny[], value: any; setValue: (value: any) => void, disabled?: boolean }> = ({ placeholder, listItems, value, setValue, disabled }) => {
    const { theme, themeName } = useTheme();

    const renderValue = useCallback(
        (vl: any) => {
            const res = listItems.find((item: ItemSelectTypeAny) => item.value == vl);
            return res ? (
                <Flex sx={{ justifyContent: "flex-start", gap: "6px", }}>
                    <div className='text-[14px] font-medium' style={{ color: theme.fgPrimary, fontSize: "14px" }}>
                        {res.label}
                    </div>
                </Flex>
            ) : (
                <CustomText className='truncate'>{placeholder ?? "Select"}</CustomText>
            );
        },
        [listItems, themeName]
    );

    const renderListItem = useCallback(
        (item: any, value: any, handleSelectChange: (value: any) => void) => (
            <ListSelect
                sx={{
                    background: value === item.value ? theme.bgSecondary : theme.bgDefault,
                }}
                key={item.value}
                value={item.value}
                onClick={() => handleSelectChange(item.value)}
            >
                <Flex sx={{ justifyContent: "flex-start", gap: "4px" }}>
                    <div className='text-[14px] font-medium'>
                        <span style={{ color: theme.fgPrimary, fontSize: "14px" }}>
                            {item.label}
                        </span>
                    </div>
                </Flex>
            </ListSelect>
        ),
        [theme]
    );

    const handleChange = useCallback((vl: any) => {
        setValue(vl);
    }, []);

    return (
        <CustomSelect
            value={value}
            list={listItems}
            handleChange={handleChange}
            renderValue={renderValue}
            renderListItem={renderListItem}
            disabled={disabled}
        />
    );
};
