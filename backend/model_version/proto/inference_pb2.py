# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: inference.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


import proto.empty_pb2 as empty__pb2


DESCRIPTOR = _descriptor.FileDescriptor(
  name='inference.proto',
  package='',
  syntax='proto3',
  serialized_options=None,
  create_key=_descriptor._internal_create_key,
  serialized_pb=b'\n\x0finference.proto\x1a\x0b\x65mpty.proto\"#\n\nBytesImage\x12\x15\n\rimage_content\x18\x01 \x01(\x0c\"a\n\x0fInferenceResult\x12\x14\n\x0cmodel_degree\x18\x01 \x01(\x05\x12\x13\n\x0b\x65xif_degree\x18\x02 \x01(\x05\x12\x12\n\nconfidence\x18\x03 \x01(\x02\x12\x0f\n\x07success\x18\x04 \x01(\x08\"\x19\n\tModelPath\x12\x0c\n\x04path\x18\x01 \x01(\t2a\n\x0eInferenceImage\x12,\n\tInference\x12\x0b.BytesImage\x1a\x10.InferenceResult\"\x00\x12!\n\tLoadModel\x12\n.ModelPath\x1a\x06.Empty\"\x00\x62\x06proto3'
  ,
  dependencies=[empty__pb2.DESCRIPTOR,])




_BYTESIMAGE = _descriptor.Descriptor(
  name='BytesImage',
  full_name='BytesImage',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='image_content', full_name='BytesImage.image_content', index=0,
      number=1, type=12, cpp_type=9, label=1,
      has_default_value=False, default_value=b"",
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=32,
  serialized_end=67,
)


_INFERENCERESULT = _descriptor.Descriptor(
  name='InferenceResult',
  full_name='InferenceResult',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='model_degree', full_name='InferenceResult.model_degree', index=0,
      number=1, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='exif_degree', full_name='InferenceResult.exif_degree', index=1,
      number=2, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='confidence', full_name='InferenceResult.confidence', index=2,
      number=3, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='success', full_name='InferenceResult.success', index=3,
      number=4, type=8, cpp_type=7, label=1,
      has_default_value=False, default_value=False,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=69,
  serialized_end=166,
)


_MODELPATH = _descriptor.Descriptor(
  name='ModelPath',
  full_name='ModelPath',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='path', full_name='ModelPath.path', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=168,
  serialized_end=193,
)

DESCRIPTOR.message_types_by_name['BytesImage'] = _BYTESIMAGE
DESCRIPTOR.message_types_by_name['InferenceResult'] = _INFERENCERESULT
DESCRIPTOR.message_types_by_name['ModelPath'] = _MODELPATH
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

BytesImage = _reflection.GeneratedProtocolMessageType('BytesImage', (_message.Message,), {
  'DESCRIPTOR' : _BYTESIMAGE,
  '__module__' : 'inference_pb2'
  # @@protoc_insertion_point(class_scope:BytesImage)
  })
_sym_db.RegisterMessage(BytesImage)

InferenceResult = _reflection.GeneratedProtocolMessageType('InferenceResult', (_message.Message,), {
  'DESCRIPTOR' : _INFERENCERESULT,
  '__module__' : 'inference_pb2'
  # @@protoc_insertion_point(class_scope:InferenceResult)
  })
_sym_db.RegisterMessage(InferenceResult)

ModelPath = _reflection.GeneratedProtocolMessageType('ModelPath', (_message.Message,), {
  'DESCRIPTOR' : _MODELPATH,
  '__module__' : 'inference_pb2'
  # @@protoc_insertion_point(class_scope:ModelPath)
  })
_sym_db.RegisterMessage(ModelPath)



_INFERENCEIMAGE = _descriptor.ServiceDescriptor(
  name='InferenceImage',
  full_name='InferenceImage',
  file=DESCRIPTOR,
  index=0,
  serialized_options=None,
  create_key=_descriptor._internal_create_key,
  serialized_start=195,
  serialized_end=292,
  methods=[
  _descriptor.MethodDescriptor(
    name='Inference',
    full_name='InferenceImage.Inference',
    index=0,
    containing_service=None,
    input_type=_BYTESIMAGE,
    output_type=_INFERENCERESULT,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
  _descriptor.MethodDescriptor(
    name='LoadModel',
    full_name='InferenceImage.LoadModel',
    index=1,
    containing_service=None,
    input_type=_MODELPATH,
    output_type=empty__pb2._EMPTY,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
])
_sym_db.RegisterServiceDescriptor(_INFERENCEIMAGE)

DESCRIPTOR.services_by_name['InferenceImage'] = _INFERENCEIMAGE

# @@protoc_insertion_point(module_scope)
