# service-protobuf

`service-protobuf` is a project containing protobuf files and defining all gRPC services for the entire project. This project provides interfaces and structures for gRPC services, allowing different parts of the system to communicate efficiently and quickly.

## Purpose

This project aims to:

- Define gRPC services using protobuf.
- Provide specific implementations of gRPC services.
- Generate gRPC clients and servers from protobuf files.

## Directory Structure

- **src/**: Directory containing the TypeScript source code for gRPC service interfaces.
  - **index.ts**: TypeScript code generated from proto files. These interfaces will be used in NestJs to support writing and calling gRPC services.
- **proto/**: Directory containing protobuf files defining gRPC services.

## Compiling Protobuf Files

After writing the proto files, use the following command to generate TypeScript code from the proto files:

```sh
nx run service-protobuf gencode
```

or

```sh
nx gencode service-protobuf
```

## TODO

- Develop a linting strategy for proto files
