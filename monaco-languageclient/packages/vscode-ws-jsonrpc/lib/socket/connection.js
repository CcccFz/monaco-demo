/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018-2022 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { createMessageConnection } from 'vscode-jsonrpc';
import { WebSocketMessageReader } from './reader.js';
import { WebSocketMessageWriter } from './writer.js';
export function createWebSocketConnection(socket, logger) {
    const messageReader = new WebSocketMessageReader(socket);
    const messageWriter = new WebSocketMessageWriter(socket);
    const connection = createMessageConnection(messageReader, messageWriter, logger);
    connection.onClose(() => connection.dispose());
    return connection;
}
//# sourceMappingURL=connection.js.map