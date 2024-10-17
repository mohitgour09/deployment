// pages/api/uploadImage.js
import { NextResponse } from "next/server";
import { uploadFileToS3 } from "../../../uploadtoS3";
import pool from "../../../../utils/dbconfig";

async function saveImageUrlToDatabase(url, emp_id) {
  const client = await pool.connect();
  try {
    await client.query("UPDATE emp_register SET img = $1 WHERE emp_id = $2", [
      url,
      emp_id,
    ]);
  } finally {
    client.release();
  }
}

export async function POST(request) {
  try {
    const emp_id = request.url.split("image/")[1];
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name;
    const fileUrl = await uploadFileToS3(buffer, fileName);

    await saveImageUrlToDatabase(fileUrl, emp_id);

    return NextResponse.json({ success: true, fileUrl });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}