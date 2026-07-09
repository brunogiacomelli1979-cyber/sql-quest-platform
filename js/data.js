(function () {
  "use strict";

  window.SQLQuestData = {
    schema: [
      {
        name: "alunos",
        columns: [
          "id INTEGER PRIMARY KEY",
          "nome TEXT",
          "cidade TEXT",
          "idade INTEGER",
          "trilha TEXT"
        ],
        rows: [
          [1, "Ana", "Recife", 19, "Dados"],
          [2, "Bruno", "Sao Paulo", 24, "Backend"],
          [3, "Carla", "Curitiba", 22, "Dados"],
          [4, "Diego", "Fortaleza", 28, "Frontend"],
          [5, "Elisa", "Sao Paulo", 31, "Dados"],
          [6, "Felipe", "Recife", 26, "Backend"]
        ]
      },
      {
        name: "cursos",
        columns: [
          "id INTEGER PRIMARY KEY",
          "titulo TEXT",
          "categoria TEXT",
          "carga_horaria INTEGER",
          "nivel TEXT"
        ],
        rows: [
          [1, "SQL Fundamentos", "Dados", 12, "iniciante"],
          [2, "Modelagem de Dados", "Dados", 20, "intermediario"],
          [3, "APIs com Node", "Backend", 18, "intermediario"],
          [4, "HTML e CSS", "Frontend", 10, "iniciante"],
          [5, "Dashboards", "Dados", 16, "intermediario"]
        ]
      },
      {
        name: "matriculas",
        columns: [
          "id INTEGER PRIMARY KEY",
          "aluno_id INTEGER",
          "curso_id INTEGER",
          "status TEXT",
          "nota REAL",
          "data_matricula TEXT"
        ],
        rows: [
          [1, 1, 1, "concluido", 9.2, "2026-01-10"],
          [2, 1, 2, "em andamento", 8.1, "2026-02-12"],
          [3, 2, 3, "concluido", 7.4, "2026-01-18"],
          [4, 3, 1, "concluido", 8.8, "2026-01-22"],
          [5, 3, 5, "em andamento", 9.5, "2026-03-02"],
          [6, 4, 4, "concluido", 6.9, "2026-02-01"],
          [7, 5, 1, "concluido", 9.8, "2026-01-15"],
          [8, 5, 2, "concluido", 9.1, "2026-02-20"],
          [9, 6, 3, "em andamento", 8.7, "2026-03-08"]
        ]
      }
    ],
    levels: [
      {
        id: 1,
        title: "Primeiro SELECT",
        xp: 50,
        story: "A guilda precisa ver todos os alunos cadastrados antes de distribuir as proximas missoes.",
        guide: "Use SELECT para escolher colunas e FROM para indicar a tabela consultada.",
        starterSql: "SELECT *\nFROM alunos;",
        expectedSql: "SELECT * FROM alunos;",
        hints: ["O asterisco retorna todas as colunas.", "A tabela desta fase se chama alunos."]
      },
      {
        id: 2,
        title: "Colunas certas",
        xp: 60,
        story: "Agora o mural publico deve mostrar apenas nome e cidade dos alunos.",
        guide: "Liste as colunas desejadas separadas por virgula depois de SELECT.",
        starterSql: "SELECT nome, cidade\nFROM alunos;",
        expectedSql: "SELECT nome, cidade FROM alunos;",
        hints: ["Voce nao precisa usar SELECT *.", "A ordem das colunas deve ser nome e cidade."]
      },
      {
        id: 3,
        title: "Filtro por cidade",
        xp: 70,
        story: "A equipe local de Recife quer encontrar seus aventureiros.",
        guide: "Use WHERE para filtrar linhas que atendem a uma condicao.",
        starterSql: "SELECT nome, cidade\nFROM alunos\nWHERE cidade = 'Recife';",
        expectedSql: "SELECT nome, cidade FROM alunos WHERE cidade = 'Recife';",
        hints: ["Textos precisam ficar entre aspas simples.", "A coluna de localizacao e cidade."]
      },
      {
        id: 4,
        title: "Maiores de 25",
        xp: 70,
        story: "Uma missao avancada exige participantes com mais de 25 anos.",
        guide: "Operadores como >, <, >= e <= ajudam a comparar numeros.",
        starterSql: "SELECT nome, idade\nFROM alunos\nWHERE idade > 25;",
        expectedSql: "SELECT nome, idade FROM alunos WHERE idade > 25;",
        hints: ["A idade esta na tabela alunos.", "Use > 25, nao >= 25."]
      },
      {
        id: 5,
        title: "Ordenacao",
        xp: 80,
        story: "O mestre quer a lista de alunos do mais velho para o mais novo.",
        guide: "ORDER BY define a ordenacao. DESC coloca os maiores valores primeiro.",
        starterSql: "SELECT nome, idade\nFROM alunos\nORDER BY idade DESC;",
        expectedSql: "SELECT nome, idade FROM alunos ORDER BY idade DESC;",
        orderMatters: true,
        hints: ["Ordene pela coluna idade.", "DESC significa ordem decrescente."]
      },
      {
        id: 6,
        title: "Cursos de dados",
        xp: 80,
        story: "A trilha de Dados precisa listar todos os cursos da categoria correta.",
        guide: "Filtros com WHERE tambem funcionam em outras tabelas.",
        starterSql: "SELECT titulo, carga_horaria\nFROM cursos\nWHERE categoria = 'Dados';",
        expectedSql: "SELECT titulo, carga_horaria FROM cursos WHERE categoria = 'Dados';",
        hints: ["Consulte a tabela cursos.", "Filtre categoria igual a Dados."]
      },
      {
        id: 7,
        title: "Contagem",
        xp: 90,
        story: "A secretaria precisa saber quantas matriculas ja foram concluidas.",
        guide: "COUNT(*) conta linhas. Combine com WHERE para contar apenas parte da tabela.",
        starterSql: "SELECT COUNT(*) AS total_concluidas\nFROM matriculas\nWHERE status = 'concluido';",
        expectedSql: "SELECT COUNT(*) AS total_concluidas FROM matriculas WHERE status = 'concluido';",
        hints: ["A tabela e matriculas.", "O status concluido esta escrito em minusculas."]
      },
      {
        id: 8,
        title: "Media das notas",
        xp: 90,
        story: "O conselho quer descobrir a media geral das notas registradas.",
        guide: "AVG calcula media de uma coluna numerica.",
        starterSql: "SELECT ROUND(AVG(nota), 2) AS media_nota\nFROM matriculas;",
        expectedSql: "SELECT ROUND(AVG(nota), 2) AS media_nota FROM matriculas;",
        hints: ["Use AVG(nota).", "ROUND com 2 casas deixa a resposta mais limpa."]
      },
      {
        id: 9,
        title: "Agrupar por status",
        xp: 100,
        story: "A equipe de acompanhamento quer um resumo das matriculas por status.",
        guide: "GROUP BY agrupa linhas semelhantes para funcoes como COUNT.",
        starterSql: "SELECT status, COUNT(*) AS total\nFROM matriculas\nGROUP BY status;",
        expectedSql: "SELECT status, COUNT(*) AS total FROM matriculas GROUP BY status;",
        hints: ["Agrupe pela coluna status.", "Conte as linhas de cada grupo."]
      },
      {
        id: 10,
        title: "Primeiro JOIN",
        xp: 110,
        story: "As matriculas guardam ids. O painel precisa mostrar nomes de alunos e cursos.",
        guide: "JOIN combina tabelas relacionadas. Use ON para dizer como as chaves se conectam.",
        starterSql: "SELECT alunos.nome, cursos.titulo\nFROM matriculas\nJOIN alunos ON alunos.id = matriculas.aluno_id\nJOIN cursos ON cursos.id = matriculas.curso_id;",
        expectedSql: "SELECT alunos.nome, cursos.titulo FROM matriculas JOIN alunos ON alunos.id = matriculas.aluno_id JOIN cursos ON cursos.id = matriculas.curso_id;",
        hints: ["matriculas.aluno_id aponta para alunos.id.", "matriculas.curso_id aponta para cursos.id."]
      },
      {
        id: 11,
        title: "JOIN com filtro",
        xp: 120,
        story: "A mentoria quer ver quem concluiu SQL Fundamentos.",
        guide: "Depois dos JOINs, use WHERE para filtrar pelo curso e pelo status.",
        starterSql: "SELECT alunos.nome, matriculas.nota\nFROM matriculas\nJOIN alunos ON alunos.id = matriculas.aluno_id\nJOIN cursos ON cursos.id = matriculas.curso_id\nWHERE cursos.titulo = 'SQL Fundamentos' AND matriculas.status = 'concluido';",
        expectedSql: "SELECT alunos.nome, matriculas.nota FROM matriculas JOIN alunos ON alunos.id = matriculas.aluno_id JOIN cursos ON cursos.id = matriculas.curso_id WHERE cursos.titulo = 'SQL Fundamentos' AND matriculas.status = 'concluido';",
        hints: ["Use AND para combinar duas condicoes.", "O nome do curso fica em cursos.titulo."]
      },
      {
        id: 12,
        title: "HAVING",
        xp: 130,
        story: "Queremos descobrir quais alunos possuem pelo menos duas matriculas.",
        guide: "WHERE filtra linhas antes do agrupamento. HAVING filtra grupos depois do GROUP BY.",
        starterSql: "SELECT alunos.nome, COUNT(*) AS total_matriculas\nFROM matriculas\nJOIN alunos ON alunos.id = matriculas.aluno_id\nGROUP BY alunos.nome\nHAVING COUNT(*) >= 2;",
        expectedSql: "SELECT alunos.nome, COUNT(*) AS total_matriculas FROM matriculas JOIN alunos ON alunos.id = matriculas.aluno_id GROUP BY alunos.nome HAVING COUNT(*) >= 2;",
        hints: ["Agrupe por aluno.", "Use HAVING COUNT(*) >= 2."]
      },
      {
        id: 13,
        title: "Subconsulta",
        xp: 140,
        story: "O mestre quer encontrar alunos com nota acima da media geral.",
        guide: "Uma subconsulta pode calcular um valor usado pelo WHERE principal.",
        starterSql: "SELECT DISTINCT alunos.nome\nFROM matriculas\nJOIN alunos ON alunos.id = matriculas.aluno_id\nWHERE matriculas.nota > (SELECT AVG(nota) FROM matriculas);",
        expectedSql: "SELECT DISTINCT alunos.nome FROM matriculas JOIN alunos ON alunos.id = matriculas.aluno_id WHERE matriculas.nota > (SELECT AVG(nota) FROM matriculas);",
        hints: ["A media pode vir de SELECT AVG(nota) FROM matriculas.", "DISTINCT evita repetir nomes."]
      },
      {
        id: 14,
        title: "Relatorio final",
        xp: 160,
        story: "Para fechar a jornada, gere o ranking de alunos por media, considerando apenas matriculas concluidas.",
        guide: "Combine JOIN, WHERE, GROUP BY, AVG e ORDER BY para montar um relatorio analitico.",
        starterSql: "SELECT alunos.nome, ROUND(AVG(matriculas.nota), 2) AS media\nFROM matriculas\nJOIN alunos ON alunos.id = matriculas.aluno_id\nWHERE matriculas.status = 'concluido'\nGROUP BY alunos.nome\nORDER BY media DESC;",
        expectedSql: "SELECT alunos.nome, ROUND(AVG(matriculas.nota), 2) AS media FROM matriculas JOIN alunos ON alunos.id = matriculas.aluno_id WHERE matriculas.status = 'concluido' GROUP BY alunos.nome ORDER BY media DESC;",
        orderMatters: true,
        hints: ["Filtre status concluido antes de agrupar.", "Ordene pela media em ordem decrescente."]
      }
    ]
  };
})();
