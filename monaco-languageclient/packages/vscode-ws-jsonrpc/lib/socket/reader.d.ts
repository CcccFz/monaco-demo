import { Disposable } from 'vscode-jsonrpc';
import { DataCallback, AbstractMessageReader, MessageReader } from 'vscode-jsonrpc/lib/common/messageReader.js';
import { IWebSocket } from './socket.js';
export declare class WebSocketMessageReader extends AbstractMessageReader implements MessageReader {
    protected readonly socket: IWebSocket;
    protected state: 'initial' | 'listening' | 'closed';
    protected callback: DataCallback | undefined;
    protected readonly events: {
        message?: any;
        error?: any;
    }[];
    constructor(socket: IWebSocket);
    listen(callback: DataCallback): Disposable;
    protected readMessage(message: any): void;
    protected fireError(error: any): void;
    protected fireClose(): void;
}
//# sourceMappingURL=reader.d.ts.map