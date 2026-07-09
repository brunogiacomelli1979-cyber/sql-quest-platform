(function () {
  "use strict";

  var elements = {};

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getLevel(levelId) {
    return window.SQLQuestData.levels.find(function (level) {
      return level.id === levelId;
    });
  }

  function renderTable(result) {
    elements.rowCount.textContent = result.rows.length + " linha(s)";

    if (!result.columns.length) {
      elements.resultTable.innerHTML = '<div class="empty-state">Consulta executada sem linhas para exibir.</div>';
      return;
    }

    var head = result.columns.map(function (column) {
      return "<th>" + escapeHtml(column) + "</th>";
    }).join("");
    var body = result.rows.map(function (row) {
      return "<tr>" + result.columns.map(function (column) {
        return "<td>" + escapeHtml(row[column] === null ? "NULL" : row[column]) + "</td>";
      }).join("") + "</tr>";
    }).join("");

    elements.resultTable.innerHTML = "<table><thead><tr>" + head + "</tr></thead><tbody>" + body + "</tbody></table>";
  }

  function renderSchema() {
    elements.schemaPanel.innerHTML = '<div class="schema-grid">' + window.SQLQuestDatabase.getSchema().map(function (table) {
      return '<article class="schema-table"><h4>' + escapeHtml(table.name) + "</h4>" + table.columns.map(function (column) {
        return "<code>" + escapeHtml(column) + "</code>";
      }).join("") + "</article>";
    }).join("") + "</div>";
  }

  function renderLevels() {
    var state = window.SQLQuestState.get();
    elements.levelList.innerHTML = window.SQLQuestData.levels.map(function (level) {
      var active = level.id === state.currentLevelId ? " active" : "";
      var completed = window.SQLQuestState.isCompleted(level.id);
      return '<button class="level-button' + active + '" type="button" data-level-id="' + level.id + '">' +
        '<span class="level-number">' + level.id + "</span>" +
        '<span class="level-name">' + escapeHtml(level.title) + "</span>" +
        '<span class="level-check">' + (completed ? "OK" : "") + "</span>" +
        "</button>";
    }).join("");

    elements.xpLabel.textContent = state.xp + " XP";
    elements.completedLabel.textContent = state.completedLevels.length + "/" + window.SQLQuestData.levels.length + " fases";
  }

  function renderLevel(level) {
    var completed = window.SQLQuestState.isCompleted(level.id);
    elements.levelTag.textContent = "Fase " + level.id + " - " + level.xp + " XP";
    elements.levelTitle.textContent = level.title;
    elements.levelStatus.textContent = completed ? "Concluida" : "Em andamento";
    elements.levelStory.textContent = level.story;
    elements.guidePanel.innerHTML = "<p>" + escapeHtml(level.guide) + "</p>";
    elements.hintsPanel.innerHTML = level.hints.map(function (hint, index) {
      return '<p class="hint-card"><strong>Dica ' + (index + 1) + ":</strong> " + escapeHtml(hint) + "</p>";
    }).join("");
    elements.queryInput.value = level.starterSql;
    elements.feedback.className = "feedback";
    elements.feedback.textContent = "Execute a consulta para ver o resultado ou verifique quando estiver pronto.";
    elements.rowCount.textContent = "";
    elements.resultTable.innerHTML = '<div class="empty-state">Nenhuma consulta executada ainda.</div>';
    renderLevels();
  }

  function setFeedback(message, type) {
    elements.feedback.className = "feedback" + (type ? " " + type : "");
    elements.feedback.textContent = message;
  }

  window.SQLQuestRender = {
    bind: function () {
      elements = {
        xpLabel: document.getElementById("xpLabel"),
        completedLabel: document.getElementById("completedLabel"),
        levelCount: document.getElementById("levelCount"),
        levelList: document.getElementById("levelList"),
        levelTag: document.getElementById("levelTag"),
        levelTitle: document.getElementById("levelTitle"),
        levelStatus: document.getElementById("levelStatus"),
        levelStory: document.getElementById("levelStory"),
        guidePanel: document.getElementById("guidePanel"),
        schemaPanel: document.getElementById("schemaPanel"),
        hintsPanel: document.getElementById("hintsPanel"),
        queryInput: document.getElementById("queryInput"),
        feedback: document.getElementById("feedback"),
        resultTable: document.getElementById("resultTable"),
        rowCount: document.getElementById("rowCount")
      };
      elements.levelCount.textContent = window.SQLQuestData.levels.length + " missoes";
      renderSchema();
    },
    getCurrentLevel: function () {
      return getLevel(window.SQLQuestState.get().currentLevelId);
    },
    renderLevel: renderLevel,
    renderLevels: renderLevels,
    renderTable: renderTable,
    setFeedback: setFeedback
  };
})();
