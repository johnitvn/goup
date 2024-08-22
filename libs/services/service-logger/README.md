# service-logger

Đây là thư viện sử viện dành cho việc logging trong các service được viết bằng nestjs

# Thay thế log mặc định của nestjs

chỉ đơn giản là cấu hình instance của `LoggerService` vào options khi bạn khởi tạo ứng dụng. Và có thể dùng `LogService` để ghi log luôn trong file main.ts

```typescript
const logger = new LoggerService();
const app = await NestFactory.create(AppModule, { logger });
logger.log(`Starting application...`, 'Bootstrap');
```

Có thể sử dụng trực tiếp `LoggerService` bằng cách thêm nó vào provider của root module (thường là AppModule)

```typescript
@Module({ providers: [LoggerService] })
class AppModule implements OnModuleInit {
  constructor(private logger: LoggerService) {}

  onModuleInit() {
    this.logger.log('Noop log message', 'AppModule');
  }
}
```

Tuy nhiên theo cấu trúc log mặc định của Nestjs thì parrams cuối cùng luôn là context. Như vậy sẽ hơi mất công và lặp lại code rất nhiều. Vì lý do đó tôi đã tạo một lớp khác là lớp `Logger`. Bạn chỉ cần khởi ạo instance của Logger với các context khác nhau được chỉ định trong tham số đầu vào

```typescript
import { Logger } from '@goup/service-logger';

@Module({})
class AppModule implements OnModuleInit {
  private readonly logger = new Logger('AppModule');

  onModuleInit() {
    this.logger.log('Noop log message');
  }
}
```

_Khuyến khích_:

- Dùng `LoggerService` để ghi đè logger mặc định của NestJs
- Dùng `Logger` để ghi log trong ứng dụng của bạn

Trong cách sử dụng này Logger triển khai bằng việc implment các logger function của pino. Nên cách sử dụng giống như cách sử dụng của pino

Các trường hợp sử dụng (Là tương tự nhau trên tất cả các log function)

**Chỉ log một thông điệp đơn giản**:

```javascript
logger.info('Application started');
```

**Output**:

```json
{
  "level": 30,
  "time": 1649076543210,
  "msg": "Application started"
}
```

**Log một thông điệp với giá trị nội suy**:

```javascript
logger.info('User %s performed action %s', 'john_doe', 'login');
```

**Output**:

```json
{
  "level": 30,
  "time": 1649076543210,
  "msg": "User john_doe performed action login"
}
```

**Log một đối tượng kèm thông điệp**:

```javascript
logger.info({ user: 'john_doe', action: 'login' }, 'Action performed');
```

**Output**:

```json
{
  "level": 30,
  "time": 1649076543210,
  "user": "john_doe",
  "action": "login",
  "msg": "Action performed"
}
```

**Log một đối tượng kèm thông điệp và giá trị nội suy**:

```javascript
logger.info({ user: 'john_doe' }, 'User %s performed action %s', 'john_doe', 'login');
```

**Output**:

```json
{
  "level": 30,
  "time": 1649076543210,
  "user": "john_doe",
  "msg": "User john_doe performed action login"
}
```

# Các biến môi trường

| Biến môi trường | Giá trị mặc định | Mô tả                                                                                                  |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------ |
| `LOG_FORMAT`    | `json`           | Định dạng của log, có thể là `json` hoặc `text`.                                                       |
| `LOG_LEVEL`     | `info`           | Mức độ log, có thể là `fatal`, `error`, `warn`, `info`, `debug`, hoặc `trace` và `slient` với `slient` |

# Các cấp độ log:

| Level | Method  | Description                                                      |
| ----- | ------- | ---------------------------------------------------------------- |
| 10    | `trace` | Thông tin chi tiết nhất, chỉ dành cho mục đích debug rất sâu     |
| 20    | `debug` | Thông tin debug về luồng xử lý                                   |
| 30    | `info`  | Thông tin thông thường về hoạt động của hệ thống                 |
| 40    | `warn`  | Cảnh báo về các sự kiện có thể gây ra lỗi                        |
| 50    | `error` | Lỗi xảy ra trong hệ thống, nhưng hệ thống vẫn tiếp tục hoạt động |
| 60    | `fatal` | Lỗi nghiêm trọng, hệ thống không thể tiếp tục hoạt động          |

Mặc định trong log format là json các level sẽ được ghi dưới dạng số nó giúp cho việc lưu trữ tập trung log cũng như quá trình index được diễn ra đễ dàng hơn.
