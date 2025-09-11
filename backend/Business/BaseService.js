class BaseService {
    constructor(repository) {
        this.repository = repository;
    }

    async getAll() {
        try {
            return await this.repository.getAll();
        } catch (error) {
            throw new Error(`Error in getAll: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            const result = await this.repository.getById(id);
            if (!result) {
                throw new Error('Not found');
            }
            return result;
        } catch (error) {
            throw new Error(`Error in getById: ${error.message}`);
        }
    }

    async create(data) {
        try {
            return await this.repository.create(data);
        } catch (error) {
            throw new Error(`Error in create: ${error.message}`);
        }
    }

    async update(id, data) {
        try {
            await this.getById(id); // Check if exists
            return await this.repository.update(id, data);
        } catch (error) {
            throw new Error(`Error in update: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            await this.getById(id); // Check if exists
            return await this.repository.delete(id);
        } catch (error) {
            throw new Error(`Error in delete: ${error.message}`);
        }
    }
}

module.exports = BaseService;
