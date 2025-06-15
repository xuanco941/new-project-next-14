import { get, post } from "./request";

export const PORTAL_END_POINT = process.env.NEXT_PUBLIC_API_PORTAL as string;

export const getWalletsAccount = async () => {
    const resp = await get(`${PORTAL_END_POINT}/Account/GetAccountBalance`);
    return resp;
};

export const getAccountInfo = async () => {
    const resp = await get(`${PORTAL_END_POINT}/Authen/RefreshToken`);
    return resp;
};

export const loginAccount = async (body: {
    CaptchaText: string;
    DeviceName: string;
    IpAddress: string;
    MerchantID: number;
    Password: string;
    PlatformID: number;
    Uiid: string;
    UserName: string;
}) => {
    const res = await post(`${PORTAL_END_POINT}/Authen/Login`, body);
    return res;
};
export const signUpAccount = async (body: {
    CaptchaText: string;
    DeviceName: string;
    IpAddress: string;
    MerchantID: number;
    Password: string;
    PlatformID: number;
    Uiid: string;
    UserName: string;
    NickName: string;
}) => {
    const res = await post(`${PORTAL_END_POINT}/Authen/FastRegister`, body);
    return res;
};