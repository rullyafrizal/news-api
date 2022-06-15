const {tag: tagMock} = require("../mock");

const MockTagRepository = {
  findOrCreate: (name) => {
    return Promise.resolve({
      dataValues: {
        ...tagMock
      }
    });
  }
}

module.exports = {
  MockTagRepository
}
