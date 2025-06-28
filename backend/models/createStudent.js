const { pool,bcrypt } = require("../dataBase.js");

createStudent = async (prn,name,email,password,roll_no,year_joined,division_id,branch_id) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password,saltRounds)

    const result = await pool.query(
      "INSERT INTO students (prn,name,email,password,roll_no,year_joined,division_id,branch_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING name",
      [prn,name,email,hashedPassword,roll_no,year_joined,division_id,branch_id]
    );
    console.log(result.rows[0])
    return result.rows[0]

  } catch (err) {
 if (err.code === '23505') { // PostgreSQL unique_violation
    return { error: 'Username or email already exists' }
  }
  }
};

module.exports = {
  createStudent
}