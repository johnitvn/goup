import * as fs from 'fs';
import * as ts from 'typescript';

export class TypescriptMerger {
  private declarations = new Map<string, Map<string, ts.Node>>();
  private importStatements = new Set<string>([`import { EmptyObject } from '@goup/common-types';`]);

  constructor(private inputFiles: string[], private outputFile: string) {}

  public mergeFiles() {
    this.inputFiles.forEach((filePath) => {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest, true);
      process.stdout.write(`Processing ${filePath}\n`);
      this.processSourceFile(sourceFile);
      process.stdout.write(`Finished processing ${filePath}\n====================\n`);
    });

    const mergedImports = Array.from(this.importStatements).join('\n');
    // console.log("Imports: \n", mergedImports);

    const mergedNodes = Array.from(this.declarations.keys())
      .map((namespace) => {
        const namespaceDeclarations = Array.from(this.declarations.get(namespace).values())
          .map((node) => node.getText())
          .join('\n\n');
        return `export namespace ${namespace} {
${namespaceDeclarations}
}`;
      })
      .join('\n\n\n\n');

    let mergedContent = `${mergedImports}\n\n\n${mergedNodes}\n`;
    mergedContent = mergedContent.replace(/\b\w+\.Empty\b/g, 'EmptyObject');
    // process.stdout.write(`Merged content: ${mergedContent}\n`);

    fs.writeFileSync(this.outputFile, mergedContent, 'utf-8');
    console.log(`Merged file created at ${this.outputFile}`);
  }

  private processSourceFile(sourceFile: ts.SourceFile) {
    ts.forEachChild(sourceFile, (node: any) => {
      const namespace = node?.name?.text || '';
      this.collectImportsAndDeclarations(node, namespace);
    });
  }

  private collectImportsAndDeclarations(node: ts.Node, namespace: string) {
    if (ts.isImportDeclaration(node)) {
      const importStatement = node.getText();
      if (importStatement !== '') {
        process.stdout.write(`    - Add Import: ${importStatement}\n`);
        this.importStatements.add(importStatement);
      }
      return;
    } else if (namespace && (ts.isInterfaceDeclaration(node) || ts.isEnumDeclaration(node))) {
      if (!this.declarations.has(namespace)) {
        process.stdout.write(`    - Add Namespace: ${namespace}\n`);
        this.declarations.set(namespace, new Map<string, ts.Node>());
      }

      const name = node?.name?.text || '';
      if (!this.declarations.get(namespace).has(name)) {
        process.stdout.write(`    - Add Declaration: ${name}\n`);
        this.declarations.get(namespace).set(name, node);
      } else {
        process.stdout.write(`    - Duplicate Declaration: ${name}\n`);
        if (!this.areNodesStructurallyEqual(this.declarations.get(namespace).get(name), node)) {
          throw new Error(`Duplicate interface or enum found with different declarations: ${namespace}.${name}`);
        }
      }
    }
    ts.forEachChild(node, (child) => this.collectImportsAndDeclarations(child, namespace));
  }

  private areNodesStructurallyEqual(node1: ts.Node, node2: ts.Node): boolean {
    if (!node1 || !node2 || node1.kind !== node2.kind) {
      return false;
    }

    const node1Text = node1.getText ? node1.getText() : '';
    const node2Text = node2.getText ? node2.getText() : '';

    return node1Text === node2Text;
  }
}
