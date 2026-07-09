# Auditoria pedagogica da trilha SQL Quest

## 1. Resumo da trilha atual

O SQL Quest possui 14 fases progressivas. A campanha atual usa uma narrativa de guilda educacional, com uma base simples composta por `alunos`, `cursos` e `matriculas`. A proposta central e ensinar SQL por meio de pequenas missoes de consulta, execucao no navegador e validacao automatica por comparacao de resultado.

Conceitos abordados, na ordem atual:

1. `SELECT *` e `FROM`
2. selecao de colunas especificas
3. `WHERE` com texto
4. operadores numericos
5. `ORDER BY DESC`
6. filtro em outra tabela
7. `COUNT(*)`
8. `AVG` com `ROUND`
9. `GROUP BY`
10. `JOIN`
11. `JOIN` com `WHERE` e `AND`
12. `GROUP BY` com `HAVING`
13. subconsulta com `AVG` e `DISTINCT`
14. relatorio final com `JOIN`, `WHERE`, `GROUP BY`, `AVG`, `ROUND` e `ORDER BY`

Nivel geral de dificuldade: a trilha vai de iniciante a intermediario. Ela cobre bem uma primeira jornada de consultas analiticas, mas ainda nao chega a SQL avancado. A progressao e majoritariamente coerente, com alguns saltos relevantes nas fases 10, 12 e 13.

Observacao tecnica-pedagogica: a validacao em `js/validator.js` compara colunas e linhas retornadas, nao o texto literal da query. Isso e positivo para aprendizagem, porque permite solucoes equivalentes quando retornam o mesmo resultado. O campo `starterSql` em `js/data.js` contem a solucao completa em todas as fases, mas `js/render.js` limpa o editor ao renderizar a fase. Pedagogicamente, esse campo exige cuidado para nao voltar a ser exibido por acidente em evolucoes futuras.

## 2. Tabela das fases

