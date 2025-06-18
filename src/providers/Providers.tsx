"use client";
import React, { ReactNode } from "react";
import ThemeProvider from "./theme/ThemeProvider";
import { Toaster } from "sonner";
import { I18nProviderClient } from "@/locales/clients";
import Flex from "@/components/common/Flex";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { CircularProgress } from "@mui/material";

function Providers({
  children,
  locale,
}: {
  children: ReactNode;
  locale: string;
}) {

  return (
    <>
      <I18nProviderClient
        locale={locale}
        fallback={
          <Flex
            sx={{
              width: "100vw",
              height: "100dvh",
              background: "#fff",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress
              thickness={4}
              sx={{
                color: "#181d27",
              }}
            />
          </Flex>
        }
      >
        <AppRouterCacheProvider options={{ key: 'css', prepend: true }}>

          <ThemeProvider>
            {/* <NotificationProvider> */}
            <Toaster richColors position="top-center" theme="light" closeButton={true} />
            {/* <FormUtils /> */}
            {/* <DialogWallet /> */}
            {/* <OAuthMetamask /> */}
            {children}
            {/* </NotificationProvider> */}

          </ThemeProvider>
        </AppRouterCacheProvider>

      </I18nProviderClient>

    </>
  );
}

export default Providers;
