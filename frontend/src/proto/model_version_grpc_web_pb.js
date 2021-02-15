/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var empty_pb = require('./empty_pb.js')
const proto = require('./model_version_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.ModelVersionClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.ModelVersionPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Empty,
 *   !proto.ModelVersionInfo>}
 */
const methodDescriptor_ModelVersion_GetUsingModelVersion = new grpc.web.MethodDescriptor(
  '/ModelVersion/GetUsingModelVersion',
  grpc.web.MethodType.UNARY,
  empty_pb.Empty,
  proto.ModelVersionInfo,
  /**
   * @param {!proto.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ModelVersionInfo.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Empty,
 *   !proto.ModelVersionInfo>}
 */
const methodInfo_ModelVersion_GetUsingModelVersion = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ModelVersionInfo,
  /**
   * @param {!proto.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ModelVersionInfo.deserializeBinary
);


/**
 * @param {!proto.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ModelVersionInfo)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ModelVersionInfo>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ModelVersionClient.prototype.getUsingModelVersion =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ModelVersion/GetUsingModelVersion',
      request,
      metadata || {},
      methodDescriptor_ModelVersion_GetUsingModelVersion,
      callback);
};


/**
 * @param {!proto.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ModelVersionInfo>}
 *     Promise that resolves to the response
 */
proto.ModelVersionPromiseClient.prototype.getUsingModelVersion =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ModelVersion/GetUsingModelVersion',
      request,
      metadata || {},
      methodDescriptor_ModelVersion_GetUsingModelVersion);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Empty,
 *   !proto.ModelVersionInfo>}
 */
const methodDescriptor_ModelVersion_GetAllModelVersion = new grpc.web.MethodDescriptor(
  '/ModelVersion/GetAllModelVersion',
  grpc.web.MethodType.SERVER_STREAMING,
  empty_pb.Empty,
  proto.ModelVersionInfo,
  /**
   * @param {!proto.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ModelVersionInfo.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Empty,
 *   !proto.ModelVersionInfo>}
 */
const methodInfo_ModelVersion_GetAllModelVersion = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ModelVersionInfo,
  /**
   * @param {!proto.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ModelVersionInfo.deserializeBinary
);


/**
 * @param {!proto.Empty} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.ModelVersionInfo>}
 *     The XHR Node Readable Stream
 */
proto.ModelVersionClient.prototype.getAllModelVersion =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/ModelVersion/GetAllModelVersion',
      request,
      metadata || {},
      methodDescriptor_ModelVersion_GetAllModelVersion);
};


/**
 * @param {!proto.Empty} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.ModelVersionInfo>}
 *     The XHR Node Readable Stream
 */
proto.ModelVersionPromiseClient.prototype.getAllModelVersion =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/ModelVersion/GetAllModelVersion',
      request,
      metadata || {},
      methodDescriptor_ModelVersion_GetAllModelVersion);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.SelectedModelVersion,
 *   !proto.Empty>}
 */
const methodDescriptor_ModelVersion_Change = new grpc.web.MethodDescriptor(
  '/ModelVersion/Change',
  grpc.web.MethodType.UNARY,
  proto.SelectedModelVersion,
  empty_pb.Empty,
  /**
   * @param {!proto.SelectedModelVersion} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.SelectedModelVersion,
 *   !proto.Empty>}
 */
const methodInfo_ModelVersion_Change = new grpc.web.AbstractClientBase.MethodInfo(
  empty_pb.Empty,
  /**
   * @param {!proto.SelectedModelVersion} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.SelectedModelVersion} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ModelVersionClient.prototype.change =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ModelVersion/Change',
      request,
      metadata || {},
      methodDescriptor_ModelVersion_Change,
      callback);
};


/**
 * @param {!proto.SelectedModelVersion} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Empty>}
 *     Promise that resolves to the response
 */
proto.ModelVersionPromiseClient.prototype.change =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ModelVersion/Change',
      request,
      metadata || {},
      methodDescriptor_ModelVersion_Change);
};


module.exports = proto;

