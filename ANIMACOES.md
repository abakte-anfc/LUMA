# Animações — Lume Coworking

> Especificação para implementar animações no site. Este arquivo orienta o desenvolvimento; ele não executa animações sozinho.
> Complementa o arquivo PROMPT-LUME-COWORKING.md.

## Objetivo

Criar uma navegação agradável e uma apresentação elegante dos ambientes, com movimentos discretos que ajudem a perceber hierarquia, interação e mudança de estado. Fotografias e informações devem continuar sendo o foco.

## Prompt de implementação

Implemente as animações descritas neste documento na landing page do Lume Coworking, preservando a identidade visual, a legibilidade e o desempenho. Adapte a implementação à tecnologia já utilizada no projeto. Não adicione uma biblioteca pesada somente para efeitos simples. Priorize CSS e recursos nativos do navegador.

Todo conteúdo e todo contato devem permanecer acessíveis mesmo quando uma animação não executar. Não condicione a exibição da página inteira ao carregamento de JavaScript.

## Linguagem de movimento

- Movimento curto, suave e previsível.
- Animar principalmente opacidade e transformações.
- Não animar largura, altura ou posicionamento de grandes blocos durante a rolagem.
- Não usar parallax, rolagem controlada artificialmente, cursor personalizado ou letras surgindo uma por vez.
- Não usar botões pulsando continuamente, flashes ou contadores fictícios.
- Evitar animações repetidas a cada passagem pela mesma seção.

## Parâmetros de referência

| Uso | Duração | Deslocamento máximo | Curva sugerida |
| --- | --- | --- | --- |
| Botões e links | 150–200 ms | 2 px | ease-out |
| Menus e perguntas frequentes | 180–240 ms | 8 px | ease-out |
| Entrada de blocos | 350–450 ms | 16 px | cubic-bezier(0.22, 1, 0.36, 1) |
| Galeria ampliada | 180–250 ms | Escala de 0,98 para 1 | ease-out |

Esses valores são propostas iniciais e podem ser ajustados após observar a página em um celular real.

## 1. Abertura do site

- Mostrar a fotografia principal imediatamente; não atrasar seu carregamento para executar um efeito.
- Manter o título e os botões visíveis desde a primeira renderização.
- Se houver movimento inicial, usar apenas uma pequena translação de até 8 px, por até 350 ms, sem esconder o conteúdo.
- Não usar tela de carregamento, vídeo automático ou zoom contínuo na fotografia.
- Não animar palavras individualmente.

## 2. Entrada das seções

Aplicar entrada discreta aos blocos de Espaços, Estrutura, Como funciona e Localização:

- Opacidade de 0 para 1 e deslocamento vertical de 16 px para 0.
- Executar uma única vez quando o bloco estiver entrando na área visível.
- Usar IntersectionObserver caso o projeto não tenha um mecanismo equivalente.
- Manter o conteúdo visível por padrão. Ativar o estado inicial oculto somente após o mecanismo de observação estar configurado, apenas para elementos ainda fora da tela.
- Se JavaScript falhar ou não estiver disponível, mostrar tudo normalmente.
- Nunca ocultar um elemento que já recebeu foco pelo teclado.

Para grupos de cartões, usar intervalo de 60 ms entre elementos, limitado a 180 ms de atraso total. No celular, evitar sequências longas: revelar cada cartão quando ele entrar na tela.

## 3. Fotografias e cartões de espaços

Em dispositivos com ponteiro preciso e suporte a hover:

- Permitir zoom sutil de 1 para 1,025 na imagem, por aproximadamente 300 ms.
- Conter o recorte na área da fotografia para não deslocar o layout.
- Não esconder informações ou botões até que o visitante passe o mouse.

No celular, manter imagens estáticas. Aplicar indicação de foco visível ao link ou botão do cartão. Não criar controles interativos aninhados.

## 4. Botões e links

- Hover: pequena mudança de cor e, opcionalmente, deslocamento vertical de -2 px.
- Pressionamento: escala de 0,98, sem alterar a área reservada no layout.
- Teclado: contorno de foco nítido, independente da animação.
- Não atrasar a abertura do WhatsApp ou a navegação para esperar o fim de um efeito.
- Manter contraste suficiente em todos os estados.

O botão de WhatsApp deve permanecer estável e não cobrir textos, rodapé ou outros controles. Respeitar as áreas seguras do celular.

## 5. Cabeçalho e navegação entre seções

