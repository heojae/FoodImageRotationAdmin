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
const proto = require('./user_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.UserClient =
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
proto.UserPromiseClient =
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
 *   !proto.LoginInfo,
 *   !proto.UserInfo>}
 */
const methodDescriptor_User_Login = new grpc.web.MethodDescriptor(
  '/User/Login',
  grpc.web.MethodType.UNARY,
  proto.LoginInfo,
  proto.UserInfo,
  /**
   * @param {!proto.LoginInfo} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.UserInfo.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.LoginInfo,
 *   !proto.UserInfo>}
 */
const methodInfo_User_Login = new grpc.web.AbstractClientBase.MethodInfo(
  proto.UserInfo,
  /**
   * @param {!proto.LoginInfo} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.UserInfo.deserializeBinary
);


/**
 * @param {!proto.LoginInfo} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.UserInfo)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.UserInfo>|undefined}
 *     The XHR Node Readable Stream
 */
proto.UserClient.prototype.login =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/User/Login',
      request,
      metadata || {},
      methodDescriptor_User_Login,
      callback);
};


/**
 * @param {!proto.LoginInfo} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.UserInfo>}
 *     Promise that resolves to the response
 */
proto.UserPromiseClient.prototype.login =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/User/Login',
      request,
      metadata || {},
      methodDescriptor_User_Login);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Empty,
 *   !proto.Empty>}
 */
const methodDescriptor_User_Authenticate = new grpc.web.MethodDescriptor(
  '/User/Authenticate',
  grpc.web.MethodType.UNARY,
  empty_pb.Empty,
  empty_pb.Empty,
  /**
   * @param {!proto.Empty} request
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
 *   !proto.Empty,
 *   !proto.Empty>}
 */
const methodInfo_User_Authenticate = new grpc.web.AbstractClientBase.MethodInfo(
  empty_pb.Empty,
  /**
   * @param {!proto.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.UserClient.prototype.authenticate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/User/Authenticate',
      request,
      metadata || {},
      methodDescriptor_User_Authenticate,
      callback);
};


/**
 * @param {!proto.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Empty>}
 *     Promise that resolves to the response
 */
proto.UserPromiseClient.prototype.authenticate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/User/Authenticate',
      request,
      metadata || {},
      methodDescriptor_User_Authenticate);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Empty,
 *   !proto.UserInfo>}
 */
const methodDescriptor_User_AuthenticateGetUserInfo = new grpc.web.MethodDescriptor(
  '/User/AuthenticateGetUserInfo',
  grpc.web.MethodType.UNARY,
  empty_pb.Empty,
  proto.UserInfo,
  /**
   * @param {!proto.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.UserInfo.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Empty,
 *   !proto.UserInfo>}
 */
const methodInfo_User_AuthenticateGetUserInfo = new grpc.web.AbstractClientBase.MethodInfo(
  proto.UserInfo,
  /**
   * @param {!proto.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.UserInfo.deserializeBinary
);


/**
 * @param {!proto.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.UserInfo)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.UserInfo>|undefined}
 *     The XHR Node Readable Stream
 */
proto.UserClient.prototype.authenticateGetUserInfo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/User/AuthenticateGetUserInfo',
      request,
      metadata || {},
      methodDescriptor_User_AuthenticateGetUserInfo,
      callback);
};


/**
 * @param {!proto.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.UserInfo>}
 *     Promise that resolves to the response
 */
proto.UserPromiseClient.prototype.authenticateGetUserInfo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/User/AuthenticateGetUserInfo',
      request,
      metadata || {},
      methodDescriptor_User_AuthenticateGetUserInfo);
};


module.exports = proto;

