class UsersFavoritesService {
    constructor(usersFavoritesRepository) {
        this.usersFavoritesRepository = usersFavoritesRepository;
    }

    // Добавить цветок в избранное
    async addToFavorites(userId, flowerId) {
        try {
            if (!userId || !flowerId) {
                throw new Error('Не указан ID пользователя или цветка');
            }
            return await this.usersFavoritesRepository.addToFavorites(userId, flowerId);
        } catch (error) {
            console.error('Ошибка при добавлении в избранное:', error);
            throw error;
        }
    }

    // Удалить цветок из избранного
    async removeFromFavorites(userId, flowerId) {
        try {
            if (!userId || !flowerId) {
                throw new Error('Не указан ID пользователя или цветка');
            }
            return await this.usersFavoritesRepository.removeFromFavorites(userId, flowerId);
        } catch (error) {
            console.error('Ошибка при удалении из избранного:', error);
            throw error;
        }
    }

    // Проверить, находится ли цветок в избранном
    async isFavorite(userId, flowerId) {
        try {
            if (!userId || !flowerId) {
                return false;
            }
            return await this.usersFavoritesRepository.GetOne(userId, flowerId);
        } catch (error) {
            console.error('Ошибка при проверке избранного:', error);
            return false;
        }
    }

    // Получить все избранные цветы пользователя
    async getUserFavorites(userId) {
        try {
            if (!userId) {
                throw new Error('Не указан ID пользователя');
            }
            return await this.usersFavoritesRepository.getUserFavorites(userId);
        } catch (error) {
            console.error('Ошибка при получении избранного:', error);
            throw error;
        }
    }

}

module.exports = UsersFavoritesService;
