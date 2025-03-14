import React from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const EmptyCart = () => {
    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8 py-5 bg-light text-center rounded shadow">
            <h4 className="display-5 mb-4">Giỏ hàng của bạn đang trống</h4>
            <Link to="/" className="btn btn-outline-dark">
              <i className="fa fa-arrow-left"></i> Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const addItem = (product) => {
    dispatch(addCart(product));
  };

  const removeItem = (product) => {
    dispatch(delCart(product));
  };

  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;

    state.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    const totalAmount = Math.round(subtotal + shipping);

    return (
      <section className="h-100" style={{ backgroundColor: "#f2f2f2" }}>
        <div className="container py-5">
          <div className="row justify-content-center mb-4">
            <div className="col-md-8">
              <div className="card mb-4 shadow-sm rounded">
                <div className="card-header py-3 bg-primary text-white">
                  <h5 className="mb-0">Đơn hàng</h5>
                </div>
                <div className="card-body">
                  {state.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex align-items-center justify-content-between py-3 border-bottom"
                    >
                      {/* Left side: Image and details */}
                      <div className="d-flex align-items-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          width={80}
                          height={80}
                          className="img-fluid rounded"
                        />
                        <div className="ms-3">
                          <h6 className="mb-0">{item.title}</h6>
                          <small className="text-muted">
                            {item.qty} x {item.price} VND
                          </small>
                        </div>
                      </div>
                      {/* Right side: Button controls using symbols */}
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-outline-secondary me-2"
                          onClick={() => removeItem(item)}
                        >
                          &minus;
                        </button>
                        <span className="fw-bold">{item.qty}</span>
                        <button
                          className="btn btn-outline-secondary ms-2"
                          onClick={() => addItem(item)}
                        >
                          &#43;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Order summary */}
            <div className="col-md-4">
              <div className="card shadow-sm rounded">
                <div className="card-header py-3 bg-secondary text-white">
                  <h5 className="mb-0">Tổng đơn hàng</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Sản phẩm ({totalItems})
                      <span>{Math.round(subtotal)} VND</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Shipping
                      <span>{shipping} VND</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center fw-bold">
                      Thành tiền
                      <span>{totalAmount} VND</span>
                    </li>
                  </ul>
                  <Link to="/checkout" className="btn btn-dark btn-lg w-100">
                    Thanh toán
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Giỏ hàng</h1>
        <hr />
        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