| Fase | Titulo | Conceito principal | Conceito secundario | Query esperada | Dificuldade sugerida | Clareza da missao | Dicas | Explicacao pos-resolucao | Possiveis problemas |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Primeiro SELECT | `SELECT *` e `FROM` | reconhecimento de tabela | `SELECT * FROM alunos;` | iniciante | Alta. A missao pede ver todos os alunos. | Boas, mas a segunda quase entrega a tabela exata, o que e aceitavel na primeira fase. | Boa. Conecta reconhecimento inicial da base com analise de dados. | `starterSql` duplica a resposta completa no arquivo de dados, embora nao seja exibido atualmente. |
| 2 | Colunas certas | selecao de colunas | ordem das colunas | `SELECT nome, cidade FROM alunos;` | iniciante | Alta. O pedido de mostrar apenas nome e cidade e direto. | Boas. Reforcam evitar `SELECT *` e manter ordem. | Boa. Explica reducao de ruido. | Poderia mencionar que a ordem das colunas importa para a validacao. |
| 3 | Filtro por cidade | `WHERE` com texto | aspas simples | `SELECT nome, cidade FROM alunos WHERE cidade = 'Recife';` | iniciante | Alta. O criterio Recife e claro. | Boas. Explicam texto entre aspas. | Boa. Conecta filtro com segmentacao. | Nenhum problema grave. |
| 4 | Maiores de 25 | comparacao numerica | operador `>` | `SELECT nome, idade FROM alunos WHERE idade > 25;` | basico | Alta. O limite "mais de 25" esta claro. | Boas. A dica diferencia `>` de `>=`. | Boa. Traz exemplos de cortes numericos. | Pode ser facil demais depois da fase 3, mas consolida `WHERE`. |
| 5 | Ordenacao | `ORDER BY` | `DESC` | `SELECT nome, idade FROM alunos ORDER BY idade DESC;` | basico | Alta. O pedido de mais velho para mais novo e objetivo. | Boas. | Boa. Liga ordenacao a rankings. | Faltam exemplos anteriores de ordenacao crescente antes de `DESC`, mas o salto e pequeno. |
| 6 | Cursos de dados | `WHERE` em outra tabela | selecao de colunas | `SELECT titulo, carga_horaria FROM cursos WHERE categoria = 'Dados';` | basico | Alta. Reaplica filtro em novo contexto. | Boas. | Boa. | A fase reforca conceito ja visto, mas nao apresenta conceito novo. Isso pode ser intencional para consolidacao. |
| 7 | Contagem | `COUNT(*)` | filtro antes da agregacao | `SELECT COUNT(*) AS total_concluidas FROM matriculas WHERE status = 'concluido';` | basico | Alta. A pergunta pede quantidade. | Boas, mas nao explica alias `AS`. | Boa. Relaciona contagem a indicadores. | `AS total_concluidas` aparece sem introducao previa formal. |
| 8 | Media das notas | `AVG` | `ROUND` e alias | `SELECT ROUND(AVG(nota), 2) AS media_nota FROM matriculas;` | basico | Alta. O objetivo media geral e claro. | Boas, mas entregam quase toda a estrutura. | Boa. | Introduz duas funcoes (`AVG` e `ROUND`) ao mesmo tempo. Pode precisar de explicacao extra sobre arredondamento. |
| 9 | Agrupar por status | `GROUP BY` | `COUNT(*)` por grupo | `SELECT status, COUNT(*) AS total FROM matriculas GROUP BY status;` | intermediario | Alta. Resumo por status e natural. | Boas. | Boa. | Primeira mudanca mental importante: de linhas individuais para grupos. Poderia ter uma explicacao maior no guia. |
| 10 | Primeiro JOIN | `JOIN` | chaves estrangeiras | `SELECT alunos.nome, cursos.titulo FROM matriculas JOIN alunos ON alunos.id = matriculas.aluno_id JOIN cursos ON cursos.id = matriculas.curso_id;` | intermediario | Media-alta. A historia explica que ids precisam virar nomes. | Boas, mas tecnicas. | Boa. | Salto grande: dois `JOINs` aparecem de uma vez. Uma fase com um unico `JOIN` antes desta ajudaria. |
| 11 | JOIN com filtro | `JOIN` com `WHERE` | `AND` | `SELECT alunos.nome, matriculas.nota FROM matriculas JOIN alunos ON alunos.id = matriculas.aluno_id JOIN cursos ON cursos.id = matriculas.curso_id WHERE cursos.titulo = 'SQL Fundamentos' AND matriculas.status = 'concluido';` | intermediario | Alta. Pedido especifico e orientado a negocio. | Boas. | Boa. | A consulta e longa; pode intimidar apos apenas uma fase de JOIN. |
| 12 | HAVING | `HAVING` | `GROUP BY` apos `JOIN` | `SELECT alunos.nome, COUNT(*) AS total_matriculas FROM matriculas JOIN alunos ON alunos.id = matriculas.aluno_id GROUP BY alunos.nome HAVING COUNT(*) >= 2;` | intermediario | Media-alta. "Pelo menos duas matriculas" e claro. | A segunda dica entrega a clausula central. | Boa. Explica diferenca entre `WHERE` e `HAVING`. | Salto conceitual duplo: agrupar apos `JOIN` e filtrar grupo com `HAVING`. |
| 13 | Subconsulta | subconsulta escalar | `DISTINCT`, media comparativa | `SELECT DISTINCT alunos.nome FROM matriculas JOIN alunos ON alunos.id = matriculas.aluno_id WHERE matriculas.nota > (SELECT AVG(nota) FROM matriculas);` | intermediario | Media. A ideia "nota acima da media geral" e clara, mas envolve comparar cada linha contra um calculo global. | Boas, mas a primeira entrega a subconsulta quase completa. | Boa. | Introduz `DISTINCT` sem fase previa e junto com subconsulta. Pode ser muita novidade em uma unica fase. |
| 14 | Relatorio final | relatorio analitico combinado | `JOIN`, `WHERE`, `GROUP BY`, `AVG`, `ROUND`, `ORDER BY` | `SELECT alunos.nome, ROUND(AVG(matriculas.nota), 2) AS media FROM matriculas JOIN alunos ON alunos.id = matriculas.aluno_id WHERE matriculas.status = 'concluido' GROUP BY alunos.nome ORDER BY media DESC;` | intermediario | Alta. Ranking por media e um bom fechamento. | Boas. | Boa. | Funciona bem como sintese, mas seria mais forte com revisao explicita dos blocos da query. |

## 3. Diagnostico pedagogico

### Progressao

A progressao geral faz sentido: a trilha comeca com leitura simples, avanca para filtros, ordenacao, agregacoes, agrupamento, relacionamentos entre tabelas e consultas analiticas combinadas.

O principal ponto positivo e a recorrencia de padroes reais de BI: selecionar colunas, filtrar registros, contar status, calcular media, agrupar categorias, montar ranking e cruzar tabelas normalizadas.

### Saltos de dificuldade

Ha tres saltos principais:

- Fase 10: o primeiro `JOIN` ja exige dois `JOINs` e tres tabelas.
- Fase 12: `HAVING` aparece junto com `JOIN`, `GROUP BY` e `COUNT`.
- Fase 13: subconsulta aparece junto com `DISTINCT`, sem uma fase anterior dedicada a remover duplicatas.

Esses saltos nao tornam a trilha inviavel, mas podem gerar dependencia excessiva das dicas.

### Fases faceis ou dificeis demais

Fases 1 a 6 sao bem acessiveis e adequadas para iniciantes. A fase 6 e mais de consolidacao do que de conteudo novo.

Fases 10 a 14 formam um bloco intermediario. Elas sao boas para um fechamento analitico, mas poderiam ser quebradas em passos menores para reduzir frustracao de iniciantes.

### Ordem dos conceitos

A ordem atual e boa, mas alguns conceitos poderiam ser introduzidos antes de aparecerem em queries longas:

- `AS` aparece nas fases 7 e 8 sem uma fase ou explicacao dedicada.
- `ROUND` aparece junto com `AVG`; poderia ser tratado como melhoria de apresentacao.
- `DISTINCT` aparece apenas na fase 13, junto com subconsulta.
- `AND` aparece na fase 11, mas o glossario ja traz `AND / OR`; poderia haver uma fase curta antes dos `JOINs`.

