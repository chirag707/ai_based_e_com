import { useState } from "react"
import formatCurrency from "../util/formatCurrency"
import StoreItemModal from "./StoreItemModal"
import './css/StoreItem.css'

export default function StoreItem({ item }) {
  const [open, setOpen] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  function openModal() {
    setOpen(true)
  }

  function closeModal() {
    setOpen(false)
  }

  function toggleWishlist(e) {
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  return (
    <>
      <div className="store-item">
        {/* Image Container */}
        <div className="image-container" onClick={openModal}>
          <img
            alt={item.name}
            className="imag"
            src={item.src}
          />
          
          {/* Wishlist Button */}
          <button 
            onClick={toggleWishlist}
            className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
            aria-label="Add to wishlist"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill={isWishlisted ? "currentColor" : "none"}
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          {/* Quick View Icon */}
          <div 
            className="quick-view"
            onClick={openModal}
            role="button"
            tabIndex="0"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>

          {/* Badge for New/Sale items */}
          {item.isNew && (
            <div className="item-badge">New</div>
          )}
          {item.onSale && (
            <div className="item-badge sale">Sale</div>
          )}
        </div>

        {/* Item Content */}
        <div className="item-content">
          {/* Category */}
          <span className="item-category">
            {item.category}
          </span>

          {/* Item Name */}
          <h2 className="item-name">
            {item.name}
          </h2>

          {/* Rating (optional - add if you have rating data) */}
          {item.rating && (
            <div className="item-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.floor(item.rating) ? 'filled' : ''}>
                    ★
                  </span>
                ))}
              </div>
              {item.reviewCount && (
                <span className="rating-count">({item.reviewCount})</span>
              )}
            </div>
          )}

          {/* Description (optional) */}
          {item.description && (
            <p className="item-description">
              {item.description.length > 80 
                ? item.description.substring(0, 80) + '...' 
                : item.description}
            </p>
          )}

          {/* Stock Status (optional) */}
          {item.stock !== undefined && (
            <div className={`stock-status ${
              item.stock > 10 ? 'in-stock' : 
              item.stock > 0 ? 'low-stock' : 
              'out-of-stock'
            }`}>
              <span className="stock-indicator"></span>
              {item.stock > 10 ? 'In Stock' : 
               item.stock > 0 ? `Only ${item.stock} left` : 
               'Out of Stock'}
            </div>
          )}

          {/* Price Container */}
          <div className="price-container">
            <div className="item-price">
              {formatCurrency(item.priceCents / 100)}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="item-actions">
            <button
              onClick={openModal}
              className="btn-primary"
            >
              <span>View Details</span>
            </button>
          </div>
        </div>
      </div>
      
      <StoreItemModal item={item} open={open} closeModal={closeModal} />
    </>
  )
}
