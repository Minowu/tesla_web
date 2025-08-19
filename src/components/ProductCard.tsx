import type React from "react"
import { motion } from "framer-motion"

interface Product {
    id: string
    name: string
    image: string
    price: number
    description?: string
}
interface ProductCardProps {
  product: Product
  onViewDetails: (product: Product) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      className="product-card"
    >
      <div className="product-image-container">
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="product-image" />
      </div>
      <div className="product-content">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toLocaleString()}</p>
        {product.description && <p className="product-description">{product.description}</p>}
        <button onClick={() => onViewDetails(product)} className="product-button">
          Xem chi tiết
        </button>
      </div>
    </motion.div>
  )
}
