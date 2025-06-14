// FormField.tsx
import React from 'react';
import { Controller, Control,} from 'react-hook-form';
import CustomInput from './CustomInput';
import CustomText from '../text/CustomText';
import FlexReverse from '../FlexReverse';
import { useTheme } from '@/providers/theme/ThemeProvider';

interface FormFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  type?: string;
  handleChangeAmount?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  errors: any;
  handleBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  control,
  label,
  type = 'text',
  handleChangeAmount,
  value,
  errors,
  handleBlur,
}) => {
  const { theme } = useTheme();
  return (
    <FlexReverse sx={{ width: '100%' }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <CustomInput
            {...field}
            value={value}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              field.onChange(e); // Cập nhật giá trị cho react-hook-form
              if (handleChangeAmount) handleChangeAmount(e); // Gọi hàm xử lý định dạng nếu được truyền vào
            }}
            handleBlur={(e: React.FocusEvent<HTMLInputElement>) => {
              field.onBlur(); // Call the onBlur from react-hook-form
              if (handleBlur) handleBlur(e); // Call the custom onBlur if provided
            }}
            placeholder={label}
            type={type}
            //   endAdornment={
            //     errors[name] ? (
            //       <ErrorSvg style={{ width: '24px' }} />
            //     ) : amount ? (
            //       <SuccessSvg style={{ width: '24px' }} />
            //     ) : (
            //       <></>
            //     )
            //   }
            sx={{
              borderColor: errors[name] ? theme.colorDanger : field.value || value ? theme.bgTertiary : theme.bgTertiary,
            }}
            hoverBorder={errors[name] ? theme.colorDanger : field.value || value ? theme.bgTertiary : theme.bgTertiary}
          />
        )}
      />
      {errors && errors[name] && (
        <CustomText style={{ color: theme.colorDanger, padding: '5px 0 0 12px' }}>{errors[name].message}</CustomText>
      )}
    </FlexReverse>
  );
};

export default FormField;
