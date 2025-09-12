import React, { useState, useContext } from 'react';
import { Flower } from '../../types';
import './ProductCard.css';
import { useSession } from '../../hooks/useSession';

interface ProductCardProps {
    flower: Flower;
    onAddToCart: (flower: Flower) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({flower, onAddToCart}) => {
    const [isFavorite, setIsFavorite] = useState(false);
    
    const { userId } = useSession();
    
    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        const newFavoriteState = !isFavorite;
        setIsFavorite(newFavoriteState);
        
        // Генерируем случайный ID, если нет сессии
        const getRandomUserId = () => {
            return 'user_' + Math.floor(Math.random() * 1000000);
        };

        // Формируем JSON с данными
        const favoriteData = {
            UserID: userId || getRandomUserId(),
            FlowerID: flower.Id,
            Favorite: newFavoriteState ? 1 : 0
        };
        
        // Выводим JSON в alert
        alert(JSON.stringify(favoriteData, null, 2));
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
