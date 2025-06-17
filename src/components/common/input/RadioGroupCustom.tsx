import { FormControl, FormControlLabel, Radio, RadioGroup, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";
import { useTheme } from "@/providers/theme/ThemeProvider";
export interface ItemRadioGroupCustom {
    label: ReactNode;
    value: any;
}
type RadioGroupCustomType = React.ComponentPropsWithRef<typeof RadioGroup> & {
    sx?: SxProps<Theme>;
    listItems: ItemRadioGroupCustom[];
};

const RadioGroupCustom: React.FC<RadioGroupCustomType> = ({ sx, listItems, ...props }) => {
    const {theme} = useTheme();

    return (
        <FormControl>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                sx={{
                    ...sx
                }}
                {...props}
            >
                {listItems.map((item, index) => <FormControlLabel key={item.value + index} value={item.value} control={<Radio sx={{
                    color: theme.bgTertiary,
                    '&.Mui-checked': {
                        color: theme.colorPrimary,
                    },
                }} />} label={item.label} />)}
            </RadioGroup>
        </FormControl>
    )
}

export default RadioGroupCustom;