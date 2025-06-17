import { Input, InputProps, SxProps, ThemeProvider, createTheme } from '@mui/material';
import React, { memo } from 'react';
import { useTheme } from '@/providers/theme/ThemeProvider';
import { baseFonts } from '@/utils/fonts';
import { NumberFormatBase, NumberFormatBaseProps, NumericFormat } from 'react-number-format';

interface CustomInputComponentProps {
  sx?: SxProps;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  placeholder?: string;
  hoverBorder?: string;
  [key: string]: any; // For any additional props
}

const CustomInputComponent: React.FC<CustomInputComponentProps> = ({
  sx,
  startAdornment,
  endAdornment,
  placeholder,
  hoverBorder,
  ...props
}) => {
  const { theme } = useTheme();

  const Background = theme.bgDefault;
  const BorderColor = theme.bgTertiary;
  const HoverColor = hoverBorder || theme.colorPrimary;
  const ColorText = theme.fgPrimary;
  const FontFamily = baseFonts.archivo;

  const themeInput = createTheme({
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            '&:hover': {
              borderColor: HoverColor,
              // boxShadow:'0px 0px 0px 1px rgba(16, 24, 40, 0.18) inset, 0px 0px 0px 4px rgba(253, 234, 18, 0.24)'
            },
            '&.Mui-focused': {
              borderColor: HoverColor,
            },
            '&.Mui-disabled': {
              color: theme.fgTertiary, // Màu chữ khi input bị disabled
              borderColor: theme.borderComponent,
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            color: ColorText,
            border: `1px solid ${BorderColor ?? theme.borderComponent}`,
            padding: '10px 12px',
            borderRadius: '8px',
            background: Background,
            fontSize: '14px',
            height: '40px',
            fontFamily: FontFamily,
            '& input': { padding: '0 !important' },
            '&::after': { borderBottom: '0' },
            '&::before': { borderBottom: '0' },
            '&:hover:not(.Mui-disabled, .Mui-error):before': { borderBottom: '0' },
            '.Mui-disabled': {
              WebkitTextFillColor: `${theme.fgTertiary} !important`// Màu chữ khi input bị disabled
            }

          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={themeInput}>
      <Input
        placeholder={placeholder || ''}
        sx={{ width: '100%', ...sx }}
        startAdornment={startAdornment || null}
        endAdornment={endAdornment || null}
        {...props}
      />
    </ThemeProvider>
  );
};

interface CustomInputNumberProps extends NumberFormatBaseProps, CustomInputComponentProps {
  decimalScale?: number;
}

const CustomInputNumber: React.FC<CustomInputNumberProps> = (props) => {
  // const newFormat = (numStr: any) => {
  //   if (numStr === '') return '';
  //   return new Intl.NumberFormat('en-US', {
  //     style: 'decimal',
  //     currency: undefined,
  //     maximumFractionDigits: 4,
  //     useGrouping: true,
  //   }).format(numStr);
  // };

  return <NumericFormat
    defaultValue={0}
    customInput={CustomInputComponent}
    thousandSeparator=","
    allowNegative={false}
    decimalScale={8}
    decimalSeparator="."
    {...props}
  />;
}

export default memo(CustomInputNumber);
