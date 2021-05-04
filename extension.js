const vscode = require('vscode');
const exec = require('child_process').exec;

async function executeJSON(command) {
	exec(command, function (error, stdout, stderr) {
		if (error) {
			vscode.window.showInformationMessage(error);
		} else if (stdout) {
			vscode.workspace.openTextDocument({
				content: '// Response:\n\n' + JSON.stringify(JSON.parse(stdout), undefined, 4),
				language: 'jsonc'
			}).then(document => {
				vscode.window.showTextDocument(document, {
					viewColumn: vscode.ViewColumn.Beside
				});
			});
		} else {
			vscode.window.showInformationMessage(stderr);
		}
	});
};

async function execute(command) {
	exec(command, function (error, stdout, stderr) {
		if (error) {
			vscode.window.showInformationMessage(error);
		} else if (stdout) {
			vscode.workspace.openTextDocument({
				content: 'Response:\n\n' + stdout,
			}).then(document => {
				vscode.window.showTextDocument(document, {
					viewColumn: vscode.ViewColumn.Beside
				});
			});
		} else {
			vscode.window.showInformationMessage(stderr);
		}
	});
};

async function GetSelectedText() {
	let editor = vscode.window.activeTextEditor;
	let commandLine = editor.document.lineAt(editor.selection.start.line).text;
	if (commandLine.includes('grpc_cli')) {
		grpcCliClient(editor, commandLine)
	} else if (commandLine.includes('grpcurl')) {
		grpcUrlClient(editor, commandLine)
	} else {
		vscode.window.showInformationMessage('Can\'t recognize a command');
	}
}

async function grpcCliClient(editor, cLine) {
	var text = editor.document.getText(editor.selection);
	let body = text.replace(cLine, '')
	if (body) {
		let exeCommand = cLine + " '" + JSON.stringify(JSON.parse(body)) + "'"
		executeJSON(exeCommand)
	} else {
		execute(cLine)
	}
}

async function grpcUrlClient(editor, cLine) {
	var text = editor.document.getText(editor.selection);
	if (text.includes('-d')) {
		executeJSON(cLine)
	} else {
		execute(cLine)
	}
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('grpc-client.sendRequest', function () {
		GetSelectedText();
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
