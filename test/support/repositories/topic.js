const {topic: topicMock} = require("../mock");
const MockTopicRepository = {
  findById: (id) => {
    return Promise.resolve({
      dataValues: {
        ...topicMock
      }
    });
  },
  find: (field, value) => {
    return Promise.resolve({
      dataValues: {
        ...topicMock
      }
    });
  }
}

module.exports = {
  MockTopicRepository
}
