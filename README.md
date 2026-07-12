# SQL Quest

**SQL Quest** é um jogo educacional interativo para praticar SQL resolvendo investigações com dados. O projeto roda inteiramente no navegador, usa SQLite em memória com sql.js e salva o progresso localmente com `localStorage`.

[Jogar no GitHub Pages](https://brunogiacomelli1979-cyber.github.io/sql-quest-platform/)  
[Repositório no GitHub](https://github.com/brunogiacomelli1979-cyber/sql-quest-platform)

## Status

Versão atual: **v0.3.4**

Estado do projeto:

- campanha NimbusPlay funcional;
- Edição Arquivo Secreto aplicada;
- textos revisados;
- README atualizado;
- projeto publicado no GitHub Pages.

## Sobre o Projeto

Na campanha atual, **NimbusPlay — SQL Investigativo**, o jogador atua como analista/investigador da **Agência NimbusData** e analisa o Arquivo NimbusPlay, uma base fictícia de uma loja de jogos.

A experiência combina narrativa investigativa, progressão bloqueada por fases, execução real de SQL e validação automática das respostas. O visual atual é a **SQL Quest: Edição Arquivo Secreto**, com dossiê investigativo, fundo escuro, papel envelhecido, sidebar como arquivo de casos e terminal SQL retrô.

A tela de investigação foi simplificada para colocar missão e terminal em primeiro plano. Os materiais de apoio, como guia da lição, ponte pedagógica, dicas, esquema do banco e apoio rápido, ficam recolhidos por padrão para reduzir ruído durante a resolução.

O projeto não possui backend, login, autenticação, API externa ou coleta de dados. Tudo acontece no navegador do usuário.

## Capturas de Tela

### Tela inicial

![Tela inicial do SQL Quest](./images/sql-quest-home.png)

### Investigação

![Tela de investigação do SQL Quest](./images/sql-quest-investigacao.png)

### Treino livre

![Modo treino livre do SQL Quest](./images/sql-quest-treino-livre.png)

### Glossário SQL

![Glossário SQL do SQL Quest](./images/sql-quest-glossario.png)

### Sobre o projeto

![Página sobre o projeto SQL Quest](./images/sql-quest-sobre.png)

## Funcionalidades

- 14 fases progressivas de SQL;
- campanha NimbusPlay com narrativa investigativa;
- progressão bloqueada por fase;
- editor SQL com aparência de terminal retrô;
- execução real de consultas no navegador;
- validação automática das respostas;
- dicas em camadas;
- guia da lição e materiais de apoio recolhidos por padrão;
- esquema do banco de dados;
- glossário SQL;
- modo treino livre;
- XP e badges locais;
- registro dos casos resolvidos;
- preservação de rascunhos;
- tela final de conclusão;
- certificado gamificado interno.

## Campanha NimbusPlay

A base fictícia NimbusPlay usa as seguintes tabelas:

- `jogadores`
- `jogos`
- `compras`
- `avaliacoes`
- `funcionarios`

Os nomes das tabelas estão sem acento porque são identificadores SQL usados no jogo.

## Conteúdos SQL Praticados

Ao longo da trilha, o jogador pratica:

- `SELECT`
- seleção de colunas
- `WHERE`
- operadores lógicos
- `ORDER BY`
- `LIMIT`
- funções agregadas
- `GROUP BY`
- `HAVING`
- `JOIN`
- `LEFT JOIN`
- subconsultas
- funções de janela
- `CASE WHEN`
- desafio final combinando conceitos

## Certificado Gamificado

Ao concluir a campanha NimbusPlay, o jogador recebe um certificado gamificado dentro do próprio SQL Quest.

Esse certificado é uma recompensa interna do jogo, criada para marcar a conclusão da trilha e reforçar a experiência educacional. Ele **não é uma certificação profissional oficial**, não possui validade institucional e não representa credencial reconhecida por terceiros.

## Tecnologias

- HTML
- CSS
- JavaScript
- sql.js
- SQLite em memória
- localStorage
- GitHub Pages

## Como Executar Localmente

Clone o repositório:

```bash
git clone https://github.com/brunogiacomelli1979-cyber/sql-quest-platform.git
cd sql-quest-platform
```

Inicie um servidor local simples:

```bash
python -m http.server 8000
```

Acesse:

```text
http://localhost:8000
```

É recomendado executar o projeto por servidor local, em vez de abrir o `index.html` diretamente, para manter o carregamento dos arquivos estáticos de forma mais próxima ao GitHub Pages.

## Estrutura

```text
sql-quest-platform/
├── index.html
├── README.md
├── css/
│   └── style.css
├── docs/
│   └── pedagogical-audit.md
├── images/
│   ├── sql-quest-home.png
│   ├── sql-quest-investigacao.png
│   ├── sql-quest-treino-livre.png
│   ├── sql-quest-glossario.png
│   └── sql-quest-sobre.png
└── js/
    ├── app.js
    ├── data.js
    ├── database.js
    ├── render.js
    ├── state.js
    └── validator.js
```

## Histórico de Versões

| Versão | Descrição |
|---|---|
| `v0.1.0` | Estrutura inicial organizada do projeto |
| `v0.2.0` | Modo portfólio, glossário, treino livre, badges e fluxo de aprendizagem |
| `v0.2.1` | Refinamento visual com tema escuro e identidade investigativa |
| `v0.3.0` | NimbusPlay restaurada como campanha principal |
| `v0.3.1` | Revisão narrativa da campanha NimbusPlay |
| `v0.3.2` | Tela final, certificado gamificado, apoio rápido, registro de casos e rascunhos |
| `v0.3.3` | SQL Quest: Edição Arquivo Secreto |
| `v0.3.4` | Revisão ortográfica e de acentuação dos textos em português |

## Roadmap

- Melhorar responsividade mobile;
- planejar novas campanhas educacionais;
- evoluir materiais de apoio pedagógico;
- revisar acessibilidade;
- preparar a versão v1.0.0.

## Autor

**Bruno Giacomelli**

Profissional em transição para Análise de Dados, Business Intelligence e Automação, com experiência em logística aeroportuária, operações, indicadores e melhoria de processos.

- GitHub: [brunogiacomelli1979-cyber](https://github.com/brunogiacomelli1979-cyber)
- Projeto: [sql-quest-platform](https://github.com/brunogiacomelli1979-cyber/sql-quest-platform)

## Licença

Este projeto é de caráter educacional e de portfólio.

