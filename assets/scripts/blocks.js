$(document).ready(function () {
  $("#runBtn").click(function () {
    runcode();
  });
  $("#resetBtn").click(function () {
    reset();
  });
});

Blockly.Blocks["statement_input"] = {
  init: function () {
    this.appendStatementInput("BOT")
        .appendField("Bot");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["statement_input"] = function (block) {
  var statements_bot = Blockly.JavaScript.statementToCode(block, 'BOT');
  return statements_bot;
};


Blockly.Blocks['dropdown_block'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("Ask me a question")  
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["What is the date today?", new Date().toLocaleDateString()], ["What is the time now?",new Date().toLocaleTimeString()], ["How are you?","Am great! Thank you."], ["What is javascript?","JavaScript is the Programming Language for the Web."], ["What is your name?","Vishnupriya"]]), "dropdown");
    this.setPreviousStatement(true);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.JavaScript["dropdown_block"] = function (block) {
  var dropdown_bot = block.getFieldValue ('dropdown');
  var code = `var dropdown_val = "${dropdown_bot}"`;
  return code;
};
var workspace = Blockly.inject("blocklyDiv", {
  media: "assets/media/",
  toolbox: document.getElementById("toolbox"),
});
function redrawUi() {
  if (typeof dropdown_val !== "undefined") {
    $("#inputBox").text(dropdown_val);
  } else {
    $("#inputBox").text("");
  }
}
workspace.addChangeListener(Blockly.Events.disableOrphans);
function runcode() {
  var geval = eval;
  try {
    geval(Blockly.JavaScript.workspaceToCode(workspace));

  } catch (e) {
    console.error(e);
  }
  redrawUi();
}

function reset() {
  delete dropdown_val;
  workspace.clear();
  redrawUi();
}