### Ambiguidade das missoes

As missoes sao majoritariamente claras. A narrativa e simples, mas funcional. Nao ha ambiguidades graves no objetivo de cada fase.

O ponto mais delicado e que algumas missoes pedem uma saida especifica sem sempre explicitar que a ordem das colunas tambem importa para a validacao. Isso aparece especialmente nas fases 2, 7, 8 e nas fases com relatorios.

### Dicas

As dicas sao uteis e adequadas para iniciantes. Em algumas fases, porem, elas entregam parte central da resposta:

- Fase 8: "Use AVG(nota)" e "ROUND com 2 casas" praticamente definem a expressao.
- Fase 12: "Use HAVING COUNT(*) >= 2" entrega a clausula principal.
- Fase 13: a dica com `SELECT AVG(nota) FROM matriculas` entrega a subconsulta.

Isso nao e necessariamente ruim em um jogo introdutorio, mas seria melhor transformar algumas dicas em camadas: primeira dica conceitual, segunda dica estrutural e terceira dica quase-sintaxe.

### Explicacoes pos-resolucao

As explicacoes sao boas, consistentes e conectam SQL a situacoes reais de analise. O padrao "o que a query faz, por que funciona, onde aparece em BI" e forte.

Oportunidades:

- Explicar melhor a ordem logica de execucao em fases com `WHERE`, `GROUP BY`, `HAVING` e `ORDER BY`.
- Nas fases 10 a 14, decompor a query em blocos para reduzir carga cognitiva.
- Na fase 13, explicar por que `DISTINCT` e usado e o que aconteceria sem ele.

### Conceitos importantes faltando

Conceitos que aparecem no glossario, mas nao possuem fase propria:

- `LIMIT`
- `IN`
- `OR`
- `MIN` e `MAX`
- `LEFT JOIN`
- `CASE WHEN`
- window functions

Conceitos recomendados para uma trilha v0.3.0 antes de qualquer conteudo avancado:

- aliases com `AS`
- `LIMIT`
- `IN`
- `DISTINCT`
- `LEFT JOIN`
- `CASE WHEN` simples
- `SUM`
- tratamento de valores ausentes, se o banco passar a incluir `NULL`

## 4. Recomendacoes de melhoria

### Melhorias urgentes

- Remover ou isolar pedagogicamente o uso de `starterSql` com a resposta completa, ou documentar que esse campo nao deve ser exibido automaticamente. Hoje o editor e limpo por `renderLevel`, mas o dado segue sensivel para manutencoes futuras.
- Inserir pelo menos uma fase de `JOIN` com apenas duas tabelas antes da fase atual de tres tabelas.
- Introduzir `DISTINCT` antes da fase de subconsulta.
- Revisar dicas que entregam a sintaxe final, especialmente nas fases 8, 12 e 13.

### Melhorias importantes

- Criar uma fase curta sobre aliases (`AS`) antes de agregacoes com nomes de colunas.
- Separar `AVG` e `ROUND`: primeiro calcular media, depois melhorar apresentacao.
- Adicionar uma fase de `AND`/`OR` antes dos `JOINs`.
- Reforcar nos guias quando a ordem das colunas e a ordenacao das linhas importam.
- Melhorar as explicacoes pos-resolucao das fases 10 a 14 com uma leitura por blocos da query.

### Melhorias opcionais

- Adicionar objetivos de aprendizagem explicitos por modulo.
- Criar revisoes curtas ao final de blocos: selecao/filtro, agregacao, relacionamentos e relatorios.
- Adicionar desafios bonus sem bloquear progresso.
- Adicionar exemplos de erro comum por fase.
- Criar uma matriz de competencias ligando fases a conceitos.

## 5. Proposta para versao v0.3.0

Plano sugerido com no maximo 5 entregas:

1. Reorganizar a trilha em modulos pedagogicos: Fundamentos, Filtros, Agregacoes, Relacionamentos e Relatorios.
2. Adicionar fases intermediarias para `AS`, `AND/OR`, `DISTINCT`, `LIMIT` e `JOIN` simples antes dos desafios combinados.
3. Reescrever dicas em tres niveis progressivos: conceito, estrutura e sintaxe orientada.
4. Reforcar explicacoes pos-resolucao das fases intermediarias e finais com decomposicao da query por blocos.
5. Criar uma matriz de aprendizagem no README ou em `docs/`, indicando conceito, pre-requisito, habilidade praticada e criterio de sucesso por fase.

## Conclusao

A trilha atual e solida para um projeto de portfolio e cumpre bem o papel de introduzir SQL em contexto analitico. O maior ganho pedagogico para a v0.3.0 nao esta em adicionar conteudo avancado, mas em suavizar a transicao entre consultas simples e consultas combinadas. Com pequenas fases intermediarias e dicas em camadas, o SQL Quest pode ficar mais didatico sem perder o formato de jogo curto e demonstravel.
