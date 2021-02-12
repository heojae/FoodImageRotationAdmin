python -m grpc_tools.protoc -I./../../protos --python_out=./proto  --grpc_python_out=./proto  user.proto
python -m grpc_tools.protoc -I./../../protos --python_out=./proto  --grpc_python_out=./proto  user_fix_image.proto
python -m grpc_tools.protoc -I./../../protos --python_out=./proto  --grpc_python_out=./proto  dataset.proto
python -m grpc_tools.protoc -I./../../protos --python_out=./proto empty.proto