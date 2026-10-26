# Gestor de Despesas Pessoais

Aplicação web para registar e acompanhar receitas e despesas pessoais. Apresenta o saldo atual, mantém um histórico de transações, permite importar e exportar dados através de ficheiros Excel e mostra a evolução mensal num gráfico.

## Funcionalidades

- **Registo de transações:** adiciona uma descrição, um valor e o tipo de transação (receita ou despesa).
- **Resumo financeiro:** calcula e apresenta o total de receitas, o total de despesas e o saldo atual.
- **Histórico:** consulta as transações registadas, incluindo descrição, valor, tipo e data.
- **Filtros:** mostra todas as transações, apenas receitas ou apenas despesas.
- **Gráfico mensal:** visualiza o total líquido por mês; receitas aumentam o total e despesas diminuem-no.
- **Importação Excel:** importa transações a partir de ficheiros `.xlsx` ou `.xls`.
- **Exportação Excel:** descarrega o histórico para um ficheiro `myExpense.xlsx`.
- **Eliminação:** permite apagar uma transação individual ou limpar todo o histórico, mediante confirmação.
- **Persistência local:** guarda os dados no `localStorage` do navegador.
- **Mensagens de feedback:** apresenta notificações sobre operações efetuadas.
- **Interface com separadores:** separa o formulário de registo da área de importação e o histórico da visualização gráfica.

## Tecnologias

- **HTML5** — estrutura da aplicação.
- **CSS3** — layout e estilos.
- **JavaScript** — lógica, validação e atualização dinâmica da interface.
- **Chart.js** — gráfico mensal.
- **SheetJS (XLSX)** — leitura e criação de ficheiros Excel.
- **Font Awesome** — ícones.
- **Google Fonts (Inter)** — tipografia.

As bibliotecas externas são carregadas por CDN, pelo que é necessária uma ligação à Internet para as obter quando a aplicação é aberta.

## Como executar

A aplicação é estática e não necessita de Node.js, instalação de dependências ou backend.

1. Clona ou descarrega este repositório.
2. Abre o ficheiro `index.html` num navegador moderno.

Também pode ser publicada com o GitHub Pages, configurando o repositório para servir a branch e a pasta pretendidas.

## Estrutura do projeto

```text
.
├── index.html                 # Estrutura e componentes da interface
├── css/
│   ├── style.css              # Estilos principais
│   └── fedbackMessague.css    # Estilos das notificações
├── js/
│   ├── controller.js          # Modelo de dados, armazenamento e totais financeiros
│   ├── fedbackMessague.js     # Notificações de feedback
│   ├── grafico.js             # Criação e atualização do gráfico mensal
│   ├── inputFile.js           # Seleção, leitura e validação de ficheiros Excel
│   ├── list.js                # Renderização e filtragem do histórico
│   ├── script.js              # Eventos principais e integração dos componentes
│   └── tabs.js                # Comportamento dos separadores
├── LICENSE
└── README.md
```

## Importar ficheiros Excel

A importação lê a primeira folha do ficheiro e espera colunas com estes nomes:

| Coluna | Formato esperado | Descrição |
| --- | --- | --- |
| `descricao` | Texto | Descrição da transação |
| `valor` | Número | Valor da transação |
| `despesa` | Texto | `Receita` para uma receita; os restantes valores são tratados como despesa |
| `data` | Texto | Data no formato `DD/MM/AAAA` |

A aplicação valida a presença dos campos e os seus tipos básicos antes de importar. Recomenda-se confirmar os cabeçalhos e o formato das datas antes de carregar o ficheiro.

## Exportar o histórico

Seleciona o ícone de transferência na secção **Histórico** para descarregar as transações registadas no ficheiro `myExpense.xlsx`. A exportação inclui as colunas `descricao`, `valor`, `despesa` e `data`.

## Armazenamento e privacidade

As transações são guardadas no armazenamento local do navegador, na chave `dataExpense`. Não existe uma base de dados remota nem sincronização automática entre navegadores ou dispositivos.

Os dados permanecem associados ao navegador e ao perfil utilizados. Limpar os dados do site ou o armazenamento do navegador pode apagar o histórico; exporta regularmente uma cópia se precisares de a preservar.

## Limitações

- A aplicação não tem backend nem autenticação de utilizadores.
- Os dados não são sincronizados entre dispositivos.
- As dependências externas são carregadas através de CDN.
- A importação depende dos cabeçalhos e dos formatos de dados descritos acima.

## Licença

Consulta o ficheiro [LICENSE](LICENSE) para conhecer os termos de utilização.
