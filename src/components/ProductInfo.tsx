import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ProductCard } from "./ProductCard"

export interface Product {
    id: string
    name: string
    image: string
    price: number
    description?: string
}
  
export interface Category {
    id: string
    name: string
    products: Product[]
  }
  
  export interface Brand {
    id: string
    name: string
    categories: Category[]
  }

  // Mock data
  
export const mockBrands: Brand[] = [
    {
      id: "irayple",
      name: "Irayple",
      categories: [
        {
          id: "robot",
          name: "robot",
          products: [
            {
              id: "irayple-robot-1",
              name: "Irayple Robot 1",
              image: "/placeholder.svg?height=200&width=200",
              price: 999,
              description: "Latest iPhone with A17 Pro chip",
            },
            {
              id: "irayple-robot-2",
              name: "Irayple Robot 2",
              image: "/placeholder.svg?height=200&width=200",
              price: 799,
              description: "Standard iPhone 15 model",
            },
            {
              id: "irayple-robot-3",
              name: "Irayple Robot 3",
              image: "/placeholder.svg?height=200&width=200",
              price: 699,
              description: "Previous generation iPhone",
            },
          ],
        },
        {
          id: "irayple-arm",
          name: "Irayple Arm",
          products: [
            {
              id: "irayple-arm-1",
              name: 'Irayple Arm 1',
              image: "/placeholder.svg?height=200&width=200",
              price: 2499,
              description: "Professional laptop with M3 Max chip",
            },
            {
              id: "irayple-arm-2",
              name: 'Irayple Arm 2',
              image: "/placeholder.svg?height=200&width=200",
              price: 1299,
              description: "Lightweight laptop with M2 chip",
            },
          ],
        },
      ],
    },
    {
      id: "kuka",
      name: "Kuka",
      categories: [
        {
          id: "robot",
          name: "robot",   
          products: [
            {
              id: "kuka-robot-1",
              name: "Kuka Robot 1",
              image: "/placeholder.svg?height=200&width=200",
              price: 1199,
              description: "Premium Android phone with S Pen",
            },
            {
              id: "kuka-robot-2",
              name: "Kuka Robot 2",
              image: "/placeholder.svg?height=200&width=200",
              price: 799,
              description: "Standard Galaxy S24 model",
            },
            {
              id: "kuka-robot-3",
              name: "Kuka Robot 3",
              image: "/placeholder.svg?height=200&width=200",
              price: 449,
              description: "Mid-range Galaxy phone",
            },
          ],
        },
        {
          id: "kuka-arm",
          name: "Kuka Arm",
          products: [
            {
              id: "kuka-arm-1",
              name: "Kuka Arm 1",
              image: "/placeholder.svg?height=200&width=200",
              price: 799,
              description: "Premium Android tablet",
            },
            {
              id: "kuka-arm-2",
              name: "Kuka Arm 2",
              image: "/placeholder.svg?height=200&width=200",
              price: 229,
              description: "Affordable Android tablet",
            },
          ],
        },
      ],
    },
    {
      id: "abb",
      name: "ABB",
      categories: [
        {
          id: "robot",
          name: "robot",
          products: [
            {
              id: "abb-robot-1",
              name: "ABB Robot 1",
              image: "/placeholder.svg?height=200&width=200",
              price: 999,
              description: "Premium ultrabook",
            },
            {
              id: "abb-robot-2",
              name: "ABB Robot 2",
              image: "/placeholder.svg?height=200&width=200",
              price: 649,
              description: "Everyday laptop",
            },
          ],
        },
        {
          id: "abb-arm",
          name: "ABB Arm",
          products: [
            {
              id: "abb-arm-1",
              name: "ABB Arm 1",
              image: "/placeholder.svg?height=200&width=200",
              price: 799,
              description: "Business desktop computer",
            },
            {
              id: "abb-arm-2",
              name: "ABB Arm 2",
              image: "/placeholder.svg?height=200&width=200",
              price: 549,
              description: "Home desktop computer",
            },
          ],
        },
      ],
    },
    {
      id: "tma",
      name: "TMA",
      categories: [
        {
          id: "robot",
          name: "robot",
          products: [
            {
              id: "tma-robot-1",
              name: "TMA Robot 1",
              image: "/placeholder.svg?height=200&width=200",
              price: 399,
              description: "Premium noise-canceling headphones",
            },
            {
              id: "tma-robot-2",
              name: "TMA Robot 2",
              image: "/placeholder.svg?height=200&width=200",
              price: 279,
              description: "True wireless earbuds",
            },
          ],
        },
        {
          id: "tma-arm",
          name: "TMA Arm",
          products: [
            {
              id: "tma-arm-1",
              name: "TMA Arm 1",
              image: "/placeholder.svg?height=200&width=200",
              price: 3899,
              description: "Professional mirrorless camera",
            },
            {
              id: "tma-arm-2",
              name: "TMA Arm 2",
              image: "/placeholder.svg?height=200&width=200",
              price: 1799,
              description: "Cinema line camera",
            },
            {
              id: "tma-arm-3",
              name: "TMA Arm 3",
              image: "/placeholder.svg?height=200&width=200",
              price: 899,
              description: "APS-C mirrorless camera",
            },
          ],
        },
      ],
    },
  ]


