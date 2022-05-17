require('dotenv').config({path: 'D:/PROJECTS/openAI VS EXT/openai-ext/.env'})
const vscode = require('vscode');
const { Configuration, OpenAIApi } = require("openai");

//Functionalities:-
// 1. A code editor extension that allows for code sharing and collaboration between different programming languages.
// 2. A code editor extension that automatically generates documentation for all code functions and classes.
// 3. Semantic Search
// 4. Writing programming code using instructions in natural languages.

/**
 * @param {vscode.ExtensionContext} context
 */
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API,
});

const openai = new OpenAIApi(configuration);

function activate(context) {

	let writeCode = vscode.commands.registerCommand('Intellectify.write', async function () {

		vscode.window.withProgress({
			location: vscode.ProgressLocation.Notification,
			title: "Writing code!",
			cancellable: true
		}, async (progress, token) => {
			token.onCancellationRequested(() => {
				vscode.window.showInformationMessage("Operation Canceled!");
			});

			progress.report({ increment: 0 });

			setTimeout(() => {
				progress.report({ increment: 10, message: "Writing your code..." });
			}, 1000);

			setTimeout(() => {
				progress.report({ increment: 50, message: "Please hold! - almost there..." });
			}, 3000);

			const editor = vscode.window.activeTextEditor;
			if(!editor) {
				vscode.window.showInformationMessage("Editor does not exist");
				return;
			}
			const text = editor.document.getText(editor.selection);

			const outputCode =  await openai.createCompletion("text-davinci-001", {
				prompt: `Write code by following these instructions:\n${text}`,
				max_tokens: 500,
				temperature: 0.5,
			}).then(res => {
				if (!res) throw Error;
		
				editor.edit(edit => {
					edit.replace(editor.selection, res.data.choices[0].text);
				});
				vscode.window.showInformationMessage('Your response has been printed!');
			})
			.then(undefined, err => {
				console.error('I am error', err);
				vscode.window.showInformationMessage('Oops! there is an error');
			});

			return outputCode;
		});
	});

	let codeConversion = vscode.commands.registerCommand('Intellectify.convert', async function () {

		vscode.window.withProgress({
			location: vscode.ProgressLocation.Notification,
			title: "Converting code!",
			cancellable: true
		}, async (progress, token) => {
			token.onCancellationRequested(() => {
				vscode.window.showInformationMessage("Operation Canceled!");
			});

			progress.report({ increment: 0 });

			setTimeout(() => {
				progress.report({ increment: 10, message: "Converting your code..." });
			}, 1000);

			setTimeout(() => {
				progress.report({ increment: 50, message: "Please hold! - almost there..." });
			}, 3000);

			const editor = vscode.window.activeTextEditor;
			if(!editor) {
				vscode.window.showInformationMessage("Editor does not exist");
				return;
			}
			const text = editor.document.getText(editor.selection);

			const convertedData =  await openai.createCompletion("text-davinci-001", {
				prompt: `Convert this piece of code from ${text}`,
				max_tokens: 500,
				temperature: 0.5,
			}).then(res => {
				if (!res) throw Error;
		
				editor.edit(edit => {
					edit.replace(editor.selection, res.data.choices[0].text);
				});
				vscode.window.showInformationMessage('Your response has been printed!');
			})
			.then(undefined, err => {
				console.error('I am error', err);
				vscode.window.showInformationMessage('Oops! there is an error');
			});

			return convertedData;
		});
		
	});

	let generateDoc = vscode.commands.registerCommand('Intellectify.generate', async function () {

		vscode.window.withProgress({
			location: vscode.ProgressLocation.Notification,
			title: "Documentation",
			cancellable: true
		}, async (progress, token) => {
			token.onCancellationRequested(() => {
				vscode.window.showInformationMessage("Operation Canceled!");
			});

			progress.report({ increment: 0 });

			setTimeout(() => {
				progress.report({ increment: 10, message: "Prepairing your doc..." });
			}, 1000);

			setTimeout(() => {
				progress.report({ increment: 50, message: "Please hold! - almost there..." });
			}, 3000);

			const editor = vscode.window.activeTextEditor;
			if(!editor) {
				vscode.window.showInformationMessage("Editor does not exist");
				return;
			}
			const text = editor.document.getText(editor.selection);

			const prepairedDoc = await openai.createCompletion("text-davinci-001", {
				prompt: `Write the documentation for this code in bullet points:\n ${text}\n`,
				max_tokens: 1000,
				temperature: 0.5,
			}).then(res => {
				if (!res) throw Error;
		
				editor.edit(edit => {
					edit.replace(editor.selection, res.data.choices[0].text);
					setTimeout(() => {
						vscode.commands.executeCommand('editor.action.addCommentLine');
					}, 500);
					
					let selEndLine = editor.selection.end.line + 1;
					const end = new vscode.Position(selEndLine, 0);
					edit.insert(end, '\n');
					edit.insert(end, text);
					edit.insert(end, '\n');
				});
				vscode.window.showInformationMessage('Your response has been printed!');
			})
			.then(undefined, err => {
				console.error('I am error', err);
				vscode.window.showInformationMessage('Oops! there is an error');
			});
			return prepairedDoc;
		});
		
	});


	let summarize = vscode.commands.registerCommand('Intellectify.doSummarize', async function () {

		vscode.window.withProgress({
			location: vscode.ProgressLocation.Notification,
			title: "Summarization",
			cancellable: true
		}, async (progress, token) => {
			token.onCancellationRequested(() => {
				vscode.window.showInformationMessage("Operation Canceled!");
			});

			progress.report({ increment: 0 });

			setTimeout(() => {
				progress.report({ increment: 10, message: "Summarizing..." });
			}, 1000);

			setTimeout(() => {
				progress.report({ increment: 50, message: "Please hold! - almost there..." });
			}, 3000);

			const editor = vscode.window.activeTextEditor;
			if(!editor) {
				vscode.window.showInformationMessage("Editor does not exist");
				return;
			}
			const text = editor.document.getText(editor.selection);

			const prepairedDoc = await openai.createCompletion("text-davinci-001", {
				prompt: `Summarize this text briefly:\n ${text}\n`,
				max_tokens: 1000,
				temperature: 0.5,
			}).then(res => {
				if (!res) throw Error;
		
				editor.edit(edit => {
					edit.replace(editor.selection, res.data.choices[0].text);
					setTimeout(() => {
						vscode.commands.executeCommand('editor.action.addCommentLine');
					}, 500);
					
					let selEndLine = editor.selection.end.line + 1;
					const end = new vscode.Position(selEndLine, 0);
					edit.insert(end, '\n');
					edit.insert(end, text);
					edit.insert(end, '\n');
				});
				vscode.window.showInformationMessage('Your response has been printed!');
			})
			.then(undefined, err => {
				console.error('I am error', err);
				vscode.window.showInformationMessage('Oops! there is an error');
			});
			return prepairedDoc;
		});
		
	});

	let sementicSearch = vscode.commands.registerCommand('Intellectify.search', async function () {

		const editor = vscode.window.activeTextEditor;

		const allFileText = editor.document.getText();
		const arr = allFileText.split(/\r?\n/);

	
		const result = await vscode.window.showInputBox({
			value: '',
			valueSelection: [2, 4],
			placeHolder: 'Search your query..',
			validateInput: text => {
				return text.length > 80 ? "Input can't exceed 80 characters" : null;
			}
		});

		vscode.window.withProgress({
			location: vscode.ProgressLocation.Notification,
			title: "Semantic Search",
			cancellable: true
		}, async (progress, token) => {
			token.onCancellationRequested(() => {
				vscode.window.showInformationMessage("Operation Canceled!");
			});

			progress.report({ increment: 0 });

			setTimeout(() => {
				progress.report({ increment: 10, message: "Searching..." });
			}, 1000);

			setTimeout(() => {
				progress.report({ increment: 50, message: "Please hold! - almost there..." });
			}, 3000);
		
			if(result === undefined){
				vscode.window.showInformationMessage('Opration canceled!')
			}
			else if(result !== undefined && result.length === 0){
				vscode.window.showInformationMessage('No query has been made!')
			}else if(arr.length == 0){
				vscode.window.showInformationMessage('Searched on empty file!')
			}else{
				const response = await openai.createSearch("davinci", {
					documents: [...arr],
					query: result,
				});
				const bestMatch = response.data.data.sort((a, b) => a.score > b.score ? -1 : 1);
				const startpos = new vscode.Position(bestMatch[0].document,0);
				const endPosActive = new vscode.Position(bestMatch[0].document,arr[bestMatch[0].document].length);
				const newSelectionRef = new vscode.Selection(startpos, endPosActive);


				editor.selection = newSelectionRef;
				const range_for_reveal = new vscode.Range(startpos, endPosActive)
				editor.revealRange(range_for_reveal, 1)
			}
			return 0;
		});
		
	});


	context.subscriptions.push(codeConversion);
	context.subscriptions.push(generateDoc);
	context.subscriptions.push(sementicSearch);
	context.subscriptions.push(writeCode);
	context.subscriptions.push(summarize);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
