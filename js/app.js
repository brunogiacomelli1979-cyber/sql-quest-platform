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
      window.SQLQuestRender.setFeedback(error.message, "error");
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
        window.SQLQuestRender.setFeedback(validation.message, "error");
        return;
      }

      var firstCompletion = window.SQLQuestState.completeLevel(level);
      window.SQLQuestRender.renderLevels();
      window.SQLQuestRender.setFeedback(
        firstCompletion ? validation.message + " +" + level.xp + " XP" : "Solucao correta. Esta fase ja estava concluida.",
        "success"
      );
    } catch (error) {
      window.SQLQuestRender.setFeedback(error.message, "error");
    }
  }

  function bindEvents() {
    document.getElementById("runQueryBtn").addEventListener("click", handleRunQuery);
    document.getElementById("checkSolutionBtn").addEventListener("click", handleCheckSolution);
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

    document.getElementById("queryInput").addEventListener("input", function () {
      lastResult = null;
    });
  }

  function start() {
    window.SQLQuestRender.bind();
    window.SQLQuestRender.setFeedback("Carregando banco sql.js...");

    window.SQLQuestDatabase.init()
      .then(function () {
        bindEvents();
        window.SQLQuestRender.renderLevel(currentLevel());
      })
      .catch(function (error) {
        window.SQLQuestRender.setFeedback("Nao foi possivel iniciar o sql.js: " + error.message, "error");
      });
  }

  document.addEventListener("DOMContentLoaded", start);
})();
