(function () {
  "use strict";

  var db = null;

  function quoteName(name) {
    return '"' + String(name).replace(/"/g, '""') + '"';
  }

  function createTable(table) {
    var sql = "CREATE TABLE " + quoteName(table.name) + " (" + table.columns.join(", ") + ");";
    db.run(sql);

    var placeholders = table.columns.map(function () {
      return "?";
    }).join(", ");
    var columnNames = table.columns.map(function (column) {
      return quoteName(column.split(" ")[0]);
    }).join(", ");
    var insert = db.prepare("INSERT INTO " + quoteName(table.name) + " (" + columnNames + ") VALUES (" + placeholders + ");");

    table.rows.forEach(function (row) {
      insert.run(row);
    });
    insert.free();
  }

  function convertResult(result) {
    if (!result.length) {
      return { columns: [], rows: [] };
    }
    return {
      columns: result[0].columns,
      rows: result[0].values.map(function (values) {
        var row = {};
        result[0].columns.forEach(function (column, index) {
          row[column] = values[index];
        });
        return row;
      })
    };
  }

  function assertReadOnly(sql) {
    var blocked = /\b(INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|REPLACE|VACUUM|ATTACH|DETACH|PRAGMA)\b/i;
    if (blocked.test(sql)) {
      throw new Error("Nesta versao do jogo, use apenas consultas de leitura com SELECT.");
    }
  }

  window.SQLQuestDatabase = {
    init: function () {
      return initSqlJs({
        locateFile: function (file) {
          return "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/" + file;
        }
      }).then(function (SQL) {
        db = new SQL.Database();
        window.SQLQuestData.schema.forEach(createTable);
        return db;
      });
    },
    execute: function (sql) {
      if (!db) {
        throw new Error("Banco de dados ainda nao foi iniciado.");
      }
      assertReadOnly(sql);
      return convertResult(db.exec(sql));
    },
    getSchema: function () {
      return window.SQLQuestData.schema;
    }
  };
})();
