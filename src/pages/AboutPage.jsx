import React from "react";
import { Footer, Navbar } from "../components";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-5 py-5">
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h1
              className="text-center mb-4"
              style={{
                fontFamily: "'Lobster', cursive",
                fontSize: "3rem",
                color: "#2c3e50",
              }}
            >
              Chuyện Nhà Cóc 🐸✨
            </h1>
            <hr />
            <p
              className="lead text-center"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "1.2rem",
                lineHeight: "1.6",
                color: "#34495e",
              }}
            >
              Chúng mình là một nhóm những bạn trẻ với niềm đam mê cháy bỏng
              dành cho việc tạo ra những sản phẩm độc đáo, mang đậm dấu ấn cá
              nhân và tinh thần của ngôi trường Đại học FPT. Xuất phát từ mong
              muốn thể hiện được "chất riêng" của nhà Cam, những chú Cóc chúng
              mình luôn ấp ủ giấc mơ xây dựng những sản phẩm không chỉ giữ vững
              bản chất sôi nổi, năng động của sinh viên FPT mà còn mang đến sự
              mới mẻ, sáng tạo thông qua cách chơi chữ thông minh và thiết kế
              khác biệt. Với Cóc Cần, mỗi sản phẩm không chỉ là một món đồ thông
              thường, mà còn là câu chuyện kể về tinh thần FPT - nơi mà sự sáng
              tạo, năng động và đột phá luôn được đề cao. Chúng mình tin rằng,
              bằng cách kết hợp giữa truyền thống và hiện đại, giữa bản sắc và
              sự đổi mới, Cóc Cần sẽ mang đến những trải nghiệm độc đáo, gần gũi
              nhưng không kém phần ấn tượng, giúp lan tỏa tinh thần nhà Cóc đến
              với mọi người. Hãy cùng Cóc Cần viết tiếp những câu chuyện thú vị,
              nơi mà mỗi sản phẩm đều là một phần của hành trình đầy cảm hứng và
              đam mê! 🐸✨
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
