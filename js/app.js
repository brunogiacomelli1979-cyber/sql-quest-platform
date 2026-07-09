(function () {
  "use strict";

  var lastResult = null;

  function currentLevel() {
    return window.SQLQuestRender.getCurrentLevel();
  }

  function executeQuery(sql) {
    var result = window.SQLQuestDatabase.execute(sql);
    lastResult = result;
    window.SQLQuestRender.renderTable(result);
    return result;
  }

  function handleRunQuery() {
    try {
      executeQuery(document.getElementById("queryInput").value);
      window.SQLQuestRender.setFeedback("Consulta executada com sucesso.", "success");
    } catch (error) {
      var failedAttempts = window.SQLQuestState.recordAttempt(level.id);
      window.SQLQuestRender.updateSolutionButton(level);
      window.SQLQuestRender.setFeedback(error.message + " Tentativa " + failedAttempts + "/3.", "error");
    }
  }

  function handleCheckSolution() {
    var level = currentLevel();

    try {
      var actual = lastResult || executeQuery(document.getElementById("queryInput").value);
      var expected = window.SQLQuestDatabase.execute(level.expectedSql);
      var validation = window.SQLQuestValidator.compare(actual, expected, {
        orderMatters: level.orderMatters
      });

      if (!validation.ok) {
        var attempts = window.SQLQuestState.recordAttempt(level.id);
        window.SQLQuestRender.updateSolutionButton(level);
        window.SQLQuestRender.setFeedback(validation.message + " Tentativa " + attempts + "/3.", "error");
        return;
      }

      var firstCompletion = window.SQLQuestState.completeLevel(level);
      window.SQLQuestRender.renderLevels();
      window.SQLQuestRender.renderExplanation(level);
      window.SQLQuestRender.updateSolutionButton(level);
      window.SQLQuestRender.setFeedback(
        firstCompletion ? validation.message + " +" + level.xp + " XP" : "Solucao correta. Esta fase ja estava concluida.",
        "success"
      );
    } catch (error) {
      window.SQLQuestRender.setFeedback(error.message, "error");
    }
  }

  function handleShowSolution() {
    var level = currentLevel();
    document.getElementById("queryInput").value = level.expectedSql;
    lastResult = null;
    window.SQLQuestRender.setFeedback("Solucao carregada no editor. Execute e verifique para concluir o caso.", "success");
  }

  function handleFreeplayRun() {
    try {
      var result = window.SQLQuestDatabase.execute(document.getElementById("freeplayQueryInput").value);
      window.SQLQuestRender.renderFreeplayTable(result);
      window.SQLQuestRender.setFeedback("Consulta de treino executada. O progresso das missoes nao foi alterado.", "success", "freeplay");
    } catch (error) {
      window.SQLQuestRender.setFeedback(error.message, "error", "freeplay");
    }
  }

  function bindNavigation() {
    document.querySelectorAll("[data-screen]").forEach(function (button) {
      button.addEventListener("click", function () {
        window.SQLQuestRender.showScreen(button.dataset.screen);
      });
    });
  }

  function bindTabs() {
    document.querySelectorAll(".tab-button").forEach(function (button) {
      button.addEventListener("click", function () {
        document.querySelectorAll(".tab-button").forEach(function (tab) {
          tab.classList.toggle("active", tab === button);
        });
        document.querySelectorAll(".tab-panel").forEach(function (panel) {
          panel.classList.toggle("active", panel.id === button.dataset.tab + "Panel");
        });
      });
    });
  }

  function bindEvents() {
    bindNavigation();
    bindTabs();

    document.getElementById("runQueryBtn").addEventListener("click", handleRunQuery);
    document.getElementById("checkSolutionBtn").addEventListener("click", handleCheckSolution);
    document.getElementById("showSolutionBtn").addEventListener("click", handleShowSolution);
    document.getElementById("runFreeplayBtn").addEventListener("click", handleFreeplayRun);

    document.getElementById("resetProgressBtn").addEventListener("click", function () {
      if (confirm("Reiniciar todo o progresso salvo neste navegador?")) {
        window.SQLQuestState.reset();
        lastResult = null;
        window.SQLQuestRender.renderLevel(currentLevel());
      }
    });

    document.getElementById("levelList").addEventListener("click", function (event) {
      var button = event.target.closest("[data-level-id]");
      if (!button) {
        return;
      }
      window.SQLQuestState.setCurrentLevel(Number(button.dataset.levelId));
      lastResult = null;
      window.SQLQuestRender.renderLevel(currentLevel());
    });

    document.getElementById("queryInput").addEventListener("input", function () {
      lastResult = null;
    });
  }

  function start() {
    window.SQLQuestRender.bind();
    window.SQLQuestRender.setFeedback("Carregando banco sql.js...");
    window.SQLQuestRender.setFeedback("Treino livre pronto para usar quando o banco carregar.", "", "freeplay");

    window.SQLQuestDatabase.init()
      .then(function () {
        bindEvents();
        window.SQLQuestRender.renderLevel(currentLevel());
      })
      .catch(function (error) {
        window.SQLQuestRender.setFeedback("Nao foi possivel iniciar o sql.js: " + error.message, "error");
        window.SQLQuestRender.setFeedback("Nao foi possivel iniciar o sql.js: " + error.message, "error", "freeplay");
      });
  }

  document.addEventListener("DOMContentLoaded", start);
})();
