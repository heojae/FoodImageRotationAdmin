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
const proto = require('./inference_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.InferenceImageClient =
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
proto.InferenceImagePromiseClient =
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
 *   !proto.BytesImage,
 *   !proto.InferenceResult>}
 */
const methodDescriptor_InferenceImage_Inference = new grpc.web.MethodDescriptor(
  '/InferenceImage/Inference',
  grpc.web.MethodType.UNARY,
  proto.BytesImage,
  proto.InferenceResult,
  /**
   * @param {!proto.BytesImage} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.InferenceResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.BytesImage,
 *   !proto.InferenceResult>}
 */
const methodInfo_InferenceImage_Inference = new grpc.web.AbstractClientBase.MethodInfo(
  proto.InferenceResult,
  /**
   * @param {!proto.BytesImage} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.InferenceResult.deserializeBinary
);


/**
 * @param {!proto.BytesImage} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.InferenceResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.InferenceResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.InferenceImageClient.prototype.inference =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/InferenceImage/Inference',
      request,
      metadata || {},
      methodDescriptor_InferenceImage_Inference,
      callback);
};


/**
 * @param {!proto.BytesImage} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.InferenceResult>}
 *     Promise that resolves to the response
 */
proto.InferenceImagePromiseClient.prototype.inference =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/InferenceImage/Inference',
      request,
      metadata || {},
      methodDescriptor_InferenceImage_Inference);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ModelPath,
 *   !proto.Empty>}
 */
const methodDescriptor_InferenceImage_LoadModel = new grpc.web.MethodDescriptor(
  '/InferenceImage/LoadModel',
  grpc.web.MethodType.UNARY,
  proto.ModelPath,
  empty_pb.Empty,
  /**
   * @param {!proto.ModelPath} request
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
 *   !proto.ModelPath,
 *   !proto.Empty>}
 */
const methodInfo_InferenceImage_LoadModel = new grpc.web.AbstractClientBase.MethodInfo(
  empty_pb.Empty,
  /**
   * @param {!proto.ModelPath} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.ModelPath} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.InferenceImageClient.prototype.loadModel =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/InferenceImage/LoadModel',
      request,
      metadata || {},
      methodDescriptor_InferenceImage_LoadModel,
      callback);
};


/**
 * @param {!proto.ModelPath} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Empty>}
 *     Promise that resolves to the response
 */
proto.InferenceImagePromiseClient.prototype.loadModel =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/InferenceImage/LoadModel',
      request,
      metadata || {},
      methodDescriptor_InferenceImage_LoadModel);
};


module.exports = proto;

