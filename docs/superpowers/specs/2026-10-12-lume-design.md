# Projeto do site — Lume Coworking

## Objetivo
Landing page responsiva em português para apresentar os ambientes do Lume Coworking em Feira de Santana e conduzir consultas e visitas pelo WhatsApp oficial quando fornecido. Base: PROMPT-LUME-COWORKING.md, ANIMACOES.md e as dez fotos da pasta FOTOS-LUME-COWORKING.

## Direção visual
Fundo branco quente, grafite e cinza claro, tipografia sem serifa e títulos grandes. Fotografia real ampla em composição lateral ao título, evitando texto sobre detalhes dos ambientes. Identificação tipográfica provisória Lume Coworking, sem inventar logo. Blocos de foto e texto alternados, espaçamento generoso e cantos discretos.

## Estrutura
Cabeçalho com navegação por âncoras; abertura; apresentação de estações e sala de reunião identificadas como oferta a confirmar na demonstração; estrutura com dados somente após confirmação; galeria de seis fotos ampliáveis; três passos de consulta; localização com Feira de Santana e dados adicionais somente quando fornecidos; chamada final e rodapé. Perguntas frequentes entram somente com respostas aprovadas.

## Funcionalidade
Menu compacto no celular com estado acessível e fechamento por Escape ou seleção de destino. Galeria em diálogo nativo com fechar, anterior, próxima, setas de teclado e retorno de foco. WhatsApp configurável com mensagem própria para visita, estação e reunião. Sem número oficial, a demonstração identifica a indisponibilidade e não apresenta link fictício. Nenhuma consulta confirma reserva.

## Animações
Conteúdo visível sem JavaScript. IntersectionObserver revela somente blocos fora da tela, uma vez, com translação de até 16px e duração de 400ms. Hover em fotos limitado a 1,025 em ponteiros precisos. Botões com estados de até 200ms. Menu e diálogo com transições curtas. Movimento reduzido desativa efeitos e responde a mudanças durante a sessão.

## Implementação proposta
Site estático em HTML, CSS e JavaScript nativo, na subpasta lume-coworking, sem dependências de execução. Fotos otimizadas em WebP quando o ambiente permitir, com dimensões reservadas, carregamento prioritário da abertura e lazy loading abaixo dela. Conteúdo e dados comerciais centralizados em configuração.

## Verificação
Conferir navegação, teclado, menu, galeria, foco, movimento reduzido, ausência de JavaScript e rolagem horizontal em computador e celular. Conferir recursos e referências de imagens. Registrar limites caso a infraestrutura de preview não permita validação visual.

## Pendências antes da publicação
Logo e cores oficiais; autorização e atualidade das fotos; oferta real dos espaços; capacidade; equipamentos; comodidades; condições e modalidades; WhatsApp; endereço e Maps; horários; redes oficiais; respostas frequentes. Não inventar valores, avaliações ou serviços. A entrega inicial será uma demonstração local para revisão, respeitando a necessidade expressa no material de validar dados e imagens antes da publicação.

## Alternativas consideradas
Site estático é recomendado pela rapidez e ausência de necessidade de servidor. React adicionaria infraestrutura sem benefício necessário para esta página. Um CMS só se justifica caso a equipe precise editar conteúdo frequentemente.
