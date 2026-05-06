import {
  Model,
  ModelStatic,
  FindOptions,
  WhereOptions,
  CreationAttributes,
  InferAttributes,
} from 'sequelize';

export class BaseRepository<T extends Model<InferAttributes<T>>> {
  constructor(private readonly model: ModelStatic<T>) {}

  async create(data: CreationAttributes<T>): Promise<T> {
    return this.model.create(data);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findByPk(id);
  }

  async findAll(options?: FindOptions<InferAttributes<T>>): Promise<T[]> {
    return this.model.findAll(options);
  }

  async findOne(where: WhereOptions<InferAttributes<T>>): Promise<T | null> {
    return this.model.findOne({ where });
  }

  async update(id: string, data: Partial<InferAttributes<T>>): Promise<T | null> {
    const record = await this.findById(id);
    if (!record) return null;
    return record.update(data);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.destroy({ where: { id } as unknown as WhereOptions<InferAttributes<T>> });
    return result > 0;
  }

  async count(where?: WhereOptions<InferAttributes<T>>): Promise<number> {
    return this.model.count({ where });
  }

  async findAndCount(
    where?: WhereOptions<InferAttributes<T>>,
    options?: FindOptions<InferAttributes<T>>,
  ) {
    return this.model.findAndCountAll({ where, ...options });
  }
}
