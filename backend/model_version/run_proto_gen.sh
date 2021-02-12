python -m grpc_tools.protoc -I./../../protos --python_out=./proto  --grpc_python_out=./proto  user.proto
python -m grpc_tools.protoc -I./../../protos --python_out=./proto  --grpc_python_out=./proto  inference.proto
python -m grpc_tools.protoc -I./../../protos --python_out=./proto  --grpc_python_out=./proto  model_version.proto
python -m grpc_tools.protoc -I./../../protos --python_out=./proto empty.proto