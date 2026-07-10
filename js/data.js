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
    campaign: {
      title: "NimbusPlay - SQL Investigativo",
      agency: "Agencia NimbusData",
      archive: "Arquivo NimbusPlay",
      certificateName: "CERTIFICADO GAMIFICADO DE CONCLUSAO",
      defaultInvestigatorName: "Investigador SQL",
      completionSummary: "Voce encerrou o Arquivo NimbusPlay conectando pistas sobre jogadores, jogos, compras, avaliacoes e funcionarios. O dossie mostra dominio progressivo de consultas SQL aplicadas a uma investigacao de dados.",
      finalRank: "Investigador SQL Nimbus",
      concepts: [
        "SELECT",
        "selecao de colunas",
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
        "funcao de janela",
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
        "Bem-vinda(o) a Agencia NimbusData. A chuva bate no vidro enquanto Marina Souza deixa sobre sua mesa o primeiro dossie da NimbusPlay: uma denuncia anonima fala em perfis suspeitos na loja de jogos. Antes de formular qualquer teoria, voce precisa abrir o arquivo bruto de jogadores e observar o terreno.",
        "Abra o arquivo de jogadores e retorne todas as colunas e todas as linhas cadastradas.",
        "Reconhecer uma tabela inteira usando a estrutura mais basica de uma consulta SQL.",
        "SELECT *",
        "iniciante",
        "SELECT escolhe as colunas exibidas. O asterisco representa todas as colunas, e FROM indica a tabela consultada.",
        "SELECT *\nFROM jogadores;",
        "SELECT * FROM jogadores;",
        false,
        [
          "Quando voce ainda esta reconhecendo um arquivo, faz sentido ver todas as colunas antes de filtrar.",
          "Pense em duas partes: escolher todos os campos e apontar a tabela de origem.",
          "Checklist: a consulta comeca com SELECT, usa o simbolo de todas as colunas e le o arquivo jogadores."
        ],
        "Esquecer o FROM ou consultar uma tabela diferente do arquivo pedido pela missao.",
        "Analistas usam esse primeiro reconhecimento para entender colunas, linhas e exemplos reais antes de filtrar, cruzar ou agregar dados.",
        "No treino livre, abra a tabela jogos inteira e anote quais colunas poderiam virar pistas em uma investigacao comercial.",
        "A consulta abriu todo o arquivo de jogadores da NimbusPlay. Ela funcionou porque SELECT * pediu todas as colunas disponiveis, enquanto FROM jogadores definiu a origem dos dados. Em analise real, esse reconhecimento inicial evita conclusoes apressadas e ajuda a equipe a entender que tipo de evidencia existe no dossie."
      ),
      lesson(
        2,
        "Nomes e Paises",
        60,
        "Marina volta com um mapa preso por clipes ao dossie. O arquivo completo ajudou, mas esta pesado demais para a primeira leitura da sala de guerra. Para localizar a base de usuarios da NimbusPlay, ela quer ver apenas quem sao os jogadores e de onde eles acessam.",
        "Monte uma lista limpa com apenas nome e pais dos jogadores cadastrados.",
        "Selecionar somente as colunas necessarias para responder a uma pergunta especifica.",
        "SELECT colunas especificas",
        "iniciante",
        "Em vez de usar *, liste as colunas desejadas depois do SELECT, separando cada uma por virgula.",
        "SELECT nome, pais\nFROM jogadores;",
        "SELECT nome, pais FROM jogadores;",
        false,
        [
          "Quando o relatorio pede poucos campos, trazer colunas extras aumenta ruido na investigacao.",
          "A estrutura mental e escolher duas colunas e manter jogadores como arquivo de origem.",
          "Checklist: nome vem antes de pais, as colunas estao separadas por virgula e nao ha filtro nesta etapa."
        ],
        "Usar SELECT * e retornar mais colunas do que a missao pediu.",
        "Selecionar colunas especificas deixa paineis, exportacoes e investigacoes mais limpos, seguros e faceis de revisar.",
        "Liste nome, data_cadastro e nivel para montar uma ficha simples de perfil dos jogadores.",
        "A consulta exibiu apenas nome e pais, criando uma visao mais limpa do cadastro. Ela funcionou porque o SELECT permite escolher campos especificos e o FROM indica onde esses campos existem. Em dados reais, esse recorte transforma um arquivo grande em uma evidencia objetiva para a equipe de investigacao."
      ),
      lesson(
        3,
        "Suspeitos do Brasil",
        70,
        "Um alerta vermelho aparece no quadro da Agencia: parte da denuncia cita contas brasileiras com comportamento acima do normal. Marina nao quer conclusoes ainda; ela quer isolar esse grupo e ver o nivel de cada jogador antes de cruzar compras ou avaliacoes.",
        "Isole os jogadores do Brasil e mostre nome e nivel de cada um.",
        "Filtrar linhas por uma condicao textual usando WHERE.",
        "WHERE",
        "iniciante",
        "WHERE limita as linhas retornadas. Para texto, compare a coluna com um valor entre aspas simples.",
        "SELECT nome, nivel\nFROM jogadores\nWHERE pais = 'Brasil';",
        "SELECT nome, nivel FROM jogadores WHERE pais = 'Brasil';",
        false,
        [
          "Filtros reduzem o arquivo para as linhas que cumprem uma regra clara.",
          "Use a coluna de pais como criterio e mantenha somente o valor indicado pela denuncia.",
          "Checklist: Brasil esta entre aspas simples, a condicao usa igualdade e o resultado mostra apenas nome e nivel."
        ],
        "Esquecer aspas em valores de texto ou filtrar outra coluna por engano.",
        "Filtros por pais, cidade, segmento ou unidade sao comuns em analises regionais, campanhas e investigacoes de comportamento.",
        "Filtre jogadores de Portugal e compare a distribuicao de niveis com o grupo do Brasil.",
        "A consulta manteve apenas jogadores cujo pais e Brasil e exibiu nome e nivel. Ela funcionou porque WHERE testa a condicao em cada linha antes de retornar o resultado. Para a NimbusPlay, isso transforma uma suspeita ampla em um grupo investigavel; em analise real, e o primeiro passo para segmentar qualquer base."
      ),
      lesson(
        4,
        "Filtros Cruzados",
        80,
        "A pasta ganha uma etiqueta nova: alto valor. Marina percebe que a denuncia se concentra em jogadores de Brasil e Portugal, mas somente nos niveis mais valiosos. O proximo recorte precisa separar clientes premium de regioes-chave.",
        "Encontre jogadores de Brasil ou Portugal que estejam nos niveis Ouro ou Platina, mostrando nome, pais e nivel.",
        "Combinar listas de valores e multiplas condicoes em uma consulta.",
        "AND e IN",
        "basico",
        "IN verifica se um valor pertence a uma lista. AND exige que duas condicoes sejam verdadeiras ao mesmo tempo.",
        "SELECT nome, pais, nivel\nFROM jogadores\nWHERE pais IN ('Brasil','Portugal') AND nivel IN ('Ouro','Platina');",
        "SELECT nome, pais, nivel FROM jogadores WHERE pais IN ('Brasil','Portugal') AND nivel IN ('Ouro','Platina');",
        false,
        [
          "Use IN quando uma mesma coluna pode aceitar mais de um valor valido para a missao.",
          "Pense em dois filtros de lista: um para pais e outro para nivel, unidos pela exigencia de ambos valerem.",
          "Checklist: cada lista esta entre parenteses, textos estao entre aspas simples e as duas regras precisam ser verdadeiras."
        ],
        "Usar OR de forma solta e acabar aceitando jogadores que cumprem apenas parte da regra.",
        "Filtros cruzados ajudam a criar segmentos como clientes premium de uma regiao, produtos ativos de certas categorias ou casos de risco com criterios combinados.",
        "Teste uma consulta para jogadores de Argentina ou Chile com nivel Prata ou Ouro.",
        "A consulta aplicou dois filtros de lista ao mesmo tempo: pais e nivel. Ela funcionou porque IN aceita varios valores possiveis para uma coluna e AND exige que as duas regras sejam atendidas. Na investigacao NimbusPlay, esse recorte reduz o grupo suspeito a perfis de maior impacto comercial."
      ),
      lesson(
        5,
        "Ranking de Precos",
        90,
        "O financeiro envia uma anotacao: alguns titulos caros podem estar distorcendo o comportamento de compra. Marina pede que voce organize o catalogo como um ranking, colocando no topo os jogos que mais pesam no bolso.",
        "Organize o catalogo e mostre titulo e preco dos 5 jogos mais caros, do maior para o menor preco.",
        "Ordenar resultados e limitar a quantidade de linhas retornadas.",
        "ORDER BY e LIMIT",
        "basico",
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
        "Rankings aparecem em analises de produtos mais caros, maiores vendas, clientes prioritarios, alertas de excecao e investigacoes financeiras.",
        "Liste os 3 jogos mais baratos para comparar o outro extremo do catalogo.",
        "A consulta ordenou os jogos pelo preco em ordem decrescente e manteve apenas os cinco primeiros. Ela funcionou porque ORDER BY definiu o criterio do ranking e LIMIT recortou o topo. Para a NimbusPlay, isso revela quais titulos podem influenciar mais a receita; em analise real, rankings ajudam a priorizar atencao."
      ),
      lesson(
        6,
        "Contando Pistas",
        100,
        "Antes da reuniao com a diretoria, Marina precisa transformar o catalogo em quatro numeros que caibam em uma unica linha do dossie. Sem esse resumo, a conversa sobre precos vira opiniao em vez de evidencia.",
        "Produza uma linha de resumo do catalogo com total_jogos, preco_medio, preco_minimo e preco_maximo.",
        "Criar indicadores resumidos com funcoes de agregacao.",
        "COUNT, AVG, MIN e MAX",
        "basico",
        "Funcoes de agregacao resumem varias linhas em poucos numeros. AS nomeia cada indicador calculado.",
        "SELECT COUNT(*) AS total_jogos, AVG(preco) AS preco_medio, MIN(preco) AS preco_minimo, MAX(preco) AS preco_maximo\nFROM jogos;",
        "SELECT COUNT(*) AS total_jogos, AVG(preco) AS preco_medio, MIN(preco) AS preco_minimo, MAX(preco) AS preco_maximo FROM jogos;",
        false,
        [
          "Quando a missao pede numeros de resumo, procure funcoes que condensam varias linhas.",
          "Calcule quantidade, media, minimo e maximo sobre o mesmo arquivo de jogos.",
          "Checklist: cada indicador tem o alias solicitado e o resultado final cabe em uma unica linha."
        ],
        "Selecionar colunas comuns junto das agregacoes sem agrupamento, ou esquecer os aliases pedidos.",
        "Agregacoes viram KPIs como quantidade de produtos, preco medio, valor minimo, valor maximo e indicadores executivos.",
        "Calcule a media, minimo e maximo de salario na tabela funcionarios para comparar outro tipo de indicador.",
        "A consulta condensou o catalogo em quatro indicadores. Ela funcionou porque COUNT, AVG, MIN e MAX transformam muitas linhas em valores resumidos. Na NimbusPlay, esses numeros dao contexto ao preco dos jogos; em analise real, agregacoes traduzem operacao em metricas de decisao."
      ),
      lesson(
        7,
        "Agrupando o Catalogo",
        110,
        "No quadro da sala, Marina separa os titulos por genero. Ela suspeita que algumas categorias dominam o catalogo e podem explicar parte das compras. O proximo passo e contar quantos jogos existem em cada gaveta do arquivo.",
        "Agrupe o catalogo por genero e mostre a quantidade de jogos em cada genero.",
        "Agrupar registros por categoria para calcular contagens por grupo.",
        "GROUP BY",
        "intermediario",
        "GROUP BY junta linhas com o mesmo valor em uma coluna e permite calcular metricas por grupo.",
        "SELECT genero, COUNT(*) AS quantidade\nFROM jogos\nGROUP BY genero;",
        "SELECT genero, COUNT(*) AS quantidade FROM jogos GROUP BY genero;",
        false,
        [
          "Quando a pergunta pede um total para cada categoria, o caminho natural e agrupar.",
          "Selecione a categoria que identifica o grupo e calcule uma contagem dentro de cada grupo.",
          "Checklist: a coluna de categoria aparece no SELECT e tambem no GROUP BY."
        ],
        "Contar todos os jogos sem agrupar por genero, gerando apenas um total geral.",
        "GROUP BY e usado para resumir vendas por canal, chamados por status, jogos por genero e clientes por segmento.",
        "Agrupe jogadores por nivel e conte quantos existem em cada categoria de fidelidade.",
        "A consulta agrupou jogos pelo genero e contou quantos registros existem em cada grupo. Ela funcionou porque GROUP BY cria os grupos antes do COUNT calcular a quantidade. Para a NimbusPlay, isso mostra a composicao do catalogo; em BI, esse padrao sustenta paineis por categoria."
      ),
      lesson(
        8,
        "Generos em Destaque",
        120,
        "O relatorio por genero ficou maior do que o necessario. Marina risca as categorias pequenas e pede apenas os grupos com volume suficiente para afetar a leitura do catalogo.",
        "Mostre genero e quantidade apenas para generos com mais de 2 jogos cadastrados.",
        "Filtrar grupos agregados depois do agrupamento.",
        "HAVING",
        "intermediario",
        "WHERE filtra linhas antes do agrupamento. HAVING filtra grupos depois que as agregacoes foram calculadas.",
        "SELECT genero, COUNT(*) AS quantidade\nFROM jogos\nGROUP BY genero\nHAVING COUNT(*) > 2;",
        "SELECT genero, COUNT(*) AS quantidade FROM jogos GROUP BY genero HAVING COUNT(*) > 2;",
        false,
        [
          "Se o filtro depende de uma contagem por grupo, ele so pode acontecer depois do agrupamento.",
          "Primeiro forme os grupos por genero, depois aplique a regra sobre a quantidade calculada.",
          "Checklist: o criterio usa HAVING, compara a contagem do grupo e exige valor maior que 2."
        ],
        "Tentar colocar a condicao da contagem no WHERE, antes de a contagem existir.",
        "HAVING ajuda a destacar grupos relevantes, como categorias com volume minimo, clientes recorrentes ou equipes acima de uma meta.",
        "Mostre apenas niveis de jogadores que tenham mais de 3 jogadores cadastrados.",
        "A consulta contou jogos por genero e manteve apenas grupos com mais de dois jogos. Ela funcionou porque HAVING avalia a metrica agregada criada pelo GROUP BY. Na investigacao, isso tira o foco de categorias pequenas; em analise real, separa grupos relevantes de ruido estatistico."
      ),
      lesson(
        9,
        "Cruzando Registros",
        130,
        "As compras chegaram como codigos: jogador_id, jogo_id, numeros sem rosto. Marina prende tres folhas lado a lado e pede que voce ligue as pontas para revelar quem comprou qual jogo.",
        "Cruze jogadores, compras e jogos para mostrar o nome do jogador e o titulo do jogo em cada compra registrada.",
        "Unir tabelas relacionadas para transformar ids em informacoes legiveis.",
        "JOIN",
        "intermediario",
        "JOIN conecta tabelas usando uma condicao ON, geralmente ligando uma chave primaria a uma chave estrangeira.",
        "SELECT j.nome, g.titulo\nFROM jogadores j\nJOIN compras c ON j.id = c.jogador_id\nJOIN jogos g ON c.jogo_id = g.id;",
        "SELECT j.nome, g.titulo FROM jogadores j JOIN compras c ON j.id = c.jogador_id JOIN jogos g ON c.jogo_id = g.id;",
        false,
        [
          "Quando a informacao esta espalhada em tabelas diferentes, JOIN transforma codigos em contexto.",
          "Parta dos jogadores, passe pelas compras e use cada compra para chegar ao jogo correspondente.",
          "Checklist: cada ligacao tem ON, os ids corretos se encontram e os aliases deixam a leitura mais clara."
        ],
        "Esquecer a condicao ON ou conectar ids errados, criando combinacoes incorretas.",
        "JOINs aparecem em quase toda analise relacional: clientes com pedidos, produtos com vendas, usuarios com eventos e jogos com compras.",
        "Inclua valor_total no resultado para enxergar quanto cada compra movimentou.",
        "A consulta uniu jogadores, compras e jogos para mostrar nomes e titulos em vez de apenas ids. Ela funcionou porque cada JOIN conectou chaves relacionadas. Na NimbusPlay, isso transforma rastros tecnicos em uma linha investigavel; em dados reais, JOIN e a ponte entre tabelas normalizadas e historias compreensiveis."
      ),
      lesson(
        10,
        "Ninguem Fica de Fora",
        140,
        "Nem toda pista aparece como presenca; algumas aparecem como ausencia. O marketing quer encontrar jogadores cadastrados que nunca compraram, possiveis alvos de reativacao e tambem sinais de cadastro fantasma.",
        "Use jogadores como arquivo principal e encontre os nomes que nao possuem nenhuma compra registrada.",
        "Encontrar registros sem correspondencia em outra tabela.",
        "LEFT JOIN",
        "intermediario",
        "LEFT JOIN mantem todos os registros da tabela da esquerda. Quando nao ha correspondencia, os campos da direita ficam NULL.",
        "SELECT j.nome\nFROM jogadores j\nLEFT JOIN compras c ON j.id = c.jogador_id\nWHERE c.id IS NULL;",
        "SELECT j.nome FROM jogadores j LEFT JOIN compras c ON j.id = c.jogador_id WHERE c.id IS NULL;",
        false,
        [
          "Para encontrar ausencias, preserve a lista principal completa e procure linhas sem correspondencia.",
          "Use jogadores como tabela da esquerda e compras como tabela relacionada.",
          "Checklist: a ligacao usa LEFT JOIN e o filtro final procura NULL em uma coluna da tabela de compras."
        ],
        "Usar JOIN comum, que remove justamente os jogadores sem compra que a missao quer encontrar.",
        "LEFT JOIN e usado para achar clientes sem pedidos, usuarios sem acesso recente, produtos sem venda ou cadastros sem atividade.",
        "Procure jogos que ainda nao receberam avaliacoes usando LEFT JOIN com avaliacoes.",
        "A consulta manteve todos os jogadores e conectou compras quando elas existiam. Depois, filtrou os casos em que a compra ficou NULL. Ela funcionou porque LEFT JOIN preserva registros sem correspondencia. Para a NimbusPlay, isso revela contas inativas; em analise real, e uma tecnica central para encontrar lacunas."
      ),
      lesson(
        11,
        "Acima da Media",
        150,
        "A investigacao sai do catalogo e entra na estrutura interna. Um envelope sem remetente aponta possivel distorcao salarial na equipe da NimbusPlay. Marina quer uma comparacao justa contra a media geral antes de levantar hipoteses.",
        "Compare cada salario com a media geral e mostre nome e salario dos funcionarios acima dessa media.",
        "Comparar linhas contra um valor calculado por subconsulta.",
        "Subconsulta",
        "intermediario",
        "Uma subconsulta e um SELECT dentro de outro SELECT. Ela pode calcular uma referencia usada pelo WHERE principal.",
        "SELECT nome, salario\nFROM funcionarios\nWHERE salario > (SELECT AVG(salario) FROM funcionarios);",
        "SELECT nome, salario FROM funcionarios WHERE salario > (SELECT AVG(salario) FROM funcionarios);",
        false,
        [
          "Quando o limite do filtro depende da propria base, ele pode ser calculado dentro do SQL.",
          "Use um SELECT interno para calcular a media e compare cada salario contra esse valor.",
          "Checklist: a subconsulta esta entre parenteses, retorna um unico numero e o filtro usa maior que."
        ],
        "Calcular a media manualmente fora do SQL ou fazer a subconsulta retornar mais de uma coluna.",
        "Subconsultas sao usadas para comparar registros com medias, limites dinamicos, listas calculadas e referencias historicas.",
        "Liste jogos cujo preco seja maior que o preco medio do catalogo.",
        "A consulta comparou cada salario com a media geral calculada pela subconsulta. Ela funcionou porque o SELECT interno retornou um unico numero usado como referencia pelo WHERE principal. Na investigacao, isso cria uma linha de corte objetiva; em analise real, ajuda a detectar pontos acima ou abaixo de um comportamento medio."
      ),
      lesson(
        12,
        "O Ranking Interno",
        160,
        "A media geral abriu uma pista, mas Marina sabe que comparar departamentos diferentes pode distorcer a leitura. Agora ela quer ver cada funcionario dentro da sua propria area, como fichas organizadas por gaveta.",
        "Crie o ranking salarial de cada funcionario dentro do respectivo departamento, mostrando nome, departamento, salario e posicao.",
        "Criar rankings por grupo sem reduzir as linhas do resultado.",
        "Window function",
        "avancado",
        "Funcoes de janela calculam valores sobre um conjunto de linhas sem colapsar o resultado. RANK() cria posicoes dentro de uma ordenacao.",
        "SELECT nome, departamento, salario, RANK() OVER (PARTITION BY departamento ORDER BY salario DESC) AS posicao\nFROM funcionarios;",
        "SELECT nome, departamento, salario, RANK() OVER (PARTITION BY departamento ORDER BY salario DESC) AS posicao FROM funcionarios;",
        false,
        [
          "Use funcao de janela quando precisa calcular ranking sem perder as linhas individuais.",
          "Separe a janela por departamento e ordene os salarios do maior para o menor dentro de cada grupo.",
          "Checklist: a nova coluna se chama posicao e o ranking reinicia quando o departamento muda."
        ],
        "Usar GROUP BY e acabar reduzindo as linhas, quando a missao precisa manter cada funcionario visivel.",
        "Window functions aparecem em rankings por equipe, posicao por categoria, comparacoes dentro de segmentos e analises avancadas de performance.",
        "Crie um ranking geral de funcionarios por salario, sem PARTITION BY, e compare a diferenca de leitura.",
        "A consulta calculou a posicao salarial de cada funcionario dentro do departamento. Ela funcionou porque RANK() OVER definiu uma janela de calculo, PARTITION BY separou os departamentos e ORDER BY definiu o criterio do ranking. Para a NimbusPlay, isso evita comparacoes injustas; em analise real, permite avaliar desempenho dentro do contexto correto."
      ),
      lesson(
        13,
        "Classificando Clientes",
        150,
        "Com o caso quase fechado, o marketing pede uma etiqueta operacional para a proxima acao: jogadores Ouro ou Platina entram no grupo VIP; os demais seguem como Regular. Marina quer que essa classificacao saia direto do SQL, sem planilha manual.",
        "Crie uma coluna categoria que marque jogadores Ouro ou Platina como VIP e todos os demais como Regular, exibindo nome e nivel.",
        "Criar categorias derivadas com regras condicionais dentro do SELECT.",
        "CASE WHEN",
        "avancado",
        "CASE WHEN funciona como uma regra se/senao dentro da consulta e cria uma nova coluna calculada.",
        "SELECT nome, nivel, CASE WHEN nivel IN ('Platina','Ouro') THEN 'VIP' ELSE 'Regular' END AS categoria\nFROM jogadores;",
        "SELECT nome, nivel, CASE WHEN nivel IN ('Platina','Ouro') THEN 'VIP' ELSE 'Regular' END AS categoria FROM jogadores;",
        false,
        [
          "Use CASE WHEN quando a saida precisa transformar valores existentes em novas categorias.",
          "A regra deve testar o nivel do jogador e produzir uma coluna calculada de classificacao.",
          "Checklist: ha um resultado para o grupo VIP, um resultado para os demais e a expressao e fechada com nome de coluna."
        ],
        "Esquecer o ELSE ou nao fechar a expressao com END, deixando a coluna calculada incompleta.",
        "CASE WHEN e usado para criar faixas de cliente, classificacoes de risco, categorias de preco e grupos de campanha.",
        "Classifique jogos como Premium quando preco for maior ou igual a 150 e Regular nos demais casos.",
        "A consulta criou uma coluna categoria com base no nivel do jogador. Ela funcionou porque CASE WHEN avaliou uma regra e retornou um texto diferente para cada caso. Na NimbusPlay, isso prepara segmentos para acao; em analise real, transforma dados brutos em categorias prontas para decisao."
      ),
      lesson(
        14,
        "O Grande Esquema",
        180,
        "A pasta vermelha finalmente e aberta. O bilhete anonimo dizia que o programa de fidelidade poderia estar favorecendo contas erradas, mas so o dinheiro conta a historia completa. Marina aponta para a ultima tela: encontre o top 3 real de jogadores por gasto total e feche o caso NimbusPlay.",
        "Monte o ranking final somando valor_total por jogador, exibindo nome e total_gasto dos 3 maiores compradores em ordem decrescente.",
        "Combinar JOIN, agregacao, agrupamento, ordenacao e limite em uma consulta analitica final.",
        "Caso final",
        "avancado",
        "Consultas analiticas completas combinam varias etapas: cruzar tabelas, somar valores, agrupar entidades, ordenar o ranking e limitar o topo.",
        "SELECT j.nome, SUM(c.valor_total) AS total_gasto\nFROM jogadores j\nJOIN compras c ON j.id = c.jogador_id\nGROUP BY j.nome\nORDER BY total_gasto DESC\nLIMIT 3;",
        "SELECT j.nome, SUM(c.valor_total) AS total_gasto FROM jogadores j JOIN compras c ON j.id = c.jogador_id GROUP BY j.nome ORDER BY total_gasto DESC LIMIT 3;",
        true,
        [
          "O caso final combina varias pistas: relacionamento entre tabelas, soma, agrupamento, ranking e recorte do topo.",
          "Conecte jogadores a compras, some o valor total de cada jogador e transforme o resultado em ranking.",
          "Checklist: o total se chama total_gasto, a ordem e decrescente e o resultado mostra apenas 3 linhas."
        ],
        "Somar valores sem GROUP BY por jogador, ou esquecer LIMIT e retornar todo o ranking.",
        "Esse desenho aparece em rankings de receita, clientes mais valiosos, produtos com maior faturamento e auditorias de fidelidade.",
        "Monte um ranking dos 5 jogos que mais geraram receita somando compras por titulo.",
        "A consulta cruzou jogadores com compras, somou o valor total por jogador, agrupou por nome, ordenou do maior gasto para o menor e manteve apenas o top 3. Ela funcionou porque cada clausula resolveu uma parte do caso final: ligar evidencias, medir valor, consolidar por pessoa e priorizar o topo. Com isso, Marina encerra o dossie NimbusPlay com uma evidencia analitica clara."
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
