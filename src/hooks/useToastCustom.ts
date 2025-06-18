import { useTheme } from "@/providers/theme/ThemeProvider";
import { ReactNode } from "react";
import { toast, ToasterProps } from "sonner";

const useToastCustom = () => {
  const { theme } = useTheme();
  // const showToast = (message: string) => {
  //   toast(message, {
  //     style: {
  //       background:theme.bgTertiary,
  //       border: "none",
  //       color: "#fff",
  //       fontWeight: "700",
  //     },
  //       duration: 150000,
  //     icon: <CloseIcon />, 
  //   });
  // };
  const toastCustom = {
    default: toast,
    success: (messsage: string | ReactNode, props?: ToasterProps) => {
      toast.success(messsage, {
        style: {
          background: theme.bgTertiary,
          color: theme.colorSuccess,
          border: 'none'
        },
        ...props
      });
    },
    error: (messsage: string | ReactNode, props?: ToasterProps) => {
      toast.error(messsage, {
        style: {
          background: theme.bgTertiary,
          color: theme.colorDanger,
          border: 'none'
        },
        ...props
      });
    },
    info: (messsage: string | ReactNode, props?: ToasterProps) => {
      toast.info(messsage, {
        style: {
          background: theme.bgTertiary,
          color: theme.colorPrimary,
          border: 'none'
        },
        ...props
      });
    },
    warning: (messsage: string | ReactNode, props?: ToasterProps) => {
      toast.warning(messsage, {
        style: {
          background: theme.bgTertiary,
          border: 'none'
        },
        ...props
      });
    },
  }

  return toastCustom;
};

export default useToastCustom;
