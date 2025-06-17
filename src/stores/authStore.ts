import { create } from "zustand";
import {
    loginAccount,
    signUpAccount,
} from "@/apis/auth";
import { get as getAxios, isJWTExpired, refreshAccessToken, setTokenInHeaders } from "@/apis/request";
import { LOCAL_STORAGE_VARIABLE } from "@/contans/LOCAL_STORAGE_VARIABLE";

interface User {
    accountID: number;
    userName: string;
    avatar: number;
    nickName: string;
    level: number;
    isCaptcha: boolean;
    accessToken: string;
    accessTokenFishing: string;
    isMobileActived: boolean;
    isAllowChat: boolean;
    isAgency: boolean;
    preFix: string;
    isAccountLive: boolean;
    mobile: string;
    locationID: number;
    useMK: boolean;
    email: string;
}

interface AuthState {
    user: User | null;
    isLoading: boolean;
    errorLogin: string | null;
    errorSignUp: string | null;
    login: (
        username: string,
        password: string,
        onSuccess: () => void
    ) => Promise<void>;
    signUp: (
        username: string,
        email: string,
        nickname: string,
        password: string,
        onSuccess: () => void
    ) => Promise<void>;
    logout: () => void;
    checkAuthOnLoad: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isLoading: false,
    loadingTele: true,
    errorTele: null,
    error: null,
    errorLogin: null,
    errorSignUp: null,
    login: async (username: string, password: string, onSuccess: () => void) => {
        set({ isLoading: true, errorLogin: null });
        try {
            const response = await loginAccount({
                CaptchaText: "",
                DeviceName: navigator.userAgent,
                IpAddress: "",
                MerchantID: 1000,
                Password: password.toString(),
                PlatformID: 1,
                Uiid: "",
                UserName: username,
            });
            if (response.data.code == 0) {
                set({
                    user: { ...response.data.data },
                    isLoading: false,
                    errorLogin: null,
                });
                setTokenInHeaders(response.data.data.accessToken);
                localStorage.setItem(
                    LOCAL_STORAGE_VARIABLE.ACCOUNT_INFO_KEY,
                    JSON.stringify({
                        accessToken: response.data.data.accessToken,
                        accountID: response.data.data.accountID,
                        nickName: response.data.data.nickName,
                        userName: response.data.data.userName,
                        avatar: response.data.data.avatar,
                    })
                );
                onSuccess();
            } else {
                set({
                    errorLogin: response.data.description ?? "Login failed",
                    isLoading: false,
                });
            }
        } catch (error) {
            console.log("error", error);
            set({
                errorLogin: error instanceof Error ? error.message : "Login failed",
                isLoading: false,
            });
        }
    },

    signUp: async (
        username: string,
        email: string,
        nickname: string,
        password: string,
        onSuccess: () => void
    ) => {
        set({ isLoading: true, errorSignUp: null });
        try {
            const response = await signUpAccount({
                CaptchaText: "",
                DeviceName: navigator.userAgent,
                IpAddress: "",
                MerchantID: 1000,
                Password: password.toString(),
                PlatformID: 1,
                Uiid: "",
                UserName: username,
                NickName: nickname,
            });
            if (response.data.code == 0) {
                get().login(response.data.data.userName, password, () => onSuccess());
            } else {
                set({
                    errorSignUp: response.data.description ?? "Login failed",
                    isLoading: false,
                });
            }
        } catch (error) {
            console.log("error", error);
            set({
                errorLogin: error instanceof Error ? error.message : "Login failed",
                isLoading: false,
            });
        }
    },

    logout: () => {
        set({ user: null, isLoading: false, errorLogin: null });
        localStorage.removeItem(LOCAL_STORAGE_VARIABLE.ACCOUNT_INFO_KEY);
        localStorage.removeItem(LOCAL_STORAGE_VARIABLE.ACCESS_TOKEN_KEY);
        localStorage.removeItem(LOCAL_STORAGE_VARIABLE.REFRESH_TOKEN_KEY);

        setTokenInHeaders(undefined);
        window.location.href = `/`;
    },
    checkAuthOnLoad: async () => {
        set({ isLoading: true });
        try {
            const account = localStorage.getItem(
                LOCAL_STORAGE_VARIABLE.ACCOUNT_INFO_KEY
            );
            const accessToken = localStorage.getItem(
                LOCAL_STORAGE_VARIABLE.ACCESS_TOKEN_KEY
            );
            if (account && accessToken && !isJWTExpired(accessToken)) {
                return;
            } else {
                const newAccessToken = await refreshAccessToken();
                if (!newAccessToken) {
                    get().logout();
                }
            }
        } catch (error) {
            console.log(error instanceof Error ? error.message : "Token validation failed")
            get().logout();
        }
    },

}));