export default function ProductInfo() {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  // Tạo all brands và all categories
  const allBrands = { id: "all", name: "Tất cả hãng", categories: [] }
  const allCategories = { id: "all", name: "Tất cả danh mục", products: [] }

  // Lấy tất cả sản phẩm từ tất cả hãng
  const getAllProducts = () => {
    const allProducts: Product[] = []
    mockBrands.forEach(brand => {
      brand.categories.forEach(category => {
        allProducts.push(...category.products)
      })
    })
    return allProducts
  }

  // Lấy tất cả danh mục từ tất cả hãng (gộp các danh mục trùng tên)
  const getAllCategories = () => {
    const categoryMap = new Map<string, Category>()
    
    mockBrands.forEach(brand => {
      brand.categories.forEach(category => {
        if (categoryMap.has(category.name)) {
          // Nếu danh mục đã tồn tại, gộp sản phẩm
          const existingCategory = categoryMap.get(category.name)!
          existingCategory.products.push(...category.products)
        } else {
          // Nếu danh mục chưa tồn tại, tạo mới
          categoryMap.set(category.name, {
            id: category.name, // Sử dụng name làm id để gộp
            name: category.name,
            products: [...category.products]
          })
        }
      })
    })
    
    return Array.from(categoryMap.values())
  }

  // Lấy sản phẩm dựa trên brand và category được chọn
  const getCurrentProducts = () => {
    if (!selectedBrand || selectedBrand.id === "all") {
      if (!selectedCategory || selectedCategory.id === "all") {
        return getAllProducts()
      } else {
        // Lấy sản phẩm từ category cụ thể trong tất cả hãng
        const products: Product[] = []
        mockBrands.forEach(brand => {
          brand.categories.forEach(category => {
            if (category.name === selectedCategory.name) {
              products.push(...category.products)
            }
          })
        })
        return products
      }
    } else {
      if (!selectedCategory || selectedCategory.id === "all") {
        // Lấy tất cả sản phẩm từ brand cụ thể
        const products: Product[] = []
        selectedBrand.categories.forEach(category => {
          products.push(...category.products)
        })
        return products
      } else {
        // Lấy sản phẩm từ brand và category cụ thể
        return selectedCategory.products
      }
    }
  }

  const handleBrandChange = (brand: Brand | null) => {
    setSelectedBrand(brand)
    setSelectedCategory(null)
  }

  const handleCategoryChange = (category: Category | null) => {
    setSelectedCategory(category)
  }

  const handleViewDetails = (product: Product) => {
    alert(`Xem chi tiết sản phẩm: ${product.name}`)
  }

  return (
    <div className="product-info-container">
      {/* Brand Tabs */}
      <div className="brand-tabs">
        <div className="brand-tabs-wrapper">
          {/* All Brands Tab */}
          <button
            onClick={() => handleBrandChange(null)}
            className={`brand-tab ${!selectedBrand ? "active" : "inactive"}`}
          >
            {allBrands.name}
          </button>
          
          {/* Individual Brand Tabs */}
          {mockBrands.map((brand) => (
            <button
              key={brand.id}
              onClick={() => handleBrandChange(brand)}
              className={`brand-tab ${selectedBrand?.id === brand.id ? "active" : "inactive"}`}
            >
              {brand.name}
            </button>
          ))}
        </div>
      </div>

      <div className="main-layout">
        {/* Category Sidebar */}
        <AnimatePresence mode="wait">
            <motion.div
             key={selectedBrand?.id || 'all'}
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: 20 }}
             transition={{ duration: 0.3 }}
             className="category-sidebar"
           >
            <div className="category-sidebar-content">
              <h3 className="category-title">Danh mục</h3>
              <div className="category-buttons">
                {/* All Categories Tab */}
                <button
                  onClick={() => handleCategoryChange(null)}
                  className={`category-button ${!selectedCategory ? "active" : "inactive"}`}
                >
                  {allCategories.name}
                  <span className="category-product-count">
                    {getCurrentProducts().length} sản phẩm
                  </span>
                </button>
                
                {/* Individual Category Tabs */}
                {(selectedBrand ? selectedBrand.categories : getAllCategories()).map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category)}
                    className={`category-button ${selectedCategory?.id === category.id ? "active" : "inactive"}`}
                  >
                    {category.name}
                                         <span className="category-product-count">
                       {selectedBrand 
                         ? category.products.length 
                         : mockBrands.reduce((total, brand) => {
                             const cat = brand.categories.find(c => c.name === category.name)
                             return total + (cat ? cat.products.length : 0)
                           }, 0)
                       } sản phẩm
                     </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Main Content */}
        <div className="main-content">
          {/* Products Grid */}
          <AnimatePresence mode="wait">
                         <motion.div
               key={`${selectedBrand?.id || 'all'}-${selectedCategory?.id || 'all'}`}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.4 }}
             >
              <div className="content-header">
                <h2 className="content-title">
                  {selectedBrand ? selectedBrand.name : allBrands.name} - {selectedCategory ? selectedCategory.name : allCategories.name}
                </h2>
                <p className="content-subtitle">{getCurrentProducts().length} sản phẩm</p>
              </div>

              <div className="products-grid">
                {getCurrentProducts().map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <ProductCard product={product} onViewDetails={handleViewDetails} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {getCurrentProducts().length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="empty-state">
              <div className="empty-state-icon">📦</div>
              <h3 className="empty-state-title">Không có sản phẩm</h3>
              <p className="empty-state-description">
                {selectedBrand && selectedCategory 
                  ? `Không có sản phẩm nào trong ${selectedBrand.name} - ${selectedCategory.name}`
                  : "Không có sản phẩm nào được tìm thấy với bộ lọc hiện tại."
                }
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
