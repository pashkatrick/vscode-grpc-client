## About
I hope, that should make it easier and more flexibility to work with [gprc_cli](https://github.com/grpc/grpc/blob/master/doc/command_line_tool.md) or [grpcurl](https://github.com/fullstorydev/grpcurl)'s like gRPC queries providers.  
And also you can a storage collections of queries inside vscode now :)  

## Get Started 🚀
`brew install grpc` or/and `brew install grpcurl` if you haven't.  

Install [extension](https://marketplace.visualstudio.com/items?itemName=pashkatrick.grpc-client) in VS Code.    
Set your gRPC requests collections somelike:


#### Requests format
##### grpcurl
```bash
grpcurl -plaintext grpc.server.com:80 my.custom.server.Service/Method
# or
grpcurl -d '{"id": 1234}' grpc.server.com:443 my.server.Service/Method
# or
grpcurl localhost:8787 list
# etc
```
##### grpc_cli
```bash
grpc_cli ls localhost.my.server.ru:82
# or
grpc_cli call --json_input --json_output --metadata "header-example:data" localhost.my.server.ru:82 my.server.Service/Method

{
    "id": 1234
}
# etc
```
for example:
![img1](https://raw.githubusercontent.com/pashkatrick/vscode-grpc-client/master/assets/i2.png)

Then select it and `cmd + shift + p`, then `gRPC Client: Send Request` to run it

![img2](https://raw.githubusercontent.com/pashkatrick/vscode-grpc-client/master/assets/i1.png)

## ChangeLog
See CHANGELOG [here](CHANGELOG.md)

## Feedback
Please provide feedback through the [GitHub Issue](https://github.com/pashkatrick/vscode-grpc-client/issues) system, or fork the repository and submit PR.
