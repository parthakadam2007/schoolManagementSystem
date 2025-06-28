const { createStudent } = require("../models/createStudent.js");
const {pool} = require('../dataBase')

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
    if (response.error) return res.status(409).json({ error: response.error });

    res.status(200).json({ response: response });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};


const getUsers = (request, response) => {
  pool.query(`SELECT * FROM students `, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  createStudentController,
  getUsers
};
