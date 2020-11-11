import * as vscode from 'vscode'
import { GetChannel } from './extension'
// See https://github.com/microsoft/vscode-extension-samples/blob/master/task-provider-sample/src/rakeTaskProvider.ts
export class DylanTaskProvider implements vscode.TaskProvider {
    static Type = 'dylan-compiler'
    provideTasks(_token: vscode.CancellationToken): vscode.ProviderResult<vscode.Task[]> {
        GetChannel().appendLine("*burp*");
        const compileTask = new vscode.Task({
            type: DylanTaskProvider.Type,
            project: "cheese"
        },
            vscode.TaskScope.Workspace,
            "build",
            "dylan-compiler",
            new vscode.ShellExecution("dylan-compiler -build cheese")
            );
            compileTask.group = vscode.TaskGroup.Build;
        GetChannel().appendLine(`Providing some tasks: ${JSON.stringify(compileTask)}`);
        return [compileTask];
    }
    resolveTask(task: vscode.Task, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Task> {
        GetChannel().appendLine("Resolving some tasks");
        return task;
    }

}
interface DylanTaskDefinition extends vscode.TaskDefinition {
    project: string; // the project name
}