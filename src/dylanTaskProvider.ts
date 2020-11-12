import * as vscode from 'vscode'
import * as fs from 'fs'
import { GetChannel } from './extension'
import { resolve } from 'path'
// See https://github.com/microsoft/vscode-extension-samples/blob/master/task-provider-sample/src/rakeTaskProvider.ts
export class DylanTaskProvider implements vscode.TaskProvider {
    static Type = 'dylan-compiler'
    _workspaceRoot: string | undefined
    constructor(ws: string) {
        this._workspaceRoot = ws
    }
    /* This is to scan  for tasks */
    provideTasks(_token: vscode.CancellationToken): vscode.ProviderResult<vscode.Task[]> {
        GetChannel().appendLine("*burp*");
        // TODO scan all possible lid files from the workspace root.
        const project = "testproject"
        if (this._workspaceRoot) {
        const projects = scanForProjects(this._workspaceRoot);
        projects.then(ps=>GetChannel().appendLine(JSON.stringify(ps)));
        }
        const compileTask = new vscode.Task({
            type: DylanTaskProvider.Type,
            project: project
        },
            vscode.TaskScope.Workspace,
            project,
            DylanTaskProvider.Type,
            new vscode.ProcessExecution("dylan-compiler", ["-build", project]),
            "dylan-compiler-problems"
        );

        compileTask.group = vscode.TaskGroup.Build;
        GetChannel().appendLine(`Providing some tasks: ${JSON.stringify(compileTask)}`);
        return [compileTask];
    }
    resolveTask(task: vscode.Task, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Task> {
        GetChannel().appendLine(`Resolving some tasks:${JSON.stringify(task)}`);
        return task;
    }

}
interface DylanTaskDefinition extends vscode.TaskDefinition {
    project: string; // the project name
}

async function scanForProjects(path: string): Promise<string[]> {
    return new Promise<string[]>((resolve, _reject) => {
        fs.readdir(path, (err, files) => {
            const projectFiles = files.filter(s => s.endsWith(".lid"));
            resolve(projectFiles);
        })
    })
} 