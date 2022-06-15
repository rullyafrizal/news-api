const { news: newsMock, tag: tagMock } = require("../mock");

const MockNewsRepository = {
  update: (id, data) => {
    return Promise.resolve([
      id
    ])
  },
  destroy: (id) => {
    return Promise.resolve([
      id
    ])
  },
  findById: (id) => {
    return Promise.resolve({
      dataValues: {
        ...newsMock
      }
    });
  },
  findAllWithIncludes: (where, includes) => {
    return Promise.resolve([
      {
        dataValues: {
          ...newsMock
        }
      },
    ]);
  },
  findWithIncludes: (field, value, includes) => {
    return Promise.resolve({
      dataValues: {
        ...newsMock
      },
      tags: [
        {
          dataValues: {
            ...tagMock
          }
        }
      ],
      addTag: (tag) => {
        return Promise.resolve(tag);
      },
      removeTag: (tag) => {
        return Promise.resolve(tag);
      }
    });
  }
}

module.exports = {
  MockNewsRepository
}
