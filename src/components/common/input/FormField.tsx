// FormField.tsx
import React, { useState } from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import CustomInput, { CustomInputProps } from "./CustomInput";
import { Box, FormControl, FormLabel, SxProps } from "@mui/material";
import useDetect from "@/hooks/useDetect";
import FlexReverse from "../FlexReverse";

interface FormFieldProps extends CustomInputProps {
  name: string;
  control: Control<any>;
  label: string;
  errors: any;
  sxError?: SxProps;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  control,
  label,
  errors,
  sxError = {},
  ...props
}) => {
  const { isMobile } = useDetect();
  return (
    <FormControl>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <FlexReverse sx={{ width: "100%" , alignItems: "start" }}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <CustomInput
              inputMode={props.inputMode || "text"}
              placeholder={props.placeholder}
              {...props}
              {...field}
            />
          )}
        />
        {errors && errors[name] && (
          <Box
            sx={{
              color: "red",
              fontSize: isMobile ? "12px" : "13px",
              marginTop: "0px",
              fontWeight: "500",
              ...sxError
            }}
          >
            {errors[name].message}
          </Box>
        )}
      </FlexReverse>
    </FormControl>



  );
};

export default FormField;