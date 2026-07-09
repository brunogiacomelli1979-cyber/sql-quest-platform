(function () {
  "use strict";

  var STORAGE_KEY = "sqlQuest.progress.v1";
  var defaultState = {
    currentLevelId: 1,
    completedLevels: [],
    xp: 0
  };

  function load() {
    try {
      var saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved || !Array.isArray(saved.completedLevels)) {
        return Object.assign({}, defaultState);
      }
      return {
        currentLevelId: saved.currentLevelId || 1,
        completedLevels: saved.completedLevels,
        xp: Number(saved.xp) || 0
      };
    } catch (error) {
      return Object.assign({}, defaultState);
    }
  }

  function save(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  var state = load();

  window.SQLQuestState = {
    get: function () {
      return {
        currentLevelId: state.currentLevelId,
        completedLevels: state.completedLevels.slice(),
        xp: state.xp
      };
    },
    setCurrentLevel: function (levelId) {
      state.currentLevelId = levelId;
      save(state);
    },
    isCompleted: function (levelId) {
      return state.completedLevels.indexOf(levelId) !== -1;
    },
    completeLevel: function (level) {
      if (state.completedLevels.indexOf(level.id) === -1) {
        state.completedLevels.push(level.id);
        state.xp += level.xp;
        save(state);
        return true;
      }
      return false;
    },
    reset: function () {
      state = Object.assign({}, defaultState, { completedLevels: [] });
      save(state);
    }
  };
})();
