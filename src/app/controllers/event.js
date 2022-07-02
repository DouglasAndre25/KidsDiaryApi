const event = require("../models/event");

const create = async (req, res) => {
  try {
    const { body } = req;

    const eventResponse = await event.create({
      ...body,
    });

    return res.send({
      data: eventResponse,
    });
  } catch (error) {
    return res.status(500).send({ message: error, error: true });
  }
};

const exclude = async (req, res) => {
  try {
    const { params } = req;

    const eventResponse = await (
      await event.findOne({
        where: {
          id: params.id,
        },
      })
    ).destroy();

    return res.send({
      data: eventResponse,
    });
  } catch (error) {
    return res.status(500).send({ message: error, error: true });
  }
};

module.exports = {
  create,
  exclude,
};
