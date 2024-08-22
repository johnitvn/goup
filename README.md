# Goup

- Cứ 1 giờ 1 lần vào phút thứ 01 nó sẽ kiểm tra xem đã qua 00 giờ 00 phút của dailyQuotaTimezone và reset dailyEmailSented
- Cứ 5 phút một lần nó sẽ kiểm tra các smtp config có ở trạng thái kết nối được không và cập nhật trạng thái của smtp config

## Cách mô tả một service

Để mô tả một service chúng ta sẽ thông qua các đề mục như sau:

### 1. Giới thiệu

- Mô tả tổng quan về chức năng của service.
- Vai trò của service trong hệ thống.
- Thông tin về cách service này phối hợp với toàn hệ thống (tính liên kết, tầm quan trọng)

### 2. Kiến trúc tổng thể

- **Framework**: Công nghệ sử dụng để xây dựng (Trong prject này chỉ sử dụng NestJS ).
- **Database**: Cơ sở dữ liệu được sử dụng (Trong project này chỉ sử dụng MongoDB làm CSDL).
- **Giao thức giao tiếp**: Service sẽ cung cấp API qua giao thức nào và giao tiếp với các service khác thông qua giao thức nào (Trong dự án này ngoài trừ gateway service cung cấp api qua http và giao tiếp với các service khác qua grpc. Còn lại các service khác luôn cung cấp api qua grpc và giao tiếp với các thành phần khác qua grpc)
- **Deployment models**: Các service trong dự án này sẽ sử dụng docker và kubernetes trong triển khai. Hãy mô tả về cách phương thức để docker health check và kubenetes probe (trong dự án này tất cả các service sẽ dùng grpcurl)

### 3. Quy trình

- Mô tả chi tiết các quy trình chính trong nội bộ service của service (Làm rõ hơn các yêu cầu trong nội bộ service trong các quy trình và luồng làm việc chính khi giao tiếp với các dịch vụ khác trong mục 3 )
- Nếu có thể hãy thêm flow chart cho các services có quy trình phức tạp

### 4. Yêu cầu chức năng

- Từ các quy trình trong mục bốn sẽ viết các yêu cầu chức năng cho service các chức năng đi kèm với grpc enpoint và input output

### 5. Yêu cầu phi chức năng

- Các yêu cầu phi chức năng như là logging (sử dụng @goup/service-logger), bảo mật, hiệu suất,
- Các yêu cầu mở rộng (Thông thường tất cả các service đều có yêu cầu đều phải đảm bảo tính mở rộng theo chiều ngang thông qua việc tạo replica services)
- Các yêu cầu về tính sẵn sàng cao (high availability) hoặc khả năng chịu lỗi (fault tolerance), nếu service có yêu cầu này.
- Các mã lỗi cụ thể được ném ra cho từng loại ngoại lệ hoặc điều kiện lỗi trong service (Nếu cung cấp API qua http thì sẽ là các HttpException còn nếu qua grpc thì sẽ là RpcException với các status code của GRPC)

### 6. Schemas

- Mô tả chi tiết các schemas trong MongoDB.
- Các ví dụ cụ thể trong một số trường hợp

### 7. Kế hoạch test

- Liệt kê các kế hoạch test cũng như các test case cho service (unit test và e2e)
- Các loại test khác như security test, performace test
