https://medium.com/dscddu/language-server-protocol-adding-support-for-multiple-language-servers-to-monaco-editor-a3c35e42a98d
https://github.com/clangd/clangd
https://github.com/TypeFox/monaco-languageclient
https://github.com/wylieconlon/jsonrpc-ws-proxy

apt install -y clangd-12 bear
update-alternatives --install /usr/bin/clangd clangd /usr/bin/clangd-12 100
bear make PREFIX=/opt/lab/tool-chain/gcc-arm-none-eabi/bin/arm-none-eabi- -C .
bear make PREFIX=/opt/lab/tool-chain/Xuantie-900-gcc-elf/bin/riscv64-unknown-elf- -C .
clangd --compile-commands-dir 1112

node dist/server.js --port 50051 --languageServers servers.yml

mm32f5270:
    # Generate dependency information                                                                                                                  
    #CFLAGS += -fno-common \                                                                                                                           
    -ffunction-sections\                                                                                                                               
    -fdata-sections\                                                                                                                                   
    -ffreestanding\                                                                                                                                    
    -fno-builtin\                                                                                                                                      
    -mapcs\                                                                                                                                            
    -mapcs\                                                                                                                                            
    -fno-exceptions\                                                                                                                                   
    -MMD -MP -MF"$(@:%.o=%.d)" -Wimplicit-int

    CFLAGS += -MMD -MP -MF"$(@:%.o=%.d)"  

riscv:
    <!-- generic-rv32, rocket-rv32, sifive-7-rv32, sifive-e31, sifive-e76, generic, rocket, sifive-7-series -->
    -mtune=e906 -march=rv32imaxtheade
    -mtune=generic-rv32 -march=rv32ima
    CompileFlags:
      Add: [-I/opt/lab/tool-chain/gcc-arm-none-eabi/arm-none-eabi/include, -mtune=generic-rv32]

stm32:
    -I/opt/lab/tool-chain/gcc-arm-none-eabi/arm-none-eabi/include \