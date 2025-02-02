const vscode = require("vscode");

/**
 * Applies plain-text mode settings to the current workspace.
 */
async function applyPlainTextModeSettings() {
  const config = vscode.workspace.getConfiguration();

  // Editor settings
  await config.update("editor.autoClosingBrackets", "never", vscode.ConfigurationTarget.Workspace);
  await config.update("editor.autoClosingQuotes", "never", vscode.ConfigurationTarget.Workspace);
  await config.update("editor.autoSurround", "never", vscode.ConfigurationTarget.Workspace);
  await config.update("editor.quickSuggestions", { other: false, comments: false, strings: false }, vscode.ConfigurationTarget.Workspace);
  await config.update("editor.suggestOnTriggerCharacters", false, vscode.ConfigurationTarget.Workspace);
  await config.update("editor.wordBasedSuggestions", "off", vscode.ConfigurationTarget.Workspace);
  await config.update("editor.snippetSuggestions", "none", vscode.ConfigurationTarget.Workspace);
  await config.update("editor.parameterHints.enabled", false, vscode.ConfigurationTarget.Workspace);
  await config.update("editor.formatOnSave", false, vscode.ConfigurationTarget.Workspace);
  await config.update("editor.formatOnPaste", false, vscode.ConfigurationTarget.Workspace);
  await config.update("editor.bracketPairColorization.enabled", false, vscode.ConfigurationTarget.Workspace);
  await config.update("editor.inlineSuggest.enabled", false, vscode.ConfigurationTarget.Workspace);
  await config.update("editor.acceptSuggestionOnEnter", "off", vscode.ConfigurationTarget.Workspace);
  await config.update("editor.tabCompletion", "off", vscode.ConfigurationTarget.Workspace);

  // HTML settings
  await config.update("html.autoClosingTags", false, vscode.ConfigurationTarget.Workspace);

  // Emmet settings
  await config.update("emmet.showExpandedAbbreviation", "never", vscode.ConfigurationTarget.Workspace);
  await config.update("emmet.triggerExpansionOnTab", false, vscode.ConfigurationTarget.Workspace);

  console.log("Plain-text mode settings applied.");
  vscode.window.showInformationMessage("Plain-text mode settings applied.");
}

/**
 * Reverts plain-text mode settings in the current workspace by removing the overrides.
 */
async function revertPlainTextModeSettings() {
  const config = vscode.workspace.getConfiguration();

  // Revert editor settings
  await config.update("editor.autoClosingBrackets", undefined, vscode.ConfigurationTarget.Workspace);
  await config.update("editor.autoClosingQuotes", undefined, vscode.ConfigurationTarget.Workspace);
  await config.update("editor.autoSurround", undefined, vscode.ConfigurationTarget.Workspace);
  await config.update("editor.quickSuggestions", undefined, vscode.ConfigurationTarget.Workspace);
  await config.update("editor.suggestOnTriggerCharacters", undefined, vscode.ConfigurationTarget.Workspace);
  await config.update("editor.wordBasedSuggestions", undefined, vscode.ConfigurationTarget.Workspace);
  await config.update("editor.snippetSuggestions", undefined, vscode.ConfigurationTarget.Workspace);
  await config.update("editor.parameterHints.enabled", undefined, vscode.ConfigurationTarget.Workspace);
  await config.update("editor.formatOnSave", undefined, vscode.ConfigurationTarget.Workspace);
  await config.update("editor.formatOnPaste", undefined, vscode.ConfigurationTarget.Workspace);
  await config.update("editor.bracketPairColorization.enabled", undefined, vscode.ConfigurationTarget.Workspace);
  await config.update("editor.inlineSuggest.enabled", undefined, vscode.ConfigurationTarget.Workspace);
  await config.update("editor.acceptSuggestionOnEnter", undefined, vscode.ConfigurationTarget.Workspace);
  await config.update("editor.tabCompletion", undefined, vscode.ConfigurationTarget.Workspace);

  // Revert HTML settings
  await config.update("html.autoClosingTags", undefined, vscode.ConfigurationTarget.Workspace);

  // Revert Emmet settings
  await config.update("emmet.showExpandedAbbreviation", undefined, vscode.ConfigurationTarget.Workspace);
  await config.update("emmet.triggerExpansionOnTab", undefined, vscode.ConfigurationTarget.Workspace);

  console.log("Plain-text mode settings reverted.");
  vscode.window.showInformationMessage("Plain-text mode settings reverted.");
}

/**
 * Activate the extension.
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Automatically apply plain-text mode settings on activation.
  applyPlainTextModeSettings();

  // Register the command to apply plain-text mode settings.
  let applyDisposable = vscode.commands.registerCommand("vanilla-mode.applySettings", async () => {
    await applyPlainTextModeSettings();
  });
  context.subscriptions.push(applyDisposable);

  // Register the command to revert plain-text mode settings.
  let revertDisposable = vscode.commands.registerCommand("vanilla-mode.revertSettings", async () => {
    await revertPlainTextModeSettings();
  });
  context.subscriptions.push(revertDisposable);
}

/**
 * Deactivate the extension.
 */
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
