const student = require("../models/student");

const create = async (req, res) => {
  const { body } = req;

  let day;
  let month;
  let year;
  if (body.birthday) {
    [day, month, year] = body.birthday.split("/");
  }

  try {
    const studentResponse = await student.create({
      ...body,
      birthday: body.birthday ? `${year}-${month}-${day}` : undefined,
    });

    return res.send({
      data: studentResponse,
    });
  } catch (error) {
    return res.status(500).send({ message: error, error: true });
  }
};

module.exports = {
  create,
};
