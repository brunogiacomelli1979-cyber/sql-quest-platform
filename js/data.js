(function () {
  "use strict";

  var JOGOS = [
    [1, "Vortex Racer", "Corrida", 149.90, 2021],
    [2, "Reino das Sombras", "RPG", 199.90, 2020],
    [3, "Guerra Estelar Tatica", "Estrategia", 129.90, 2019],
    [4, "Zumbi Apocalipse", "Acao", 89.90, 2022],
    [5, "Fazenda Feliz", "Simulacao", 39.90, 2018],
    [6, "Lendas de Aetheria", "RPG", 249.90, 2023],
    [7, "Corrida Turbo 2", "Corrida", 159.90, 2023],
    [8, "Imperio Perdido", "Estrategia", 179.90, 2021],
    [9, "Cacadores de Monstros", "Acao", 219.90, 2022],
    [10, "Puzzle Cosmico", "Puzzle", 29.90, 2017],
    [11, "Batalha Naval Online", "Estrategia", 99.90, 2020],
    [12, "Sobrevivencia Extrema", "Acao", 129.90, 2023],
    [13, "Reino das Sombras II", "RPG", 259.90, 2024],
    [14, "Kart Mania", "Corrida", 69.90, 2019],
    [15, "Xadrez Mestre", "Puzzle", 19.90, 2016]
  ];

  var JOGADORES = [
    [1, "Ana Beatriz", "Brasil", "2021-01-15", "Ouro"],
    [2, "Joao Pedro", "Brasil", "2020-05-22", "Platina"],
    [3, "Maria Fernanda", "Portugal", "2022-03-10", "Prata"],
    [4, "Lucas Gabriel", "Brasil", "2019-11-02", "Ouro"],
    [5, "Sofia Almeida", "Portugal", "2023-02-18", "Bronze"],
    [6, "Mateus Silva", "Argentina", "2021-07-09", "Prata"],
    [7, "Valentina Cruz", "Argentina", "2022-09-25", "Ouro"],
    [8, "Diego Fernandez", "Mexico", "2020-12-01", "Platina"],
    [9, "Camila Rojas", "Chile", "2023-05-30", "Bronze"],
    [10, "Thiago Santos", "Brasil", "2018-04-14", "Platina"],
    [11, "Isabella Garcia", "Mexico", "2021-10-11", "Prata"],
    [12, "Enzo Ribeiro", "Brasil", "2022-06-19", "Bronze"],
    [13, "Laura Jimenez", "Chile", "2020-02-27", "Ouro"],
    [14, "Miguel Torres", "Espanha", "2023-08-03", "Prata"],
    [15, "Helena Costa", "Portugal", "2019-01-20", "Bronze"],
    [16, "Gabriel Souza", "Brasil", "2021-12-05", "Prata"]
  ];

  var FUNCIONARIOS = [
    [1, "Marina Souza", "Diretora de Dados", "Dados", 15000, "2018-01-10", null],
    [2, "Carlos Lima", "Analista de Dados Senior", "Dados", 9000, "2019-03-15", 1],
    [3, "Beatriz Alves", "Analista de Dados Pleno", "Dados", 7000, "2020-06-01", 2],
    [4, "Rafael Costa", "Analista de Dados Junior", "Dados", 4500, "2023-02-20", 2],
    [5, "Fernanda Dias", "Gerente de Marketing", "Marketing", 11000, "2017-11-05", null],
    [6, "Lucas Martins", "Analista de Marketing", "Marketing", 5500, "2021-04-12", 5],
    [7, "Juliana Rocha", "Gerente Financeiro", "Financeiro", 12000, "2016-08-23", null],
    [8, "Pedro Nogueira", "Analista Financeiro", "Financeiro", 6000, "2022-01-09", 7],
    [9, "Camila Ferreira", "Gerente de Suporte", "Suporte", 9500, "2019-09-30", null],
    [10, "Andre Barros", "Analista de Suporte", "Suporte", 4000, "2023-07-14", 9]
  ];

  function mulberry32(seed) {
    return function () {
      var t;
      seed |= 0;
      seed = seed + 0x6D2B79F5 | 0;
      t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function buildActivityRows() {
    var rand = mulberry32(1234);
    var comments = [
      "Muito divertido, recomendo demais",
      "Grafico bonito mas travou um pouco",
      "Melhor jogo que joguei este ano",
      "Achei a historia meio fraca",
      "Vale cada centavo",
      "Multiplayer poderia ser melhor",
      "Perfeito para jogar com amigos",
      "Dificuldade equilibrada, gostei",
      "Nao correspondeu as expectativas",
      "Voltei a jogar depois de meses, ainda bom"
    ];
    var compraId = 1;
    var avaliacaoId = 1;
    var compras = [];
    var avaliacoes = [];

    JOGADORES.forEach(function (jogador) {
      var count = 2 + Math.floor(rand() * 5);
      var k;

      for (k = 0; k < count; k += 1) {
        var jogo = JOGOS[Math.floor(rand() * JOGOS.length)];
        var quantidade = 1 + Math.floor(rand() * 3);
        var mes = 1 + Math.floor(rand() * 12);
        var dia = 1 + Math.floor(rand() * 28);
        var ano = rand() < 0.5 ? 2023 : 2024;
        var data = ano + "-" + String(mes).padStart(2, "0") + "-" + String(dia).padStart(2, "0");
        var total = Math.round(jogo[3] * quantidade * 100) / 100;

        compras.push([compraId, jogador[0], jogo[0], data, quantidade, total]);
        compraId += 1;

        if (rand() < 0.6) {
          avaliacoes.push([
            avaliacaoId,
            jogador[0],
            jogo[0],
            1 + Math.floor(rand() * 5),
            comments[Math.floor(rand() * comments.length)]
          ]);
          avaliacaoId += 1;
        }
      }
    });

    return { compras: compras, avaliacoes: avaliacoes };
  }

  var activityRows = buildActivityRows();
  var LEARNING_BRIDGES = {
    1: "Primeiro passo do dossiê: antes de investigar, você aprende a abrir uma tabela inteira e reconhecer o arquivo.",
    2: "Depois de ver tudo com SELECT *, você aprende a reduzir o ruído escolhendo apenas as colunas que interessam.",
    3: "Com as colunas certas em mãos, o próximo passo é filtrar linhas usando uma condição simples com WHERE.",
    4: "Na fase anterior, você filtrou jogadores com uma única condição. Agora, a investigação exige aceitar listas de valores com IN e combinar dois filtros ao mesmo tempo com AND.",
    5: "Depois de filtrar suspeitos, você passa a organizar resultados como ranking usando ORDER BY e recortar o topo com LIMIT.",
    6: "Após montar rankings, você aprende a transformar muitas linhas em indicadores resumidos com funções de agregação.",
    7: "Depois de calcular indicadores gerais, você passa a calcular indicadores por categoria usando GROUP BY.",
    8: "Com grupos criados, o passo seguinte é filtrar apenas grupos relevantes usando HAVING.",
    9: "Até aqui você trabalhou com uma tabela por vez. Agora, vai cruzar registros de tabelas relacionadas usando JOIN.",
    10: "Depois de encontrar correspondências com JOIN, você aprende a investigar ausências com LEFT JOIN.",
    11: "Com filtros, grupos e joins dominados, você passa a usar uma consulta interna para criar uma referência dinâmica.",
    12: "Depois de comparar com uma média geral, você aprende a criar rankings dentro de grupos sem perder linhas individuais.",
    13: "Agora que você sabe calcular e comparar, vai criar categorias novas usando regras condicionais com CASE WHEN.",
    14: "O caso final combina as peças do dossiê: JOIN, soma, agrupamento, ordenação e limite para produzir uma evidência final."
  };
  var QUICK_SUPPORT = {
    1: {
      titulo: "Abrindo o primeiro arquivo",
      lembrete: "Nesta missão, você ainda está reconhecendo a base. O objetivo é pedir uma visão ampla do arquivo.",
      modelo: "SELECT *\nFROM tabela;",
      exemploParecido: "SELECT *\nFROM jogos;",
      cuidadoComum: "Use o asterisco apenas quando a missão pedir todas as colunas ou quando você estiver explorando uma tabela."
    },
    2: {
      titulo: "Selecionando colunas específicas",
      lembrete: "Depois de ver tudo, você passa a escolher apenas as pistas que interessam ao relatório.",
      modelo: "SELECT coluna_1, coluna_2\nFROM tabela;",
      exemploParecido: "SELECT titulo, genero\nFROM jogos;",
      cuidadoComum: "Separe colunas com vírgula e evite trazer campos extras quando a missão pede uma lista limpa."
    },
    3: {
      titulo: "WHERE com uma condição",
      lembrete: "Agora você usa WHERE para manter apenas linhas que cumprem uma regra simples.",
      modelo: "SELECT colunas\nFROM tabela\nWHERE coluna = 'valor';",
      exemploParecido: "SELECT titulo, preco\nFROM jogos\nWHERE genero = 'RPG';",
      cuidadoComum: "Valores de texto precisam ficar entre aspas simples."
    },
    4: {
      titulo: "WHERE com listas e múltiplas condições",
      lembrete: "Na fase anterior, você filtrou um único valor com WHERE. Agora precisa aceitar listas de valores e combinar condições.",
      modelo: "SELECT colunas\nFROM tabela\nWHERE coluna_a IN ('valor1', 'valor2')\n  AND coluna_b IN ('valor3', 'valor4');",
      exemploParecido: "SELECT titulo, genero, ano_lancamento\nFROM jogos\nWHERE genero IN ('RPG', 'Acao')\n  AND ano_lancamento IN (2022, 2023);",
      cuidadoComum: "IN aceita uma lista de valores possíveis. AND exige que as duas condições sejam verdadeiras ao mesmo tempo."
    },
    5: {
      titulo: "Ranking com ORDER BY e LIMIT",
      lembrete: "Quando a pista é um topo, ordene pela métrica principal e depois limite a quantidade de linhas.",
      modelo: "SELECT colunas\nFROM tabela\nORDER BY coluna DESC\nLIMIT quantidade;",
      exemploParecido: "SELECT nome, salario\nFROM funcionarios\nORDER BY salario DESC\nLIMIT 3;",
      cuidadoComum: "DESC coloca os maiores valores primeiro. LIMIT deve recortar apenas o tamanho pedido."
    },
    6: {
      titulo: "Indicadores com agregações",
      lembrete: "Aqui você resume várias linhas em poucos números para montar uma visão executiva do dossiê.",
      modelo: "SELECT COUNT(*), AVG(coluna), MIN(coluna), MAX(coluna)\nFROM tabela;",
      exemploParecido: "SELECT COUNT(*), AVG(salario), MIN(salario), MAX(salario)\nFROM funcionarios;",
      cuidadoComum: "Agregações sem GROUP BY normalmente retornam uma linha de resumo."
    },
    7: {
      titulo: "Contagem por grupo",
      lembrete: "Depois do resumo geral, você passa a contar linhas dentro de cada categoria.",
      modelo: "SELECT coluna_grupo, COUNT(*) AS quantidade\nFROM tabela\nGROUP BY coluna_grupo;",
      exemploParecido: "SELECT nivel, COUNT(*) AS quantidade\nFROM jogadores\nGROUP BY nivel;",
      cuidadoComum: "Toda coluna comum exibida junto da contagem deve aparecer no GROUP BY."
    },
    8: {
      titulo: "Filtrando grupos com HAVING",
      lembrete: "Quando o filtro depende de uma contagem por grupo, use HAVING depois do GROUP BY.",
      modelo: "SELECT coluna_grupo, COUNT(*) AS quantidade\nFROM tabela\nGROUP BY coluna_grupo\nHAVING COUNT(*) > numero;",
      exemploParecido: "SELECT nivel, COUNT(*) AS quantidade\nFROM jogadores\nGROUP BY nivel\nHAVING COUNT(*) > 3;",
      cuidadoComum: "WHERE filtra linhas antes do grupo existir. HAVING filtra grupos já calculados."
    },
    9: {
      titulo: "Cruzando tabelas com JOIN",
      lembrete: "Quando as pistas estáo em arquivos diferentes, conecte as tabelas por chaves relacionadas.",
      modelo: "SELECT a.coluna, b.coluna\nFROM tabela_a a\nJOIN tabela_b b ON a.id = b.tabela_a_id;",
      exemploParecido: "SELECT j.nome, c.valor_total\nFROM jogadores j\nJOIN compras c ON j.id = c.jogador_id;",
      cuidadoComum: "Todo JOIN precisa de uma condição ON para evitar combinações sem sentido."
    },
    10: {
      titulo: "Encontrando ausências com LEFT JOIN",
      lembrete: "LEFT JOIN preserva o arquivo principal e permite procurar linhas sem correspondência.",
      modelo: "SELECT a.coluna\nFROM tabela_a a\nLEFT JOIN tabela_b b ON a.id = b.tabela_a_id\nWHERE b.id IS NULL;",
      exemploParecido: "SELECT g.titulo\nFROM jogos g\nLEFT JOIN avaliacoes a ON g.id = a.jogo_id\nWHERE a.id IS NULL;",
      cuidadoComum: "Para achar ausências, o filtro IS NULL deve olhar uma coluna da tabela da direita."
    },
    11: {
      titulo: "Filtro com subconsulta",
      lembrete: "Quando o limite do filtro precisa ser calculado, use um SELECT interno como referência.",
      modelo: "SELECT colunas\nFROM tabela\nWHERE coluna > (\n  SELECT AVG(coluna)\n  FROM tabela\n);",
      exemploParecido: "SELECT titulo, preco\nFROM jogos\nWHERE preco > (\n  SELECT AVG(preco)\n  FROM jogos\n);",
      cuidadoComum: "A subconsulta usada em comparação deve retornar um único valor."
    },
    12: {
      titulo: "Ranking por grupo com janela",
      lembrete: "Funções de janela criam rankings sem apagar as linhas individuais do resultado.",
      modelo: "SELECT coluna,\n       RANK() OVER (PARTITION BY grupo ORDER BY valor DESC) AS posicao\nFROM tabela;",
      exemploParecido: "SELECT titulo, genero, preco,\n       RANK() OVER (PARTITION BY genero ORDER BY preco DESC) AS posicao\nFROM jogos;",
      cuidadoComum: "PARTITION BY define onde o ranking reinicia. ORDER BY define o critério da posição."
    },
    13: {
      titulo: "Criando categorias com CASE WHEN",
      lembrete: "CASE WHEN transforma uma regra de negócio em uma nova coluna calculada.",
      modelo: "SELECT coluna,\n       CASE\n         WHEN condicao THEN 'Categoria A'\n         ELSE 'Categoria B'\n       END AS categoria\nFROM tabela;",
      exemploParecido: "SELECT titulo, preco,\n       CASE\n         WHEN preco >= 150 THEN 'Premium'\n         ELSE 'Regular'\n       END AS faixa\nFROM jogos;",
      cuidadoComum: "Não esqueça ELSE para os demais casos e END AS para nomear a coluna."
    },
    14: {
      titulo: "Consulta final em etapas",
      lembrete: "O caso final combina cruzamento de tabelas, soma, agrupamento, ordenação e recorte do topo.",
      modelo: "SELECT entidade, SUM(valor) AS total\nFROM tabela_a a\nJOIN tabela_b b ON a.id = b.tabela_a_id\nGROUP BY entidade\nORDER BY total DESC\nLIMIT quantidade;",
      exemploParecido: "SELECT g.titulo, SUM(c.valor_total) AS receita\nFROM jogos g\nJOIN compras c ON g.id = c.jogo_id\nGROUP BY g.titulo\nORDER BY receita DESC\nLIMIT 5;",
      cuidadoComum: "Some valores depois do JOIN, agrupe pela entidade do ranking e ordene pelo total calculado."
    }
  };

  function lesson(id, title, xp, story, mission, objetivo, conceito, dificuldade, guide, starterSql, expectedSql, orderMatters, hints, erroComum, usoReal, desafioBonus, explanation) {
    return {
      id: id,
      title: title,
      xp: xp,
      story: story,
      mission: mission,
      objetivoAprendizagem: objetivo,
      conceitoPrincipal: conceito,
      dificuldade: dificuldade,
      guide: guide,
      starterSql: starterSql,
      expectedSql: expectedSql,
      orderMatters: Boolean(orderMatters),
      hints: hints,
      erroComum: erroComum,
      usoReal: usoReal,
      desafioBonus: desafioBonus,
      ponteAprendizado: LEARNING_BRIDGES[id] || "",
      apoioRapido: QUICK_SUPPORT[id] || null,
      explanation: explanation
    };
  }

  window.SQLQuestData = {
    campaign: {
      title: "NimbusPlay - SQL Investigativo",
      agency: "Agência NimbusData",
      archive: "Arquivo NimbusPlay",
      certificateName: "CERTIFICADO GAMIFICADO DE CONCLUSÃO",
      defaultInvestigatorName: "Investigador SQL",
      completionSummary: "Você encerrou o Arquivo NimbusPlay conectando pistas sobre jogadores, jogos, compras, avaliações e funcionários. O dossiê mostra domínio progressivo de consultas SQL aplicadas a uma investigação de dados.",
      finalRank: "Investigador SQL Nimbus",
      concepts: [
        "SELECT",
        "seleção de colunas",
        "WHERE",
        "IN / AND",
        "ORDER BY",
        "LIMIT",
        "COUNT / AVG / MIN / MAX",
        "GROUP BY",
        "HAVING",
        "JOIN",
        "LEFT JOIN",
        "subconsulta",
        "função de janela",
        "CASE WHEN"
      ]
    },
    schema: [
      {
        name: "jogos",
        columns: [
          "id INTEGER PRIMARY KEY",
          "titulo TEXT",
          "genero TEXT",
          "preco REAL",
          "ano_lancamento INTEGER"
        ],
        rows: JOGOS
      },
      {
        name: "jogadores",
        columns: [
          "id INTEGER PRIMARY KEY",
          "nome TEXT",
          "pais TEXT",
          "data_cadastro TEXT",
          "nivel TEXT"
        ],
        rows: JOGADORES
      },
      {
        name: "compras",
        columns: [
          "id INTEGER PRIMARY KEY",
          "jogador_id INTEGER",
          "jogo_id INTEGER",
          "data_compra TEXT",
          "quantidade INTEGER",
          "valor_total REAL"
        ],
        rows: activityRows.compras
      },
      {
        name: "avaliacoes",
        columns: [
          "id INTEGER PRIMARY KEY",
          "jogador_id INTEGER",
          "jogo_id INTEGER",
          "nota INTEGER",
          "comentario TEXT"
        ],
        rows: activityRows.avaliacoes
      },
      {
        name: "funcionarios",
        columns: [
          "id INTEGER PRIMARY KEY",
          "nome TEXT",
          "cargo TEXT",
          "departamento TEXT",
          "salario REAL",
          "data_contratacao TEXT",
          "gerente_id INTEGER"
        ],
        rows: FUNCIONARIOS
      }
    ],
    levels: [
      lesson(
        1,
        "O Primeiro Arquivo",
        50,
        "Bem-vinda(o) à Agência NimbusData. A chuva bate no vidro enquanto Marina Souza deixa sobre sua mesa o primeiro dossiê da NimbusPlay: uma denúncia anônima fala em perfis suspeitos na loja de jogos. Antes de formular qualquer teoria, você precisa abrir o arquivo bruto de jogadores e observar o terreno.",
        "Abra o arquivo de jogadores e retorne todas as colunas e todas as linhas cadastradas.",
        "Reconhecer uma tabela inteira usando a estrutura mais básica de uma consulta SQL.",
        "SELECT *",
        "iniciante",
        "SELECT escolhe as colunas exibidas. O asterisco representa todas as colunas, e FROM indica a tabela consultada.",
        "SELECT *\nFROM jogadores;",
        "SELECT * FROM jogadores;",
        false,
        [
          "Quando você ainda está reconhecendo um arquivo, faz sentido ver todas as colunas antes de filtrar.",
          "Pense em duas partes: escolher todos os campos e apontar a tabela de origem.",
          "Checklist: a consulta começa com SELECT, usa o símbolo de todas as colunas e lê o arquivo jogadores."
        ],
        "Esquecer o FROM ou consultar uma tabela diferente do arquivo pedido pela missão.",
        "Analistas usam esse primeiro reconhecimento para entender colunas, linhas e exemplos reais antes de filtrar, cruzar ou agregar dados.",
        "No treino livre, abra a tabela jogos inteira e anote quais colunas poderiam virar pistas em uma investigação comercial.",
        "A consulta abriu todo o arquivo de jogadores da NimbusPlay. Ela funcionou porque SELECT * pediu todas as colunas disponíveis, enquanto FROM jogadores definiu a origem dos dados. Em análise real, esse reconhecimento inicial evita conclusões apressadas e ajuda a equipe a entender que tipo de evidência existe no dossiê."
      ),
      lesson(
        2,
        "Nomes e Países",
        60,
        "Marina volta com um mapa prestão por clipes ao dossiê. O arquivo completo ajudou, mas está pesado demais para a primeira leitura da sala de guerra. Para localizar a base de usuários da NimbusPlay, ela quer ver apenas quem são os jogadores e de onde eles acessam.",
        "Monte uma lista limpa com apenas nome e pais dos jogadores cadastrados.",
        "Selecionar somente as colunas necessárias para responder a uma pergunta específica.",
        "SELECT colunas específicas",
        "iniciante",
        "Em vez de usar *, liste as colunas desejadas depois do SELECT, separando cada uma por vírgula.",
        "SELECT nome, pais\nFROM jogadores;",
        "SELECT nome, pais FROM jogadores;",
        false,
        [
          "Quando o relatório pede poucos campos, trazer colunas extras aumenta ruído na investigação.",
          "A estrutura mental é escolher duas colunas e manter jogadores como arquivo de origem.",
          "Checklist: nome vem antes de pais, as colunas estáo separadas por vírgula e não há filtro nesta etapa."
        ],
        "Usar SELECT * e retornar mais colunas do que a missão pediu.",
        "Selecionar colunas específicas deixa painéis, exportações e investigações mais limpos, seguros e fáceis de revisar.",
        "Liste nome, data_cadastro e nivel para montar uma ficha simples de perfil dos jogadores.",
        "A consulta exibiu apenas nome e pais, criando uma visão mais limpa do cadastro. Ela funcionou porque o SELECT permite escolher campos específicos e o FROM indica onde esses campos existem. Em dados reais, esse recorte transforma um arquivo grande em uma evidência objetiva para a equipe de investigação."
      ),
      lesson(
        3,
        "Suspeitos do Brasil",
        70,
        "Um alerta vermelho aparece no quadro da Agência: parte da denúncia cita contas brasileiras com comportamento acima do normal. Marina não quer conclusões ainda; ela quer isolar esse grupo e ver o nivel de cada jogador antes de cruzar compras ou avaliações.",
        "Isole os jogadores do Brasil e mostre nome e nivel de cada um.",
        "Filtrar linhas por uma condição textual usando WHERE.",
        "WHERE",
        "iniciante",
        "WHERE limita as linhas retornadas. Para texto, compare a coluna com um valor entre aspas simples.",
        "SELECT nome, nivel\nFROM jogadores\nWHERE pais = 'Brasil';",
        "SELECT nome, nivel FROM jogadores WHERE pais = 'Brasil';",
        false,
        [
          "Filtros reduzem o arquivo para as linhas que cumprem uma regra clara.",
          "Use a coluna de pais como critério e mantenha somente o valor indicado pela denúncia.",
          "Checklist: Brasil está entre aspas simples, a condição usa igualdade e o resultado mostra apenas nome e nivel."
        ],
        "Esquecer aspas em valores de texto ou filtrar outra coluna por engano.",
        "Filtros por pais, cidade, segmento ou unidade são comuns em análises regionais, campanhas e investigações de comportamento.",
        "Filtre jogadores de Portugal e compare a distribuição de níveis com o grupo do Brasil.",
        "A consulta manteve apenas jogadores cujo pais é Brasil e exibiu nome e nivel. Ela funcionou porque WHERE testa a condição em cada linha antes de retornar o resultado. Para a NimbusPlay, isso transforma uma suspeita ampla em um grupo investigável; em análise real, é o primeiro passo para segmentar qualquer base."
      ),
      lesson(
        4,
        "Filtros Cruzados",
        80,
        "A pasta ganha uma etiqueta nova: alto valor. Marina percebe que a denúncia se concentra em jogadores de Brasil e Portugal, mas somente nos níveis mais valiosos. O próximo recorte precisa separar clientes premium de regiões-chave.",
        "Encontre jogadores de Brasil ou Portugal que estejam nos niveis Ouro ou Platina, mostrando nome, pais e nivel.",
        "Combinar listas de valores e múltiplas condições em uma consulta sem perder o controle do filtro.",
        "AND e IN",
        "básico",
        "IN permite aceitar uma lista de valores possíveis para uma coluna. AND combina condições e exige que todas sejam verdadeiras ao mesmo tempo.",
        "SELECT nome, pais, nivel\nFROM jogadores\nWHERE pais IN ('Brasil','Portugal') AND nivel IN ('Ouro','Platina');",
        "SELECT nome, pais, nivel FROM jogadores WHERE pais IN ('Brasil','Portugal') AND nivel IN ('Ouro','Platina');",
        false,
        [
          "IN é uma forma compacta de dizer: aceite qualquer valor desta lista.",
          "Nesta fase, existem dois filtros: uma lista de paises e uma lista de niveis. AND faz o registro passar apenas se cumprir os dois.",
          "Checklist: cada IN tem parênteses, cada texto tem aspas simples e a consulta não troca AND por OR."
        ],
        "Usar OR de forma solta e acabar aceitando jogadores que cumprem apenas parte da regra.",
        "Filtros cruzados ajudam a criar segmentos como clientes premium de uma região, produtos ativos de certas categorias ou casos de risco com critérios combinados.",
        "Teste uma consulta para jogadores de Argentina ou Chile com nivel Prata ou Ouro.",
        "A consulta aplicou dois filtros de lista ao mesmo tempo: pais e nivel. Ela funcionou porque IN aceitou vários valores possíveis em cada coluna, enquanto AND exigiu que o jogador atendesse às duas condições ao mesmo tempo. Na investigação NimbusPlay, esse recorte reduz o grupo suspeito a perfis de maior impacto comercial."
      ),
      lesson(
        5,
        "Ranking de Preços",
        90,
        "O financeiro envia uma anotação: alguns títulos caros podem estar distorcendo o comportamento de compra. Marina pede que você organize o catálogo como um ranking, colocando no topo os jogos que mais pesam no bolso.",
        "Organize o catálogo e mostre titulo e preco dos 5 jogos mais caros, do maior para o menor preco.",
        "Ordenar resultados e limitar a quantidade de linhas retornadas.",
        "ORDER BY e LIMIT",
        "básico",
        "ORDER BY controla a ordem das linhas. DESC coloca maiores valores primeiro, e LIMIT restringe quantas linhas aparecem.",
        "SELECT titulo, preco\nFROM jogos\nORDER BY preco DESC\nLIMIT 5;",
        "SELECT titulo, preco FROM jogos ORDER BY preco DESC LIMIT 5;",
        true,
        [
          "Todo ranking precisa de uma metrica de ordenacao, como preco, valor ou quantidade.",
          "Ordene pelo preco em ordem decrescente e depois corte o resultado no tamanho pedido.",
          "Checklist: a ordenacao vem antes do limite, o sentido e do maior para o menor e aparecem apenas 5 linhas."
        ],
        "Esquecer DESC ou LIMIT, retornando uma lista completa ou ordenada do menor para o maior.",
        "Rankings aparecem em análises de produtos mais caros, maiores vendas, clientes prioritários, alertas de exceção e investigações financeiras.",
        "Liste os 3 jogos mais baratos para comparar o outro extremo do catálogo.",
        "A consulta ordenou os jogos pelo preco em ordem decrescente e manteve apenas os cinco primeiros. Ela funcionou porque ORDER BY definiu o critério do ranking e LIMIT recortou o topo. Para a NimbusPlay, isso revela quais títulos podem influenciar mais a receita; em análise real, rankings ajudam a priorizar atenção."
      ),
      lesson(
        6,
        "Contando Pistas",
        100,
        "Antes da reunião com a diretoria, Marina precisa transformar o catálogo em quatro números que caibam em uma única linha do dossiê. Sem esse resumo, a conversa sobre preços vira opinião em vez de evidência.",
        "Produza uma linha de resumo do catálogo com total_jogos, preco_medio, preco_minimo e preco_maximo.",
        "Criar indicadores resumidos com funções de agregação.",
        "COUNT, AVG, MIN e MAX",
        "básico",
        "Funções de agregação resumem várias linhas em poucos números. AS nomeia cada indicador calculado.",
        "SELECT COUNT(*) AS total_jogos, AVG(preco) AS preco_medio, MIN(preco) AS preco_minimo, MAX(preco) AS preco_maximo\nFROM jogos;",
        "SELECT COUNT(*) AS total_jogos, AVG(preco) AS preco_medio, MIN(preco) AS preco_minimo, MAX(preco) AS preco_maximo FROM jogos;",
        false,
        [
          "Quando a missão pede números de resumo, procure funções que condensam várias linhas.",
          "Calcule quantidade, média, mínimo e máximo sobre o mesmo arquivo de jogos.",
          "Checklist: cada indicador tem o alias solicitado e o resultado final cabe em uma unica linha."
        ],
        "Selecionar colunas comuns junto das agregacoes sem agrupamento, ou esquecer os aliases pedidos.",
        "Agregacoes viram KPIs como quantidade de produtos, preco medio, valor minimo, valor maximo e indicadores executivos.",
        "Calcule a média, mínimo e máximo de salario na tabela funcionarios para comparar outro tipo de indicador.",
        "A consulta condensou o catálogo em quatro indicadores. Ela funcionou porque COUNT, AVG, MIN e MAX transformam muitas linhas em valores resumidos. Na NimbusPlay, esses números dão contexto ao preco dos jogos; em análise real, agregações traduzem operação em métricas de decisão."
      ),
      lesson(
        7,
        "Agrupando o Catálogo",
        110,
        "No quadro da sala, Marina separa os títulos por genero. Ela suspeita que algumas categorias dominam o catálogo e podem explicar parte das compras. O próximo passo é contar quantos jogos existem em cada gaveta do arquivo.",
        "Agrupe o catálogo por genero e mostre a quantidade de jogos em cada genero.",
        "Agrupar registros por categoria para calcular contagens por grupo.",
        "GROUP BY",
        "intermediário",
        "GROUP BY junta linhas com o mesmo valor em uma coluna e permite calcular métricas por grupo.",
        "SELECT genero, COUNT(*) AS quantidade\nFROM jogos\nGROUP BY genero;",
        "SELECT genero, COUNT(*) AS quantidade FROM jogos GROUP BY genero;",
        false,
        [
          "Quando a pergunta pede um total para cada categoria, o caminho natural é agrupar.",
          "Selecione a categoria que identifica o grupo e calcule uma contagem dentro de cada grupo.",
          "Checklist: a coluna de categoria aparece no SELECT e também no GROUP BY."
        ],
        "Contar todos os jogos sem agrupar por genero, gerando apenas um total geral.",
        "GROUP BY é usado para resumir vendas por canal, chamados por status, jogos por genero e clientes por segmento.",
        "Agrupe jogadores por nivel e conte quantos existem em cada categoria de fidelidade.",
        "A consulta agrupou jogos pelo genero e contou quantos registros existem em cada grupo. Ela funcionou porque GROUP BY cria os grupos antes do COUNT calcular a quantidade. Para a NimbusPlay, isso mostra a composição do catálogo; em BI, esse padrão sustenta painéis por categoria."
      ),
      lesson(
        8,
        "Gêneros em Destaque",
        120,
        "O relatório por genero ficou maior do que o necessário. Marina risca as categorias pequenas e pede apenas os grupos com volume suficiente para afetar a leitura do catálogo.",
        "Mostre genero e quantidade apenas para generos com mais de 2 jogos cadastrados.",
        "Filtrar grupos agregados depois do agrupamento.",
        "HAVING",
        "intermediário",
        "WHERE filtra linhas antes do agrupamento. HAVING filtra grupos depois que as agregações foram calculadas.",
        "SELECT genero, COUNT(*) AS quantidade\nFROM jogos\nGROUP BY genero\nHAVING COUNT(*) > 2;",
        "SELECT genero, COUNT(*) AS quantidade FROM jogos GROUP BY genero HAVING COUNT(*) > 2;",
        false,
        [
          "Se o filtro depende de uma contagem por grupo, ele só pode acontecer depois do agrupamento.",
          "Primeiro forme os grupos por genero, depois aplique a regra sobre a quantidade calculada.",
          "Checklist: o critério usa HAVING, compara a contagem do grupo e exige valor maior que 2."
        ],
        "Tentar colocar a condição da contagem no WHERE, antes de a contagem existir.",
        "HAVING ajuda a destacar grupos relevantes, como categorias com volume mínimo, clientes recorrentes ou equipes acima de uma meta.",
        "Mostre apenas niveis de jogadores que tenham mais de 3 jogadores cadastrados.",
        "A consulta contou jogos por genero e manteve apenas grupos com mais de dois jogos. Ela funcionou porque HAVING avalia a métrica agregada criada pelo GROUP BY. Na investigação, isso tira o foco de categorias pequenas; em análise real, separa grupos relevantes de ruído estatístico."
      ),
      lesson(
        9,
        "Cruzando Registros",
        130,
        "As compras chegaram como códigos: jogador_id, jogo_id, números sem rosto. Marina prende três folhas lado a lado e pede que você ligue as pontas para revelar quem comprou qual jogo.",
        "Cruze jogadores, compras e jogos para mostrar o nome do jogador e o titulo do jogo em cada compra registrada.",
        "Unir tabelas relacionadas para transformar ids em informações legíveis.",
        "JOIN",
        "intermediário",
        "JOIN conecta tabelas usando uma condição ON, geralmente ligando uma chave primária a uma chave estrangeira.",
        "SELECT j.nome, g.titulo\nFROM jogadores j\nJOIN compras c ON j.id = c.jogador_id\nJOIN jogos g ON c.jogo_id = g.id;",
        "SELECT j.nome, g.titulo FROM jogadores j JOIN compras c ON j.id = c.jogador_id JOIN jogos g ON c.jogo_id = g.id;",
        false,
        [
          "Quando a informação está espalhada em tabelas diferentes, JOIN transforma códigos em contexto.",
          "Parta dos jogadores, passe pelas compras e use cada compra para chegar ao jogo correspondente.",
          "Checklist: cada ligação tem ON, os ids corretos se encontram e os aliases deixam a leitura mais clara."
        ],
        "Esquecer a condição ON ou conectar ids errados, criando combinações incorretas.",
        "JOINs aparecem em quase toda análise relacional: clientes com pedidos, produtos com vendas, usuários com eventos e jogos com compras.",
        "Inclua valor_total no resultado para enxergar quanto cada compra movimentou.",
        "A consulta uniu jogadores, compras e jogos para mostrar nomes e títulos em vez de apenas ids. Ela funcionou porque cada JOIN conectou chaves relacionadas. Na NimbusPlay, isso transforma rastros técnicos em uma linha investigável; em dados reais, JOIN é a ponte entre tabelas normalizadas e histórias compreensóveis."
      ),
      lesson(
        10,
        "Ninguém Fica de Fora",
        140,
        "Nem toda pista aparece como presença; algumas aparecem como ausência. O marketing quer encontrar jogadores cadastrados que nunca compraram, possíveis alvos de reativação e também sinais de cadastro fantasma.",
        "Use jogadores como arquivo principal e encontre os nomes que não possuem nenhuma compra registrada.",
        "Encontrar registros sem correspondência em outra tabela.",
        "LEFT JOIN",
        "intermediário",
        "LEFT JOIN mantém todos os registros da tabela da esquerda. Quando não há correspondência, os campos da direita ficam NULL.",
        "SELECT j.nome\nFROM jogadores j\nLEFT JOIN compras c ON j.id = c.jogador_id\nWHERE c.id IS NULL;",
        "SELECT j.nome FROM jogadores j LEFT JOIN compras c ON j.id = c.jogador_id WHERE c.id IS NULL;",
        false,
        [
          "Para encontrar ausências, preserve a lista principal completa e procure linhas sem correspondência.",
          "Use jogadores como tabela da esquerda e compras como tabela relacionada.",
          "Checklist: a ligação usa LEFT JOIN e o filtro final procura NULL em uma coluna da tabela de compras."
        ],
        "Usar JOIN comum, que remove justamente os jogadores sem compra que a missão quer encontrar.",
        "LEFT JOIN é usado para achar clientes sem pedidos, usuários sem acesso recente, produtos sem venda ou cadastros sem atividade.",
        "Procure jogos que ainda não receberam avaliações usando LEFT JOIN com avaliacoes.",
        "A consulta manteve todos os jogadores e conectou compras quando elas existiam. Depois, filtrou os casos em que a compra ficou NULL. Ela funcionou porque LEFT JOIN preserva registros sem correspondência. Para a NimbusPlay, isso revela contas inativas; em análise real, é uma técnica central para encontrar lacunas."
      ),
      lesson(
        11,
        "Acima da Média",
        150,
        "A investigação sai do catálogo e entra na estrutura interna. Um envelope sem remetente aponta possível distorção salarial na equipe da NimbusPlay. Marina quer uma comparação justa contra a média geral antes de levantar hipóteses.",
        "Compare cada salario com a média geral e mostre nome e salario dos funcionarios acima dessa média.",
        "Comparar linhas contra um valor calculado por subconsulta.",
        "Subconsulta",
        "intermediário",
        "Uma subconsulta é um SELECT dentro de outro SELECT. Ela pode calcular uma referência usada pelo WHERE principal.",
        "SELECT nome, salario\nFROM funcionarios\nWHERE salario > (SELECT AVG(salario) FROM funcionarios);",
        "SELECT nome, salario FROM funcionarios WHERE salario > (SELECT AVG(salario) FROM funcionarios);",
        false,
        [
          "Quando o limite do filtro depende da própria base, ele pode ser calculado dentro do SQL.",
          "Use um SELECT interno para calcular a média e compare cada salario contra esse valor.",
          "Checklist: a subconsulta está entre parênteses, retorna um único número e o filtro usa maior que."
        ],
        "Calcular a média manualmente fora do SQL ou fazer a subconsulta retornar mais de uma coluna.",
        "Subconsultas são usadas para comparar registros com médias, limites dinâmicos, listas calculadas e referências históricas.",
        "Liste jogos cujo preco seja maior que o preco medio do catálogo.",
        "A consulta comparou cada salario com a média geral calculada pela subconsulta. Ela funcionou porque o SELECT interno retornou um único número usado como referência pelo WHERE principal. Na investigação, isso cria uma linha de corte objetiva; em análise real, ajuda a detectar pontos acima ou abaixo de um comportamento médio."
      ),
      lesson(
        12,
        "O Ranking Interno",
        160,
        "A média geral abriu uma pista, mas Marina sabe que comparar departamentos diferentes pode distorcer a leitura. Agora ela quer ver cada funcionario dentro da sua própria área, como fichas organizadas por gaveta.",
        "Crie o ranking salarial de cada funcionario dentro do respectivo departamento, mostrando nome, departamento, salario e posicao.",
        "Criar rankings por grupo sem reduzir as linhas do resultado.",
        "Window function",
        "avançado",
        "Funções de janela calculam valores sobre um conjunto de linhas sem colapsar o resultado. RANK() cria posições dentro de uma ordenação.",
        "SELECT nome, departamento, salario, RANK() OVER (PARTITION BY departamento ORDER BY salario DESC) AS posicao\nFROM funcionarios;",
        "SELECT nome, departamento, salario, RANK() OVER (PARTITION BY departamento ORDER BY salario DESC) AS posicao FROM funcionarios;",
        false,
        [
          "Use função de janela quando precisa calcular ranking sem perder as linhas individuais.",
          "Separe a janela por departamento e ordene os salarios do maior para o menor dentro de cada grupo.",
          "Checklist: a nova coluna se chama posicao e o ranking reinicia quando o departamento muda."
        ],
        "Usar GROUP BY e acabar reduzindo as linhas, quando a missão precisa manter cada funcionario visível.",
        "Window functions aparecem em rankings por equipe, posição por categoria, comparações dentro de segmentos e análises avançadas de performance.",
        "Crie um ranking geral de funcionarios por salario, sem PARTITION BY, e compare a diferença de leitura.",
        "A consulta calculou a posicao salarial de cada funcionario dentro do departamento. Ela funcionou porque RANK() OVER definiu uma janela de cálculo, PARTITION BY separou os departamentos e ORDER BY definiu o critério do ranking. Para a NimbusPlay, isso evita comparações injustas; em análise real, permite avaliar desempenho dentro do contexto correto."
      ),
      lesson(
        13,
        "Classificando Clientes",
        150,
        "Com o caso quase fechado, o marketing pede uma etiqueta operacional para a próxima ação: jogadores Ouro ou Platina entram no grupo VIP; os demais seguem como Regular. Marina quer que essa classificação saia direto do SQL, sem planilha manual.",
        "Crie uma coluna categoria que marque jogadores Ouro ou Platina como VIP e todos os demais como Regular, exibindo nome e nivel.",
        "Criar categorias derivadas com regras condicionais dentro do SELECT.",
        "CASE WHEN",
        "avançado",
        "CASE WHEN funciona como uma regra se/senão dentro da consulta e cria uma nova coluna calculada.",
        "SELECT nome, nivel, CASE WHEN nivel IN ('Platina','Ouro') THEN 'VIP' ELSE 'Regular' END AS categoria\nFROM jogadores;",
        "SELECT nome, nivel, CASE WHEN nivel IN ('Platina','Ouro') THEN 'VIP' ELSE 'Regular' END AS categoria FROM jogadores;",
        false,
        [
          "Use CASE WHEN quando a saída precisa transformar valores existentes em novas categorias.",
          "A regra deve testar o nivel do jogador e produzir uma coluna calculada de classificação.",
          "Checklist: há um resultado para o grupo VIP, um resultado para os demais e a expressão é fechada com nome de coluna."
        ],
        "Esquecer o ELSE ou não fechar a expressão com END, deixando a coluna calculada incompleta.",
        "CASE WHEN é usado para criar faixas de cliente, classificações de risco, categorias de preco e grupos de campanha.",
        "Classifique jogos como Premium quando preco for maior ou igual a 150 e Regular nos demais casos.",
        "A consulta criou uma coluna categoria com base no nivel do jogador. Ela funcionou porque CASE WHEN avaliou uma regra e retornou um texto diferente para cada caso. Na NimbusPlay, isso prepara segmentos para ação; em análise real, transforma dados brutos em categorias prontas para decisão."
      ),
      lesson(
        14,
        "O Grande Esquema",
        180,
        "A pasta vermelha finalmente é aberta. O bilhete anônimo dizia que o programa de fidelidade poderia estar favorecendo contas erradas, mas só o dinheiro conta a história completa. Marina aponta para a última tela: encontre o top 3 real de jogadores por gasto total e feche o caso NimbusPlay.",
        "Monte o ranking final somando valor_total por jogador, exibindo nome e total_gasto dos 3 maiores compradores em ordem decrescente.",
        "Combinar JOIN, agregação, agrupamento, ordenação e limite em uma consulta analêtica final.",
        "Caso final",
        "avançado",
        "Consultas analêticas completas combinam várias etapas: cruzar tabelas, somar valores, agrupar entidades, ordenar o ranking e limitar o topo.",
        "SELECT j.nome, SUM(c.valor_total) AS total_gasto\nFROM jogadores j\nJOIN compras c ON j.id = c.jogador_id\nGROUP BY j.nome\nORDER BY total_gasto DESC\nLIMIT 3;",
        "SELECT j.nome, SUM(c.valor_total) AS total_gasto FROM jogadores j JOIN compras c ON j.id = c.jogador_id GROUP BY j.nome ORDER BY total_gasto DESC LIMIT 3;",
        true,
        [
          "O caso final combina várias pistas: relacionamento entre tabelas, soma, agrupamento, ranking e recorte do topo.",
          "Conecte jogadores a compras, some o valor total de cada jogador e transforme o resultado em ranking.",
          "Checklist: o total se chama total_gasto, a ordem é decrescente e o resultado mostra apenas 3 linhas."
        ],
        "Somar valores sem GROUP BY por jogador, ou esquecer LIMIT e retornar todo o ranking.",
        "Esse desenho aparece em rankings de receita, clientes mais valiosos, produtos com maior faturamento e auditorias de fidelidade.",
        "Monte um ranking dos 5 jogos que mais geraram receita somando compras por titulo.",
        "A consulta cruzou jogadores com compras, somou o valor total por jogador, agrupou por nome, ordenou do maior gasto para o menor e manteve apenas o top 3. Ela funcionou porque cada clêusula restãolveu uma parte do caso final: ligar evidências, medir valor, consolidar por pessoa e priorizar o topo. Com isso, Marina encerra o dossiê NimbusPlay com uma evidência analêtica clara."
      )
    ],
    glossary: [
      { term: "SELECT", description: "Escolhe quais colunas ou cálculos aparecem no resultado.", example: "SELECT nome, nivel FROM jogadores;" },
      { term: "FROM", description: "Indica de qual tabela os dados serão lidos.", example: "SELECT titulo FROM jogos;" },
      { term: "WHERE", description: "Filtra linhas antes de mostrar ou agregar os dados.", example: "SELECT nome FROM jogadores WHERE pais = 'Brasil';" },
      { term: "AND / OR", description: "Combina condições. AND exige todas; OR aceita qualquer uma.", example: "SELECT nome FROM jogadores WHERE pais = 'Brasil' AND nivel = 'Ouro';" },
      { term: "IN", description: "Verifica se um valor está dentro de uma lista.", example: "SELECT nome FROM jogadores WHERE nivel IN ('Ouro', 'Platina');" },
      { term: "ORDER BY", description: "Ordena o resultado por uma ou mais colunas.", example: "SELECT titulo FROM jogos ORDER BY preco DESC;" },
      { term: "LIMIT", description: "Limita a quantidade de linhas retornadas.", example: "SELECT titulo FROM jogos LIMIT 10;" },
      { term: "COUNT", description: "Conta quantas linhas existem em um grupo ou consulta.", example: "SELECT COUNT(*) AS total FROM compras;" },
      { term: "AVG", description: "Calcula a média de uma coluna numérica.", example: "SELECT AVG(preco) AS preco_medio FROM jogos;" },
      { term: "MIN / MAX", description: "Encontram o menor e o maior valor de uma coluna.", example: "SELECT MIN(preco), MAX(preco) FROM jogos;" },
      { term: "GROUP BY", description: "Agrupa linhas semelhantes para calcular indicadores por grupo.", example: "SELECT genero, COUNT(*) FROM jogos GROUP BY genero;" },
      { term: "HAVING", description: "Filtra grupos depois de uma agregação.", example: "SELECT genero, COUNT(*) FROM jogos GROUP BY genero HAVING COUNT(*) > 2;" },
      { term: "JOIN", description: "Combina dados de tabelas relacionadas.", example: "SELECT j.nome, c.valor_total FROM jogadores j JOIN compras c ON j.id = c.jogador_id;" },
      { term: "LEFT JOIN", description: "Mantém todos os registros da tabela da esquerda, mesmo sem correspondência.", example: "SELECT j.nome FROM jogadores j LEFT JOIN compras c ON j.id = c.jogador_id WHERE c.id IS NULL;" },
      { term: "Subquery", description: "Consulta interna usada como apoio para outra consulta.", example: "SELECT titulo FROM jogos WHERE preco > (SELECT AVG(preco) FROM jogos);" },
      { term: "Window Function", description: "Calcula valores por janela sem reduzir as linhas do resultado.", example: "SELECT nome, RANK() OVER (ORDER BY salario DESC) AS posicao FROM funcionarios;" },
      { term: "CASE WHEN", description: "Cria regras condicionais dentro da consulta.", example: "SELECT nome, CASE WHEN nivel = 'Ouro' THEN 'VIP' ELSE 'Regular' END AS categoria FROM jogadores;" }
    ],
    about: [
      {
        title: "Objetivo",
        items: ["Ensinar SQL de forma progressiva.", "Transformar conceitos técnicos em desafios práticos.", "Servir como projeto demonstrável em portfólio."]
      },
      {
        title: "Público-alvo",
        items: ["Iniciantes em SQL.", "Estudantes de dados, BI e automação.", "Pessoas em transição de carreira para áreas analêticas."]
      },
      {
        title: "Tecnologias usadas",
        items: ["HTML, CSS e JavaScript puro.", "sql.js com SQLite em memória.", "localStorage para progresso local.", "Publicação estática compatível com GitHub Pages."]
      },
      {
        title: "Funcionalidades atuais",
        items: ["14 casos com validação automática.", "Dicas, guia da lição e esquema do banco.", "Treino livre com execução SQL.", "XP, progresso e badges locais."]
      },
      {
        title: "Conceitos ensinados",
        items: ["SELECT, WHERE, AND, IN, ORDER BY e LIMIT.", "COUNT, AVG, MIN, MAX, GROUP BY e HAVING.", "JOIN, LEFT JOIN, subconsultas, window functions e CASE WHEN."]
      },
      {
        title: "Campanha NimbusPlay",
        items: ["Investigação da Agência NimbusData.", "Base fictícia com jogos, jogadores, compras, avaliações e funcionários.", "Jornada orientada a análise de dados aplicada."]
      }
    ]
  };
})();
