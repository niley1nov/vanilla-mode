# VS Code Extension Quickstart

Welcome to **Vanilla Mode**! This guide will walk you through running, debugging, and testing your new VS Code extension in just a few easy steps.

## Getting Started

1. **Install Dependencies**  
   - Open your terminal in the project folder and run:
     ```bash
     npm install
     ```
   - This installs any required packages (if you have any dependencies).

2. **Open in VS Code**  
   - If you're not already there, fire up Visual Studio Code.
   - Go to **File > Open Folder...** and select this extension's folder.

3. **Launch the Extension**  
   - Hit `F5` (or go to the **Run and Debug** panel and select **"Run Extension"**).
   - VS Code will start a new _Extension Development Host_ window with **Vanilla Mode** installed.

## Run & Debug

- **Extension Development Host**  
  - This separate instance of VS Code runs your extension in isolation.  
  - Any changes to your extension’s code will be reflected once you **Reload** or relaunch the Extension Development Host.
  
- **Debugging Tips**  
  - Use `console.log()` statements in your code to see output in the Debug Console.
  - Set breakpoints like you would in any other VS Code project to step through your extension code.

## Test the Extension

1. **Disable AI Features**  
   - In the Extension Development Host, open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`).
   - Run **`Vanilla: disable AI features`** to apply the plain-text mode settings.
2. **Revert AI Features**  
   - Run **`Vanilla: revert AI features settings`** to remove those settings and go back to your default workspace configuration.

## Editing the Extension

- **extension.js**  
  - Main entry point for your extension, where you can modify behavior, add commands, and handle activation logic.
- **package.json**  
  - Contains metadata like name, version, and contribution points (commands, activation events, etc.).

## Publishing (Optional)

- **Package & Publish**  
  - If you plan to share your extension with the world, install `vsce`:
    ```bash
    npm install -g vsce
    ```
  - Bump up your version in `package.json`, then package or publish:
    ```bash
    vsce package
    vsce publish
    ```
  
## Have Fun!

- That’s all you need to start hacking on **Vanilla Mode**.  
- Remember to keep it simple, stay calm, and avoid letting AI code completions run your life (unless you revert to them). Happy coding!
