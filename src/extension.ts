import * as vscode from 'vscode';
import { DylanTaskProvider } from './dylanTaskProvider';

let dylanTaskProvider: vscode.Disposable | undefined;

let channel: vscode.OutputChannel | undefined;
export function GetChannel() : vscode.OutputChannel {
    if (!channel) {
        channel = vscode.window.createOutputChannel('DYLAN');
    }
    return channel;
}
export function activate(_context: vscode.ExtensionContext): void {
    GetChannel().appendLine('Activating');
    const workspaceRoot = vscode.workspace.rootPath;
    if (!workspaceRoot) {
        return;
    }

    dylanTaskProvider = vscode.tasks.registerTaskProvider(DylanTaskProvider.Type, new DylanTaskProvider());
}

export function deactivate(): void {
    if (dylanTaskProvider) {
        dylanTaskProvider.dispose();
        dylanTaskProvider = void 0;
    }
}