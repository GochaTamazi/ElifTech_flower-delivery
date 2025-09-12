import React, { useState, useEffect } from 'react';
import { Flower } from '../../types';
import './ProductCard.css';
import { useSession } from '../../hooks/useSession';

const API_BASE_URL = 'http://localhost:3000';

interface ProductCardProps {
    flower: Flower;
    onAddToCart: (flower: Flower) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ flower, onAddToCart }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { userId } = useSession();

    // Функция для обработки добавления в избранное
    const handleAddToFavorites = async (flowerId: number) => {
        if (!userId) {
            alert('Пожалуйста, авторизуйтесь, чтобы добавлять в избранное');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/favorites/${flowerId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Не удалось добавить в избранное');
            }

            setIsFavorite(true);
        } catch (error) {
            console.error('Ошибка при добавлении в избранное:', error);
            setIsFavorite(false);
        } finally {
            setIsLoading(false);
        }
    };

    // Функция для обработки удаления из избранного
    const handleRemoveFromFavorites = async (favoriteId: number) => {
        if (!userId) return;

        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/favorites/${favoriteId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Не удалось удалить из избранного');
            }

            setIsFavorite(false);
        } catch (error) {
            console.error('Ошибка при удалении из избранного:', error);
            setIsFavorite(true);
        } finally {
            setIsLoading(false);
        }
    };

    // Обработчик клика по кнопке избранного
    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        
        if (isLoading) return;
        
        if (isFavorite) {
            // Здесь нужно получить ID записи в избранном, если он у вас есть
            // Показываю пример с flower.Id, но вам нужно использовать правильный ID записи
            handleRemoveFromFavorites(flower.Id);
        } else {
            handleAddToFavorites(flower.Id);
        }
    };
    return (
        <div className="product-card" title={flower.Description}>
            <div className="flower-image">
                <img
                    src={`/images/${flower.ImageUrl}`}
                    alt={flower.Name}
                />
                <button 
                    className={`favorite-btn ${isFavorite ? 'favorite-active' : ''}`}
                    onClick={handleFavoriteClick}
                    aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
                >
                    ❤
                </button>
            </div>


            <div className="cart-item-name-container">
                <h3 className="cart-item-name">{flower.Name}</h3>
                {flower.Description && (
                    <div className="tooltip">
                        <span className="tooltip-icon">i</span>
                        <span className="tooltip-text">{flower.Description}</span>
                    </div>
                )}
            </div>


            <p>${flower.Price}</p>
            <div className="product-card-footer">
                <button
                    className="add-to-cart"
                    onClick={() => onAddToCart(flower)}
                >
                    Add to Cart
                </button>
                <div className="date-added">
                    {new Date(flower.DateAdded).toLocaleDateString('ru-RU', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
