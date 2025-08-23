import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");

export async function POST(req: Request) {
  const formData = await req.formData();
  const body = Object.fromEntries(formData);
  const file = (body.file as Blob) || null;

  if (file) {
    const buffer = await Buffer.from(await file.arrayBuffer());

    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR);
    }

    const filePath = path.resolve(UPLOAD_DIR, (body.file as File).name);
    // console.log("POST /api/upload -> saving file to path", filePath)
    fs.writeFileSync(
      filePath,
      buffer
    );

    return NextResponse.json({
      success: true,
      filePath,
    });
  } else {
    return NextResponse.json({
      success: false,
    });
  }
}