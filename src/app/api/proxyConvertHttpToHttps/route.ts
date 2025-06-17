import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get("url");

    if (!url) {
        return NextResponse.json({ error: "Thiếu URL cần proxy" }, { status: 400 });
    }
    try {
        // Gửi request đến URL gốc (HTTP)
        const response = await fetch(decodeURIComponent(url), {
            method: "GET",
            headers: { "Content-Type": "text/html" }, // Hoặc thay đổi nếu dữ liệu khác
        });

        // Lấy dữ liệu từ URL gốc
        const data = await response.text();

        // Chuyển tiếp dữ liệu về client
        return new NextResponse(data, {
            status: response.status,
            headers: { "Content-Type": "text/html" },
        });
    } catch (error) {
        console.error("Lỗi proxy:", error);
        return NextResponse.json({ error: "Lỗi khi gọi proxy" }, { status: 500 });
    }
}