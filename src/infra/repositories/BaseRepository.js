class BaseRepository {
  constructor(model, domain) {
    this.model = model;
    this.domain = domain;
  }

  /**
   * Adds a new row to a given table.
   *
   * @param {Object} entity
   * @returns {Promise}
   * @memberof BaseRepository
   */
  async create(entity) {
    let entityInstance = entity;

    // is the entity an instance of the domain?
    if (!(entity instanceof this.domain)) {
      // be it's instance
      entityInstance = new this.domain(entity);
    }

    // let's create the record
    try {
      const newEntity = await this.model.create(entityInstance.toJSON());

      // once it's created, return it
      return newEntity;
    } catch (error) {
      throw new Error(error);
    }
  }


  /**
   * Update a row using the ID.
   * @param {Number} id
   * @param {Object} entity
   * @returns {Promise<*>}
   * @memberof BaseRepository
   */
  async update(id, entity) {
    let entityInstance = entity;

    // is the entity an instance of the domain?
    if (!(entity instanceof this.domain)) {
      // be it's instance
      entityInstance = new this.domain(entity);
    }

    // let's update the record
    try {
      const updatedEntity = await this.model.update(entityInstance.toJSON(), {
        where: {
          id,
        }
      });

      // once it's updated, return it
      return updatedEntity;
    } catch (error) {
      throw new Error(error);
    }
  }


  /**
   * Find all rows.
   * @returns {Promise<*|Model[]>}
   */
  async findAll() {
    return this.model.findAll();
  }


  /**
   * Delete a row using the ID.
   * @param id
   * @returns {Promise<*>}
   */
  async destroy(id) {
    return this.model.destroy({
      where: {
        id,
      }
    });
  }

  /**
   * Find a row using the column name and value.
   *
   * @param {String} field
   * @param {String} value
   * @returns {Promise}
   * @memberof BaseRepository
   */
  async find(field, value) {
    return this._findByField(field, value, false);
  }

  /**
   * Find a row using the ID.
   *
   * @param {String} field
   * @param {String} value
   * @returns {Promise}
   * @memberof BaseRepository
   */
  async findById(id) {
    return this._findByField('id', id, false);
  }


  /**
   * Find a row using the column name and value.
   * @param field
   * @param value
   * @param includes
   * @returns {Promise<Model|null>}
   */
  async findWithIncludes(field, value, includes = []) {
    // set the where clause
    const where = { [field]: value };

    // perform search
    return await this.model.findOne({ where, include: includes }, { rejectOnEmpty: true });
  }


  async findAllWithIncludes(where, includes = [], attr) {
    if (attr) {
      return this.model.findAll({
        where,
        include: includes,
        attributes: attr
      }, { rejectOnEmpty: true });
    }

    return this.model.findAll({ where, include: includes }, { rejectOnEmpty: true });
  }

  /**
   * Generic function for finding rows using a field.
   *
   * @param {*} field
   * @param {*} value
   * @param {boolean} [active=true]
   * @returns
   * @memberof BaseRepository
   */
  _findByField(field, value, active = true) {
    // set the where clause
    const where = { [field]: value };

    // perform search
    return this.model.findOne({ where }, { rejectOnEmpty: true });
  }
}

module.exports = BaseRepository;
