import { existsSync } from 'fs';
import * as vscode from 'vscode';
import * as path from 'path'
import { DylanTaskProvider } from './dylanTaskProvider';
import { activateLsp, deactivateLsp } from './dylanLsp'
let dylanTaskProvider: vscode.Disposable | undefined;

let channel: vscode.OutputChannel | undefined;
export function get_channel(): vscode.OutputChannel {
    if (!channel) {
        channel = vscode.window.createOutputChannel('Dylan');
    }
    return channel;
}

export function activate(context: vscode.ExtensionContext): void {
    get_channel().appendLine('Activating');
    activateLsp(context);
    compiler = find_compiler() || 'dylan-compiler-not-found';
    dylanTaskProvider = vscode.tasks.registerTaskProvider(DylanTaskProvider.Type, new DylanTaskProvider());
}

export function deactivate(): Thenable<void> | undefined {
    if (dylanTaskProvider) {
        dylanTaskProvider.dispose();
        dylanTaskProvider = void 0;
    }
    return deactivateLsp();
}
// Cached location.
let compiler: string | undefined = undefined;
/**
 * Find the Dylan compiler.
 * Look on the PATH for `dylan-compiler` and `dylan-compiler-with-tools.exe`
 * (for windows users)
 * Can be overridden with `dylan.compiler` in the Settings.
 * Returns undefined if nothing found.
 */
function find_compiler(): string | undefined {
    const config = vscode.workspace.getConfiguration('dylan')
    const dylan_compiler = config.get('compiler');

    if (dylan_compiler) {
        return dylan_compiler as string;
    } else {
        /* No setting, assume it's on the path */
        const paths = (process.env.PATH || "").split(path.delimiter)
        const exe = process.platform == "win32" ? "dylan-compiler-with-tools.exe" : "dylan-compiler";
        for (const p of paths) {
            const dc = path.join(p, exe);
            if (existsSync(dc)) {
                return dc;
            }
        }
        return undefined; // Not found anywhere
    }

}
/**
 * Get full path of the dylan compiler
 */
export function get_compiler(): string {
    return compiler as string;
}