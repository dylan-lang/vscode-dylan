/* --------------------------------------------------------------------------------------------
 * Based on LSP example code which is
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as path from 'path';
import { ExtensionContext } from 'vscode';
import {get_channel, get_compiler} from './extension';
import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	ExecutableOptions
} from 'vscode-languageclient/node';

let client: LanguageClient;
// TODO - this should be a setting
let registries : string|undefined = undefined
function user_registries() {
	if (!registries) {
		registries = process.env["OPEN_DYLAN_USER_REGISTRIES"] || "."
	}
	return registries;
}

export function activateLsp(context: ExtensionContext): void {
	// The server is implemented in dylan native code
	// TODO find the server from config, or from being on the path
	const serverExe = context.asAbsolutePath(
		path.join('..', '_build', 'bin', 'lsp-dylan')
	);
		get_channel().appendLine(`serverExe: ${serverExe}`)
		get_channel().appendLine(`compiler: ${get_compiler()}`)
	const openDylanRelease =
		path.join(path.dirname(get_compiler()), '..');
	const runOptions: ExecutableOptions = {
		env: {
			...process.env, 
			OPEN_DYLAN_RELEASE: openDylanRelease,
			OPEN_DYLAN_USER_REGISTRIES: user_registries()
		}
	}
	const serverOptions: ServerOptions = {
		run: {
			command: serverExe,
			options: runOptions
		},
		debug: {
			command: serverExe, args: ['--debug'],
			options: runOptions
		}
	};

	// Options to control the language client
	const clientOptions: LanguageClientOptions = {
		// Register the server for dylan source documents
		documentSelector: [{ scheme: 'file', language: 'dylan' }],
		synchronize: { configurationSection: 'dylan' }
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'dylan',
		'Dylan Language Server',
		serverOptions,
		clientOptions
	);

	// Start the client. This will also launch the server
	const disposable = client.start();
	context.subscriptions.push(disposable);
}

export function deactivateLsp(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
