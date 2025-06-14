import CustomText from "@/components/text/CustomText";
import Flex from "@/components/Flex";
import FlexReverse from "@/components/FlexReverse";
import { useTheme } from "@/providers/theme/ThemeProvider";
import React from "react";
import CustomSelect, { ListSelect } from "./CustomSelect";
import { LANGUAGE } from "@/contans/LANGUAGE";
import { useCurrentLocale, useI18n } from "@/locales/clients";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function SelectChangeLocale() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useCurrentLocale();
    const { theme } = useTheme();
    const searchParams = useSearchParams();
    const t = useI18n();


    const handleChange = (vl: string) => {
        if (vl == "en" || vl == "vi") {
            const currentParams = new URLSearchParams(searchParams as any).toString();
            const arrPathname = pathname.split("/");
            if (arrPathname[1] == "en" || arrPathname[1] == "vi") {
                arrPathname[1] = vl;
                const newPathName = arrPathname.join("/");
                router.push(`${newPathName}?${currentParams}`);
            }
            else {
                router.push(`${pathname}?${currentParams}`);
            }
        }
    };

    const renderValue = (value: string) => {
        const res = LANGUAGE.find((item) => item.language == value);
        return res ? (
            <Flex sx={{ justifyContent: "flex-start", gap: "10px", userSelect: "none" }}>
                <img style={{ width: "20px" }} src={res.flag} />
                <CustomText fs="14px" fw="500" sx={{ display: { xs: "none", md: "block" } }}>
                    {res.name}
                </CustomText>
            </Flex>
        ) : (
            <CustomText>{t("Chọn ngôn ngữ")}</CustomText>
        );
    };
    const renderListItem = (
        item: any,
        value: string,
        handleSelectChange: (value: string) => void
    ) => (
        <ListSelect
            sx={{
                background: value == item.language ? theme.bgColorPrimary : theme.bgDefault,
                "&:hover .text": { color: theme.colorPrimary },
            }}
            key={item.name}
            value={item.language}
            onClick={() => handleSelectChange(item.language)}
        >
            <Flex sx={{ justifyContent: { xs: "center", md: "flex-start" }, gap: "10px", width: "100%" }}>
                <img style={{ width: "20px" }} src={item.flag} />
                <CustomText
                    sx={{
                        color: value == item.language ? theme.colorPrimary : theme.fgPrimary,
                        display: { xs: "none", md: "block" }
                    }}
                    className="text"
                    fs="14px"
                    fw="500"
                >
                    {item.name}
                </CustomText>
            </Flex>
        </ListSelect>
    );
    return (
        <FlexReverse sx={{ gap: "5px", width: { xs: "fit-content", md: "140px" } }}>
            {/* <CustomText fw="500">Language</CustomText> */}
            <CustomSelect
                sx={{ background: theme.bgTertiary }}
                value={locale}
                list={LANGUAGE}
                handleChange={handleChange}
                renderValue={renderValue}
                renderListItem={renderListItem}
            />
        </FlexReverse>
    );
}

export default React.memo(SelectChangeLocale);
