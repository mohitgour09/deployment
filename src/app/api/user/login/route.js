import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import pool from "../../../utils/dbconfig";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const sql = "SELECT * FROM emp_register WHERE email = $1";

    const { rows } = await pool.query(sql, [email]);

    if (rows.length > 0) {
      const user = rows[0];
      const payload = {
        emp_id: user.emp_id,
        email: user.email,
      };

      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const token = jwt.sign(payload, "jwt-secret-key", {
          expiresIn: "1d",
        });

        const response = NextResponse.json({ Status: "Success", token });
        response.cookies.set("token", token, {
          httpOnly: true,
          maxAge: 60 * 60 * 24,
        });

        return response;
      } else {
        return NextResponse.json(
          { Error: "Password not matched" },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json({ Error: "No userid existed" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ Err: "Login error in server" }, { status: 500 });
  }
}

// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const emp_id = searchParams.get("emp_id");
//     console.log(emp_id);
//     const result = await pool.query(`SELECT p.*
//       FROM patient p
//       JOIN appointment a ON p.patient_id = a.patient_id
//       WHERE a.emp_id = ${emp_id}`);
//     return NextResponse.json(result.rows, { status: 200 });
//   } catch (error) {
//     console.error("Error executing query", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const emp_id = searchParams.get("emp_id");
    
    // Log the emp_id for debugging purposes
    console.log("Employee ID:", emp_id);

    // Check if emp_id is provided
    if (!emp_id) {
      return NextResponse.json(
        { error: "Employee ID is required" },
        { status: 400 }
      );
    }

    // Use parameterized query to prevent SQL injection
    const sql = `
      SELECT p.*
      FROM patient p
      JOIN appointment a ON p.patient_id = a.patient_id
      WHERE a.emp_id = $1
    `;

    const result = await pool.query(sql, [emp_id]);

    // Return the fetched rows as a response
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Error executing query:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}