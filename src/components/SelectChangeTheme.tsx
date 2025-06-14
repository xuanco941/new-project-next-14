import CustomText from "@/components/text/CustomText";
import Flex from "@/components/Flex";
import FlexReverse from "@/components/FlexReverse";
import { useTheme } from "@/providers/theme/ThemeProvider";
import React from "react";
import CustomSelect, { ListSelect } from "./CustomSelect";
import { LANGUAGE } from "@/contans/LANGUAGE";
import { useCurrentLocale, useI18n } from "@/locales/clients";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';


const themeDefaults = ["dark", "light"];

function SelectChangeTheme() {
    const router = useRouter();
    const pathname = usePathname();
    const { theme, setThemeName, themeName, disabled } = useTheme();
    const searchParams = useSearchParams();
    const t = useI18n();

    const handleChange = (vl: string) => {
        if (vl == "dark" || vl == "light") {
            setThemeName(vl);
        }
    };

    const renderValue = (value: string) => {
        const res = themeDefaults.find((item) => item == value);
        return res ? (
            <Flex sx={{ justifyContent: "flex-start", gap: "10px", userSelect: "none"}}>
                {res == "dark" ? <DarkModeIcon /> : <LightModeIcon />}
                <CustomText fs="14px" fw="500" sx={{ display: { xs: "none", md: "block" } }}>
                    {t(res == "dark" || res == "light" ? res : "dark")}
                </CustomText>
            </Flex>
        ) : (
            <CustomText>{t("Chọn màu nền")}</CustomText>
        );
    };
    const renderListItem = (
        item: string,
        value: string,
        handleSelectChange: (value: string) => void
    ) => (
        <ListSelect
            sx={{
                background: value == item ? theme.bgColorPrimary : theme.bgDefault,
                "&:hover .text": { color: theme.colorPrimary },

            }}
            key={item}
            value={item}
            onClick={() => handleSelectChange(item)}
        >
            <Flex sx={{ justifyContent: { xs: "center", md: "flex-start" }, gap: "10px", width: "100%" }}>
                {item == "dark" ? <DarkModeIcon sx={{ color: value == item ? theme.colorPrimary : theme.fgPrimary }} /> : <LightModeIcon sx={{ color: value == item ? theme.colorPrimary : theme.fgPrimary }} />}
                <CustomText
                    sx={{
                        color: value == item ? theme.colorPrimary : theme.fgPrimary,
                        display: { xs: "none", md: "block" }
                    }}
                    className="text"
                    fs="14px"
                    fw="500"
                >

                    {t(item == "dark" || item == "light" ? item : "dark")}
                </CustomText>
            </Flex>
        </ListSelect>
    );
    return (
        <FlexReverse sx={{ gap: "5px", width: { xs: "fit-content", md: "140px" } }}>
            {/* <CustomText fw="500">Language</CustomText> */}
            <CustomSelect
                sx={{ background: theme.bgTertiary }}
                value={themeName}
                list={themeDefaults}
                handleChange={handleChange}
                renderValue={renderValue}
                renderListItem={renderListItem}
                disabled={disabled}
            />
        </FlexReverse>
    );
}

export default React.memo(SelectChangeTheme);
