import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("Yuhuu, php-serialize-extension is now active!");

  let disposable = vscode.commands.registerTextEditorCommand(
    "php-serialize-extension.serialize",
    (editor, edit) => {
      let selection = editor.selection;
      let text = editor.document.getText(selection);
      let serializedText = serializePHP(Array(text));
      editor.edit((editBuilder) => {
        editBuilder.replace(selection, serializedText);
      });
    }
  );

  context.subscriptions.push(disposable);

  disposable = vscode.commands.registerTextEditorCommand(
    "php-serialize-extension.deserialize",
    (editor, edit) => {
      let selection = editor.selection;
      let text = editor.document.getText(selection);
      let deserializedText = deserializePHP(text);
      editor.edit((editBuilder) => {
        editBuilder.replace(selection, deserializedText);
      });
    }
  );

  context.subscriptions.push(disposable);
}

function serializePHP(obj: any[]): any {
  let serialized = "a:" + obj.length + ":{";
  obj.forEach((item, index) => {
    serialized += `i:${index};s:${item.length}:"${item}";`;
  });
  serialized += "}";
  console.log("masuk serialize");
  return serialized;
}

function deserializePHP(data: string): any {
  // return deserialize(data);
  console.log("masuk deserialize");
  const matches = data.match(/s:\d+:"(.*?)";/g);
  if (matches) {
    return matches.map((match) => match.match(/s:\d+:"(.*?)";/)?.[1]);
  }
  return null;
}

// This method is called when your extension is deactivated
export function deactivate() {}
