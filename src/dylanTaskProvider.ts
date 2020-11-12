import * as vscode from 'vscode'
import * as fs from 'fs'
import * as path from 'path'

// See https://github.com/microsoft/vscode-extension-samples/blob/master/task-provider-sample/src/rakeTaskProvider.ts
export class DylanTaskProvider implements vscode.TaskProvider {
    static Type = 'dylan-compiler'

    /* This is to scan the workspace root for tasks */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    provideTasks(_token: vscode.CancellationToken): Thenable<vscode.Task[]> {
        return scanWorkspacesForProjects();
    }
    /* This is to "re-animate" a task that was stored in tasks.json */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    resolveTask(task: vscode.Task, _token: vscode.CancellationToken): vscode.Task {
        const dylanTaskDef = task.definition as DylanTaskDefinition;
        const project = dylanTaskDef.project;
        return new vscode.Task(task.definition,
            vscode.TaskScope.Workspace,
            project,
            DylanTaskProvider.Type,
            new vscode.ProcessExecution("dylan-compiler", ["-build", project]),
            task.problemMatchers
        );
    }

}
interface DylanTaskDefinition extends vscode.TaskDefinition {
    project: string; // the project name
}

async function scanForProjectFiles(path: string): Promise<string[]> {
    // This would be easier if we could use fs/promise in VSCode.
    return new Promise<string[]>((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) { reject(err); }
            else {
                const projectFiles = files.filter(s => s.endsWith(".lid"));
                resolve(projectFiles);
            }
        })
    })
}

function projectFileToTask(p: string, ws?: vscode.WorkspaceFolder): vscode.Task {
    const project = path.basename(p, ".lid");
    const compileTask = new vscode.Task({
        type: DylanTaskProvider.Type,
        project: project
    },
        ws || vscode.TaskScope.Workspace,
        project,
        DylanTaskProvider.Type,
        new vscode.ProcessExecution("dylan-compiler", ["-build", project]),
        "$dylan-compiler-problems"
    );
    compileTask.group = vscode.TaskGroup.Build;
    return compileTask;
}

async function scanWorkspacesForProjects(): Promise<vscode.Task[]> {
    const folders = vscode.workspace.workspaceFolders || []
    const results: vscode.Task[] = [];
    for (const ws of folders) {
        const files = await scanForProjectFiles(ws.uri.fsPath);
        files.map((file) => projectFileToTask(file, ws))
            .forEach(task => results.push(task));
    }
    return results;
}