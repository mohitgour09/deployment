import pool from "../../../utils/dbconfig";

import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM test_price");
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.log("Error executing query", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { test_id, test_name, price, lab_id } = await req.json();
    const result = await pool.query(
      `INSERT INTO test_price (test_id, test_name, price, lab_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [test_id, test_name, price, lab_id]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error inserting into course:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
