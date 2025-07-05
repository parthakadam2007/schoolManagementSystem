const { pool,bcrypt } = require("../dataBase.js");


createAdmin = async (username, userEmail, Password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Password,saltRounds)

    const result = await pool.query(
      "INSERT INTO admin (admin_name,admin_email,admin_password) VALUES ($1,$2,$3) RETURNING admin_id, admin_name, admin_email",
      [username, userEmail, hashedPassword]
    );
    console.log("-2323-------->",result.rows[0])
    return result.rows[0]

  } catch (err) {
 if (err.code === '23505') { // PostgreSQL unique_violation
    return { error: 'Username or email already exists' }
  }
  console.log("Error creatinng the admin",err)

   return { error: 'DB ERORR' }
  }
};

findAdminByUsernameAndMatchPasswords = async (email,password) => {
try{
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


}catch(err){
  console.log(err)
  
}
};







module.exports = {
  findAdminByUsernameAndMatchPasswords,
  createAdmin,

};
