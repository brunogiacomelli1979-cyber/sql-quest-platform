(function () {
  "use strict";

  function normalizeValue(value) {
    if (typeof value === "number") {
      return Number(value.toFixed(6));
    }
    if (value === null || value === undefined) {
      return null;
    }
    return String(value);
  }

  function normalizeRows(result, orderMatters) {
    var rows = result.rows.map(function (row) {
      var normalized = {};
      result.columns.forEach(function (column) {
        normalized[column] = normalizeValue(row[column]);
      });
      return normalized;
    });

    if (!orderMatters) {
      rows.sort(function (a, b) {
        return JSON.stringify(a).localeCompare(JSON.stringify(b));
      });
    }

    return rows;
  }

  function sameColumns(actual, expected) {
    return JSON.stringify(actual.columns) === JSON.stringify(expected.columns);
  }

  window.SQLQuestValidator = {
    compare: function (actual, expected, options) {
      var orderMatters = Boolean(options && options.orderMatters);

      if (!sameColumns(actual, expected)) {
        return {
          ok: false,
          message: "As colunas retornadas ainda nao batem com a resposta esperada."
        };
      }

      var actualRows = normalizeRows(actual, orderMatters);
      var expectedRows = normalizeRows(expected, orderMatters);

      if (JSON.stringify(actualRows) !== JSON.stringify(expectedRows)) {
        return {
          ok: false,
          message: "A consulta executou, mas as linhas retornadas ainda estao diferentes da solucao."
        };
      }

      return {
        ok: true,
        message: "Solucao correta. Fase concluida!"
      };
    }
  };
})();
