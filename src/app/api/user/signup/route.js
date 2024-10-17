import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import pool from "../../../utils/dbconfig";

export async function POST(req) {
  try {
    const {emp_name, email, password} =
      await req.json();

    // Query to check if a employee with the same email already exists
    const query = "SELECT * FROM  emp_register WHERE email = $1";

    // Insert query with parameter placeholders
    const query1 = `INSERT INTO  emp_register (emp_name, email, password)
       VALUES ($1, $2, $3)
       RETURNING *`;

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const values = [
      emp_name,
      email,
      hashedPassword
    ];

    // Check if the email already exists
    const existingEmp = await pool.query(query, [email]);

    if (existingEmp.rows.length > 0) {
      return NextResponse.json(
        { Message: "Userid already exists" },
        { status: 400 }
      );
    }

    // Insert the new teacher into the database
    const result = await pool.query(query1, values);
    return NextResponse.json(
      { Status: "User registered successfully", data: result.rows[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error inserting into Employee:", error);
    return NextResponse.json({ Error: error.message }, { status: 500 });
  }
}