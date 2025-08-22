import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ProductCard } from "./ProductCard"

export interface ProductDescription {
    line1: string
    line2?: string
}

export interface Product {
    id: string
    name: string
    image: string
    description?: ProductDescription
    detail?: string
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
          id: "lifting-amr",
          name: "lifting amr",
          products: [
            {
              id: "irayple-rta-c060-lq",
              name: "RTA-C060-LQ",
              image: "/irayple_robot/latent lifting amr/RTA-C060-LQ/cover.png",
              description: { line1: "Load capacity: 600kg", line2: "Navigation: QR code/texture/laser SLAM" },
              detail: "Chi tiết sản phẩm RTA-C060-LQ"
            },
            {
              id: "irayple-rta-c060-lq-2l-e-410",
              name: "RTA-C060-LQ-2L-E-410",
              image: "/irayple_robot/latent lifting amr/RTA-C060-LQ-2L-E-410/cover.png",
              description: { line1: "Load capacity: 600kg", line2: "Navigation: QR code/texture/laser SLAM" },
              detail: "Chi tiết sản phẩm RTA-C060-LQ-2L-E-410"
            },
            {
              id: "irayple-rta-c060-lq-2l-e-421",
              name: "RTA-C060-LQ-2L-E-421",
              image: "/irayple_robot/latent lifting amr/RTA-C060-LQ-2L-E-421/cover.png",
              description: { line1: "Load capacity: 600kg", line2: "Navigation: QR code/texture/laser SLAM" },
              detail: "Chi tiết sản phẩm RTA-C060-LQ-2L-E-421"
            },
            {
              id: "irayple-rta-c060-lq-2l1t-e-410",
              name: "RTA-C060-LQ-2L1T-E-410",
              image: "/irayple_robot/latent lifting amr/RTA-C060-LQ-2L1T-E-410/cover.png",
              description: { line1: "Load capacity: 600kg", line2: "Navigation: QR code/texture/laser SLAM" },
              detail: "Chi tiết sản phẩm RTA-C060-LQ-2L1T-E-410"
            },
            {
              id: "irayple-rta-c060-lq-2l1t-e-421",
              name: "RTA-C060-LQ-2L1T-E-421",
              image: "/irayple_robot/latent lifting amr/RTA-C060-LQ-2L1T-E-421/cover.png",
              description: { line1: "Load capacity: 600kg", line2: "Navigation: QR code/texture/laser SLAM" },
              detail: "Chi tiết sản phẩm RTA-C060-LQ-2L1T-E-421"
            },
            {
              id: "irayple-rta-c060-lq-2l2t-e-410",
              name: "RTA-C060-LQ-2L2T-E-410",
              image: "/irayple_robot/latent lifting amr/RTA-C060-LQ-2L2T-E-410/cover.png",
              description: { line1: "Load capacity: 600kg", line2: "Navigation: QR code/texture/laser SLAM" },
              detail: "Chi tiết sản phẩm RTA-C060-LQ-2L2T-E-410"
            },
            {
              id: "irayple-rta-c060-lq-2l2t-e-421",
              name: "RTA-C060-LQ-2L2T-E-421",
              image: "/irayple_robot/latent lifting amr/RTA-C060-LQ-2L2T-E-421/cover.png",
              description: { line1: "Load capacity: 600kg", line2: "Navigation: QR code/texture/laser SLAM" },
              detail: "Chi tiết sản phẩm RTA-C060-LQ-2L2T-E-421"
            },
            {
              id: "irayple-rta-c100-lq",
              name: "RTA-C100-LQ",
              image: "/irayple_robot/latent lifting amr/RTA-C100-LQ/cover.png",
              description: { line1: "Load capacity: 1000kg", line2: "Navigation: QR code/texture/laser SLAM" },
              detail: "Chi tiết sản phẩm RTA-C100-LQ"
            },
            {
              id: "irayple-rta-c100-lq-2l-e-410",
              name: "RTA-C100-LQ-2L-E-410",
              image: "/irayple_robot/latent lifting amr/RTA-C100-LQ-2L-E-410/cover.png",
              description: { line1: "Load capacity: 1000kg", line2: "Navigation: QR code/texture/laser SLAM" },
              detail: "Chi tiết sản phẩm RTA-C100-LQ-2L-E-410"
            },
            {
              id: "irayple-rta-c100-lq-2l1t-e-410",
              name: "RTA-C100-LQ-2L1T-E-410",
              image: "/irayple_robot/latent lifting amr/RTA-C100-LQ-2L1T-E-410/cover.png",
              description: { line1: "Load capacity: 1000kg", line2: "Navigation: QR code/texture/laser SLAM" },
              detail: "Chi tiết sản phẩm RTA-C100-LQ-2L1T-E-410"
            },
            {
              id: "irayple-rta-c100-lq-2l1t-e-421",
              name: "RTA-C100-LQ-2L1T-E-421",
              image: "/irayple_robot/latent lifting amr/RTA-C100-LQ-2L1T-E-421/cover.png",
              description: { line1: "Navigation: QR code/texture/laser SLAM"  },
              detail: "Chi tiết sản phẩm RTA-C100-LQ-2L1T-E-421"
            },
            {
              id: "irayple-rta-c100-lq-2l2t-e-410",
              name: "RTA-C100-LQ-2L2T-E-410",
              image: "/irayple_robot/latent lifting amr/RTA-C100-LQ-2L2T-E-410/cover.png",
              description: { line1: "Load capacity: 1000kg", line2: "Navigation: QR code/texture/laser SLAM" },
              detail: "Chi tiết sản phẩm RTA-C100-LQ-2L2T-E-410"
            },
            {
              id: "irayple-rta-c100-lq-2l2t-e-421",
              name: "RTA-C100-LQ-2L2T-E-421",
              image: "/irayple_robot/latent lifting amr/RTA-C100-LQ-2L2T-E-421/cover.png",
              description: { line1: "Navigation: QR code/texture/laser SLAM" },
              detail: "Chi tiết sản phẩm RTA-C100-LQ-2L2T-E-421"
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

  // Lấy sản phẩm dựa trên brand và category được chọn (đã sắp xếp theo tên)
  const getCurrentProducts = () => {
    let products: Product[] = []

    if (!selectedBrand || selectedBrand.id === "all") {
      if (!selectedCategory || selectedCategory.id === "all") {
        products = getAllProducts()
      } else {
        // Lấy sản phẩm từ category cụ thể trong tất cả hãng
        mockBrands.forEach(brand => {
          brand.categories.forEach(category => {
            if (category.name === selectedCategory.name) {
              products.push(...category.products)
            }
          })
        })
      }
    } else {
      if (!selectedCategory || selectedCategory.id === "all") {
        // Lấy tất cả sản phẩm từ brand cụ thể
        selectedBrand.categories.forEach(category => {
          products.push(...category.products)
        })
      } else {
        // Lấy sản phẩm từ brand và category cụ thể
        products = selectedCategory.products
      }
    }

    return products.slice().sort((a, b) => a.name.localeCompare(b.name, 'vi', { numeric: true, sensitivity: 'base' }))
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
