const people = require("../models/people");
const { connection } = require("../models");

const create = async (req, res) => {
  try {
    const { body } = req;
    if (body.password !== body.confirmPassword) {
      return res.status(400).send({ message: "Password didn't match" });
    }

    const peopleExists = await people.findOne({
      where: { email: body.email },
    });

    if (peopleExists) {
      return res.status(400).json({ message: "User already exists." });
    }

    const [day, month, year] = body.birthday.split("/");

    const { dataValues: peopleResponse } = await people.create({
      name: body.name,
      email: body.email,
      password: body.password,
      birthday: `${year}-${month}-${day}`,
      phone: body.phone,
    });

    if (body.role === "teacher") {
      await connection.query(
        `INSERT INTO teacher (people_id) VALUES (${peopleResponse.id})`
      );

      delete peopleResponse.password;
      return res.json({
        ...peopleResponse,
        role: "teacher",
      });
    }

    await connection.query(
      `INSERT INTO responsible (people_id) VALUES (${peopleResponse.id})`
    );

    delete peopleResponse.password;
    return res.json({
      ...peopleResponse,
      role: "responsible",
    });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

module.exports = {
  create,
};
