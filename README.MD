https://medium.com/dscddu/language-server-protocol-adding-support-for-multiple-language-servers-to-monaco-editor-a3c35e42a98d
https://github.com/clangd/clangd
https://github.com/TypeFox/monaco-languageclient
https://github.com/wylieconlon/jsonrpc-ws-proxy

apt install -y clangd-12 bear
update-alternatives --install /usr/bin/clangd clangd /usr/bin/clangd-12 100
bear make PREFIX=/opt/lab/tool-chain/gcc-arm-none-eabi/bin/arm-none-eabi- -C .
clangd --compile-commands-dir 1112

node dist/server.js --port 50051 --languageServers servers.yml
