# SQL Quest

SQL Quest e um jogo educacional interativo para praticar SQL no navegador. O projeto roda como site estatico, usa sql.js com banco em memoria e salva o progresso localmente no navegador.

## Objetivo educacional

O jogo ajuda estudantes a aprender SQL resolvendo fases curtas, com contexto narrativo, guia da licao, dicas, execucao de consultas e validacao automatica da resposta.

## Tecnologias utilizadas

- HTML
- CSS
- JavaScript
- sql.js
- localStorage

## Funcionalidades atuais

- 14 fases de SQL
- Banco de dados em memoria criado no navegador
- Editor simples para escrever consultas
- Botao para executar consulta
- Botao para verificar solucao
- Comparacao automatica entre resultado do jogador e resposta esperada
- Dicas por fase
- Guia da licao
- Visualizacao do esquema do banco
- Progresso salvo com localStorage
- XP e fases concluidas
- Botao para reiniciar progresso
- Compatibilidade com GitHub Pages

## Conceitos SQL abordados

- SELECT
- FROM
- WHERE
- Operadores de comparacao
- ORDER BY
- COUNT
- AVG
- ROUND
- GROUP BY
- JOIN
- AND
- HAVING
- DISTINCT
- Subconsultas

## Como executar localmente

Abra o arquivo `index.html` diretamente no navegador.

Opcionalmente, execute um servidor estatico local:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Roadmap inicial

- Melhorar acessibilidade do editor e das mensagens de feedback
- Adicionar testes manuais documentados para cada fase
- Criar novas fases com dificuldade progressiva
- Adicionar conquistas visuais por modulo concluido
- Permitir exportar ou importar progresso
- Publicar uma demo pelo GitHub Pages
