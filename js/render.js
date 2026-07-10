(function () {
  "use strict";

  var elements = {};
  var CERTIFICATE_NAME_KEY = "sqlQuest.certificateName.v1";

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

  function getCampaign() {
    return window.SQLQuestData.campaign || {};
  }

  function isCampaignComplete() {
    return window.SQLQuestData.levels.every(function (level) {
      return window.SQLQuestState.isCompleted(level.id);
    });
  }

  function getCertificateName() {
    try {
      return localStorage.getItem(CERTIFICATE_NAME_KEY) || getCampaign().defaultInvestigatorName || "Investigador SQL";
    } catch (error) {
      return getCampaign().defaultInvestigatorName || "Investigador SQL";
    }
  }

  function saveCertificateName(name) {
    try {
      localStorage.setItem(CERTIFICATE_NAME_KEY, name || getCampaign().defaultInvestigatorName || "Investigador SQL");
    } catch (error) {
      return;
    }
  }

  function totalCampaignXp() {
    return window.SQLQuestData.levels.reduce(function (total, level) {
      return total + level.xp;
    }, 0);
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

  function renderCompletionScreen() {
    if (!elements.completionContent) {
      return;
    }

    var state = window.SQLQuestState.get();
    var campaign = getCampaign();
    var concepts = campaign.concepts || [];
    var investigatorName = getCertificateName();
    var finalRank = campaign.finalRank || "Investigador SQL Nimbus";
    var xp = state.xp || totalCampaignXp();

    elements.completionContent.innerHTML =
      '<div class="content-header completion-header">' +
        '<p class="eyebrow">Caso encerrado</p>' +
        '<h2>Dossie concluido: ' + escapeHtml(campaign.archive || "Arquivo NimbusPlay") + "</h2>" +
        '<p>' + escapeHtml(campaign.completionSummary || "Campanha concluida com sucesso.") + "</p>" +
      "</div>" +
      '<div class="completion-grid">' +
        '<article class="completion-panel">' +
          "<h3>Resumo da investigacao</h3>" +
          '<dl class="completion-stats">' +
            "<div><dt>Casos concluidos</dt><dd>" + state.completedLevels.length + "/" + window.SQLQuestData.levels.length + "</dd></div>" +
            "<div><dt>XP acumulado</dt><dd>" + xp + " XP</dd></div>" +
            "<div><dt>Patente final</dt><dd>" + escapeHtml(finalRank) + "</dd></div>" +
          "</dl>" +
          "<h3>Conceitos praticados</h3>" +
          '<div class="concept-list">' + concepts.map(function (concept) {
            return "<span>" + escapeHtml(concept) + "</span>";
          }).join("") + "</div>" +
          '<div class="actions completion-actions">' +
            '<button type="button" class="primary-button" data-completion-action="review">Revisar casos</button>' +
            '<button type="button" class="ghost-button" data-completion-action="reset">Reiniciar campanha</button>' +
          "</div>" +
        "</article>" +
        '<article class="game-certificate" aria-label="Certificado gamificado de conclusao">' +
          '<p class="certificate-label">' + escapeHtml(campaign.certificateName || "CERTIFICADO GAMIFICADO DE CONCLUSAO") + "</p>" +
          '<p class="certificate-agency">' + escapeHtml(campaign.agency || "Agencia NimbusData") + " certifica que</p>" +
          '<label class="certificate-name-label" for="certificateNameInput">Nome no certificado gamificado</label>' +
          '<input id="certificateNameInput" class="certificate-name-input" type="text" maxlength="48" value="' + escapeHtml(investigatorName) + '" placeholder="Investigador SQL">' +
          '<h3 id="certificateDisplayName">' + escapeHtml(investigatorName || "Investigador SQL") + "</h3>" +
          "<p>concluiu a trilha:</p>" +
          "<h4>" + escapeHtml(campaign.title || "NimbusPlay - SQL Investigativo") + "</h4>" +
          "<p>Resolvendo 14 casos praticos com consultas SQL aplicadas a jogadores, jogos, compras, avaliacoes e funcionarios.</p>" +
          '<p><strong>Conceitos praticados:</strong> ' + escapeHtml(concepts.join(", ")) + ".</p>" +
          '<div class="certificate-footer">' +
            "<span><strong>Patente final:</strong> " + escapeHtml(finalRank) + "</span>" +
            "<span><strong>XP acumulado:</strong> " + xp + " XP</span>" +
          "</div>" +
          '<p class="certificate-note">SQL Quest - Projeto educacional interativo. Item gamificado interno do jogo, sem emissao externa ou validade fora do SQL Quest.</p>' +
        "</article>" +
      "</div>";

    elements.certificateNameInput = document.getElementById("certificateNameInput");
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
    if (elements.completionNavButton) {
      elements.completionNavButton.hidden = !isCampaignComplete();
    }
    if (!isCampaignComplete() && elements.completionScreen && elements.completionScreen.classList.contains("active-screen")) {
      showScreen("investigation");
    }
    renderCompletionScreen();
    renderBadges();
  }

  function renderExplanation(level) {
    if (window.SQLQuestState.isCompleted(level.id)) {
      var extraLearning = [
        level.erroComum ? "<p><strong>Erro comum:</strong> " + escapeHtml(level.erroComum) + "</p>" : "",
        level.usoReal ? "<p><strong>Uso real:</strong> " + escapeHtml(level.usoReal) + "</p>" : "",
        level.desafioBonus ? "<p><strong>Desafio bonus:</strong> " + escapeHtml(level.desafioBonus) + "</p>" : ""
      ].join("");
      elements.explanationBox.hidden = false;
      elements.explanationBox.innerHTML = "<h3>Depois da solucao</h3><p>" + escapeHtml(level.explanation) + "</p>" + extraLearning +
        (level.id === window.SQLQuestData.levels[window.SQLQuestData.levels.length - 1].id && isCampaignComplete()
          ? '<div class="actions"><button type="button" class="primary-button" data-completion-action="open">Ver conclusao da campanha</button></div>'
          : "");
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
    elements.guidePanel.innerHTML =
      "<p><strong>Objetivo de aprendizagem:</strong> " + escapeHtml(level.objetivoAprendizagem) + "</p>" +
      "<p><strong>Conceito principal:</strong> " + escapeHtml(level.conceitoPrincipal) + "</p>" +
      "<p><strong>Dificuldade:</strong> " + escapeHtml(level.dificuldade) + "</p>" +
      (level.mission ? "<p><strong>Missao:</strong> " + escapeHtml(level.mission) + "</p>" : "") +
      "<p><strong>Guia:</strong> " + escapeHtml(level.guide) + "</p>";
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

  function ensureCompletionScreen() {
    var nav = document.querySelector(".top-nav");
    var main = document.querySelector("main");

    if (!document.getElementById("completionNavButton")) {
      nav.insertAdjacentHTML("beforeend", '<button id="completionNavButton" class="nav-button" type="button" data-screen="completion" hidden>Conclusao</button>');
    }

    if (!document.getElementById("completionScreen")) {
      main.insertAdjacentHTML("beforeend", '<section id="completionScreen" class="screen content-screen completion-screen" aria-labelledby="completionTitle"><div id="completionContent"></div></section>');
    }
  }

  function bindCompletionActions() {
    document.addEventListener("click", function (event) {
      var button = event.target.closest("[data-completion-action]");
      if (!button) {
        return;
      }

      if (button.dataset.completionAction === "reset") {
        if (confirm("Reiniciar todo o progresso salvo neste navegador?")) {
          window.SQLQuestState.reset();
          window.SQLQuestRender.renderLevel(getLevel(window.SQLQuestState.get().currentLevelId));
          showScreen("investigation");
        }
        return;
      }

      if (button.dataset.completionAction === "review") {
        showScreen("investigation");
        return;
      }

      if (button.dataset.completionAction === "open" && isCampaignComplete()) {
        renderCompletionScreen();
        showScreen("completion");
      }
    });

    document.addEventListener("input", function (event) {
      if (event.target.id !== "certificateNameInput") {
        return;
      }
      var name = event.target.value.trim() || getCampaign().defaultInvestigatorName || "Investigador SQL";
      saveCertificateName(name);
      var display = document.getElementById("certificateDisplayName");
      if (display) {
        display.textContent = name;
      }
    });
  }

  function setFeedback(message, type, target) {
    var feedback = target === "freeplay" ? elements.freeplayFeedback : elements.feedback;
    feedback.className = "feedback" + (type ? " " + type : "");
    feedback.textContent = message;
  }

  window.SQLQuestRender = {
    bind: function () {
      ensureCompletionScreen();
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
        aboutContent: document.getElementById("aboutContent"),
        completionNavButton: document.getElementById("completionNavButton"),
        completionScreen: document.getElementById("completionScreen"),
        completionContent: document.getElementById("completionContent")
      };
      bindCompletionActions();
      elements.levelCount.textContent = window.SQLQuestData.levels.length + " missoes";
      elements.schemaPanel.innerHTML = schemaHtml();
      elements.freeplaySchemaPanel.innerHTML = schemaHtml();
      document.getElementById("freeplayQueryInput").value = "SELECT nome, pais, nivel\nFROM jogadores\nORDER BY nome;";
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
