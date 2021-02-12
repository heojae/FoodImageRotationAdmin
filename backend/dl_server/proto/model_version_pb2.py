# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: model_version.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


import proto.empty_pb2 as empty__pb2


DESCRIPTOR = _descriptor.FileDescriptor(
  name='model_version.proto',
  package='',
  syntax='proto3',
  serialized_options=None,
  create_key=_descriptor._internal_create_key,
  serialized_pb=b'\n\x13model_version.proto\x1a\x0b\x65mpty.proto\"\"\n\x14SelectedModelVersion\x12\n\n\x02pk\x18\x01 \x01(\x05\"\x84\x01\n\x10ModelVersionInfo\x12\n\n\x02pk\x18\x01 \x01(\x05\x12\x14\n\x0cversion_name\x18\x02 \x01(\t\x12\x11\n\ttrain_acc\x18\x03 \x01(\x02\x12\x10\n\x08test_acc\x18\x04 \x01(\x02\x12\x17\n\x0fmodel_file_name\x18\x05 \x01(\t\x12\x10\n\x08is_using\x18\x06 \x01(\x08\x32\xa3\x01\n\x0cModelVersion\x12\x33\n\x14GetUsingModelVersion\x12\x06.Empty\x1a\x11.ModelVersionInfo\"\x00\x12\x33\n\x12GetAllModelVersion\x12\x06.Empty\x1a\x11.ModelVersionInfo\"\x00\x30\x01\x12)\n\x06\x43hange\x12\x15.SelectedModelVersion\x1a\x06.Empty\"\x00\x62\x06proto3'
  ,
  dependencies=[empty__pb2.DESCRIPTOR,])




_SELECTEDMODELVERSION = _descriptor.Descriptor(
  name='SelectedModelVersion',
  full_name='SelectedModelVersion',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='pk', full_name='SelectedModelVersion.pk', index=0,
      number=1, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
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
  serialized_start=36,
  serialized_end=70,
)


_MODELVERSIONINFO = _descriptor.Descriptor(
  name='ModelVersionInfo',
  full_name='ModelVersionInfo',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='pk', full_name='ModelVersionInfo.pk', index=0,
      number=1, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='version_name', full_name='ModelVersionInfo.version_name', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='train_acc', full_name='ModelVersionInfo.train_acc', index=2,
      number=3, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='test_acc', full_name='ModelVersionInfo.test_acc', index=3,
      number=4, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='model_file_name', full_name='ModelVersionInfo.model_file_name', index=4,
      number=5, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='is_using', full_name='ModelVersionInfo.is_using', index=5,
      number=6, type=8, cpp_type=7, label=1,
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
  serialized_start=73,
  serialized_end=205,
)

DESCRIPTOR.message_types_by_name['SelectedModelVersion'] = _SELECTEDMODELVERSION
DESCRIPTOR.message_types_by_name['ModelVersionInfo'] = _MODELVERSIONINFO
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

SelectedModelVersion = _reflection.GeneratedProtocolMessageType('SelectedModelVersion', (_message.Message,), {
  'DESCRIPTOR' : _SELECTEDMODELVERSION,
  '__module__' : 'model_version_pb2'
  # @@protoc_insertion_point(class_scope:SelectedModelVersion)
  })
_sym_db.RegisterMessage(SelectedModelVersion)

ModelVersionInfo = _reflection.GeneratedProtocolMessageType('ModelVersionInfo', (_message.Message,), {
  'DESCRIPTOR' : _MODELVERSIONINFO,
  '__module__' : 'model_version_pb2'
  # @@protoc_insertion_point(class_scope:ModelVersionInfo)
  })
_sym_db.RegisterMessage(ModelVersionInfo)



_MODELVERSION = _descriptor.ServiceDescriptor(
  name='ModelVersion',
  full_name='ModelVersion',
  file=DESCRIPTOR,
  index=0,
  serialized_options=None,
  create_key=_descriptor._internal_create_key,
  serialized_start=208,
  serialized_end=371,
  methods=[
  _descriptor.MethodDescriptor(
    name='GetUsingModelVersion',
    full_name='ModelVersion.GetUsingModelVersion',
    index=0,
    containing_service=None,
    input_type=empty__pb2._EMPTY,
    output_type=_MODELVERSIONINFO,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
  _descriptor.MethodDescriptor(
    name='GetAllModelVersion',
    full_name='ModelVersion.GetAllModelVersion',
    index=1,
    containing_service=None,
    input_type=empty__pb2._EMPTY,
    output_type=_MODELVERSIONINFO,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
  _descriptor.MethodDescriptor(
    name='Change',
    full_name='ModelVersion.Change',
    index=2,
    containing_service=None,
    input_type=_SELECTEDMODELVERSION,
    output_type=empty__pb2._EMPTY,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
])
_sym_db.RegisterServiceDescriptor(_MODELVERSION)

DESCRIPTOR.services_by_name['ModelVersion'] = _MODELVERSION

# @@protoc_insertion_point(module_scope)