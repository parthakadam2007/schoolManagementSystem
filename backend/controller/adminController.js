const {
  createStudent,
  editStudent,
  findStudent,
} = require("../models/studentModels.js");
const { pool } = require("../dataBase");

const createStudentController = async (req, res) => {
  const {
    prn,
    name,
    email,
    password,
    roll_no,
    year_joined,
    division_id,
    branch_id,
  } = req.body;
  try {
    const response = await createStudent(
      prn,
      name,
      email,
      password,
      roll_no,
      year_joined,
      division_id,
      branch_id
    );
    console.log(  prn,
      name,
      email,
      password,
      roll_no,
      year_joined,
      division_id,
      branch_id)
    if (response?.error  ) return res.status(409).json({ error: response.error });
   

    res.status(200).json({ response: response });
  } catch (err) {
    console.log("error while creatiing stdent,",err)
    res.status(500).json({ error: {err} });
  }
};

const getUsers = (request, response) => {
  pool.query(`SELECT * FROM students `, (error, results) => {
    if (error) {
      console.log(error)
      throw error;
    }
    console.log('l------->getUsers')
    response.status(200).json(results.rows);
  });
};

const handleEditStudent = async(req, res) => {
  const {
    prn, // the unique student ID to find
    name,
    email,
    password, // optional
    roll_no,
    year_joined,
    division_id,
    branch_id,
  } = req.body;

  try {
    const response = await editStudent(
      prn, // the unique student ID to find
      name,
      email,
      password, // optional
      roll_no,
      year_joined,
      division_id,
      branch_id
    );

    res.json({response:response})
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const handleFindStudent=async (req,res)=>{
  const prn = req.params.studentPRN
  console.log(prn)
  try{
    const response = await findStudent(prn)
     if (response.error) return res.status(409).json({ error: response.error });
    res.json(response)
  }catch(err){
    res.status(500).json({ error: err });

  }
}

module.exports = {
  createStudentController,
  getUsers,
  handleEditStudent,
  handleFindStudent
};
