(function () {
  "use strict";

  var STORAGE_KEY = "sqlQuest.progress.v2";
  var LEGACY_STORAGE_KEY = "sqlQuest.progress.v1";
  var BADGES = [
    { id: "first-query", name: "Primeira Query", description: "Resolva o caso 1.", levels: [1] },
    { id: "filter-master", name: "Mestre dos Filtros", description: "Resolva os casos 3 e 4.", levels: [3, 4] },
    { id: "aggregation-analyst", name: "Analista de Agregacoes", description: "Resolva os casos 6, 7 e 8.", levels: [6, 7, 8] },
    { id: "join-specialist", name: "Especialista em JOIN", description: "Resolva os casos 9 e 10.", levels: [9, 10] },
    { id: "final-case", name: "Caso Final Resolvido", description: "Resolva o caso 14.", levels: [14] }
  ];
  var defaultState = {
    currentLevelId: 1,
    completedLevels: [],
    xp: 0,
    attemptsByLevel: {},
    earnedBadges: []
  };

  function cloneDefault() {
    return {
      currentLevelId: defaultState.currentLevelId,
      completedLevels: [],
      xp: 0,
      attemptsByLevel: {},
      earnedBadges: []
    };
  }

  function normalize(saved) {
    if (!saved || !Array.isArray(saved.completedLevels)) {
      return cloneDefault();
    }

    return {
      currentLevelId: saved.currentLevelId || 1,
      completedLevels: saved.completedLevels,
      xp: Number(saved.xp) || 0,
      attemptsByLevel: saved.attemptsByLevel || {},
      earnedBadges: Array.isArray(saved.earnedBadges) ? saved.earnedBadges : []
    };
  }

  function load() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return normalize(JSON.parse(saved));
      }
    } catch (error) {
      return cloneDefault();
    }

    try {
      return normalize(JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY)));
    } catch (legacyError) {
      return cloneDefault();
    }
  }

  function save(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function hasCompleted(state, levelId) {
    return state.completedLevels.indexOf(levelId) !== -1;
  }

  function refreshBadges(state) {
    BADGES.forEach(function (badge) {
      var earned = badge.levels.every(function (levelId) {
        return hasCompleted(state, levelId);
      });
      if (earned && state.earnedBadges.indexOf(badge.id) === -1) {
        state.earnedBadges.push(badge.id);
      }
    });
  }

  var state = load();
  refreshBadges(state);
  save(state);

  window.SQLQuestState = {
    badges: BADGES,
    get: function () {
      return {
        currentLevelId: state.currentLevelId,
        completedLevels: state.completedLevels.slice(),
        xp: state.xp,
        attemptsByLevel: Object.assign({}, state.attemptsByLevel),
        earnedBadges: state.earnedBadges.slice()
      };
    },
    setCurrentLevel: function (levelId) {
      state.currentLevelId = levelId;
      save(state);
    },
    isCompleted: function (levelId) {
      return hasCompleted(state, levelId);
    },
    getAttempts: function (levelId) {
      return Number(state.attemptsByLevel[levelId]) || 0;
    },
    recordAttempt: function (levelId) {
      state.attemptsByLevel[levelId] = this.getAttempts(levelId) + 1;
      save(state);
      return state.attemptsByLevel[levelId];
    },
    canShowSolution: function (levelId) {
      return this.getAttempts(levelId) >= 3 || this.isCompleted(levelId);
    },
    completeLevel: function (level) {
      var firstCompletion = false;
      if (state.completedLevels.indexOf(level.id) === -1) {
        state.completedLevels.push(level.id);
        state.xp += level.xp;
        firstCompletion = true;
      }
      refreshBadges(state);
      save(state);
      return firstCompletion;
    },
    reset: function () {
      state = cloneDefault();
      save(state);
    }
  };
})();
