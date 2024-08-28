# Kiến Trúc Hệ Thống

## Tổng Quan

Hệ thống được thiết kế sử dụng kiến trúc microservices, cho phép phát triển, triển khai và mở rộng các dịch vụ một cách độc lập.
Kiến trúc này tăng cường tính linh hoạt, khả năng bảo trì và khả năng mở rộng, giúp dễ dàng thích ứng với các yêu cầu kinh doanh thay đổi.

## Sơ Đồ Kiến Trúc

![Sơ Đồ Kiến Trúc Hệ Thống](path/to/architecture-diagram.png)

## Các Thành Phần

### 1. **Dịch Vụ Backend**

- **Gateway Service**: Hoạt động như một cổng API, định tuyến các yêu cầu đến các microservices phù hợp.
- **IAM Service**: Quản lý xác thực và phân quyền người dùng.
- **File Service**: Quản lý các file của hệ thống và của user.
- **Mail Service**: Xử lý mọi hoạt động liên quan đến email trong hệ thống Goup.
- **Static Asset Service**: Quản lý lưu trữ và truy xuất các tài sản tĩnh như hình ảnh, video và tài liệu.

### 2. **Frontend**

- **Home Site**: Trang đích chính và trang công khai.
- **Dashboard Site**: Bảng điều khiển quản trị để quản lý hệ thống.
- **Accounts Site**: Trang quản lý tài khoản người dùng.
