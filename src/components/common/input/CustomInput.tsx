import { Input, InputProps, SxProps, ThemeProvider, createTheme } from '@mui/material';
import React, { memo, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useTheme } from '@/providers/theme/ThemeProvider';
import { baseFonts } from '@/utils/fonts';
import Flex from '../Flex';

interface CustomInputProps extends InputProps {
  value: any;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  handleKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleMouseDown?: (event: React.MouseEvent<HTMLInputElement>) => void;
  handleBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  handleForcus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  sx?: SxProps;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  placeholder?: string;
  hoverBorder?: string;
  [key: string]: any; // For any additional props
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  handleChange,
  type,
  handleKeyDown,
  handleMouseDown,
  handleBlur,
  handleClick,
  handleForcus,
  sx,
  startAdornment,
  endAdornment,
  placeholder,
  hoverBorder,
  ...props
}: any) => {
  const { theme } = useTheme();
  const [showPass, setShowPass] = useState(false);

  const Background = theme.bgDefault;
  const BorderColor = theme.bgTertiary;
  const HoverColor = hoverBorder || theme.borderColorPrimary;
  const ColorText = theme.fgPrimary;
  const ColorIcon = theme.fgTertiary;
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
        {...props}
        placeholder={placeholder || ''}
        sx={{ width: '100%', ...sx }}
        type={type == 'password' ? (showPass ? 'text' : 'password') : type || 'text'}
        value={value}
        onClick={handleClick}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onBlur={handleBlur}
        onFocus={handleForcus}
        startAdornment={startAdornment || null}
        endAdornment={
          type == 'password' && !endAdornment ? (
            <Flex onClick={() => setShowPass(!showPass)} sx={{ cursor: 'pointer' }}>
              {showPass ? (
                <VisibilityIcon sx={{ color: ColorIcon, fontSize: '20px' }} />
              ) : (
                <VisibilityOffIcon sx={{ color: ColorIcon, fontSize: '20px' }} />
              )}
            </Flex>
          ) : (
            endAdornment || null
          )
        }
      />
    </ThemeProvider>
  );
};

export default memo(CustomInput);
