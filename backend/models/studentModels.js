const { response } = require("express");
const { pool, bcrypt } = require("../dataBase.js");

createStudent = async (
  prn,
  name,
  email,
  password,
  roll_no,
  year_joined,
  division_id,
  branch_id
) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
      "INSERT INTO students (prn,name,email,password,roll_no,year_joined,division_id,branch_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING name",
      [
        prn,
        name,
        email,
        hashedPassword,
        roll_no,
        year_joined,
        division_id,
        branch_id,
      ]
    );
    return result.rows[0];
  } catch (err) {
    if (err.code === "23505") {
      // PostgreSQL unique_violation
      return { error: "Username or email already exists" };
    }
  }
};

findStudentByUsernameAndMatchPasswords = async (email, password) => {
  const result = await pool.query("SELECT * FROM students WHERE email = $1", [
    email,
  ]);

  if (result.rows.length == 0) {
    error: "USER NOT FOUND";
  }
  const user = result.rows[0];

  const match = await bcrypt.compare(password, user.password);

  if (match) {
    return { sussuss: result.rows[0] };
  } else {
    return { error: "invalid password" };
  }
};

editStudent = async (
  prn, // the unique student ID to find
  name,
  email,
  password, // optional
  roll_no,
  year_joined,
  division_id,
  branch_id
) => {
  try {
    let hashedPassword = null;

    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    const result = await pool.query(
      `
      UPDATE students 
      SET 
        name = $1,
        email = $2,
        hashedPassword  = $3
        roll_no = $4,
        year_joined = $5,
        division_id = $6,
        branch_id = $7
      WHERE prn = $8
      RETURNING name
      `,
      [
        name,
        email,
        hashedPassword,
        roll_no,
        year_joined,
        division_id,
        branch_id,
        prn,
      ]
    );

    if (result.rowCount === 0) {
      return { error: "Student not found" };
    }

    return result.rows[0];
  } catch (err) {
    if (err.code === "23505") {
      return { error: "Email already exists" };
    }
    throw err; // let other errors bubble up
  }
};

findStudent = async (prn) => {
  try {
    const response = await pool.query("SELECT * FROM students WHERE prn = $1 ", [prn]);
    console.log(response.rows[0])
    return response.rows[0];
  } catch (err) {
    return { error: err };
  }
};

module.exports = {
  createStudent,
  findStudentByUsernameAndMatchPasswords,
  editStudent,
  findStudent
};
