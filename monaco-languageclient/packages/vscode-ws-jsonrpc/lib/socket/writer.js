/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018-2022 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { AbstractMessageWriter } from 'vscode-jsonrpc/lib/common/messageWriter.js';
export class WebSocketMessageWriter extends AbstractMessageWriter {
    socket;
    errorCount = 0;
    constructor(socket) {
        super();
        this.socket = socket;
    }
    end() {
    }
    async write(msg) {
        try {
            const content = JSON.stringify(msg);
            this.socket.send(content);
        }
        catch (e) {
            this.errorCount++;
            this.fireError(e, msg, this.errorCount);
        }
    }
}
//# sourceMappingURL=writer.js.map