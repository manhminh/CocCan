import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser"; // Import EmailJS
import qrImage from "../assets/qr.jpeg"; // Update with your QR image

const Checkout = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch(); // Dispatch action to clear cart

  // Calculate subtotal, shipping, and total amount
  let subtotal = state.reduce((sum, item) => sum + item.price * item.qty, 0);
  let shipping = 30.0;
  let totalAmount = Math.round(subtotal + shipping);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let orderId = `CCG-${Date.now()}`; // Generate unique order ID
    let orderDate = new Date().toLocaleDateString("vi-VN");
    let subtotal = state.reduce((sum, item) => sum + item.price * item.qty, 0);
    let shipping = 30.0;
    let totalAmount = Math.round(subtotal + shipping);

    // ✅ Generate item placeholders dynamically for EmailJS
    const maxItems = 10; // Set a limit to avoid exceeding EmailJS field limits
    const itemParams = state.slice(0, maxItems).reduce((acc, item, index) => {
      acc[`item_${index + 1}_name`] = item.title || "Không xác định";
      acc[`item_${index + 1}_qty`] = item.qty;
      acc[`item_${index + 1}_price`] = item.price.toFixed(2);
      acc[`item_${index + 1}_total`] = (item.qty * item.price).toFixed(2);
      return acc;
    }, {});

    const templateParams = {
      order_id: orderId,
      order_date: orderDate,
      customer_name: formData.fullName,
      customer_phone: formData.phone,
      customer_email: formData.email,
      customer_address: formData.address,
      shipping_method: "Giao hàng nhanh",
      customer_note: "Không có ghi chú",
      payment_method: "Chuyển khoản ngân hàng",
      total_amount: `${totalAmount.toFixed(2)} VND`,
      ...itemParams, // ✅ Spread dynamic item data into templateParams
    };

    emailjs
      .send(
        "coccan_service_id", // Replace with your EmailJS Service ID
        "coccan_mail_contact_id", // Replace with your EmailJS Template ID
        templateParams,
        "GR1_H_gPjbcJTBXeI" // Replace with your EmailJS Public Key
      )
      .then(
        (response) => {
          console.log(
            "Email sent successfully!",
            response.status,
            response.text
          );
          alert("Xác nhận đơn hàng đã được gửi qua email!");

          // ✅ Reset cart after sending email
          setTimeout(() => {
            dispatch({ type: "CLEAR_CART" });
            localStorage.removeItem("cart");
          }, 4000);
        },
        (error) => {
          console.error("Email send failed:", error);
          alert("Có lỗi xảy ra khi gửi email.");
        }
      );
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Thanh Toán</h1>
      {state.length === 0 ? (
        <div className="text-center">
          <h4>Không có sản phẩm nào trong giỏ hàng</h4>
          <Link to="/" className="btn btn-outline-dark mt-3">
            <i className="fa fa-arrow-left"></i> Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <div className="row">
          {/* Order Summary */}
          <div className="col-lg-6 mb-4">
            <div className="card shadow-lg rounded">
              <div className="card-header bg-warning text-dark">
                <h5 className="mb-0">Tóm tắt đơn hàng</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Sản phẩm ({state.length})
                    <span>{Math.round(subtotal)} VND</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Phí vận chuyển
                    <span>{shipping} VND</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center font-weight-bold">
                    Tổng cộng
                    <span>{totalAmount} VND</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Payment Form */}
            <div className="card shadow-lg rounded mt-5">
              <div className="card-header bg-warning text-dark">
                <h5 className="mb-0">Thông tin thanh toán</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Họ Tên"
                    className="form-control mb-3"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Số điện thoại"
                    className="form-control mb-3"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control mb-3"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Địa chỉ giao hàng"
                    className="form-control mb-3"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                  <button type="submit" className="btn btn-success w-100">
                    Thanh toán ngay
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="col-lg-6 text-center">
            <img
              src={qrImage}
              alt="QR Code thanh toán"
              className="img-fluid rounded shadow"
              style={{ maxWidth: "300px" }}
            />
            <p className="mt-3">Quét mã QR để thanh toán qua ngân hàng</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
