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
const proto = require('./user_fix_image_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.UserFixImageClient =
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
proto.UserFixImagePromiseClient =
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
 *   !proto.UserFixedImageInfo,
 *   !proto.Empty>}
 */
const methodDescriptor_UserFixImage_SaveUserFixImage = new grpc.web.MethodDescriptor(
  '/UserFixImage/SaveUserFixImage',
  grpc.web.MethodType.UNARY,
  proto.UserFixedImageInfo,
  empty_pb.Empty,
  /**
   * @param {!proto.UserFixedImageInfo} request
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
 *   !proto.UserFixedImageInfo,
 *   !proto.Empty>}
 */
const methodInfo_UserFixImage_SaveUserFixImage = new grpc.web.AbstractClientBase.MethodInfo(
  empty_pb.Empty,
  /**
   * @param {!proto.UserFixedImageInfo} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.UserFixedImageInfo} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.UserFixImageClient.prototype.saveUserFixImage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/UserFixImage/SaveUserFixImage',
      request,
      metadata || {},
      methodDescriptor_UserFixImage_SaveUserFixImage,
      callback);
};


/**
 * @param {!proto.UserFixedImageInfo} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Empty>}
 *     Promise that resolves to the response
 */
proto.UserFixImagePromiseClient.prototype.saveUserFixImage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/UserFixImage/SaveUserFixImage',
      request,
      metadata || {},
      methodDescriptor_UserFixImage_SaveUserFixImage);
};


module.exports = proto;

