class BaseController {
    constructor(service) {
        this.service = service;
    }

    // Get all items
    async getAll(req, res) {
        try {
            const items = await this.service.getAll();
            this.success(res, items);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // Get item by ID
    async getById(req, res) {
        try {
            const item = await this.service.getById(req.params.id);
            if (!item) {
                return this.notFound(res);
            }
            this.success(res, item);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // Create new item
    async create(req, res) {
        try {
            const newItem = await this.service.create(req.body);
            this.success(res, newItem, 201);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // Update item
    async update(req, res) {
        try {
            const updatedItem = await this.service.update(req.params.id, req.body);
            if (!updatedItem) {
                return this.notFound(res);
            }
            this.success(res, updatedItem);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // Delete item
    async delete(req, res) {
        try {
            const deleted = await this.service.delete(req.params.id);
            if (!deleted) {
                return this.notFound(res);
            }
            this.success(res, { id: req.params.id, deleted: true });
        } catch (error) {
            this.handleError(res, error);
        }
    }

    // Common success response
    success(res, data, statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            data
        });
    }

    // Common error response
    error(res, message, statusCode = 400) {
        return res.status(statusCode).json({
            success: false,
            error: message
        });
    }

    // Not found response
    notFound(res, message = 'Resource not found') {
        return this.error(res, message, 404);
    }

    // Handle errors
    handleError(res, error) {
        console.error('Error:', error);
        return this.error(res, error.message || 'Internal server error', error.statusCode || 500);
    }
}

module.exports = BaseController;
