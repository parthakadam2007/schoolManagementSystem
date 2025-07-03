const { pool,bcrypt } = require("../dataBase.js");

createTeacher = async (prn,username, userEmail, password,year_joined) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password,saltRounds)

    const result = await pool.query(
     "INSERT INTO teachers (prn, name, email, password, year_joined) VALUES ($1, $2, $3, $4, $5) RETURNING teacher_id, prn, name, email, year_joined",
      [prn,username, userEmail, hashedPassword,year_joined]
    );
    console.log(result.rows[0])
    return result.rows[0]

  } catch (err) {
 if (err.code === '23505') { // PostgreSQL unique_violation
    return { error: 'Username or email already exists' }
  }
  return { error: 'DB error' }
  }
};

findTeacherByUsernameAndMatchPasswords = async (email,password) => {
  const result = await pool.query("SELECT * FROM teachers WHERE email = $1", [
    email,
  ]);

  if (result.rows.length==0) {error:'USER NOT FOUND'}
  const user = result.rows[0];

  const match = await bcrypt.compare(password,user.password)

  if(match){
    return {sussuss:result.rows[0]}
  }else{
    return {error:"invalid password"}
  }

};





module.exports = {
  findTeacherByUsernameAndMatchPasswords,
  createTeacher,

};
