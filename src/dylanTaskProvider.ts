import * as vscode from 'vscode'
import * as path from 'path'
import { get_compiler } from './extension';

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
            new vscode.ProcessExecution(get_compiler(), ["-build", project]),
            task.problemMatchers
        );
    }

}
interface DylanTaskDefinition extends vscode.TaskDefinition {
    project: string; // the project name
}

async function scanForProjectFiles(): Promise<vscode.Uri[]> {
    // This would be easier if we could use fs/promise in VSCode.
    return vscode.workspace.findFiles("*.lid", "_build");
}

function projectFileToTask(p: vscode.Uri): vscode.Task {

    const project = path.basename(p.fsPath, ".lid");
    const compileTask = new vscode.Task({
        type: DylanTaskProvider.Type,
        project: project
    },
        vscode.TaskScope.Workspace,
        project,
        DylanTaskProvider.Type,
        new vscode.ProcessExecution(get_compiler(), ["-build", project]),
        "$dylan-compiler-problems"
    );
    compileTask.group = vscode.TaskGroup.Build;
    return compileTask;
}

async function scanWorkspacesForProjects(): Promise<vscode.Task[]> {
    return (await scanForProjectFiles()).map(projectFileToTask);
}