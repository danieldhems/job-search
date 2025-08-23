import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const PUBLIC_PATH = path.resolve(process.env.ROOT_PATH ?? "", "public/");
const UPLOAD_DIR_NAME = "uploads/";

export async function POST(req: Request) {
  const formData = await req.formData();
  const body = Object.fromEntries(formData);
  const file = (body.file as Blob) || null;

  if (file) {
    const buffer = await Buffer.from(await file.arrayBuffer());

    const uploadDestinationDir = path.resolve(PUBLIC_PATH + UPLOAD_DIR_NAME);

    if (!fs.existsSync(uploadDestinationDir)) {
      fs.mkdirSync(uploadDestinationDir);
    }

    const fileName = (body.file as File).name;
    const fileDestination = path.resolve(
      uploadDestinationDir,
      fileName
    );

    // console.log("POST /api/upload -> saving file to path", filePath)
    fs.writeFileSync(
      fileDestination,
      buffer
    );

    return NextResponse.json({
      success: true,
      filePath: UPLOAD_DIR_NAME + fileName,
    });
  } else {
    return NextResponse.json({
      success: false,
    });
  }
}