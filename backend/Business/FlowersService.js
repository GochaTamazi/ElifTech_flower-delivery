const BaseService = require('./BaseService');

class FlowersService extends BaseService {
    constructor(flowerRepo) {
        super(flowerRepo);
    }

    /**
     * Получение цветов по ID магазина с возможностью сортировки
     * @param {string} shopId - ID магазина
     * @param {Object} options - Опции запроса
     * @param {string} [options.sortBy='DateAdded'] - Поле для сортировки (DateAdded или Price)
     * @param {string} [options.sortOrder='DESC'] - Порядок сортировки (ASC или DESC)
     * @param {number} [options.limit] - Ограничение количества записей
     * @param {number} [options.offset] - Смещение для пагинации
     * @returns {Promise<Array>} - Массив цветов
     */
    async getFlowersByShop(shopId, { sortBy = 'DateAdded', sortOrder = 'DESC', limit, offset } = {}) {
        try {
            return await this.repository.getFlowersByShop(shopId, { 
                sortBy, 
                sortOrder, 
                limit, 
                offset 
            });
        } catch (error) {
            throw new Error(`Ошибка при получении цветов магазина: ${error.message}`);
        }
    }

    /**
     * Получение всех цветов с возможностью сортировки
     * @param {Object} options - Опции запроса
     * @param {string} [options.sortBy='DateAdded'] - Поле для сортировки (DateAdded или Price)
     * @param {string} [options.sortOrder='DESC'] - Порядок сортировки (ASC или DESC)
     * @param {number} [options.limit] - Ограничение количества записей
     * @param {number} [options.offset] - Смещение для пагинации
     * @returns {Promise<Array>} - Массив всех цветов
     */
    async getAllFlowers({ sortBy = 'DateAdded', sortOrder = 'DESC', limit, offset } = {}) {
        try {
            return await this.repository.getAllFlowers({ 
                sortBy, 
                sortOrder, 
                limit, 
                offset 
            });
        } catch (error) {
            throw new Error(`Ошибка при получении всех цветов: ${error.message}`);
        }
    }

    /**
     * Поиск цветов по запросу
     * @param {string} query - Поисковый запрос
     * @param {Object} options - Дополнительные параметры
     * @param {string} [options.sortBy='DateAdded'] - Поле для сортировки
     * @param {string} [options.sortOrder='DESC'] - Порядок сортировки
     * @returns {Promise<Array>} - Массив найденных цветов
     */
    async searchFlowers(query, { sortBy = 'DateAdded', sortOrder = 'DESC' } = {}) {
        try {
            // Здесь должна быть логика поиска, но для простоты используем getAllFlowers
            // В реальном приложении здесь был бы полнотекстовый поиск
            const flowers = await this.getAllFlowers({ sortBy, sortOrder });
            return flowers.filter(flower => 
                flower.Name.toLowerCase().includes(query.toLowerCase()) ||
                (flower.Description && flower.Description.toLowerCase().includes(query.toLowerCase()))
            );
        } catch (error) {
            throw new Error(`Ошибка при поиске цветов: ${error.message}`);
        }
    }
}

module.exports = FlowersService;
