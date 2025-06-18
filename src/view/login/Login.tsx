"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import ForgotPassword from './ForgotPassword';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useToastCustom from '@/hooks/useToastCustom';
import FormField from '@/components/common/input/FormField';
import CustomButton from '@/components/common/button/CustomButton';

export default function Login() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const auth = useAuthStore();
  const toast = useToastCustom();

  //luôn logout khi vào trang login
  React.useEffect(() => { auth.logout() }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, "Tài khoản phải có ít nhất 4 ký tự")
      .required("Tài khoản không được để trống"),

    password: Yup.string()
      .min(4, "Mật khẩu phải có ít nhất 4 ký tự")
      .required("Mật khẩu không được để trống"),
  });
  interface TypeForm {
    username: string;
    password: string;
  }
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<TypeForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: "test",
      password: "1234",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: TypeForm) => {
    if (auth.isLoading) {
      return;
    }
    await auth.loginTest(
      data.username,
      data.password,
      () => {
        toast.success("Đăng nhập thành công");
        router.push("/");
      }
    );
  };


  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100dvh',
    }}>
      <CssBaseline enableColorScheme />
      <Card variant="outlined" sx={{
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        width: '100%',
        padding: 4,
        gap: 2,
        margin: 'auto',
        maxWidth: { xs: "90dvw", sm: '450px' },
        boxShadow:
          'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
      }}>
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          Đăng nhập
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}
        >
          <FormField
            control={control}
            name="username"
            label="Tài khoản"
            placeholder='Nhập tài khoản của bạn'
            value={watch("username")}
            errors={errors} />
          <FormField
            control={control}
            name="password"
            placeholder='Nhập mật khẩu của bạn'
            label="Mật khẩu"
            value={watch("password")}
            errors={errors} />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <ForgotPassword open={open} handleClose={handleClose} />
          <CustomButton
            type="submit"
            fullWidth
            variant="contained"
            isLoading={auth.isLoading}
          >
            Đăng nhập
          </CustomButton>
          <Link
            component="button"
            type="button"
            onClick={handleClickOpen}
            variant="body2"
            sx={{ alignSelf: 'center' }}
          >
            Quên mật khẩu?
          </Link>
        </Box>

      </Card>
    </Box>

  );
}