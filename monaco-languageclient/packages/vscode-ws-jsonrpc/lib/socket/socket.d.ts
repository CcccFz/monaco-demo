import { Disposable } from 'vscode-jsonrpc';
import { IConnection } from '../server/connection.js';
export interface IWebSocket extends Disposable {
    send(content: string): void;
    onMessage(cb: (data: any) => void): void;
    onError(cb: (reason: any) => void): void;
    onClose(cb: (code: number, reason: string) => void): void;
}
export interface IWebSocketConnection extends IConnection {
    readonly socket: IWebSocket;
}
//# sourceMappingURL=socket.d.ts.map