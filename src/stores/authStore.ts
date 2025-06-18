import { create } from "zustand";
import {
    getAccountInfo,
    loginAccount,
    signUpAccount,
} from "@/apis/auth";
import { get as getAxios, isJWTExpired, refreshAccessToken, setTokenInHeaders } from "@/apis/request";
import { LOCAL_STORAGE_VARIABLE } from "@/contans/LOCAL_STORAGE_VARIABLE";
import { on } from "events";

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
        onSuccess: () => void,
        onError?: (error: string) => void
    ) => Promise<void>;
    signUp: (
        username: string,
        email: string,
        nickname: string,
        password: string,
        onSuccess: () => void,
        onError?: (error: string) => void
    ) => Promise<void>;
    logout: () => void;
    checkAuth: (callback?: () => void) => Promise<void>;
    loginTest: (
        username: string,
        password: string,
        onSuccess: () => void,
    ) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isLoading: false,
    loadingTele: true,
    errorTele: null,
    error: null,
    errorLogin: null,
    errorSignUp: null,
    login: async (username: string, password: string, onSuccess: () => void, onError?: (error: string) => void) => {
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
                    errorLogin: response.data.description ?? "Đăng nhâp thất bại",
                    isLoading: false,
                });
                onError?.(response.data.description ?? "Đăng nhâp thất bại");
            }
        } catch (error) {
            console.log("error", error);
            set({
                errorLogin: error instanceof Error ? error.message : "Đăng nhâp thất bại",
                isLoading: false,
            });
            onError?.(error instanceof Error ? error.message : "Đăng nhâp thất bại");

        }
    },

    signUp: async (
        username: string,
        email: string,
        nickname: string,
        password: string,
        onSuccess: () => void,
        onError?: (error: string) => void
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
                    errorSignUp: response.data.description ?? "Đăng ký thất bại",
                    isLoading: false,
                });
                onError?.(response.data.description ?? "Đăng ký thất bại");
            }
        } catch (error) {
            set({
                errorLogin: error instanceof Error ? error.message : "Đăng ký thất bại",
                isLoading: false,
            });
            onError?.(error instanceof Error ? error.message : "Đăng ký thất bại");

        }
    },

    logout: () => {
        set({ user: null, isLoading: false, errorLogin: null });
        localStorage.removeItem(LOCAL_STORAGE_VARIABLE.ACCOUNT_INFO_KEY);
        localStorage.removeItem(LOCAL_STORAGE_VARIABLE.ACCESS_TOKEN_KEY);
        localStorage.removeItem(LOCAL_STORAGE_VARIABLE.REFRESH_TOKEN_KEY);

        setTokenInHeaders(undefined);
        // window.location.href = `/`;
    },
    checkAuth: async (callback?: () => void) => {
        try {
            const account = localStorage.getItem(
                LOCAL_STORAGE_VARIABLE.ACCOUNT_INFO_KEY
            );
            const accessToken = localStorage.getItem(
                LOCAL_STORAGE_VARIABLE.ACCESS_TOKEN_KEY
            );
            if (account && accessToken && !isJWTExpired(accessToken)) {
                setTokenInHeaders(accessToken);
                set({
                    user: JSON.parse(account),
                });
            } else {
                const newAccessToken = await refreshAccessToken();
                if (!newAccessToken) {
                    get().logout();
                }
                else {
                    setTokenInHeaders(newAccessToken);
                    //get account info from server
                    const res = await getAccountInfo();
                    if (res) {
                        set({
                            user: res.data,
                        });
                    }
                    else {
                        get().logout();
                    }

                }
            }
        } catch (error) {
            console.log(error instanceof Error ? error.message : "Token validation failed")
            get().logout();
        } finally {
            callback?.();
        }
    },
    loginTest: async (username: string, password: string, onSuccess: () => void) => {
        set({ isLoading: true, errorLogin: null });
        try {
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        success: true,
                    });
                }, 2000); // 2 giây
            });
            const res = {
                email: username, userName: username, accountID: 1, avatar: 0, nickName: "Test User", level: 1, isCaptcha: false,
                accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6IjM3YjNiNzA5YzY1OWZmNzBkZjMzYzBjNWYyZjY5YTdmIn0.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoyMDUwMjIxOTEwfQ.KAnj90bg6tvSmw2NC7oR5HDl5wS923mkR_tkZ8P9pYfda44Hcdnm07iyQ790TV1lIeHh_9nPUr_PtlGizVrTiA",
                accessTokenFishing: "12e212r13t324t", isMobileActived: true, isAllowChat: true, isAgency: false, preFix: "", isAccountLive: true, mobile: "", locationID: 0, useMK: false
            }
            set({
                user: res,
                isLoading: false,
                errorLogin: null,
            });
            setTokenInHeaders("eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6IjM3YjNiNzA5YzY1OWZmNzBkZjMzYzBjNWYyZjY5YTdmIn0.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoyMDUwMjIxOTEwfQ.KAnj90bg6tvSmw2NC7oR5HDl5wS923mkR_tkZ8P9pYfda44Hcdnm07iyQ790TV1lIeHh_9nPUr_PtlGizVrTiA");
            localStorage.setItem(
                LOCAL_STORAGE_VARIABLE.ACCOUNT_INFO_KEY,
                JSON.stringify({
                    accessToken: res.accessToken,
                    accountID: res.accountID,
                    nickName: res.nickName,
                    userName: res.userName,
                    avatar: res.avatar,
                })
            );
            onSuccess();

        } catch (error) {
            console.log("error", error);
            set({
                errorLogin: error instanceof Error ? error.message : "Login failed",
                isLoading: false,
            });
        }
    },

}));
