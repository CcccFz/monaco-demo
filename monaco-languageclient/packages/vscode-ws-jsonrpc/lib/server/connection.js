/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018-2022 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { Disposable } from 'vscode-jsonrpc';
import { DisposableCollection } from '../disposable.js';
export function forward(clientConnection, serverConnection, map) {
    clientConnection.forward(serverConnection, map);
    serverConnection.forward(clientConnection, map);
    clientConnection.onClose(() => serverConnection.dispose());
    serverConnection.onClose(() => clientConnection.dispose());
}
export function createConnection(reader, writer, onDispose, extensions = {}) {
    const disposeOnClose = new DisposableCollection();
    reader.onClose(() => disposeOnClose.dispose());
    writer.onClose(() => disposeOnClose.dispose());
    return {
        reader,
        writer,
        forward(to, map = (message) => message) {
            reader.listen(input => {
                const output = map(input);
                to.writer.write(output);
            });
        },
        onClose(callback) {
            return disposeOnClose.push(Disposable.create(callback));
        },
        dispose: () => onDispose(),
        ...extensions
    };
}
//# sourceMappingURL=connection.js.map