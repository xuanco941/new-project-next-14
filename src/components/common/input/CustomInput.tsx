import {
  Input,
  InputProps,
  SxProps,
  ThemeProvider,
  createTheme
} from '@mui/material';
import React, {
  useState,
  forwardRef,
  ForwardRefRenderFunction
} from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useTheme } from '@/providers/theme/ThemeProvider';
import { baseFonts } from '@/utils/fonts';
import Flex from '../Flex';

export interface CustomInputProps extends InputProps {
  value?: any;
  type?: string;
  sx?: SxProps;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  placeholder?: string;
  hoverBorder?: string;
  [key: string]: any;
}

// Sử dụng forwardRef để truyền ref vào thẻ DOM (Input)
const CustomInput: ForwardRefRenderFunction<HTMLInputElement, CustomInputProps> = (
  {
    value,
    type,
    sx,
    startAdornment,
    endAdornment,
    placeholder,
    hoverBorder,
    ...props
  },
  ref
) => {
  const { theme } = useTheme();
  const [showPass, setShowPass] = useState(false);

  const Background = theme.bgDefault;
  const BorderColor = theme.borderComponent;
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
              borderColor: HoverColor
            },
            '&.Mui-focused': {
              borderColor: HoverColor
            },
            '&.Mui-disabled': {
              color: theme.fgTertiary,
              borderColor: theme.borderComponent
            }
          }
        }
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
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '0'
            },
            '.Mui-disabled': {
              WebkitTextFillColor: `${theme.fgTertiary} !important`
            }
          }
        }
      }
    }
  });

  return (
    <ThemeProvider theme={themeInput}>
      <Input
        {...props}
        inputRef={ref} // <== Truyền ref tại đây
        placeholder={placeholder || ''}
        sx={{ width: '100%', ...sx }}
        type={type === 'password' ? (showPass ? 'text' : 'password') : type || 'text'}
        value={value}
        startAdornment={startAdornment || null}
        endAdornment={
          type === 'password' && !endAdornment ? (
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

export default React.memo(forwardRef(CustomInput));
