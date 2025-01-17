# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

import proto.empty_pb2 as empty__pb2
import proto.model_version_pb2 as model__version__pb2


class ModelVersionStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.GetUsingModelVersion = channel.unary_unary(
                '/ModelVersion/GetUsingModelVersion',
                request_serializer=empty__pb2.Empty.SerializeToString,
                response_deserializer=model__version__pb2.ModelVersionInfo.FromString,
                )
        self.GetAllModelVersion = channel.unary_stream(
                '/ModelVersion/GetAllModelVersion',
                request_serializer=empty__pb2.Empty.SerializeToString,
                response_deserializer=model__version__pb2.ModelVersionInfo.FromString,
                )
        self.Change = channel.unary_unary(
                '/ModelVersion/Change',
                request_serializer=model__version__pb2.SelectedModelVersion.SerializeToString,
                response_deserializer=empty__pb2.Empty.FromString,
                )


class ModelVersionServicer(object):
    """Missing associated documentation comment in .proto file."""

    def GetUsingModelVersion(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetAllModelVersion(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def Change(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_ModelVersionServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'GetUsingModelVersion': grpc.unary_unary_rpc_method_handler(
                    servicer.GetUsingModelVersion,
                    request_deserializer=empty__pb2.Empty.FromString,
                    response_serializer=model__version__pb2.ModelVersionInfo.SerializeToString,
            ),
            'GetAllModelVersion': grpc.unary_stream_rpc_method_handler(
                    servicer.GetAllModelVersion,
                    request_deserializer=empty__pb2.Empty.FromString,
                    response_serializer=model__version__pb2.ModelVersionInfo.SerializeToString,
            ),
            'Change': grpc.unary_unary_rpc_method_handler(
                    servicer.Change,
                    request_deserializer=model__version__pb2.SelectedModelVersion.FromString,
                    response_serializer=empty__pb2.Empty.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'ModelVersion', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class ModelVersion(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def GetUsingModelVersion(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/ModelVersion/GetUsingModelVersion',
            empty__pb2.Empty.SerializeToString,
            model__version__pb2.ModelVersionInfo.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetAllModelVersion(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_stream(request, target, '/ModelVersion/GetAllModelVersion',
            empty__pb2.Empty.SerializeToString,
            model__version__pb2.ModelVersionInfo.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def Change(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/ModelVersion/Change',
            model__version__pb2.SelectedModelVersion.SerializeToString,
            empty__pb2.Empty.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)
