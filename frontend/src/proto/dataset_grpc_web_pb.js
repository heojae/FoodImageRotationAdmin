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
const proto = require('./dataset_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.DatasetClient =
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
proto.DatasetPromiseClient =
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
 *   !proto.DatasetInfo>}
 */
const methodDescriptor_Dataset_GetDatasetInfoList = new grpc.web.MethodDescriptor(
  '/Dataset/GetDatasetInfoList',
  grpc.web.MethodType.SERVER_STREAMING,
  empty_pb.Empty,
  proto.DatasetInfo,
  /**
   * @param {!proto.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.DatasetInfo.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Empty,
 *   !proto.DatasetInfo>}
 */
const methodInfo_Dataset_GetDatasetInfoList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.DatasetInfo,
  /**
   * @param {!proto.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.DatasetInfo.deserializeBinary
);


/**
 * @param {!proto.Empty} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.DatasetInfo>}
 *     The XHR Node Readable Stream
 */
proto.DatasetClient.prototype.getDatasetInfoList =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/Dataset/GetDatasetInfoList',
      request,
      metadata || {},
      methodDescriptor_Dataset_GetDatasetInfoList);
};


/**
 * @param {!proto.Empty} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.DatasetInfo>}
 *     The XHR Node Readable Stream
 */
proto.DatasetPromiseClient.prototype.getDatasetInfoList =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/Dataset/GetDatasetInfoList',
      request,
      metadata || {},
      methodDescriptor_Dataset_GetDatasetInfoList);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Empty,
 *   !proto.ImageInfo>}
 */
const methodDescriptor_Dataset_GetImageInfoList = new grpc.web.MethodDescriptor(
  '/Dataset/GetImageInfoList',
  grpc.web.MethodType.SERVER_STREAMING,
  empty_pb.Empty,
  proto.ImageInfo,
  /**
   * @param {!proto.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ImageInfo.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Empty,
 *   !proto.ImageInfo>}
 */
const methodInfo_Dataset_GetImageInfoList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ImageInfo,
  /**
   * @param {!proto.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ImageInfo.deserializeBinary
);


/**
 * @param {!proto.Empty} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.ImageInfo>}
 *     The XHR Node Readable Stream
 */
proto.DatasetClient.prototype.getImageInfoList =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/Dataset/GetImageInfoList',
      request,
      metadata || {},
      methodDescriptor_Dataset_GetImageInfoList);
};


/**
 * @param {!proto.Empty} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.ImageInfo>}
 *     The XHR Node Readable Stream
 */
proto.DatasetPromiseClient.prototype.getImageInfoList =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/Dataset/GetImageInfoList',
      request,
      metadata || {},
      methodDescriptor_Dataset_GetImageInfoList);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.SelectedDatasetInfo,
 *   !proto.ImageInfo>}
 */
const methodDescriptor_Dataset_GetChooseImageInfoList = new grpc.web.MethodDescriptor(
  '/Dataset/GetChooseImageInfoList',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.SelectedDatasetInfo,
  proto.ImageInfo,
  /**
   * @param {!proto.SelectedDatasetInfo} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ImageInfo.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.SelectedDatasetInfo,
 *   !proto.ImageInfo>}
 */
const methodInfo_Dataset_GetChooseImageInfoList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ImageInfo,
  /**
   * @param {!proto.SelectedDatasetInfo} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ImageInfo.deserializeBinary
);


/**
 * @param {!proto.SelectedDatasetInfo} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.ImageInfo>}
 *     The XHR Node Readable Stream
 */
proto.DatasetClient.prototype.getChooseImageInfoList =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/Dataset/GetChooseImageInfoList',
      request,
      metadata || {},
      methodDescriptor_Dataset_GetChooseImageInfoList);
};


/**
 * @param {!proto.SelectedDatasetInfo} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.ImageInfo>}
 *     The XHR Node Readable Stream
 */
proto.DatasetPromiseClient.prototype.getChooseImageInfoList =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/Dataset/GetChooseImageInfoList',
      request,
      metadata || {},
      methodDescriptor_Dataset_GetChooseImageInfoList);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.SelectedImageInfo,
 *   !proto.Empty>}
 */
const methodDescriptor_Dataset_RemoveImage = new grpc.web.MethodDescriptor(
  '/Dataset/RemoveImage',
  grpc.web.MethodType.UNARY,
  proto.SelectedImageInfo,
  empty_pb.Empty,
  /**
   * @param {!proto.SelectedImageInfo} request
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
 *   !proto.SelectedImageInfo,
 *   !proto.Empty>}
 */
const methodInfo_Dataset_RemoveImage = new grpc.web.AbstractClientBase.MethodInfo(
  empty_pb.Empty,
  /**
   * @param {!proto.SelectedImageInfo} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.SelectedImageInfo} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.DatasetClient.prototype.removeImage =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/Dataset/RemoveImage',
      request,
      metadata || {},
      methodDescriptor_Dataset_RemoveImage,
      callback);
};


/**
 * @param {!proto.SelectedImageInfo} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Empty>}
 *     Promise that resolves to the response
 */
proto.DatasetPromiseClient.prototype.removeImage =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/Dataset/RemoveImage',
      request,
      metadata || {},
      methodDescriptor_Dataset_RemoveImage);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.NewDatasetInfo,
 *   !proto.Empty>}
 */
const methodDescriptor_Dataset_CreateDatasetInfo = new grpc.web.MethodDescriptor(
  '/Dataset/CreateDatasetInfo',
  grpc.web.MethodType.UNARY,
  proto.NewDatasetInfo,
  empty_pb.Empty,
  /**
   * @param {!proto.NewDatasetInfo} request
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
 *   !proto.NewDatasetInfo,
 *   !proto.Empty>}
 */
const methodInfo_Dataset_CreateDatasetInfo = new grpc.web.AbstractClientBase.MethodInfo(
  empty_pb.Empty,
  /**
   * @param {!proto.NewDatasetInfo} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.NewDatasetInfo} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.DatasetClient.prototype.createDatasetInfo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/Dataset/CreateDatasetInfo',
      request,
      metadata || {},
      methodDescriptor_Dataset_CreateDatasetInfo,
      callback);
};


/**
 * @param {!proto.NewDatasetInfo} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Empty>}
 *     Promise that resolves to the response
 */
proto.DatasetPromiseClient.prototype.createDatasetInfo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/Dataset/CreateDatasetInfo',
      request,
      metadata || {},
      methodDescriptor_Dataset_CreateDatasetInfo);
};


module.exports = proto;

