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
        title: "Reconhecimento da base",
        xp: 50,
        story: "Antes de investigar os indicadores da guilda, voce precisa abrir o cadastro principal e reconhecer todos os alunos registrados.",
        mission: "Liste todos os registros e todas as colunas da tabela de alunos.",
        objetivoAprendizagem: "Entender como uma consulta SQL basica escolhe uma tabela e retorna seus dados.",
        conceitoPrincipal: "SELECT e FROM",
        dificuldade: "iniciante",
        guide: "Use SELECT para definir o que sera exibido e FROM para indicar de qual tabela os dados serao lidos.",
        starterSql: "SELECT *\nFROM alunos;",
        expectedSql: "SELECT * FROM alunos;",
        hints: [
          "quando voce ainda esta reconhecendo uma tabela, pode pedir todas as colunas de uma vez.",
          "monte a consulta com SELECT, depois o simbolo que representa todas as colunas, e finalize com FROM apontando a tabela.",
          "confira se a consulta tem uma parte de selecao, uma origem de dados e termina com ponto e virgula."
        ],
        erroComum: "Esquecer o FROM ou trocar o nome da tabela, fazendo o SQL nao saber de onde buscar os dados.",
        usoReal: "Analistas usam esse padrao no primeiro contato com uma base para entender colunas, tipos de informacao e exemplos de linhas.",
        desafioBonus: "Execute uma consulta livre para visualizar todos os dados da tabela cursos e compare as colunas com a tabela alunos.",
        explanation: "A query retornou todas as colunas e linhas da tabela alunos. Ela funciona porque SELECT define o que aparece no resultado, enquanto FROM indica a tabela consultada. Em analise de dados real, esse e um primeiro passo comum para reconhecer a estrutura e o conteudo de uma base antes de criar filtros ou indicadores."
      },
      {
        id: 2,
        title: "Colunas certas para o mural",
        xp: 60,
        story: "O mural publico da guilda nao precisa mostrar tudo. Para proteger o foco da equipe, ele deve exibir apenas nome e cidade.",
        mission: "Mostre somente as colunas nome e cidade dos alunos, nessa ordem.",
        objetivoAprendizagem: "Praticar a selecao de colunas especificas em vez de retornar a tabela inteira.",
        conceitoPrincipal: "Selecao de colunas",
        dificuldade: "iniciante",
        guide: "Depois de SELECT, liste apenas as colunas necessarias separadas por virgula. A ordem escolhida define a ordem exibida no resultado.",
        starterSql: "SELECT nome, cidade\nFROM alunos;",
        expectedSql: "SELECT nome, cidade FROM alunos;",
        hints: [
          "quando o relatorio pede apenas alguns campos, evite trazer colunas extras.",
          "a estrutura continua sendo SELECT seguido das colunas escolhidas e FROM com a tabela de origem.",
          "confira se ha duas colunas, se elas estao separadas por virgula e se aparecem na ordem pedida."
        ],
        erroComum: "Usar SELECT * e retornar dados demais, ou inverter a ordem das colunas esperadas.",
        usoReal: "Em paineis de BI, escolher somente as colunas relevantes reduz ruido, melhora leitura e evita expor informacoes desnecessarias.",
        desafioBonus: "Liste apenas nome e trilha dos alunos para simular um mural separado por area de estudo.",
        explanation: "A query retornou somente nome e cidade. Ela funciona porque o SELECT aceita uma lista de colunas especificas, separadas por virgula, antes do FROM. Em analise real, selecionar colunas certas ajuda a transformar uma tabela bruta em uma visao objetiva para uma pergunta de negocio."
      },
      {
        id: 3,
        title: "Filtro por cidade",
        xp: 70,
        story: "A equipe local de Recife pediu uma lista curta com os alunos da propria cidade para organizar um encontro presencial.",
        mission: "Retorne nome e cidade apenas dos alunos que moram em Recife.",
        objetivoAprendizagem: "Usar WHERE para filtrar linhas por uma condicao textual.",
        conceitoPrincipal: "WHERE com texto",
        dificuldade: "iniciante",
        guide: "Use WHERE depois do FROM para manter somente as linhas que atendem a condicao definida.",
        starterSql: "SELECT nome, cidade\nFROM alunos\nWHERE cidade = 'Recife';",
        expectedSql: "SELECT nome, cidade FROM alunos WHERE cidade = 'Recife';",
        hints: [
          "filtros reduzem o resultado para linhas que cumprem uma regra.",
          "use WHERE para comparar a coluna de localizacao com o valor textual solicitado.",
          "confira se o texto do filtro esta entre aspas simples e se a consulta ainda retorna nome e cidade."
        ],
        erroComum: "Esquecer aspas simples em valores de texto ou tentar filtrar uma coluna diferente da coluna de cidade.",
        usoReal: "Filtros por localidade aparecem em analises por regiao, loja, cidade, unidade, pais ou area de atendimento.",
        desafioBonus: "Monte uma consulta livre para listar nome e cidade dos alunos de Sao Paulo.",
        explanation: "A query manteve apenas as linhas em que a cidade e Recife. Ela funciona porque WHERE avalia a condicao em cada registro e so deixa passar quem atende ao criterio. Em analise de dados real, esse padrao permite segmentar bases por localidade, perfil ou categoria antes de criar relatorios."
      },
      {
        id: 4,
        title: "Corte por idade",
        xp: 70,
        story: "Uma missao de campo exige mais experiencia. A coordenacao quer encontrar participantes com mais de 25 anos.",
        mission: "Liste nome e idade dos alunos com idade maior que 25.",
        objetivoAprendizagem: "Aplicar operadores de comparacao numerica em filtros com WHERE.",
        conceitoPrincipal: "Comparacao numerica",
        dificuldade: "basico",
        guide: "Operadores como >, <, >= e <= permitem comparar valores numericos dentro de uma condicao.",
        starterSql: "SELECT nome, idade\nFROM alunos\nWHERE idade > 25;",
        expectedSql: "SELECT nome, idade FROM alunos WHERE idade > 25;",
        hints: [
          "para numeros, a condicao pode comparar maior, menor, maior ou igual, ou menor ou igual.",
          "selecione as colunas pedidas e use WHERE para aplicar o corte numerico na idade.",
          "confira se o operador representa maior que, nao maior ou igual, e se o numero nao esta entre aspas."
        ],
        erroComum: "Usar >= quando a missao pede mais de 25, incluindo indevidamente quem tem exatamente 25.",
        usoReal: "Cortes numericos sao usados para faixas de idade, valores de compra, prazos de entrega, notas, metas e tickets medios.",
        desafioBonus: "Liste nome e idade dos alunos com idade menor que 25 para comparar os dois grupos.",
        explanation: "A query retornou alunos cuja idade e maior que 25. Ela funciona porque WHERE pode usar operadores numericos para testar cada linha da tabela. Em analise real, filtros desse tipo ajudam a criar recortes objetivos, como clientes acima de certo gasto, alunos acima de determinada nota ou pedidos atrasados por mais de alguns dias."
      },
      {
        id: 5,
        title: "Ranking por idade",
        xp: 80,
        story: "O mestre da guilda quer enxergar rapidamente quem sao os alunos mais experientes pela idade.",
        mission: "Mostre nome e idade dos alunos, ordenando do mais velho para o mais novo.",
        objetivoAprendizagem: "Usar ORDER BY para controlar a ordem das linhas retornadas.",
        conceitoPrincipal: "ORDER BY DESC",
        dificuldade: "basico",
        guide: "ORDER BY define a coluna usada para ordenar o resultado. DESC coloca os maiores valores primeiro.",
        starterSql: "SELECT nome, idade\nFROM alunos\nORDER BY idade DESC;",
        expectedSql: "SELECT nome, idade FROM alunos ORDER BY idade DESC;",
        orderMatters: true,
        hints: [
          "ordenar nao muda quais linhas aparecem, muda apenas a sequencia de exibicao.",
          "depois da tabela de origem, use ORDER BY com a coluna que define o ranking.",
          "confira se a ordenacao esta decrescente para que os maiores valores venham primeiro."
        ],
        erroComum: "Esquecer DESC e receber a lista em ordem crescente, do mais novo para o mais velho.",
        usoReal: "Ordenacao e usada em rankings, listas de prioridade, maiores vendas, clientes mais ativos e indicadores que precisam destacar extremos.",
        desafioBonus: "Crie uma consulta livre ordenando os alunos do mais novo para o mais velho.",
        explanation: "A query exibiu nome e idade e ordenou as linhas pela idade em ordem decrescente. Ela funciona porque ORDER BY define a coluna de ordenacao e DESC pede que os maiores valores aparecam primeiro. Em analise de dados, essa estrutura e essencial para construir rankings e encontrar rapidamente os registros mais relevantes."
      },
      {
        id: 6,
        title: "Cursos da trilha de Dados",
        xp: 80,
        story: "A guilda abriu varias trilhas, mas a equipe de dados precisa enxergar apenas os cursos da propria categoria.",
        mission: "Liste titulo e carga horaria dos cursos da categoria Dados.",
        objetivoAprendizagem: "Reforcar filtros com WHERE em uma segunda tabela da base.",
        conceitoPrincipal: "WHERE em outra tabela",
        dificuldade: "basico",
        guide: "A mesma logica de filtro pode ser aplicada em qualquer tabela, desde que voce use as colunas corretas daquela tabela.",
        starterSql: "SELECT titulo, carga_horaria\nFROM cursos\nWHERE categoria = 'Dados';",
        expectedSql: "SELECT titulo, carga_horaria FROM cursos WHERE categoria = 'Dados';",
        hints: [
          "antes de filtrar, confirme qual tabela contem as colunas pedidas.",
          "selecione as colunas do curso e aplique WHERE na coluna que representa a categoria.",
          "confira se o valor textual esta com aspas simples e se a tabela consultada nao e alunos."
        ],
        erroComum: "Consultar a tabela errada ou tentar filtrar uma coluna que nao existe nela.",
        usoReal: "Filtros por categoria aparecem em analises de produtos, cursos, departamentos, campanhas, segmentos e linhas de negocio.",
        desafioBonus: "Liste titulo e nivel dos cursos classificados como intermediario.",
        explanation: "A query consultou a tabela cursos e manteve apenas os registros da categoria Dados. Ela funciona porque WHERE avalia a coluna categoria dentro da tabela correta. Em analise real, esse padrao permite separar uma base por linha de produto, area, segmento ou tipo de oferta."
      },
      {
        id: 7,
        title: "Indicador de conclusoes",
        xp: 90,
        story: "A secretaria quer transformar a tabela de matriculas em um indicador simples: quantas ja foram concluidas.",
        mission: "Conte quantas matriculas possuem status concluido.",
        objetivoAprendizagem: "Usar COUNT(*) para criar um indicador a partir de linhas filtradas.",
        conceitoPrincipal: "COUNT com WHERE",
        dificuldade: "basico",
        guide: "COUNT(*) conta linhas. Quando combinado com WHERE, ele conta apenas as linhas que passaram pelo filtro.",
        starterSql: "SELECT COUNT(*) AS total_concluidas\nFROM matriculas\nWHERE status = 'concluido';",
        expectedSql: "SELECT COUNT(*) AS total_concluidas FROM matriculas WHERE status = 'concluido';",
        hints: [
          "quando a pergunta e 'quantos', voce provavelmente precisa de uma funcao de contagem.",
          "conte as linhas da tabela de matriculas depois de filtrar pelo status desejado.",
          "confira se o alias do resultado descreve o indicador e se o texto do status esta escrito como na base."
        ],
        erroComum: "Contar todas as matriculas sem aplicar o filtro de status, gerando um indicador maior do que o solicitado.",
        usoReal: "Contagens filtradas viram KPIs como pedidos concluidos, chamados abertos, clientes ativos e tarefas finalizadas.",
        desafioBonus: "Conte quantas matriculas estao com status em andamento.",
        explanation: "A query filtrou as matriculas concluidas e contou quantas linhas restaram. Ela funciona porque WHERE reduz a base antes da agregacao, e COUNT(*) transforma as linhas filtradas em um numero unico. Em analise de dados, esse padrao e uma das formas mais comuns de criar indicadores operacionais."
      },
      {
        id: 8,
        title: "Media geral das notas",
        xp: 90,
        story: "O conselho da guilda quer um resumo do desempenho geral sem olhar cada nota individualmente.",
        mission: "Calcule a media geral das notas registradas, arredondada para duas casas.",
        objetivoAprendizagem: "Calcular media com AVG e melhorar a apresentacao numerica com ROUND.",
        conceitoPrincipal: "AVG e ROUND",
        dificuldade: "basico",
        guide: "AVG calcula a media de uma coluna numerica. ROUND pode arredondar o resultado para facilitar a leitura.",
        starterSql: "SELECT ROUND(AVG(nota), 2) AS media_nota\nFROM matriculas;",
        expectedSql: "SELECT ROUND(AVG(nota), 2) AS media_nota FROM matriculas;",
        hints: [
          "medias resumem varios valores numericos em um unico indicador.",
          "aplique uma funcao de media sobre a coluna de notas e use uma funcao de arredondamento para controlar as casas decimais.",
          "confira se a consulta retorna apenas uma coluna agregada e se o alias deixa claro que o resultado e uma media."
        ],
        erroComum: "Selecionar notas individuais junto da media sem agrupamento, ou esquecer o arredondamento pedido pela missao.",
        usoReal: "Medias aparecem em indicadores de desempenho, satisfacao, tempo medio de resposta, notas de avaliacao e qualidade operacional.",
        desafioBonus: "Calcule a media das notas apenas das matriculas concluidas.",
        explanation: "A query calculou a media dos valores da coluna nota e arredondou o resultado para duas casas decimais. Ela funciona porque AVG transforma varias linhas numericas em um unico valor agregado, enquanto ROUND melhora a legibilidade. Em analise real, medias ajudam a acompanhar desempenho geral sem depender da leitura linha a linha."
      },
      {
        id: 9,
        title: "Resumo por status",
        xp: 100,
        story: "A equipe de acompanhamento precisa saber como as matriculas se distribuem entre concluidas e em andamento.",
        mission: "Conte o total de matriculas para cada status.",
        objetivoAprendizagem: "Usar GROUP BY para calcular indicadores por categoria.",
        conceitoPrincipal: "GROUP BY com COUNT",
        dificuldade: "intermediario",
        guide: "GROUP BY junta linhas com o mesmo valor em uma coluna, permitindo calcular contagens ou outras metricas por grupo.",
        starterSql: "SELECT status, COUNT(*) AS total\nFROM matriculas\nGROUP BY status;",
        expectedSql: "SELECT status, COUNT(*) AS total FROM matriculas GROUP BY status;",
        hints: [
          "quando a pergunta pede um total para cada categoria, pense em agrupamento.",
          "selecione a categoria, conte as linhas e agrupe pela mesma categoria.",
          "confira se toda coluna nao agregada do SELECT tambem aparece no GROUP BY."
        ],
        erroComum: "Usar COUNT sem GROUP BY e obter apenas um total geral, em vez de um total separado por status.",
        usoReal: "Agrupamentos por status aparecem em funis, pedidos por etapa, chamados por situacao e matriculas por andamento.",
        desafioBonus: "Agrupe os alunos por trilha e conte quantos existem em cada trilha.",
        explanation: "A query agrupou as matriculas pelo valor de status e contou as linhas de cada grupo. Ela funciona porque GROUP BY forma blocos de registros semelhantes antes do COUNT calcular o total. Em BI, esse padrao e essencial para criar resumos por categoria, etapa, canal ou classificacao."
      },
      {
        id: 10,
        title: "Conectando matriculas, alunos e cursos",
        xp: 110,
        story: "As matriculas guardam apenas codigos. Para criar um painel legivel, voce precisa conectar esses codigos aos nomes dos alunos e titulos dos cursos.",
        mission: "Mostre o nome do aluno e o titulo do curso de cada matricula.",
        objetivoAprendizagem: "Combinar tabelas relacionadas usando JOIN e chaves de relacionamento.",
        conceitoPrincipal: "JOIN",
        dificuldade: "intermediario",
        guide: "JOIN combina tabelas relacionadas. A clausula ON informa quais colunas conectam uma tabela a outra.",
        starterSql: "SELECT alunos.nome, cursos.titulo\nFROM matriculas\nJOIN alunos ON alunos.id = matriculas.aluno_id\nJOIN cursos ON cursos.id = matriculas.curso_id;",
        expectedSql: "SELECT alunos.nome, cursos.titulo FROM matriculas JOIN alunos ON alunos.id = matriculas.aluno_id JOIN cursos ON cursos.id = matriculas.curso_id;",
        hints: [
          "quando uma tabela guarda apenas ids, use relacionamentos para buscar os nomes em outras tabelas.",
          "parta de matriculas e conecte primeiro alunos pelo id do aluno, depois cursos pelo id do curso.",
          "confira se cada JOIN possui um ON e se as colunas selecionadas usam o nome da tabela para evitar ambiguidade."
        ],
        erroComum: "Esquecer a condicao ON ou conectar chaves erradas, criando resultados duplicados ou sem sentido.",
        usoReal: "JOINs sao usados para transformar tabelas normalizadas em visoes analiticas completas, como vendas com clientes, pedidos com produtos ou matriculas com alunos.",
        desafioBonus: "Inclua tambem o status da matricula no resultado para enriquecer o painel.",
        explanation: "A query uniu matriculas, alunos e cursos para substituir ids por informacoes legiveis. Ela funciona porque cada JOIN conecta uma chave da tabela de matriculas ao id correspondente em outra tabela. Em analise real, JOINs permitem cruzar fatos e dimensoes para montar uma visao completa do processo."
      },
      {
        id: 11,
        title: "Concluintes de SQL Fundamentos",
        xp: 120,
        story: "A mentoria quer localizar quem concluiu SQL Fundamentos e quais notas esses alunos receberam.",
        mission: "Liste nome e nota dos alunos que concluiram o curso SQL Fundamentos.",
        objetivoAprendizagem: "Combinar JOIN com filtros de texto e condicoes compostas.",
        conceitoPrincipal: "JOIN com WHERE e AND",
        dificuldade: "intermediario",
        guide: "Depois de unir as tabelas, use WHERE para filtrar o curso e o status. AND garante que as duas condicoes sejam verdadeiras.",
        starterSql: "SELECT alunos.nome, matriculas.nota\nFROM matriculas\nJOIN alunos ON alunos.id = matriculas.aluno_id\nJOIN cursos ON cursos.id = matriculas.curso_id\nWHERE cursos.titulo = 'SQL Fundamentos' AND matriculas.status = 'concluido';",
        expectedSql: "SELECT alunos.nome, matriculas.nota FROM matriculas JOIN alunos ON alunos.id = matriculas.aluno_id JOIN cursos ON cursos.id = matriculas.curso_id WHERE cursos.titulo = 'SQL Fundamentos' AND matriculas.status = 'concluido';",
        hints: [
          "depois de juntar as tabelas, voce pode filtrar usando colunas de qualquer uma delas.",
          "mantenha os JOINs da fase anterior e adicione duas condicoes no WHERE ligadas por AND.",
          "confira se uma condicao filtra o titulo do curso e a outra filtra o status da matricula."
        ],
        erroComum: "Filtrar apenas pelo curso e esquecer o status, incluindo matriculas que ainda nao foram concluidas.",
        usoReal: "Esse padrao responde perguntas de negocio como clientes que compraram um produto especifico, alunos que finalizaram uma trilha ou pedidos de uma categoria em determinado status.",
        desafioBonus: "Liste nome, titulo do curso e nota de todas as matriculas concluidas, sem filtrar por curso.",
        explanation: "A query juntou as tabelas necessarias e depois filtrou apenas as matriculas concluidas do curso SQL Fundamentos. Ela funciona porque os JOINs tornam disponiveis dados de alunos, cursos e matriculas no mesmo resultado, e o AND exige que as duas condicoes sejam verdadeiras. Em analise real, esse formato cruza dimensoes e fatos para responder perguntas bem especificas."
      },
      {
        id: 12,
        title: "Alunos recorrentes",
        xp: 130,
        story: "A coordenacao quer identificar alunos mais engajados: aqueles que aparecem em pelo menos duas matriculas.",
        mission: "Mostre o nome dos alunos e o total de matriculas apenas para quem tem duas ou mais matriculas.",
        objetivoAprendizagem: "Filtrar grupos agregados usando HAVING depois do GROUP BY.",
        conceitoPrincipal: "HAVING",
        dificuldade: "intermediario",
        guide: "WHERE filtra linhas antes do agrupamento. HAVING filtra grupos depois que o GROUP BY e as agregacoes ja foram calculados.",
        starterSql: "SELECT alunos.nome, COUNT(*) AS total_matriculas\nFROM matriculas\nJOIN alunos ON alunos.id = matriculas.aluno_id\nGROUP BY alunos.nome\nHAVING COUNT(*) >= 2;",
        expectedSql: "SELECT alunos.nome, COUNT(*) AS total_matriculas FROM matriculas JOIN alunos ON alunos.id = matriculas.aluno_id GROUP BY alunos.nome HAVING COUNT(*) >= 2;",
        hints: [
          "quando o filtro depende de uma contagem por grupo, ele deve acontecer depois do agrupamento.",
          "junte matriculas com alunos, agrupe por nome e conte quantas matriculas cada aluno possui.",
          "confira se o filtro final compara a contagem do grupo com o limite minimo pedido."
        ],
        erroComum: "Tentar usar WHERE para filtrar o resultado de COUNT, mesmo que a contagem so exista depois do GROUP BY.",
        usoReal: "HAVING ajuda a encontrar clientes recorrentes, usuarios engajados, vendedores com volume minimo ou produtos com demanda relevante.",
        desafioBonus: "Altere a consulta livre para procurar alunos com apenas uma matricula e compare o resultado.",
        explanation: "A query agrupou matriculas por aluno, contou quantas matriculas cada um possui e manteve apenas grupos com duas ou mais. Ela funciona porque HAVING filtra resultados agregados depois que GROUP BY e COUNT ja produziram os totais por aluno. Em BI, esse recurso e usado quando a regra depende de uma metrica calculada por grupo."
      },
      {
        id: 13,
        title: "Acima da media",
        xp: 140,
        story: "O mestre quer destacar alunos que tiveram pelo menos uma nota acima da media geral da guilda.",
        mission: "Liste os alunos que possuem nota acima da media geral das matriculas, sem repetir nomes.",
        objetivoAprendizagem: "Usar uma subconsulta para comparar linhas com um valor calculado dinamicamente.",
        conceitoPrincipal: "Subconsulta",
        dificuldade: "intermediario",
        guide: "Uma subconsulta pode calcular um valor auxiliar, como uma media, para que a consulta principal use esse valor em um filtro.",
        starterSql: "SELECT DISTINCT alunos.nome\nFROM matriculas\nJOIN alunos ON alunos.id = matriculas.aluno_id\nWHERE matriculas.nota > (SELECT AVG(nota) FROM matriculas);",
        expectedSql: "SELECT DISTINCT alunos.nome FROM matriculas JOIN alunos ON alunos.id = matriculas.aluno_id WHERE matriculas.nota > (SELECT AVG(nota) FROM matriculas);",
        hints: [
          "quando o limite do filtro precisa ser calculado pela propria base, uma consulta interna pode fornecer esse valor.",
          "junte matriculas com alunos e compare cada nota com uma media calculada dentro dos parenteses.",
          "confira se nomes repetidos foram removidos e se a comparacao usa maior que a media, nao maior ou igual."
        ],
        erroComum: "Calcular a media separadamente fora da consulta ou esquecer DISTINCT, permitindo nomes repetidos no resultado.",
        usoReal: "Subconsultas sao usadas para comparar registros com medias, metas dinamicas, limites historicos ou listas calculadas a partir da propria base.",
        desafioBonus: "Experimente listar tambem a nota para observar quais registros ficaram acima da media.",
        explanation: "A query comparou cada nota com a media geral calculada por uma subconsulta e retornou os alunos acima desse valor, sem repeticoes. Ela funciona porque o SELECT interno calcula a media e entrega esse numero ao WHERE da consulta principal. Em analise real, subconsultas permitem criar filtros baseados em parametros que mudam conforme os dados."
      },
      {
        id: 14,
        title: "Ranking final de desempenho",
        xp: 160,
        story: "Para fechar a jornada, a guilda precisa de um ranking confiavel de desempenho considerando apenas cursos realmente concluidos.",
        mission: "Gere o ranking de alunos por media das notas em matriculas concluidas, do maior para o menor resultado.",
        objetivoAprendizagem: "Integrar JOIN, WHERE, GROUP BY, AVG, ROUND e ORDER BY em um relatorio analitico.",
        conceitoPrincipal: "Relatorio analitico com agregacao",
        dificuldade: "intermediario",
        guide: "Combine relacionamento entre tabelas, filtro, agrupamento, media e ordenacao para transformar dados transacionais em ranking.",
        starterSql: "SELECT alunos.nome, ROUND(AVG(matriculas.nota), 2) AS media\nFROM matriculas\nJOIN alunos ON alunos.id = matriculas.aluno_id\nWHERE matriculas.status = 'concluido'\nGROUP BY alunos.nome\nORDER BY media DESC;",
        expectedSql: "SELECT alunos.nome, ROUND(AVG(matriculas.nota), 2) AS media FROM matriculas JOIN alunos ON alunos.id = matriculas.aluno_id WHERE matriculas.status = 'concluido' GROUP BY alunos.nome ORDER BY media DESC;",
        orderMatters: true,
        hints: [
          "relatorios analiticos costumam combinar varias etapas: juntar, filtrar, agrupar, calcular e ordenar.",
          "comece conectando matriculas a alunos, filtre apenas concluidas, agrupe por aluno e calcule a media das notas.",
          "confira se a media esta arredondada, se o resultado esta agrupado por aluno e se o ranking vem do maior para o menor."
        ],
        erroComum: "Calcular a media antes de filtrar concluidas ou esquecer a ordenacao decrescente, distorcendo o ranking final.",
        usoReal: "Esse formato aparece em relatorios de performance, rankings de clientes, acompanhamento de qualidade, desempenho por equipe e paineis executivos.",
        desafioBonus: "Crie uma versao livre do relatorio mostrando apenas alunos com media maior ou igual a 9.",
        explanation: "A query montou um ranking por aluno considerando somente matriculas concluidas, calculou a media das notas, arredondou o resultado e ordenou do maior para o menor. Ela funciona porque cada bloco cumpre uma etapa: JOIN conecta os alunos, WHERE filtra o universo analisado, GROUP BY separa por aluno, AVG calcula a metrica e ORDER BY organiza o ranking. Em BI, essa combinacao e a base de muitos relatorios de desempenho."
      }
    ],
    glossary: [
      { term: "SELECT", description: "Escolhe quais colunas ou calculos aparecem no resultado.", example: "SELECT nome, idade FROM pessoas;" },
      { term: "FROM", description: "Indica de qual tabela os dados serao lidos.", example: "SELECT produto FROM vendas;" },
      { term: "WHERE", description: "Filtra linhas antes de mostrar ou agregar os dados.", example: "SELECT nome FROM clientes WHERE cidade = 'Natal';" },
      { term: "AND / OR", description: "Combina condicoes. AND exige todas; OR aceita qualquer uma.", example: "SELECT id FROM pedidos WHERE status = 'pago' OR valor > 500;" },
      { term: "IN", description: "Verifica se um valor esta dentro de uma lista.", example: "SELECT nome FROM lojas WHERE uf IN ('SP', 'RJ');" },
      { term: "ORDER BY", description: "Ordena o resultado por uma ou mais colunas.", example: "SELECT titulo FROM livros ORDER BY ano DESC;" },
      { term: "LIMIT", description: "Limita a quantidade de linhas retornadas.", example: "SELECT nome FROM produtos LIMIT 10;" },
      { term: "COUNT", description: "Conta quantas linhas existem em um grupo ou consulta.", example: "SELECT COUNT(*) AS total FROM chamados;" },
      { term: "AVG", description: "Calcula a media de uma coluna numerica.", example: "SELECT AVG(valor) AS ticket_medio FROM compras;" },
      { term: "MIN / MAX", description: "Encontram o menor e o maior valor de uma coluna.", example: "SELECT MIN(preco), MAX(preco) FROM itens;" },
      { term: "GROUP BY", description: "Agrupa linhas semelhantes para calcular indicadores por grupo.", example: "SELECT canal, COUNT(*) FROM leads GROUP BY canal;" },
      { term: "HAVING", description: "Filtra grupos depois de uma agregacao.", example: "SELECT vendedor, SUM(valor) FROM vendas GROUP BY vendedor HAVING SUM(valor) > 1000;" },
      { term: "JOIN", description: "Combina dados de tabelas relacionadas.", example: "SELECT p.nome, c.nome FROM pedidos p JOIN clientes c ON c.id = p.cliente_id;" },
      { term: "LEFT JOIN", description: "Mantem todos os registros da tabela da esquerda, mesmo sem correspondencia.", example: "SELECT c.nome, p.id FROM clientes c LEFT JOIN pedidos p ON p.cliente_id = c.id;" },
      { term: "Subquery", description: "Consulta interna usada como apoio para outra consulta.", example: "SELECT nome FROM produtos WHERE preco > (SELECT AVG(preco) FROM produtos);" },
      { term: "Window Function", description: "Calcula valores por janela sem reduzir as linhas do resultado.", example: "SELECT nome, ROW_NUMBER() OVER (ORDER BY total DESC) AS posicao FROM ranking;" },
      { term: "CASE WHEN", description: "Cria regras condicionais dentro da consulta.", example: "SELECT nome, CASE WHEN valor >= 100 THEN 'alto' ELSE 'baixo' END AS faixa FROM vendas;" }
    ],
    about: [
      {
        title: "Objetivo",
        items: ["Ensinar SQL de forma progressiva.", "Transformar conceitos tecnicos em desafios praticos.", "Servir como projeto demonstravel em portfolio."]
      },
      {
        title: "Publico-alvo",
        items: ["Iniciantes em SQL.", "Estudantes de dados, BI e automacao.", "Pessoas em transicao de carreira para areas analiticas."]
      },
      {
        title: "Tecnologias usadas",
        items: ["HTML, CSS e JavaScript puro.", "sql.js com SQLite em memoria.", "localStorage para progresso local.", "Publicacao estatica compativel com GitHub Pages."]
      },
      {
        title: "Funcionalidades atuais",
        items: ["14 fases com validacao automatica.", "Dicas, guia da licao e esquema do banco.", "Treino livre com execucao SQL.", "XP, progresso e badges locais."]
      },
      {
        title: "Conceitos ensinados",
        items: ["SELECT, WHERE e ORDER BY.", "Agregacoes com COUNT e AVG.", "GROUP BY, HAVING, JOIN e subconsultas."]
      },
      {
        title: "Proximos passos",
        items: ["Novas campanhas tematicas.", "Mais bancos de exemplo.", "Melhorias de acessibilidade.", "Exportacao de progresso e trilhas por dificuldade."]
      }
    ]
  };
})();
