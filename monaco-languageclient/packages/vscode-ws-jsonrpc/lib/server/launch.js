/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018-2022 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as cp from 'child_process';
import { StreamMessageReader, StreamMessageWriter, SocketMessageReader, SocketMessageWriter } from 'vscode-jsonrpc/node.js';
import { createConnection } from './connection.js';
import { WebSocketMessageReader } from '../socket/reader.js';
import { WebSocketMessageWriter } from '../socket/writer.js';
export function createServerProcess(serverName, command, args, options) {
    const serverProcess = cp.spawn(command, args || [], options || {});
    serverProcess.on('error', error => console.error(`Launching ${serverName} Server failed: ${error}`));
    if (serverProcess.stderr !== null) {
        serverProcess.stderr.on('data', data => console.error(`${serverName} Server: ${data}`));
    }
    return createProcessStreamConnection(serverProcess);
}
export function createWebSocketConnection(socket) {
    const reader = new WebSocketMessageReader(socket);
    const writer = new WebSocketMessageWriter(socket);
    return createConnection(reader, writer, () => socket.dispose(), { socket });
}
export function createProcessSocketConnection(process, outSocket, inSocket = outSocket) {
    return createSocketConnection(outSocket, inSocket, () => process.kill());
}
export function createSocketConnection(outSocket, inSocket, onDispose) {
    const reader = new SocketMessageReader(outSocket);
    const writer = new SocketMessageWriter(inSocket);
    return createConnection(reader, writer, onDispose);
}
export function createProcessStreamConnection(process) {
    if (process.stdout !== null && process.stdin !== null) {
        return createStreamConnection(process.stdout, process.stdin, () => process.kill());
    }
    else {
        return undefined;
    }
}
export function createStreamConnection(outStream, inStream, onDispose) {
    const reader = new StreamMessageReader(outStream);
    const writer = new StreamMessageWriter(inStream);
    return createConnection(reader, writer, onDispose);
}
//# sourceMappingURL=launch.js.map