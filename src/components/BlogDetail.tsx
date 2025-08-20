import { Link } from "react-router-dom"
import "../styles/components.css"

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

// Dữ liệu mẫu - trong thực tế sẽ lấy từ database
const sampleBlogs: Blog[] = [
  {
    id: 1,
    title: "Hợp tác tự động hóa dây chuyền lắp ráp tại Honda Việt Nam",
    slug: "hop-tac-tu-dong-hoa-day-chuyen-lap-rap-honda-viet-nam",
    thumbnail: "/robot1.png",
    content: `
      <h2>Tổng quan dự án</h2>
      <p>Chúng tôi triển khai robot công nghiệp, hệ thống băng chuyền thông minh và giám sát chất lượng realtime giúp tối ưu năng suất nhà máy Honda.</p>
      <h2>Giải pháp</h2>
      <ul>
        <li>Tự động hóa lắp ráp với cánh tay robot</li>
        <li>AGV/Conveyor thông minh đồng bộ nhịp sản xuất</li>
        <li>Kiểm tra chất lượng bằng thị giác máy</li>
      </ul>
      <h2>Kết quả</h2>
      <p>Tăng 35% hiệu suất, giảm 22% lỗi công đoạn và rút ngắn lead time 18% trong 3 tháng đầu.</p>
    `,
    author: "Thadorobot Team",
    createdAt: "2024-03-12T09:00:00Z",
    isFeatured: true,
  },
  {
    id: 2,
    title: "Viettel: Giám sát – bảo trì thông minh bằng IoT & AI",
    slug: "viettel-giam-sat-bao-tri-thong-minh-iot-ai",
    thumbnail: "/robot2.png",
    content: `
      <h2>Tổng quan dự án</h2>
      <p>Xây dựng nền tảng IoT giám sát thiết bị và AI dự báo hỏng hóc, giảm thời gian dừng máy, nâng cao độ sẵn sàng hệ thống cho Viettel.</p>
      <h2>Giải pháp</h2>
      <ul>
        <li>Thu thập dữ liệu cảm biến realtime từ thiết bị mạng</li>
        <li>Machine Learning dự báo lỗi và khuyến nghị bảo trì</li>
        <li>Dashboard vận hành tập trung</li>
      </ul>
      <h2>Kết quả</h2>
      <p>Giảm 30% downtime, tiết kiệm 18% chi phí bảo trì định kỳ.</p>
    `,
    author: "Thadorobot Team",
    createdAt: "2024-02-26T10:30:00Z",
    isFeatured: false,
  },
  {
    id: 3,
    title: "VinFast: Tự động hóa kho thông minh và truy xuất dữ liệu",
    slug: "vinfast-tu-dong-hoa-kho-thong-minh-truy-xuat-du-lieu",
    thumbnail: "/robot3.png",
    content: `
      <h2>Tổng quan dự án</h2>
      <p>Triển khai AGV/AMR, WMS tích hợp và dashboard realtime giúp tối ưu luồng hàng, rút ngắn lead time tại kho VinFast.</p>
      <h2>Giải pháp</h2>
      <ul>
        <li>WMS tích hợp ERP và hệ thống sản xuất</li>
        <li>Điều phối AGV/AMR và tối ưu tuyến</li>
        <li>Truy xuất dữ liệu và cảnh báo realtime</li>
      </ul>
      <h2>Kết quả</h2>
      <p>Tăng 40% hiệu suất nhập-xuất, giảm 25% lỗi soạn hàng.</p>
    `,
    author: "Thadorobot Team",
    createdAt: "2024-02-10T08:15:00Z",
    isFeatured: true,
  },
  {
    id: 4,
    title: "THACO: Nâng cấp đóng gói với AGV/AMR và thị giác máy",
    slug: "thaco-nang-cap-dong-goi-agv-amr-thi-giac-may",
    thumbnail: "/robot4.png",
    content: `
      <h2>Tổng quan dự án</h2>
      <p>Ứng dụng robot di động và camera AI kiểm tra lỗi, tự động hóa khâu đóng gói – dán nhãn, tăng độ chính xác và an toàn.</p>
      <h2>Giải pháp</h2>
      <ul>
        <li>AMR cấp liệu – thu hồi tự động giữa các công đoạn</li>
        <li>Thị giác máy kiểm tra lỗi bề mặt và xác minh mã vạch</li>
        <li>Tích hợp PLC/SCADA và hệ thống MES</li>
      </ul>
      <h2>Kết quả</h2>
      <p>Giảm 20% lỗi đóng gói, tăng 28% thông lượng và cải thiện an toàn lao động.</p>
    `,
    author: "Thadorobot Team",
    createdAt: "2024-01-28T14:45:00Z",
    isFeatured: false,
  },
  {
    id: 5,
    title: "Samsung: Robot kiểm tra chất lượng linh kiện điện tử",
    slug: "samsung-robot-kiem-tra-chat-luong-linh-kien-dien-tu",
    thumbnail: "/robot5.png",
    content: `
      <h2>Tổng quan dự án</h2>
      <p>Kết hợp cánh tay robot, camera công nghiệp và AI phát hiện lỗi bề mặt, giảm tỉ lệ lỗi và chi phí kiểm tra thủ công.</p>
      <h2>Giải pháp</h2>
      <ul>
        <li>Robot phối hợp đa trục với bệ quay kiểm thử</li>
        <li>AI phát hiện lỗi micro-defect trên bề mặt linh kiện</li>
        <li>Truy xuất nguồn gốc dữ liệu kiểm tra theo lô</li>
      </ul>
      <h2>Kết quả</h2>
      <p>Giảm 32% lỗi xuất xưởng, rút ngắn 40% thời gian QC cho mỗi lô.</p>
    `,
    author: "Thadorobot Team",
    createdAt: "2024-01-12T11:20:00Z",
    isFeatured: true,
  },
]

interface PageProps {
  params: {
    slug: string
  }
}

export default function BlogDetail({ params }: PageProps) {
  const blog = sampleBlogs.find((p) => p.slug === params.slug)

  if (!blog) {
    return <div>Bài viết không tồn tại</div>
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <main className="blog-detail-container">
      <nav className="breadcrumb">
        <Link to="/">Trang chủ</Link>
        <span>/</span>
        <Link to="/bai-viet">Bài viết</Link>
        <span>/</span>
        <span>{blog.title}</span>
      </nav>

      <article className="blog-detail-container">
        <header className="blog-detail-header">
          <h1 className="blog-detail-title">{blog.title}</h1>
          <div className="blog-detail-meta">
            <span className="blog-author">Tác giả: {blog.author}</span>
            <time className="blog-detail-date" dateTime={blog.createdAt}>
              {formatDate(blog.createdAt)}
            </time>
          </div>
        </header>

        <div className="blog-detail-thumbnail">
          <img src={blog.thumbnail || "/placeholder.svg"} alt={blog.title} />
        </div>

        <div className="blog-detail-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
      </article>

      <nav className="blog-navigation">
        <Link to="/bai-viet" className="back-to-list">
          ← Quay lại danh sách bài viết
        </Link>
      </nav>
    </main>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const blog = sampleBlogs.find((p) => p.slug === params.slug)

  if (!blog) {
    return {
      title: "Bài viết không tồn tại",
    }
  }

  return {
    title: blog.title,
    description: `Bài viết về ${blog.title} - Tác giả: ${blog.author}`,
  }
}
