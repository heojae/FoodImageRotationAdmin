protoc -I=./../../protos --js_out=import_style=commonjs:./proto --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./proto dataset.proto
protoc -I=./../../protos --js_out=import_style=commonjs:./proto --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./proto empty.proto
protoc -I=./../../protos --js_out=import_style=commonjs:./proto --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./proto inference.proto
protoc -I=./../../protos --js_out=import_style=commonjs:./proto --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./proto model_version.proto
protoc -I=./../../protos --js_out=import_style=commonjs:./proto --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./proto user.proto
protoc -I=./../../protos --js_out=import_style=commonjs:./proto --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./proto user_fix_image.proto