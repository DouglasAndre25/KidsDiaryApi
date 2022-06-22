const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const people = require("../models/people");
const { connection } = require("../models");
const responsible = require("../models/responsible");
const teacher = require("../models/teacher");

const create = async (req, res) => {
  const transaction = await connection.transaction();
  try {
    const { body } = req;
    if (body.password !== body.confirmPassword) {
      return res
        .status(400)
        .send({ message: "Password didn't match", error: true });
    }

    const peopleExists = await people.findOne({
      where: { email: body.email },
    });

    if (peopleExists) {
      return res
        .status(400)
        .json({ message: "User already exists.", error: true });
    }

    let day;
    let month;
    let year;
    if (body.birthday) {
      [day, month, year] = body.birthday.split("/");
    }

    const peopleResponse = await people.create(
      {
        name: body.name,
        email: body.email,
        password: body.password,
        birthday: body.birthday ? `${year}-${month}-${day}` : undefined,
        phone: body.phone,
      },
      { transaction }
    );

    const token = jwt.sign({ id: peopleResponse.id }, process.env.APP_SECRET, {
      expiresIn: process.env.APP_SECRET_EXPIRES,
    });

    await connection.query(
      `INSERT INTO ${body.role} (people_id) VALUES (${peopleResponse.id})`,
      { transaction }
    );

    await transaction.commit();

    delete peopleResponse.dataValues.password;
    return res.json({
      data: {
        ...peopleResponse.dataValues,
        role: body.role,
      },
      token,
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).send({ message: error, error: true });
  }
};

const login = async (req, res) => {
  try {
    const { body } = req;
    const peopleResponse = await people.findOne({
      where: { email: body.email },
      include: [
        {
          model: responsible,
          as: "responsible",
          attributes: ["id"],
        },
        {
          model: teacher,
          as: "teacher",
          attributes: ["id"],
        },
      ],
    });

    if (!peopleResponse)
      return res.status(401).send({ message: "User not found.", error: true });

    if (await !bcrypt.compare(body.password, peopleResponse.password))
      return res
        .status(401)
        .send({ message: "Password does not match", error: true });

    delete peopleResponse.password;
    return res.send({
      data: {
        ...peopleResponse.dataValues,
        role: peopleResponse.responsible ? "responsible" : "teacher",
      },
      token: jwt.sign({ id: peopleResponse.id }, process.env.APP_SECRET, {
        expiresIn: process.env.APP_SECRET_EXPIRES,
      }),
    });
  } catch (error) {
    return res.status(500).send({ message: error, error: true });
  }
};

module.exports = {
  create,
  login,
};
