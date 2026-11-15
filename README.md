Lopes Auto

Site de uma locadora de carros feito apenas com HTML, CSS e JavaScript puro, sem frameworks e sem servidor. O cliente pode se cadastrar, entrar na conta, escolher um carro, reservar, acompanhar e cancelar suas reservas. Todos os dados ficam salvos no navegador, usando o localStorage.

O projeto foi desenvolvido como trabalho final de disciplina e usa uma frota e categorias do mercado brasileiro.

Funcionalidades

Catálogo de carros

12 carros em 6 categorias: Econômico, Compacto, Sedan, SUV, Utilitário e Premium
Filtro por categoria e por preço máximo da diária
Cada carro mostra foto, câmbio, número de lugares e valor da diária

Conta do cliente

Cadastro com nome, CPF, e-mail, celular e senha
Máscaras automáticas: CPF no formato 000.000.000-00 e celular no formato (00) 00000-0000
Validações com mensagens de erro: campos obrigatórios, CPF e celular completos, e-mail válido, senha de 6 a 30 caracteres, confirmação de senha e bloqueio de CPF ou e-mail repetidos
Login e logout, com um menu na conta ("Olá, nome") que leva a "Minhas reservas" e "Sair"

Reservas

Formulário com carro, filial de retirada, filial de devolução, datas e extras (com quantidade)
Resumo com cálculo do total em tempo real
Validação das datas: a retirada não pode ser no passado e a devolução precisa ser depois da retirada
Só clientes logados podem reservar
Página "Minhas reservas" com o histórico do cliente, onde é possível cancelar uma reserva e apagar as que já foram canceladas

Outras páginas

Página inicial com busca rápida, categorias, carros em destaque, passo a passo, benefícios e perguntas frequentes
Página de contato com as filiais e um formulário de mensagem
Como o valor é calculado
total = número de diárias x (diária do carro + extras por dia)

O número de diárias é a diferença entre a data de devolução e a de retirada. Os extras são escolhidos por quantidade, por exemplo duas cadeirinhas de criança.

Tecnologias
HTML5
CSS3 (variáveis, flexbox e grid, layout responsivo)
JavaScript (sem bibliotecas)
localStorage para guardar os dados
Como executar

Não é preciso instalar nada. Baixe ou clone o repositório e abra o site por um servidor local. Isso é importante porque alguns navegadores (como Firefox e Safari) não compartilham o localStorage entre arquivos abertos com duplo clique, e o login pode não encontrar a conta criada.

Opção 1: VS Code

Instale a extensão Live Server.
Clique com o botão direito em index.html.
Escolha Open with Live Server.

Opção 2: Python

bash
cd locadora
python -m http.server 8000

Depois, acesse http://localhost:8000 no navegador.

Use sempre o mesmo navegador durante os testes, pois os dados ficam salvos nele.

Estrutura do projeto
locadora/
├── index.html
├── frota.html
├── reserva.html
├── minhas-reservas.html
├── contato.html
├── cadastro.html
├── login.html
├── css/
│   └── estilo.css              estilos compartilhados (cores em variáveis no topo)
├── js/
│   ├── carros.js               dados: carros, categorias, filiais e extras
│   ├── usuarios.js             usuários, sessão e menu da conta (todas as páginas)
│   ├── mascaras.js             máscaras de CPF e celular
│   ├── index.js                categorias, destaques e busca rápida da home
│   ├── frota.js                cartões e filtros do catálogo
│   ├── cadastro.js             validação e cadastro
│   ├── login.js                validação e login
│   ├── reserva.js              formulário, cálculo e salvamento da reserva
│   ├── minhas-reservas.js      listagem, cancelamento e exclusão
│   └── contato.js              filiais e formulário de mensagem
└── img/                        fotos dos carros (.webp)
Como os dados são salvos

Tudo fica no localStorage do navegador, em quatro chaves:

Chave	Conteúdo
usuarios	Lista de clientes cadastrados (CPF, nome, e-mail, celular e senha)
usuarioLogado	Dados da sessão atual (CPF, nome e e-mail, sem a senha)
reservas	Lista de reservas, cada uma ligada ao CPF do cliente, com status Reservada ou Cancelada
mensagens	Mensagens enviadas pelo formulário de contato

Para ver ou limpar os dados, abra as ferramentas do navegador (F12), vá em Application e depois em Local Storage.

Ligação com o modelo de banco de dados

Os dados do carros.js seguem as entidades do modelo de banco de dados do projeto, então os dois trabalhos descrevem o mesmo sistema:

No site	Entidade no banco
Usuário cadastrado	Cliente
Carro	Veículo
Categoria	Categoria
Filial	Filial
Reserva	Locação
Extra e sua quantidade na reserva	Extra e LocaçãoExtra
Limitações
É um projeto apenas de front-end: não existe servidor nem banco de dados real.
As senhas são salvas em texto simples no localStorage. Isso serve para estudo, mas um sistema real guardaria a senha criptografada (hash) em um servidor.
Os dados existem só no navegador em que foram criados.
Não há pagamento online: o site calcula o valor da reserva, mas não cobra.
Preços, endereços, telefones e respostas do FAQ são dados de exemplo.
Possíveis melhorias
Back-end com banco de dados real e senhas com hash
Verificação dos dígitos do CPF
Verificação de disponibilidade do carro nas datas escolhidas
Painel administrativo para cadastrar carros e acompanhar as reservas
Créditos das imagens

As fotos dos carros foram reunidas para uso em um trabalho acadêmico. Se for publicar o projeto de forma pública ou comercial, substitua as imagens por fotos que você tenha o direito de usar.

Autor

Desenvolvido por [Fernando Lopes].
