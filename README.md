Projeto - Serviço de Streaming
Este é um projeto de um website de streaming que permite visualizar, buscar e explorar filmes. A aplicação foi desenvolvida para listar filmes a partir de uma API externa, exibir detalhes do "Filme do Dia", buscar por filmes e também realizar a paginação de forma dinâmica. A aplicação conta com as seguintes funcionalidades principais:

Funcionalidades
Visualização de Filmes: Assim que o website for carregado, uma lista de filmes será exibida com base nos dados da API.
Paginação de Filmes: O site permite navegar entre páginas de filmes, mostrando um conjunto de 5 filmes por vez.
Busca de Filmes: O usuário pode buscar por filmes específicos através de um campo de busca, retornando os resultados filtrados.
Filme do Dia: Um filme especial é destacado na página inicial como o "Filme do Dia", exibindo detalhes extras e um link para seu trailer.
Modal de Detalhes do Filme: Ao clicar em um filme, um modal é aberto exibindo mais detalhes sobre o filme selecionado.
Endpoints Utilizados
A aplicação utiliza a API de filmes da Cubos Academy para obter dados sobre filmes. Abaixo estão os principais endpoints:

Listagem de Filmes
Endpoint: /3/discover/movie?language=pt-BR&include_adult=false
Método: GET
Descrição: Este endpoint retorna a lista de filmes para a página inicial.
Busca de Filmes
Endpoint: /3/search/movie?language=pt-BR&include_adult=false&query={query}
Método: GET
Descrição: Retorna os filmes que correspondem ao termo buscado pelo usuário.
Filme do Dia
Endpoint: /3/movie/{movie_id}?language=pt-BR
Método: GET
Descrição: Retorna os detalhes completos de um filme específico para a seção "Filme do Dia".
Trailer do Filme
Endpoint: /3/movie/{movie_id}/videos
Método: GET
Descrição: Retorna o link para o trailer oficial do filme, exibido na seção "Filme do Dia".
Detalhes do Filme (Modal)
Endpoint: /3/movie/{movie_id}?language=pt-BR
Método: GET
Descrição: Retorna os detalhes de um filme específico, exibidos no modal quando o usuário clica em um filme.
Estrutura do Projeto
A aplicação foi desenvolvida com HTML, CSS e JavaScript puro (DOM), e está organizada da seguinte forma:

bash
Copiar código
|-- index.html
|-- styles.css
|-- script.js
index.html: Estrutura principal da página com os elementos básicos para visualização e interação.
styles.css: Estilizações da página, incluindo temas claro e escuro.
script.js: Lógica do website para fazer requisições à API, manipular o DOM e implementar a paginação, busca e o modal.
Funcionalidades Detalhadas
Visualização de Filmes
Os filmes são exibidos na página inicial usando o elemento <div class="movies">. Para cada filme retornado pela API, um cartão é gerado dinamicamente com o título, imagem, e avaliação do filme.

Paginação
O website implementa um sistema de paginação com botões "Anterior" e "Próximo". Apenas 5 filmes são exibidos por página e, ao clicar nos botões de navegação, a lista de filmes é atualizada de acordo com a página.

Busca de Filmes
O campo de busca permite ao usuário procurar filmes por nome. Ao pressionar "Enter", o valor digitado é enviado à API, e os resultados são exibidos na página inicial. Se o campo de busca estiver vazio, a listagem inicial de filmes é recarregada.

Filme do Dia
O "Filme do Dia" é destacado no topo da página, exibindo uma imagem de fundo, título, avaliação, gêneros, data de lançamento, descrição e um link para o trailer no YouTube.

Modal de Detalhes do Filme
Ao clicar em um filme, um modal é aberto com mais informações, como a descrição, gêneros e avaliação. O modal pode ser fechado clicando em qualquer área fora dele ou no botão de fechar.

Como Rodar o Projeto
Clone o repositório:

bash
Copiar código
git clone https://github.com/thauanb11/CubosFlix.git
Navegue até o diretório do projeto:

bash
Copiar código
cd CubosFlix
Abra o arquivo index.html diretamente no seu navegador.

Tecnologias Utilizadas
HTML: Para a estruturação do conteúdo.
CSS: Para a estilização e layout da página, incluindo a alternância de temas.
JavaScript: Para manipulação da DOM, requisições à API, e interações do usuário (paginação, busca, modal).
API
A API usada para buscar os dados dos filmes está disponível em:

API TMDB Proxy da Cubos Academy
Melhorias Futuras
Implementação de um sistema de favoritos para os filmes.
Adição de filtros por gênero e avaliação.
Melhorias na responsividade para dispositivos móveis.
Deploy
Você pode acessar a versão online do projeto através do link abaixo:
cubos-flix-bay.vercel.app
