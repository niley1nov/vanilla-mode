const vscode = require("vscode");

async function updateSettingSafely(config, settingKey, value) {
  try {
    await config.update(settingKey, value, vscode.ConfigurationTarget.Workspace);
  } catch (error) {
    console.warn(`[Vanilla Mode] Failed to update setting "${settingKey}". It might not be registered. Error: ${error.message}`);
  }
}

async function applyPlainTextModeSettings() {
  const config = vscode.workspace.getConfiguration();

  // Editor settings
  await updateSettingSafely(config, "editor.autoClosingBrackets", "never");
  await updateSettingSafely(config, "editor.autoClosingQuotes", "never");
  await updateSettingSafely(config, "editor.autoSurround", "never");
  await updateSettingSafely(config, "editor.quickSuggestions", { other: false, comments: false, strings: false });
  await updateSettingSafely(config, "editor.suggestOnTriggerCharacters", false);
  await updateSettingSafely(config, "editor.wordBasedSuggestions", "off");
  await updateSettingSafely(config, "editor.snippetSuggestions", "none");
  await updateSettingSafely(config, "editor.parameterHints.enabled", false);
  await updateSettingSafely(config, "editor.formatOnSave", false);
  await updateSettingSafely(config, "editor.formatOnPaste", false);
  await updateSettingSafely(config, "editor.bracketPairColorization.enabled", false);
  await updateSettingSafely(config, "editor.inlineSuggest.enabled", false);
  await updateSettingSafely(config, "editor.acceptSuggestionOnEnter", "off");
  await updateSettingSafely(config, "editor.tabCompletion", "off");
  await updateSettingSafely(config, "editor.hover.enabled", false);

  // HTML settings
  await updateSettingSafely(config, "html.autoClosingTags", false);

  // Emmet settings
  await updateSettingSafely(config, "emmet.showExpandedAbbreviation", "never");
  await updateSettingSafely(config, "emmet.triggerExpansionOnTab", false);

  // --- Git and Source Control Settings ---
  await updateSettingSafely(config, "git.blame.editorDecoration.enabled", false);
  await updateSettingSafely(config, "git.blame.statusBarItem.enabled", false);
  await updateSettingSafely(config, "scm.diffDecorations", "none");

  // --- Settings for the GitLens Extension ---
  await updateSettingSafely(config, "gitlens.currentLine.enabled", false);
  await updateSettingSafely(config, "gitlens.codeLens.enabled", false);
  await updateSettingSafely(config, "gitlens.hovers.enabled", false);

  console.log("Plain-text mode settings applied.");
  vscode.window.showInformationMessage("Plain-text mode settings applied.");
}

async function revertPlainTextModeSettings() {
  const config = vscode.workspace.getConfiguration();

  // Revert editor settings
  await updateSettingSafely(config, "editor.autoClosingBrackets", undefined);
  await updateSettingSafely(config, "editor.autoClosingQuotes", undefined);
  await updateSettingSafely(config, "editor.autoSurround", undefined);
  await updateSettingSafely(config, "editor.quickSuggestions", undefined);
  await updateSettingSafely(config, "editor.suggestOnTriggerCharacters", undefined);
  await updateSettingSafely(config, "editor.wordBasedSuggestions", undefined);
  await updateSettingSafely(config, "editor.snippetSuggestions", undefined);
  await updateSettingSafely(config, "editor.parameterHints.enabled", undefined);
  await updateSettingSafely(config, "editor.formatOnSave", undefined);
  await updateSettingSafely(config, "editor.formatOnPaste", undefined);
  await updateSettingSafely(config, "editor.bracketPairColorization.enabled", undefined);
  await updateSettingSafely(config, "editor.inlineSuggest.enabled", undefined);
  await updateSettingSafely(config, "editor.acceptSuggestionOnEnter", undefined);
  await updateSettingSafely(config, "editor.tabCompletion", undefined);
  await updateSettingSafely(config, "editor.hover.enabled", undefined);

  // Revert HTML settings
  await updateSettingSafely(config, "html.autoClosingTags", undefined);

  // Revert Emmet settings
  await updateSettingSafely(config, "emmet.showExpandedAbbreviation", undefined);
  await updateSettingSafely(config, "emmet.triggerExpansionOnTab", undefined);

  // --- Revert Git and Source Control Settings ---
  await updateSettingSafely(config, "git.blame.editorDecoration.enabled", undefined);
  await updateSettingSafely(config, "git.blame.statusBarItem.enabled", undefined);
  await updateSettingSafely(config, "scm.diffDecorations", undefined);

  // --- Revert GitLens Extension Settings ---
  await updateSettingSafely(config, "gitlens.currentLine.enabled", undefined);
  await updateSettingSafely(config, "gitlens.codeLens.enabled", undefined);
  await updateSettingSafely(config, "gitlens.hovers.enabled", undefined);

  console.log("Plain-text mode settings reverted.");
  vscode.window.showInformationMessage("Plain-text mode settings reverted.");
}

function activate(context) {
  applyPlainTextModeSettings().catch(error => {
    console.error("[Vanilla Mode] Error during automatic activation:", error);
    vscode.window.showErrorMessage("Vanilla Mode: Error during automatic activation. See console for details.");
  });

  let applyDisposable = vscode.commands.registerCommand("vanilla-mode.applySettings", async () => {
    try {
      await applyPlainTextModeSettings();
    } catch (error) {
      console.error("[Vanilla Mode] Error applying settings via command:", error);
      vscode.window.showErrorMessage("Vanilla Mode: Error applying settings. See console for details.");
    }
  });
  context.subscriptions.push(applyDisposable);

  let revertDisposable = vscode.commands.registerCommand("vanilla-mode.revertSettings", async () => {
    try {
      await revertPlainTextModeSettings();
    } catch (error) {
      console.error("[Vanilla Mode] Error reverting settings via command:", error);
      vscode.window.showErrorMessage("Vanilla Mode: Error reverting settings. See console for details.");
    }
  });
  context.subscriptions.push(revertDisposable);
}

function deactivate() { }

module.exports = {
  activate,
  deactivate,
};