- Caso o cabeçalho seja fixo, manter sua altura constante.
- Após sair da abertura, permitir uma transição curta de fundo ou borda para separar o cabeçalho do conteúdo.
- Não encolher a logo nem deslocar a página durante a rolagem.
- Usar âncoras reais no menu e compensar a altura do cabeçalho com scroll-margin-top.
- Permitir rolagem suave somente se o visitante não tiver solicitado movimento reduzido.

## 6. Menu no celular

- Abertura com opacidade e deslocamento de até 8 px, em cerca de 200 ms.
- Botão com nome acessível e estado aria-expanded atualizado.
- Permitir fechar pelo botão, pela seleção de um destino e pela tecla Escape.
- Se o menu for modal, mover o foco para dentro dele, restringir o foco enquanto estiver aberto e devolvê-lo ao botão ao fechar.
- Se for apenas um painel expansível no fluxo, manter a navegação natural do teclado, sem prender o foco.
- Sincronizar visibilidade e interatividade: controles fechados não podem receber foco.

## 7. Galeria ampliada

- Abrir imagens mediante clique ou toque; nunca automaticamente.
- Mostrar sobreposição com transição de opacidade de até 200 ms.
- Permitir entrada da imagem com escala de 0,98 para 1, sem ultrapassar o tamanho final.
- Disponibilizar botão de fechar visível, Escape e navegação por teclado.
- Tratar o visualizador como diálogo acessível, com foco gerenciado e retorno ao item que o abriu.
- Se houver várias imagens, oferecer botões anterior e próxima com rótulos claros. Gestos de arraste podem complementar esses botões.
- Não usar reprodução automática.

## 8. Perguntas frequentes

- Priorizar elementos nativos details e summary quando adequados.
- Usar rotação discreta do ícone indicador durante a abertura, por até 180 ms.
- Não depender de uma animação de altura para disponibilizar a resposta.
- Manter pergunta, estado aberto/fechado e resposta acessíveis por teclado e leitor de tela.

## 9. Movimento reduzido e acessibilidade

Respeitar prefers-reduced-motion: reduce:

- Remover deslocamentos, escalas, zoom e sequências de entrada.
- Exibir imediatamente todos os conteúdos.
- Desativar a rolagem suave.
- Abrir e fechar menus, galeria e perguntas sem transições de movimento.
- Preservar contraste, contornos de foco e indicações de estado.

A implementação deve reagir se essa preferência mudar durante a sessão. Nenhuma funcionalidade pode depender da ocorrência de animationend ou transitionend.

## 10. Desempenho

- Reservar dimensões ou proporções para imagens para evitar saltos de layout.
- Otimizar arquivos de imagem e carregar a foto principal com prioridade.
- Adiar imagens abaixo da primeira tela e carregar a versão ampliada da galeria quando necessária.
- Evitar loops JavaScript ligados à rolagem para efeitos decorativos.
- Não aplicar will-change permanentemente a todos os elementos.
- Remover observadores de elementos após a animação única e limpar listeners quando necessário.
- Não animar mapas incorporados nem aplicar filtros pesados sobre grandes fotografias.

## Ordem de implementação

1. Concluir a página estática, responsiva e funcional.
2. Implementar estados de botão, foco e navegação.
3. Implementar menu e galeria acessíveis.
4. Adicionar entradas sutis às seções.
5. Verificar movimento reduzido, celular e ausência de JavaScript.

## Critérios de aceite

- [ ] A fotografia e o conteúdo da abertura aparecem sem espera artificial.
- [ ] As animações de entrada ocorrem uma única vez.
- [ ] Não há conteúdo permanentemente invisível se JavaScript falhar.
- [ ] Botões funcionam imediatamente por toque e teclado.
- [ ] Não há recursos acessíveis somente por hover.
- [ ] Menu e galeria permitem fechamento e retorno de foco corretos.
- [ ] Movimento reduzido elimina movimentos decorativos.
- [ ] Nenhuma animação gera rolagem horizontal ou saltos de layout.
- [ ] O botão de WhatsApp não cobre conteúdo ou outros controles.
- [ ] A página continua fluida em celular, sem sequências demoradas ou efeitos contínuos.

## Entrega esperada

Aplicar esses movimentos aos componentes existentes e informar quais foram implementados. Manter eventuais limitações explícitas. O resultado deve valorizar os ambientes reais do Lume e facilitar o contato, sem transformar a navegação em uma apresentação de efeitos.
