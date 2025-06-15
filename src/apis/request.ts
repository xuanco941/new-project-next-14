import axios, { AxiosRequestConfig, CancelTokenSource } from "axios";

import { LOCAL_STORAGE_VARIABLE } from "@/contans/LOCAL_STORAGE_VARIABLE";
import { jwtDecode } from "jwt-decode";

//axios interceptors
axios.interceptors.request.use(
    async (config) => {
        let token = localStorage.getItem(LOCAL_STORAGE_VARIABLE.ACCESS_TOKEN_KEY);
        if (token && isJWTExpired(token)) {
            token = await refreshAccessToken();
        }

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        console.log("error", error);
        return Promise.reject(error);
    }
);

//set token vào headers khi có token mới (login, refresh token)
export const setTokenInHeaders = (accessToken: string | undefined, refreshToken?: string) => {
    if (accessToken) {
        axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
        localStorage.setItem(LOCAL_STORAGE_VARIABLE.ACCESS_TOKEN_KEY, accessToken);
    } else {
        console.log("delete token");
        delete axios.defaults.headers["Authorization"];
        localStorage.removeItem(LOCAL_STORAGE_VARIABLE.ACCESS_TOKEN_KEY);
    }

    if (refreshToken) {
        localStorage.setItem(LOCAL_STORAGE_VARIABLE.REFRESH_TOKEN_KEY, refreshToken);
    }
};

const setAccessTokenToUrl = (url: string) => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_VARIABLE.ACCESS_TOKEN_KEY);
    if (accessToken && accessToken?.length) {
        url += (url.indexOf("?") == -1 ? "?" : "&") + `access_token=${accessToken}`;
    }

    return url;
};

function isJWTExpired(token: string) {
    if (!token || token.split('.').length !== 3) {
        return true;
    }
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp && decodedToken.exp - 10 < currentTime;
}

const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_VARIABLE.REFRESH_TOKEN_KEY);
    if (!refreshToken) return null;

    try {
        const response = await axios.post("/auth/refresh-token", {
            refreshToken,
        });

        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;

        if (newAccessToken) {
            setTokenInHeaders(newAccessToken);
        }
        if (newRefreshToken) {
            localStorage.setItem(LOCAL_STORAGE_VARIABLE.REFRESH_TOKEN_KEY, newRefreshToken);
        }

        return newAccessToken;
    } catch (error) {
        console.error("Failed to refresh token", error);
        setTokenInHeaders(undefined); // clear accessToken
        localStorage.removeItem(LOCAL_STORAGE_VARIABLE.REFRESH_TOKEN_KEY);
        return null;
    }
};



//handle error response
const handleError = (error: any): any => {
    const resp: any = error.response;

    if (resp == null || resp.data == null) {
        return { data: { ResponseCode: -99, Message: "Internal Server Error!" } };
    }

    return resp;
};


export const get = async (
    url: string,
    cancelTokenSource?: CancelTokenSource
): Promise<any> => {
    try {
        const response = await axios.get(setAccessTokenToUrl(url), {
            cancelToken: cancelTokenSource?.token,
            method: "GET",
        });
        return response;
    } catch (error) {
        return handleError(error);
    }
};

export const post = async (
    url: string,
    body: Record<any, any>,
    cancelTokenSource?: CancelTokenSource
): Promise<any> => {
    const config: AxiosRequestConfig = {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers":
                "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length",
        },
    };

    if (cancelTokenSource) {
        config.cancelToken = cancelTokenSource.token;
    }

    const data = JSON.stringify(body);

    try {
        const response = await axios.post(setAccessTokenToUrl(url), data, config);
        // logInfo(`POST ${url}`, response.data);
        return response;
    } catch (error) {
        return handleError(error);
    }
};

export const put = async (
    url: string,
    body: Record<any, any>,
    cancelTokenSource?: CancelTokenSource
): Promise<any> => {
    const config: AxiosRequestConfig = {};
    if (cancelTokenSource) {
        config.cancelToken = cancelTokenSource.token;
    }
    const data = JSON.stringify(body);

    try {
        const response = await axios.put(setAccessTokenToUrl(url), data, config);
        // logInfo(`PUT ${url}`, response.data);
        return response;
    } catch (error) {
        return handleError(error);
    }
};

export const del = async (
    url: string,
    body: Record<any, any>,
    cancelTokenSource?: CancelTokenSource
): Promise<any> => {
    const config: AxiosRequestConfig = {};
    if (cancelTokenSource) {
        config.cancelToken = cancelTokenSource.token;
    }
    const data = JSON.stringify(body);

    try {
        const response = await axios.delete(setAccessTokenToUrl(url), { data });
        // logInfo(`DELETE ${url}`, response.data);
        return response;
    } catch (error) {
        return handleError(error);
    }
};

export const postForm = async (
    url: string,
    body: Record<any, any>,
    cancelTokenSource?: CancelTokenSource
): Promise<any> => {
    const config: AxiosRequestConfig = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    };
    if (cancelTokenSource) {
        config.cancelToken = cancelTokenSource.token;
    }
    const form = new FormData();
    Object.entries(body).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.map((item) => {
                form.append(key, item);
            });
        } else {
            form.append(key, value);
        }
    });
    try {
        const response = await axios.post(setAccessTokenToUrl(url), form, config);
        // logInfo(`POST FORM ${url}`, response.data);
        return response;
    } catch (error) {
        return handleError(error);
    }
};

