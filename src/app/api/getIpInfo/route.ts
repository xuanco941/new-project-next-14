import { NextRequest, NextResponse } from "next/server"

//get ip của clinet qua ip-api
export async function GET(req: NextRequest) {

    const data = await req.json();

    let ipInfo;
    await fetch(`http://ip-api.com/json/${data.ip}`)
        .then(response => response.json()) // Chuyển đổi phản hồi thành JSON
        .then(data => {
            ipInfo = data;
        })
        .catch(error => console.error('error get IP:', error));

    return NextResponse.json({ ipInfo })
}
