import { Message } from 'vscode-jsonrpc/lib/common/messages.js';
import { AbstractMessageWriter, MessageWriter } from 'vscode-jsonrpc/lib/common/messageWriter.js';
import { IWebSocket } from './socket.js';
export declare class WebSocketMessageWriter extends AbstractMessageWriter implements MessageWriter {
    protected readonly socket: IWebSocket;
    protected errorCount: number;
    constructor(socket: IWebSocket);
    end(): void;
    write(msg: Message): Promise<void>;
}
//# sourceMappingURL=writer.d.ts.map