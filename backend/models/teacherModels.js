const { pool,bcrypt } = require("../dataBase.js");

createTeacher = async (prn,username, userEmail, Password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Password,saltRounds)

    const result = await pool.query(
      "INSERT INTO teachers (prn,teacher_name,year_joined) VALUES ($1,$2,$3,$4) RETURNING admin_id, admin_name, admin_email",
      [prn,username, userEmail, hashedPassword]
    );
    console.log(result.rows[0])
    return result.rows[0]

  } catch (err) {
 if (err.code === '23505') { // PostgreSQL unique_violation
    return { error: 'Username or email already exists' }
  }
  }
};

findAdminByUsernameAndMatchPasswords = async (email,password) => {
  const result = await pool.query("SELECT * FROM admin WHERE admin_email = $1", [
    email,
  ]);

  if (result.rows.length==0) {error:'USER NOT FOUND'}
  const user = result.rows[0];

  const match = await bcrypt.compare(password,user.admin_password)

  if(match){
    return {sussuss:result.rows[0]}
  }else{
    return {error:"invalid password"}
  }

};





module.exports = {
  findAdminByUsernameAndMatchPasswords,
  createAdmin,

};
