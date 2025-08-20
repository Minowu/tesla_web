import type React from "react"
import { Link } from "react-router-dom"
import "../styles/components.css"

const samplePosts = [
    {
      id: 1,
      title: "Hợp tác tự động hóa dây chuyền lắp ráp tại Honda Việt Nam",
      slug: "hop-tac-tu-dong-hoa-day-chuyen-lap-rap-honda-viet-nam",
      thumbnail: "/kyket.png",
      content: "Triển khai robot công nghiệp, hệ thống băng chuyền thông minh và giám sát chất lượng realtime giúp tối ưu năng suất nhà máy Honda.",
      author: "Thadorobot Team",
      createdAt: "2024-03-12T09:00:00Z",
      isFeatured: true,
    },
    {
      id: 2,
      title: "Viettel: Giám sát – bảo trì thông minh bằng IoT & AI",
      slug: "viettel-giam-sat-bao-tri-thong-minh-iot-ai",
      thumbnail: "/kyket.png",
      content: "Xây dựng nền tảng IoT giám sát thiết bị và AI dự báo hỏng hóc, giảm thời gian dừng máy, nâng cao độ sẵn sàng hệ thống cho Viettel.",
      author: "Thadorobot Team",
      createdAt: "2024-02-26T10:30:00Z",
      isFeatured: false,
    },
    {
      id: 3,
      title: "VinFast: Tự động hóa kho thông minh và truy xuất dữ liệu",
      slug: "vinfast-tu-dong-hoa-kho-thong-minh-truy-xuat-du-lieu",
      thumbnail: "/kyket.png",
      content: "Triển khai AGV/AMR, WMS tích hợp và dashboard realtime giúp tối ưu luồng hàng, rút ngắn lead time tại kho VinFast.",
      author: "Thadorobot Team",
      createdAt: "2024-02-10T08:15:00Z",
      isFeatured: true,
    },
    {
      id: 4,
      title: "THACO: Nâng cấp đóng gói với AGV/AMR và thị giác máy",
      slug: "thaco-nang-cap-dong-goi-agv-amr-thi-giac-may",
      thumbnail: "/kyket.png",
      content: "Ứng dụng robot di động và camera AI kiểm tra lỗi, tự động hóa khâu đóng gói – dán nhãn, tăng độ chính xác và an toàn.",
      author: "Thadorobot Team",
      createdAt: "2024-01-28T14:45:00Z",
      isFeatured: false,
    },
    {
      id: 5,
      title: "Samsung: Robot kiểm tra chất lượng linh kiện điện tử",
      slug: "samsung-robot-kiem-tra-chat-luong-linh-kien-dien-tu",
      thumbnail: "/kyket.png",
      content: "Kết hợp cánh tay robot, camera công nghiệp và AI phát hiện lỗi bề mặt, giảm tỉ lệ lỗi và chi phí kiểm tra thủ công.",
      author: "Thadorobot Team",
      createdAt: "2024-01-12T11:20:00Z",
      isFeatured: true,
    },
  ]
interface Blog {
  id: number
  title: string
  slug: string
  thumbnail: string
  content: string
  author: string
  createdAt: string
  isFeatured: boolean
}

interface BlogListProps {
  blogs?: Blog[]
  limit?: number
}

const BlogSection: React.FC<BlogListProps> = ({ blogs = [], limit }) => {
  // Chọn nguồn dữ liệu: ưu tiên blogs truyền vào, nếu không có dùng samplePosts
  const sourceBlogs = blogs.length > 0 ? blogs : samplePosts
  const displayBlogs = limit ? sourceBlogs.slice(0, limit) : sourceBlogs

  // Format ngày tháng
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <main className="container">
        <div className="blog-list">
          {displayBlogs.map((blog) => (
            <article key={blog.id} className="blog-item">
              <Link to={`/bai-viet/${blog.slug}`} className="blog-link">
                <div className="blog-thumbnail">
                  <img src={blog.thumbnail || "/placeholder.svg"} alt={blog.title} loading="lazy" />
                </div>
                <div className="blog-content">
                  <h3 className="blog-title">{blog.title}</h3>
                  <time className="blog-date" dateTime={blog.createdAt}>
                    {formatDate(blog.createdAt)}
                  </time>
                </div>
              </Link>
            </article>
          ))}
        </div>

    </main>
  )
}

export default BlogSection
