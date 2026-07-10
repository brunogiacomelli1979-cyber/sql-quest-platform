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
      explanation: explanation
    };
  }

  window.SQLQuestData = {
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
        "Bem-vinda(o) a Agencia NimbusData. Voce acaba de entrar como detetive de dados junior para investigar uma denuncia anonima sobre a loja de jogos NimbusPlay. Marina Souza deixou um bilhete na sua mesa: antes de qualquer suspeita, abra o arquivo de jogadores e veja tudo o que existe nele.",
        "Retorne todas as colunas e todas as linhas da tabela jogadores.",
        "Reconhecer uma tabela inteira usando a estrutura mais basica de consulta.",
        "SELECT *",
        "iniciante",
        "SELECT escolhe as colunas exibidas. O asterisco representa todas as colunas, e FROM indica a tabela consultada.",
        "SELECT *\nFROM jogadores;",
        "SELECT * FROM jogadores;",
        false,
        [
          "Quando voce ainda esta reconhecendo uma tabela, pode pedir todas as colunas de uma vez.",
          "A estrutura mental e escolher tudo e apontar a tabela de origem.",
          "Confira se a consulta comeca com SELECT, usa o simbolo de todas as colunas e consulta jogadores."
        ],
        "Esquecer o FROM ou consultar uma tabela diferente do arquivo pedido pela missao.",
        "Analistas usam esse primeiro reconhecimento para entender colunas, linhas e exemplos reais antes de filtrar ou agregar dados.",
        "No treino livre, abra a tabela jogos inteira e compare a estrutura dela com jogadores.",
        "A query retornou todo o arquivo de jogadores da NimbusPlay. Ela funciona porque SELECT * solicita todas as colunas disponiveis e FROM jogadores define a fonte dos dados. Em analise real, esse passo cria familiaridade com a base antes de qualquer investigacao mais refinada."
      ),
      lesson(
        2,
        "Nomes e Paises",
        60,
        "Marina volta a sua mesa. O arquivo completo trouxe informacao demais para o primeiro mapa da investigacao. Agora ela quer apenas nome e pais de cada jogador, para enxergar de onde vem a base de usuarios.",
        "Retorne apenas as colunas nome e pais da tabela jogadores.",
        "Selecionar somente as colunas necessarias para responder uma pergunta.",
        "SELECT colunas especificas",
        "iniciante",
        "Em vez de usar *, liste as colunas desejadas depois do SELECT, separando cada uma por virgula.",
        "SELECT nome, pais\nFROM jogadores;",
        "SELECT nome, pais FROM jogadores;",
        false,
        [
          "Quando o relatorio pede poucos campos, evite trazer informacoes extras.",
          "Monte o SELECT com duas colunas e mantenha jogadores como origem.",
          "Confira se as colunas estao separadas por virgula e aparecem na ordem pedida."
        ],
        "Usar SELECT * e retornar mais colunas do que a missao pediu.",
        "Selecionar colunas especificas deixa paineis, exportacoes e investigacoes mais limpos e seguros.",
        "Liste nome, data_cadastro e nivel para montar uma visao simples de perfil dos jogadores.",
        "A query exibiu apenas nome e pais. Ela funciona porque o SELECT permite escolher campos especificos e o FROM define onde esses campos existem. Em analise de dados real, selecionar colunas evita ruido e ajuda a criar visoes objetivas para stakeholders."
      ),
      lesson(
        3,
        "Suspeitos do Brasil",
        70,
        "Chegou uma denuncia especifica: um grupo de contas no Brasil pode estar sendo usado para manipular avaliacoes. Marina pede uma lista enxuta antes de aprofundar.",
        "Retorne nome e nivel de todos os jogadores cujo pais seja Brasil.",
        "Filtrar linhas por uma condicao textual usando WHERE.",
        "WHERE",
        "iniciante",
        "WHERE limita as linhas retornadas. Para texto, compare a coluna com um valor entre aspas simples.",
        "SELECT nome, nivel\nFROM jogadores\nWHERE pais = 'Brasil';",
        "SELECT nome, nivel FROM jogadores WHERE pais = 'Brasil';",
        false,
        [
          "Filtros reduzem a tabela para registros que cumprem uma regra.",
          "Use a coluna de pais para manter apenas o valor solicitado.",
          "Confira se Brasil esta entre aspas simples e se o resultado mostra nome e nivel."
        ],
        "Esquecer aspas em valores de texto ou filtrar outra coluna por engano.",
        "Filtros por pais, cidade, segmento ou unidade sao comuns em analises regionais e investigacoes de comportamento.",
        "Filtre jogadores de Portugal e compare os niveis com o grupo do Brasil.",
        "A query manteve apenas jogadores cujo pais e Brasil e exibiu nome e nivel. Ela funciona porque WHERE testa a condicao em cada linha antes de retornar o resultado. Em analise real, esse filtro e usado para segmentar bases e investigar grupos especificos."
      ),
      lesson(
        4,
        "Filtros Cruzados",
        80,
        "A investigacao afunila: Marina quer ver apenas jogadores de Brasil ou Portugal que estejam nos niveis Ouro ou Platina. Sao perfis de alto valor e merecem atencao redobrada.",
        "Retorne nome, pais e nivel dos jogadores cujo pais esteja em Brasil ou Portugal e cujo nivel esteja em Ouro ou Platina.",
        "Combinar listas de valores e multiplas condicoes em uma consulta.",
        "AND e IN",
        "basico",
        "IN verifica se um valor pertence a uma lista. AND exige que duas condicoes sejam verdadeiras ao mesmo tempo.",
        "SELECT nome, pais, nivel\nFROM jogadores\nWHERE pais IN ('Brasil','Portugal') AND nivel IN ('Ouro','Platina');",
        "SELECT nome, pais, nivel FROM jogadores WHERE pais IN ('Brasil','Portugal') AND nivel IN ('Ouro','Platina');",
        false,
        [
          "Use IN quando uma coluna pode aceitar mais de um valor valido.",
          "Pense em dois filtros: um para pais e outro para nivel, unidos por AND.",
          "Confira se cada lista esta entre parenteses e se textos estao entre aspas simples."
        ],
        "Usar OR de forma solta e acabar aceitando jogadores que cumprem apenas parte da regra.",
        "Filtros cruzados ajudam a criar segmentos como clientes premium de uma regiao ou produtos ativos de certas categorias.",
        "Teste uma consulta para jogadores de Argentina ou Chile com nivel Prata ou Ouro.",
        "A query aplicou dois filtros de lista ao mesmo tempo: pais e nivel. Ela funciona porque IN aceita varios valores possiveis para uma coluna e AND exige que as duas regras passem. Em analise real, esse padrao cria segmentos precisos para campanha, risco ou investigacao."
      ),
      lesson(
        5,
        "Ranking de Precos",
        90,
        "O time comercial quer saber quais jogos puxam a receita da loja. Marina pede o topo do catalogo por preco, sem olhar a lista inteira.",
        "Retorne titulo e preco dos 5 jogos mais caros, do maior para o menor preco.",
        "Ordenar resultados e limitar a quantidade de linhas retornadas.",
        "ORDER BY e LIMIT",
        "basico",
        "ORDER BY controla a ordem das linhas. DESC coloca maiores valores primeiro, e LIMIT restringe quantas linhas aparecem.",
        "SELECT titulo, preco\nFROM jogos\nORDER BY preco DESC\nLIMIT 5;",
        "SELECT titulo, preco FROM jogos ORDER BY preco DESC LIMIT 5;",
        true,
        [
          "Ranking depende de ordenar por uma metrica relevante.",
          "Ordene pelo preco em ordem decrescente e limite o resultado ao topo pedido.",
          "Confira se LIMIT esta no final e se a ordenacao vem do maior para o menor."
        ],
        "Esquecer DESC ou LIMIT, retornando uma lista completa ou ordenada do menor para o maior.",
        "Rankings aparecem em analises de produtos mais caros, maiores vendas, clientes prioritarios e alertas de excecao.",
        "Liste os 3 jogos mais baratos para comparar o outro extremo do catalogo.",
        "A query ordenou os jogos pelo preco em ordem decrescente e retornou apenas os cinco primeiros. Ela funciona porque ORDER BY define o criterio de ordenacao e LIMIT corta o resultado final. Em analise real, isso permite focar rapidamente no topo de uma lista."
      ),
      lesson(
        6,
        "Contando Pistas",
        100,
        "Antes de fechar o relatorio do catalogo, Marina precisa de um resumo numerico rapido para levar a reuniao com a diretoria.",
        "Retorne, em uma unica linha, total_jogos, preco_medio, preco_minimo e preco_maximo da tabela jogos.",
        "Criar indicadores resumidos com funcoes de agregacao.",
        "COUNT, AVG, MIN e MAX",
        "basico",
        "Funcoes de agregacao resumem varias linhas em poucos numeros. AS nomeia cada indicador calculado.",
        "SELECT COUNT(*) AS total_jogos, AVG(preco) AS preco_medio, MIN(preco) AS preco_minimo, MAX(preco) AS preco_maximo\nFROM jogos;",
        "SELECT COUNT(*) AS total_jogos, AVG(preco) AS preco_medio, MIN(preco) AS preco_minimo, MAX(preco) AS preco_maximo FROM jogos;",
        false,
        [
          "Quando a missao pede numeros de resumo, procure funcoes de agregacao.",
          "Calcule quantidade, media, minimo e maximo sobre a tabela de jogos.",
          "Confira se cada calculo tem o alias solicitado e se a consulta retorna uma unica linha."
        ],
        "Selecionar colunas comuns junto das agregacoes sem agrupamento, ou esquecer os aliases pedidos.",
        "Agregacoes viram KPIs como quantidade de produtos, preco medio, valor minimo, valor maximo e indicadores executivos.",
        "Calcule a media, minimo e maximo de salario na tabela funcionarios.",
        "A query condensou o catalogo em quatro indicadores. Ela funciona porque COUNT, AVG, MIN e MAX agregam muitas linhas em valores resumidos. Em analise real, esse padrao transforma dados operacionais em metricas que ajudam a tomada de decisao."
      ),
      lesson(
        7,
        "Agrupando o Catalogo",
        110,
        "A reuniao de amanha pede uma visao por genero: quantos jogos de RPG, Acao, Corrida e outros existem no catalogo da NimbusPlay.",
        "Retorne genero e quantidade de jogos de cada genero, agrupando por genero.",
        "Agrupar registros por categoria para calcular contagens por grupo.",
        "GROUP BY",
        "intermediario",
        "GROUP BY junta linhas com o mesmo valor em uma coluna e permite calcular metricas por grupo.",
        "SELECT genero, COUNT(*) AS quantidade\nFROM jogos\nGROUP BY genero;",
        "SELECT genero, COUNT(*) AS quantidade FROM jogos GROUP BY genero;",
        false,
        [
          "Quando a pergunta pede um total para cada categoria, use agrupamento.",
          "Selecione a categoria e uma contagem, agrupando pela mesma categoria.",
          "Confira se a coluna nao agregada do SELECT tambem esta no GROUP BY."
        ],
        "Contar todos os jogos sem agrupar por genero, gerando apenas um total geral.",
        "GROUP BY e usado para resumir vendas por canal, chamados por status, jogos por genero e clientes por segmento.",
        "Agrupe jogadores por nivel e conte quantos existem em cada nivel.",
        "A query agrupou jogos pelo genero e contou quantos registros existem em cada grupo. Ela funciona porque GROUP BY forma grupos antes do COUNT calcular a quantidade. Em BI, esse padrao sustenta tabelas de resumo, dashboards e comparacoes por categoria."
      ),
      lesson(
        8,
        "Generos em Destaque",
        120,
        "Marina quer filtrar o relatorio de generos: por enquanto so interessam os generos com mais de dois jogos no catalogo.",
        "Retorne genero e quantidade de jogos para os generos que tenham mais de 2 jogos.",
        "Filtrar grupos agregados depois do agrupamento.",
        "HAVING",
        "intermediario",
        "WHERE filtra linhas antes do agrupamento. HAVING filtra grupos depois que as agregacoes foram calculadas.",
        "SELECT genero, COUNT(*) AS quantidade\nFROM jogos\nGROUP BY genero\nHAVING COUNT(*) > 2;",
        "SELECT genero, COUNT(*) AS quantidade FROM jogos GROUP BY genero HAVING COUNT(*) > 2;",
        false,
        [
          "Se o filtro depende de uma contagem por grupo, ele acontece depois do GROUP BY.",
          "Agrupe por genero, conte os jogos e aplique uma regra sobre a contagem do grupo.",
          "Confira se voce usou HAVING para o criterio agregado e se o limite e maior que 2."
        ],
        "Tentar colocar a condicao da contagem no WHERE, antes de a contagem existir.",
        "HAVING ajuda a destacar grupos relevantes, como categorias com volume minimo, clientes recorrentes ou equipes acima de uma meta.",
        "Mostre apenas niveis de jogadores que tenham mais de 3 jogadores cadastrados.",
        "A query contou jogos por genero e manteve apenas grupos com mais de dois jogos. Ela funciona porque HAVING avalia a metrica agregada criada pelo GROUP BY. Em analise real, esse recurso separa grupos realmente relevantes de categorias com pouco volume."
      ),
      lesson(
        9,
        "Cruzando Registros",
        130,
        "E hora de cruzar duas pistas: quem comprou o que? Marina precisa de uma lista unindo o nome de cada jogador ao titulo de cada jogo comprado.",
        "Retorne o nome do jogador e o titulo do jogo para cada compra registrada.",
        "Unir tabelas relacionadas para transformar ids em informacoes legiveis.",
        "JOIN",
        "intermediario",
        "JOIN conecta tabelas usando uma condicao ON, geralmente ligando uma chave primaria a uma chave estrangeira.",
        "SELECT j.nome, g.titulo\nFROM jogadores j\nJOIN compras c ON j.id = c.jogador_id\nJOIN jogos g ON c.jogo_id = g.id;",
        "SELECT j.nome, g.titulo FROM jogadores j JOIN compras c ON j.id = c.jogador_id JOIN jogos g ON c.jogo_id = g.id;",
        false,
        [
          "Quando a informacao esta espalhada em tabelas diferentes, use JOIN para cruzar os registros.",
          "Parta de jogadores, passe por compras e conecte cada compra ao jogo correspondente.",
          "Confira se cada JOIN tem um ON e se os aliases deixam claro de qual tabela vem cada coluna."
        ],
        "Esquecer a condicao ON ou conectar ids errados, criando combinacoes incorretas.",
        "JOINs aparecem em quase toda analise relacional: clientes com pedidos, produtos com vendas, usuarios com eventos e jogos com compras.",
        "Inclua valor_total no resultado para enxergar o valor associado a cada compra.",
        "A query uniu jogadores, compras e jogos para mostrar nomes e titulos em vez de apenas ids. Ela funciona porque cada JOIN conecta uma chave relacionada. Em analise real, essa tecnica transforma tabelas normalizadas em uma visao legivel e investigavel."
      ),
      lesson(
        10,
        "Ninguem Fica de Fora",
        140,
        "O time de marketing quer uma lista de reativacao: jogadores cadastrados que nunca fizeram compra devem receber uma oferta especial.",
        "Retorne o nome dos jogadores que nao possuem nenhuma compra registrada, usando LEFT JOIN entre jogadores e compras.",
        "Encontrar registros sem correspondencia em outra tabela.",
        "LEFT JOIN",
        "intermediario",
        "LEFT JOIN mantem todos os registros da tabela da esquerda. Quando nao ha correspondencia, os campos da direita ficam NULL.",
        "SELECT j.nome\nFROM jogadores j\nLEFT JOIN compras c ON j.id = c.jogador_id\nWHERE c.id IS NULL;",
        "SELECT j.nome FROM jogadores j LEFT JOIN compras c ON j.id = c.jogador_id WHERE c.id IS NULL;",
        false,
        [
          "Para encontrar ausencias, mantenha a tabela principal completa e procure linhas sem par.",
          "Use jogadores como tabela da esquerda e compras como tabela relacionada.",
          "Confira se o filtro final procura NULL em uma coluna da tabela da direita."
        ],
        "Usar JOIN comum, que remove justamente os jogadores sem compra que a missao quer encontrar.",
        "LEFT JOIN e usado para achar clientes sem pedidos, usuarios sem login, produtos sem venda ou cadastros sem atividade.",
        "Procure jogos que ainda nao receberam avaliacoes usando LEFT JOIN com avaliacoes.",
        "A query manteve todos os jogadores e conectou compras quando existiam. Depois, filtrou os casos em que a compra ficou NULL. Ela funciona porque LEFT JOIN preserva registros sem correspondencia. Em analise real, isso e essencial para campanhas de reativacao e auditorias de lacunas."
      ),
      lesson(
        11,
        "Acima da Media",
        150,
        "Um funcionario anonimo denunciou uma possivel distorcao salarial. Marina pede uma lista objetiva: quem ganha acima da media geral da empresa?",
        "Retorne nome e salario dos funcionarios cujo salario seja maior que a media salarial de todos os funcionarios.",
        "Comparar linhas contra um valor calculado por subconsulta.",
        "Subconsulta",
        "intermediario",
        "Uma subconsulta e um SELECT dentro de outro SELECT. Ela pode calcular uma referencia usada pelo WHERE principal.",
        "SELECT nome, salario\nFROM funcionarios\nWHERE salario > (SELECT AVG(salario) FROM funcionarios);",
        "SELECT nome, salario FROM funcionarios WHERE salario > (SELECT AVG(salario) FROM funcionarios);",
        false,
        [
          "Quando o limite do filtro depende da propria base, calcule esse limite dentro da consulta.",
          "Compare cada salario com uma media calculada em um SELECT interno.",
          "Confira se a subconsulta esta entre parenteses e retorna apenas um valor."
        ],
        "Calcular a media manualmente fora do SQL ou fazer a subconsulta retornar mais de uma coluna.",
        "Subconsultas sao usadas para comparar registros com medias, limites dinamicos, listas calculadas e referencias historicas.",
        "Liste jogos cujo preco seja maior que o preco medio do catalogo.",
        "A query comparou cada salario com a media geral calculada pela subconsulta. Ela funciona porque o SELECT interno retorna um unico numero que o WHERE principal usa como referencia. Em analise real, esse padrao permite detectar registros acima ou abaixo de um comportamento medio."
      ),
      lesson(
        12,
        "O Ranking Interno",
        160,
        "Marina quer visualizar a posicao salarial de cada funcionario dentro do seu proprio departamento, sem misturar Dados com Marketing, Financeiro ou Suporte.",
        "Retorne nome, departamento, salario e posicao de cada funcionario no ranking de salario dentro do seu departamento.",
        "Criar rankings por grupo sem reduzir as linhas do resultado.",
        "Window function",
        "avancado",
        "Funcoes de janela calculam valores sobre um conjunto de linhas sem colapsar o resultado. RANK() cria posicoes dentro de uma ordenacao.",
        "SELECT nome, departamento, salario, RANK() OVER (PARTITION BY departamento ORDER BY salario DESC) AS posicao\nFROM funcionarios;",
        "SELECT nome, departamento, salario, RANK() OVER (PARTITION BY departamento ORDER BY salario DESC) AS posicao FROM funcionarios;",
        false,
        [
          "Use funcao de janela quando precisa de ranking sem perder as linhas individuais.",
          "Particione por departamento e ordene salarios do maior para o menor dentro de cada grupo.",
          "Confira se a nova coluna se chama posicao e se o ranking reinicia por departamento."
        ],
        "Usar GROUP BY e acabar reduzindo as linhas, quando a missao precisa manter cada funcionario visivel.",
        "Window functions aparecem em rankings por equipe, posicao por categoria, comparacoes dentro de segmentos e analises avancadas de performance.",
        "Crie um ranking geral de funcionarios por salario, sem PARTITION BY.",
        "A query calculou a posicao salarial de cada funcionario dentro do departamento. Ela funciona porque RANK() OVER define uma janela de calculo, PARTITION BY separa os departamentos e ORDER BY define o criterio do ranking. Em analise real, isso permite comparar pessoas ou itens dentro do grupo correto."
      ),
      lesson(
        13,
        "Classificando Clientes",
        150,
        "Para a proxima campanha, o marketing pediu uma classificacao simples: jogadores nivel Ouro ou Platina serao VIP; os demais entram como Regular.",
        "Retorne nome, nivel e uma nova coluna categoria classificando Ouro ou Platina como VIP e os demais como Regular.",
        "Criar categorias derivadas com regras condicionais dentro do SELECT.",
        "CASE WHEN",
        "avancado",
        "CASE WHEN funciona como uma regra se/senao dentro da consulta e cria uma nova coluna calculada.",
        "SELECT nome, nivel, CASE WHEN nivel IN ('Platina','Ouro') THEN 'VIP' ELSE 'Regular' END AS categoria\nFROM jogadores;",
        "SELECT nome, nivel, CASE WHEN nivel IN ('Platina','Ouro') THEN 'VIP' ELSE 'Regular' END AS categoria FROM jogadores;",
        false,
        [
          "Use CASE WHEN quando a saida precisa transformar valores em categorias.",
          "A regra deve testar o nivel e gerar uma nova coluna de classificacao.",
          "Confira se existe THEN para o grupo VIP, ELSE para os demais e END AS para nomear a coluna."
        ],
        "Esquecer o ELSE ou nao fechar a expressao com END, deixando a coluna calculada incompleta.",
        "CASE WHEN e usado para criar faixas de cliente, classificacoes de risco, categorias de preco e grupos de campanha.",
        "Classifique jogos como Premium quando preco for maior ou igual a 150 e Regular nos demais casos.",
        "A query criou uma coluna categoria com base no nivel do jogador. Ela funciona porque CASE WHEN avalia uma condicao e retorna um texto diferente para cada caso. Em analise real, esse recurso transforma dados brutos em segmentos acionaveis."
      ),
      lesson(
        14,
        "O Grande Esquema",
        180,
        "A pasta vermelha revela o motivo da investigacao: alguem dentro da empresa estaria manipulando o programa de fidelidade. Para provar o esquema, Marina precisa do ranking real de quem mais gastou na loja.",
        "Retorne nome e total_gasto, somando valor_total de todas as compras de cada jogador. Mostre apenas os 3 que mais gastaram, do maior para o menor.",
        "Combinar JOIN, agregacao, agrupamento, ordenacao e limite em uma consulta analitica final.",
        "Caso final",
        "avancado",
        "Consultas analiticas completas combinam varias etapas: cruzar tabelas, somar valores, agrupar entidades, ordenar o ranking e limitar o topo.",
        "SELECT j.nome, SUM(c.valor_total) AS total_gasto\nFROM jogadores j\nJOIN compras c ON j.id = c.jogador_id\nGROUP BY j.nome\nORDER BY total_gasto DESC\nLIMIT 3;",
        "SELECT j.nome, SUM(c.valor_total) AS total_gasto FROM jogadores j JOIN compras c ON j.id = c.jogador_id GROUP BY j.nome ORDER BY total_gasto DESC LIMIT 3;",
        true,
        [
          "O caso final pede uma consulta em etapas: juntar, somar, agrupar, ordenar e limitar.",
          "Conecte jogadores a compras, some o valor total por jogador e transforme isso em um ranking.",
          "Confira se o total se chama total_gasto, se o ranking e decrescente e se apenas 3 linhas aparecem."
        ],
        "Somar valores sem GROUP BY por jogador, ou esquecer LIMIT e retornar todo o ranking.",
        "Esse desenho aparece em rankings de receita, clientes mais valiosos, produtos com maior faturamento e auditorias de fidelidade.",
        "Monte um ranking dos 5 jogos que mais geraram receita somando compras por titulo.",
        "A query cruzou jogadores com compras, somou o valor total por jogador, agrupou o resultado por nome, ordenou do maior gasto para o menor e manteve apenas o top 3. Ela funciona porque cada clausula resolve uma parte da investigacao. Em BI, essa combinacao e a base de relatorios executivos e auditorias de receita."
      )
    ],
    glossary: [
      { term: "SELECT", description: "Escolhe quais colunas ou calculos aparecem no resultado.", example: "SELECT nome, nivel FROM jogadores;" },
      { term: "FROM", description: "Indica de qual tabela os dados serao lidos.", example: "SELECT titulo FROM jogos;" },
      { term: "WHERE", description: "Filtra linhas antes de mostrar ou agregar os dados.", example: "SELECT nome FROM jogadores WHERE pais = 'Brasil';" },
      { term: "AND / OR", description: "Combina condicoes. AND exige todas; OR aceita qualquer uma.", example: "SELECT nome FROM jogadores WHERE pais = 'Brasil' AND nivel = 'Ouro';" },
      { term: "IN", description: "Verifica se um valor esta dentro de uma lista.", example: "SELECT nome FROM jogadores WHERE nivel IN ('Ouro', 'Platina');" },
      { term: "ORDER BY", description: "Ordena o resultado por uma ou mais colunas.", example: "SELECT titulo FROM jogos ORDER BY preco DESC;" },
      { term: "LIMIT", description: "Limita a quantidade de linhas retornadas.", example: "SELECT titulo FROM jogos LIMIT 10;" },
      { term: "COUNT", description: "Conta quantas linhas existem em um grupo ou consulta.", example: "SELECT COUNT(*) AS total FROM compras;" },
      { term: "AVG", description: "Calcula a media de uma coluna numerica.", example: "SELECT AVG(preco) AS preco_medio FROM jogos;" },
      { term: "MIN / MAX", description: "Encontram o menor e o maior valor de uma coluna.", example: "SELECT MIN(preco), MAX(preco) FROM jogos;" },
      { term: "GROUP BY", description: "Agrupa linhas semelhantes para calcular indicadores por grupo.", example: "SELECT genero, COUNT(*) FROM jogos GROUP BY genero;" },
      { term: "HAVING", description: "Filtra grupos depois de uma agregacao.", example: "SELECT genero, COUNT(*) FROM jogos GROUP BY genero HAVING COUNT(*) > 2;" },
      { term: "JOIN", description: "Combina dados de tabelas relacionadas.", example: "SELECT j.nome, c.valor_total FROM jogadores j JOIN compras c ON j.id = c.jogador_id;" },
      { term: "LEFT JOIN", description: "Mantem todos os registros da tabela da esquerda, mesmo sem correspondencia.", example: "SELECT j.nome FROM jogadores j LEFT JOIN compras c ON j.id = c.jogador_id WHERE c.id IS NULL;" },
      { term: "Subquery", description: "Consulta interna usada como apoio para outra consulta.", example: "SELECT titulo FROM jogos WHERE preco > (SELECT AVG(preco) FROM jogos);" },
      { term: "Window Function", description: "Calcula valores por janela sem reduzir as linhas do resultado.", example: "SELECT nome, RANK() OVER (ORDER BY salario DESC) AS posicao FROM funcionarios;" },
      { term: "CASE WHEN", description: "Cria regras condicionais dentro da consulta.", example: "SELECT nome, CASE WHEN nivel = 'Ouro' THEN 'VIP' ELSE 'Regular' END AS categoria FROM jogadores;" }
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
        items: ["14 casos com validacao automatica.", "Dicas, guia da licao e esquema do banco.", "Treino livre com execucao SQL.", "XP, progresso e badges locais."]
      },
      {
        title: "Conceitos ensinados",
        items: ["SELECT, WHERE, AND, IN, ORDER BY e LIMIT.", "COUNT, AVG, MIN, MAX, GROUP BY e HAVING.", "JOIN, LEFT JOIN, subconsultas, window functions e CASE WHEN."]
      },
      {
        title: "Campanha NimbusPlay",
        items: ["Investigacao da Agencia NimbusData.", "Base ficticia com jogos, jogadores, compras, avaliacoes e funcionarios.", "Jornada orientada a analise de dados aplicada."]
      }
    ]
  };
})();
