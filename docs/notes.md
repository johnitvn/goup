devcontainer chính là một container và nó sử dụng docker in docker. trong devcontainer này tôi sẽ chạy các container được định nghĩa trong 3 file compose ở thư mục .docker/development. ở trong môi trường development này bạn có thể thấy tôi dùng dnsmasq để trỏ \*.lacolhost.com và lacolhost.com về nginx nginx sẽ làm proxy cho các external services depencies khác chẳng hạn như mongodb, rabbitmq và nó sử dụng các domain khác nhau. Nhờ vào nginx và dnsmasq tôi có thể sử dụng domain chẳng hạn như mongodb.lacolhost.com trong devcontainer và các container khác chạy trong devcontainer. nginx cũng đóng vai trò revert proxy cho các services và các sites (trong files .docker/development/compose.services.yml và compose.sites.yml). Nó sẽ trỏ upstream về các port mà khi dùng lệnh nx serve các serivces/site sẽ chạy trên đó. Khi upstream này không tồn tại (tức là không có lệnh nx serve nào được gọi) thì nó sẽ trỏ về các container services/sites đó đang được chạy.

Như vậy giả sử language-service cần đến file-service trong quá trình hoạt động. Nhưng tôi chỉ đang sửa mình language-service thôi. Thì tôi chỉ cần gọi nx serve language-service nhờ vào nginx khi service này connect đến file-service.lacolhost.com nó sẽ trỏ về containers đang chạy file-service. Nếu như tôi chạy nx serve file-service thì nó lại trỏ về file-service mà tôi đang serve. Như vậy nó sẽ rất linh hoạt nếu chỉnh sửa service nào tôi chỉ cần chạy service đó để kiểm tra.

Trong thư mục .docker/testing có một file componse.yml nó chứa một services là e2e-testing nó là một bản sao của devcontainer nó dùng để cách ly môi trường cho các test e2e. Ở đây tôi sẽ chạy các dịch vụ chảng hạn như mongodb hay minio với các fixture mà tôi mong muốn phục vụ cho việc test. Hoặc thậm chí là nhiều phiên bản khác nhau của database. Nó không làm ảnh hưởng gì dến môi trường development

Bạn hiểu chiến lược tôi sử dụng container để xây dựng môi trường testing và development của tôi chưa? BẠn cần tôi giải thích chỗ nào không? Bạn có nhận xét gì không?

Giải IP:

- 172.16.0.0/16 (gateway: 172.16.1.1) là dải ip dành cho môi trường development
  - 172.16.1.0/24 là giải ip cho các externals dependancies
  - 172.16.2.0/24 là giải ip cho các microservices
  - 172.16.3.0/24 là giải ip dành cho các microservices e2e
  - 172.16.4.0/24 là giải ip cho các sites
  - 172.16.5.0/24 là giải ip cho các sites e2e
