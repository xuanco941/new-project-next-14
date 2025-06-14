import axios from "axios";

export const API = {
  PORTAL: "" as string | undefined,
}

export async function getAccountBalance(accessToken: string) {
  try {
    const response = await axios.get(("" as string) + "/Account/GetAccountBalance", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
