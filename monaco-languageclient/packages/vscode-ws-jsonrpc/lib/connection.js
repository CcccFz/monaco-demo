/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018-2022 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { createWebSocketConnection } from './socket/connection.js';
import { ConsoleLogger } from './logger.js';
export function listen(options) {
    const { webSocket, onConnection } = options;
    const logger = options.logger || new ConsoleLogger();
    webSocket.onopen = () => {
        const socket = toSocket(webSocket);
        const connection = createWebSocketConnection(socket, logger);
        onConnection(connection);
    };
}
export function toSocket(webSocket) {
    return {
        send: content => webSocket.send(content),
        onMessage: cb => {
            webSocket.onmessage = event => cb(event.data);
        },
        onError: cb => {
            webSocket.onerror = event => {
                if ('message' in event) {
                    cb(event.message);
                }
            };
        },
        onClose: cb => {
            webSocket.onclose = event => cb(event.code, event.reason);
        },
        dispose: () => webSocket.close()
    };
}
//# sourceMappingURL=connection.js.map