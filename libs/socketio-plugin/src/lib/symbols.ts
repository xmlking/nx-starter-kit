import { InjectionToken } from '@angular/core';
import { ManagerOptions, SocketOptions } from 'socket.io-client';

export const NGXS_WEBSOCKET_OPTIONS = new InjectionToken('NGXS_WEBSOCKET_OPTIONS');

export interface NgxsWebsocketPluginOptions {
  /**
   * URL of the websocket.
   */
  url?: string;

  connectOpts?: Partial<ManagerOptions & SocketOptions>;

  tokenFn?: () => string;

  /**
   * The property name to distigunish this type for the store.
   * Default: 'type'
   */
  typeKey?: string;

  /**
   * Interval to try and reconnect.
   * Default: 5000
   */
  reconnectInterval?: number;

  /**
   * Number of reconnect attemps.
   * Default: 10
   */
  reconnectAttempts?: number;

  /**
   * Serializer to call before sending messages
   * Default: `json.stringify`
   */
  serializer?: (data: any) => string;

  /**
   * Deseralizer before publishing the message.
   */
  deserializer?: (e: MessageEvent) => any;
}

export function noop(arg) {
  return () => {};
}

/**
 * Action to connect to the websocket. Optionally pass a URL.
 */
export class ConnectWebSocket {
  static readonly type = '[Websocket] Connect';
  constructor(public payload?: NgxsWebsocketPluginOptions) {}
}

/**
 * Action triggered when a error ocurrs
 */
export class WebsocketMessageError {
  static readonly type = '[Websocket] Message Error';
  constructor(public payload: any) {}
}

/**
 * Action to disconnect the websocket.
 */
export class DisconnectWebSocket {
  static readonly type = '[Websocket] Disconnect';
}

/**
 * Action to send to the server.
 */
export class SendWebSocketAction {
  static readonly type = '[Websocket] Send Action';
  constructor(public payload: any) {}
}

export class WebSocketConnected {
  static readonly type = '[Websocket] Connected';
  constructor(public payload: { socketId: string }) {}
}

export class WebSocketDisconnected {
  static readonly type = '[Websocket] Disconnected';
}

export class AuthenticateWebSocket {
  static readonly type = '[Websocket] authenticate';
}
