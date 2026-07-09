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

  function schemaHtml() {
    return '<div class="schema-grid">' + window.SQLQuestDatabase.getSchema().map(function (table) {
      return '<article class="schema-table"><h4>' + escapeHtml(table.name) + "</h4>" + table.columns.map(function (column) {
        return "<code>" + escapeHtml(column) + "</code>";
      }).join("") + "</article>";
    }).join("") + "</div>";
  }

  function renderGenericTable(result, tableElement, countElement) {
    countElement.textContent = result.rows.length + " linha(s)";

    if (!result.columns.length) {
      tableElement.innerHTML = '<div class="empty-state">Consulta executada sem linhas para exibir.</div>';
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

    tableElement.innerHTML = "<table><thead><tr>" + head + "</tr></thead><tbody>" + body + "</tbody></table>";
  }

  function renderBadges() {
    var state = window.SQLQuestState.get();
    var earned = state.earnedBadges;

    elements.badgeCount.textContent = earned.length + "/" + window.SQLQuestState.badges.length;
    elements.badgeList.innerHTML = window.SQLQuestState.badges.map(function (badge) {
      var active = earned.indexOf(badge.id) !== -1;
      return '<article class="badge-card' + (active ? " earned" : "") + '">' +
        '<strong>' + escapeHtml(badge.name) + "</strong>" +
        '<span>' + escapeHtml(badge.description) + "</span>" +
        "</article>";
    }).join("");
  }

  function renderLevels() {
    var state = window.SQLQuestState.get();
    elements.levelList.innerHTML = window.SQLQuestData.levels.map(function (level) {
      var active = level.id === state.currentLevelId ? " active" : "";
      var completed = window.SQLQuestState.isCompleted(level.id);
      var unlocked = window.SQLQuestState.isLevelUnlocked(level.id);
      var locked = unlocked ? "" : " locked";
      var disabled = unlocked ? "" : " disabled aria-disabled=\"true\"";
      return '<button class="level-button' + active + locked + '" type="button" data-level-id="' + level.id + '"' + disabled + ">" +
        '<span class="level-number">' + level.id + "</span>" +
        '<span class="level-name">' + escapeHtml(level.title) + "</span>" +
        '<span class="level-check">' + (completed ? "OK" : (unlocked ? "" : "Bloqueada")) + "</span>" +
        "</button>";
    }).join("");

    elements.xpLabel.textContent = state.xp + " XP";
    elements.completedLabel.textContent = state.completedLevels.length + "/" + window.SQLQuestData.levels.length + " fases";
    renderBadges();
  }

  function renderExplanation(level) {
    if (window.SQLQuestState.isCompleted(level.id)) {
      elements.explanationBox.hidden = false;
      elements.explanationBox.innerHTML = "<h3>Depois da solucao</h3><p>" + escapeHtml(level.explanation) + "</p>";
      return;
    }

    elements.explanationBox.hidden = true;
    elements.explanationBox.innerHTML = "";
  }

  function updateSolutionButton(level) {
    elements.showSolutionBtn.hidden = !window.SQLQuestState.canShowSolution(level.id);
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
    elements.queryInput.value = "";
    elements.queryInput.placeholder = "SELECT ...";
    elements.feedback.className = "feedback";
    elements.feedback.textContent = completed ? "Caso resolvido. A explicacao didatica esta disponivel abaixo." : "Execute a consulta para ver o resultado ou verifique quando estiver pronto.";
    elements.rowCount.textContent = "";
    elements.resultTable.innerHTML = '<div class="empty-state">Nenhuma consulta executada ainda.</div>';
    renderExplanation(level);
    updateSolutionButton(level);
    renderLevels();
  }

  function renderGlossary() {
    elements.glossaryList.innerHTML = window.SQLQuestData.glossary.map(function (item) {
      return '<article class="glossary-card">' +
        '<h3>' + escapeHtml(item.term) + "</h3>" +
        '<p>' + escapeHtml(item.description) + "</p>" +
        '<code>' + escapeHtml(item.example) + "</code>" +
        "</article>";
    }).join("");
  }

  function renderAbout() {
    elements.aboutContent.innerHTML = window.SQLQuestData.about.map(function (section) {
      return '<article class="info-card">' +
        '<h3>' + escapeHtml(section.title) + "</h3>" +
        "<ul>" + section.items.map(function (item) {
          return "<li>" + escapeHtml(item) + "</li>";
        }).join("") + "</ul>" +
        "</article>";
    }).join("");
  }

  function showScreen(screenName) {
    document.querySelectorAll(".screen").forEach(function (screen) {
      screen.classList.toggle("active-screen", screen.id === screenName + "Screen");
    });
    document.querySelectorAll("[data-screen]").forEach(function (button) {
      button.classList.toggle("active", button.dataset.screen === screenName);
    });
  }

  function setFeedback(message, type, target) {
    var feedback = target === "freeplay" ? elements.freeplayFeedback : elements.feedback;
    feedback.className = "feedback" + (type ? " " + type : "");
    feedback.textContent = message;
  }

  window.SQLQuestRender = {
    bind: function () {
      elements = {
        xpLabel: document.getElementById("xpLabel"),
        completedLabel: document.getElementById("completedLabel"),
        levelCount: document.getElementById("levelCount"),
        levelList: document.getElementById("levelList"),
        badgeCount: document.getElementById("badgeCount"),
        badgeList: document.getElementById("badgeList"),
        levelTag: document.getElementById("levelTag"),
        levelTitle: document.getElementById("levelTitle"),
        levelStatus: document.getElementById("levelStatus"),
        levelStory: document.getElementById("levelStory"),
        guidePanel: document.getElementById("guidePanel"),
        schemaPanel: document.getElementById("schemaPanel"),
        hintsPanel: document.getElementById("hintsPanel"),
        queryInput: document.getElementById("queryInput"),
        feedback: document.getElementById("feedback"),
        explanationBox: document.getElementById("explanationBox"),
        showSolutionBtn: document.getElementById("showSolutionBtn"),
        resultTable: document.getElementById("resultTable"),
        rowCount: document.getElementById("rowCount"),
        freeplayFeedback: document.getElementById("freeplayFeedback"),
        freeplaySchemaPanel: document.getElementById("freeplaySchemaPanel"),
        freeplayResultTable: document.getElementById("freeplayResultTable"),
        freeplayRowCount: document.getElementById("freeplayRowCount"),
        glossaryList: document.getElementById("glossaryList"),
        aboutContent: document.getElementById("aboutContent")
      };
      elements.levelCount.textContent = window.SQLQuestData.levels.length + " missoes";
      elements.schemaPanel.innerHTML = schemaHtml();
      elements.freeplaySchemaPanel.innerHTML = schemaHtml();
      elements.freeplayResultTable.innerHTML = '<div class="empty-state">Nenhuma consulta executada ainda.</div>';
      renderGlossary();
      renderAbout();
      renderLevels();
    },
    getCurrentLevel: function () {
      return getLevel(window.SQLQuestState.get().currentLevelId);
    },
    getLevel: getLevel,
    showScreen: showScreen,
    renderLevel: renderLevel,
    renderLevels: renderLevels,
    renderExplanation: renderExplanation,
    updateSolutionButton: updateSolutionButton,
    renderTable: function (result) {
      renderGenericTable(result, elements.resultTable, elements.rowCount);
    },
    renderFreeplayTable: function (result) {
      renderGenericTable(result, elements.freeplayResultTable, elements.freeplayRowCount);
    },
    setFeedback: setFeedback
  };
})();
