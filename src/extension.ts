import * as vscode from 'vscode';
import { DylanTaskProvider } from './dylanTaskProvider';

let dylanTaskProvider: vscode.Disposable | undefined;

let channel: vscode.OutputChannel | undefined;
export function get_channel(): vscode.OutputChannel {
    if (!channel) {
        channel = vscode.window.createOutputChannel('Dylan');
    }
    return channel;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function activate(_context: vscode.ExtensionContext): void {
    get_channel().appendLine('Activating');
    dylanTaskProvider = vscode.tasks.registerTaskProvider(DylanTaskProvider.Type, new DylanTaskProvider());
}

export function deactivate(): void {
    if (dylanTaskProvider) {
        dylanTaskProvider.dispose();
        dylanTaskProvider = void 0;
    }
}
/**
 * Get location of the dylan compiler
 */
export function get_compiler() : string {
    const config = vscode.workspace.getConfiguration('dylan')
    const dylan_compiler = config.get('compiler');
    get_channel().appendLine(`Dylan compiler : ${dylan_compiler}`)
    if (dylan_compiler) {
        return dylan_compiler as string;
    } else {
        /* No setting, assume it's on the path */
        return 'dylan-compiler'
    }
}