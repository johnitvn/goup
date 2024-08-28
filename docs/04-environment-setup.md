# Thiết Lập Môi Trường

Tài liệu này hướng dẫn cách thiết lập môi trường phát triển cho dự án của chúng ta. Chúng ta sẽ sử dụng Docker, DevContainer và NX để đảm bảo môi trường phát triển nhất quán và dễ dàng quản lý.

## Yêu Cầu Hệ Thống

Trước khi bắt đầu, hãy đảm bảo rằng bạn đã cài đặt các công cụ sau trên máy của mình:

- [Docker](https://www.docker.com/get-started)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/) (phiên bản 14.x hoặc mới hơn)
- [PNPM](https://pnpm.io/)

## Thiết Lập Docker

Docker giúp chúng ta container hóa các dịch vụ và đảm bảo rằng chúng chạy nhất quán trên các môi trường khác nhau.

1. **Cài đặt Docker**: Tải và cài đặt Docker từ [trang chủ Docker](https://www.docker.com/get-started).

2. **Chạy Docker Compose**: Sử dụng Docker Compose để khởi động các dịch vụ cần thiết như MongoDB, Redis, và RabbitMQ. Chạy lệnh sau trong thư mục gốc của dự án:

   ```sh
   docker-compose up -d
   ```

   Lệnh này sẽ khởi động các container được định nghĩa trong file [`docker-compose.yaml`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fworkspaces%2Fgoup%2Fdocker%2Fdocker-compose.yaml%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D '/workspaces/goup/docker/docker-compose.yaml').

## Thiết Lập DevContainer

DevContainer cung cấp một môi trường phát triển nhất quán sử dụng Docker containers.

1. **Cài đặt DevContainer Extension**: Mở Visual Studio Code và cài đặt extension "Remote - Containers" từ marketplace.

2. **Mở Dự Án Trong DevContainer**: Mở dự án của bạn trong Visual Studio Code và chọn "Reopen in Container" từ menu Command Palette (Ctrl+Shift+P).

   Visual Studio Code sẽ sử dụng file cấu hình [`devcontainer.json`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fworkspaces%2Fgoup%2F.devcontainer%2Fdevcontainer.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D '/workspaces/goup/.devcontainer/devcontainer.json') để thiết lập môi trường phát triển bên trong container.

## Khởi Động Dự Án

```sh
nx serve <tên-dịch-vụ>
```
