# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Empresas de aproximadamente 5 a 50 pessoas que já vendem e já têm operação rodando,
cuja estrutura digital parou de acompanhar o crescimento do negócio. Startups,
agências, e-commerce e empresas tradicionais em digitalização compartilham esse
mesmo estágio, e é o estágio que define o cliente, não o setor.

Sinais operacionais do cliente: o site foi feito para uma versão menor da empresa;
trabalho crítico mora em planilha e mensageiro; as ferramentas não se comunicam
entre si; uma pessoa virou a ponte manual entre dois sistemas; ninguém é dono da
camada digital internamente; ainda não se justifica um time de tecnologia próprio.

Quem decide costuma ser o fundador ou o responsável por operações, e em geral essa
pessoa é o próprio gargalo. O problema que ela sente não é "preciso de um site
novo", é "estamos crescendo e está ficando mais difícil".

Fora do perfil, e deliberadamente: empresas pré-receita buscando MVP barato, quem
quer apenas um site barato, e organizações com processo formal de compras.

## Product Purpose

A Clov projeta e constrói a camada digital de empresas em crescimento: site,
integrações, automação e a estrutura que conecta tudo isso. O objetivo declarado
pelo fundador é que a empresa se torne, ao longo do tempo, uma empresa de
tecnologia especializada em construir e proteger sistemas digitais.

Direção estratégica de longo prazo: Creative Technology → Digital Systems →
Cybersecurity.

Sucesso para o cliente é a operação passar a funcionar sem depender de trabalho
manual e sem depender de uma pessoa específica para ligar dois sistemas.

## Positioning

Posicionamento confirmado nesta sessão: **"Construímos os sistemas digitais por
trás de empresas que estão crescendo."**

Categoria: digital systems studio. A escolha é deliberada contra "agência", porque
agência descreve a camada que o cliente vê, e contra "software house", porque essa
descreve código sem a camada de negócio e de design.

O mecanismo que um concorrente vizinho não copia honestamente: design, engenharia,
automação e segurança dentro do mesmo time pequeno, com a pessoa que constrói sendo
a mesma que responde por como o sistema se comporta depois. Agências param no CMS,
software houses entregam o que foi especificado, agências de automação entregam
fluxos sem arquitetura nem dono, e empresas de segurança entregam o laudo e saem.

Escala pequena é característica de produto, não limitação a esconder: contato
direto com quem constrói, sem camada de atendimento no meio.

## Operating Context

O cliente chega com uma operação existente que precisa evoluir, não com uma folha
em branco. O trabalho quase sempre envolve sistemas e ferramentas que já estão em
uso e não podem parar.

Método de trabalho, confirmado pelo fundador como compromisso real e não como
aspiração:

1. Diagnóstico antes de proposta: identificar o que trava o negócio hoje.
2. Escopo fechado: prazo, preço e entregas definidos antes da primeira linha de código.
3. Entrega navegável toda semana, com ajuste de rota durante o projeto.
4. Encerramento com documentação, acessos e 60 dias de suporte após a entrega.

## Capabilities and Constraints

Capacidades técnicas confirmadas do fundador: desenvolvimento web, WordPress,
Shopify, React, Next.js, JavaScript/TypeScript, APIs, Node.js, Python, automações,
n8n, Make, integrações, SEO, analytics e aplicação de IA.

Segurança, hoje: a Clov consegue entregar escopo básico e comprovável, a saber
revisão de segurança do que constrói, higiene de dependências e revisão de
autenticação e de APIs. A Clov **não** executa hoje pentest completo com
metodologia formal e relatório, e nenhuma página pode afirmar que executa.
Web security, API security, pentest e AI security são destino declarado, não
oferta atual.

**Segurança está deliberadamente fora do site nesta fase**, por decisão do
fundador. Sem página `/security`, sem seção de filosofia de segurança, sem
segurança na lista de capacidades e sem passo de segurança no método. A direção
estratégica de longo prazo permanece registrada acima, mas não deve ser
reintroduzida na interface sem pedido explícito. As capacidades comunicadas hoje
são três: o que o cliente vê, o que faz a operação rodar, e o que automatiza e
decide.

Site bilíngue português e inglês desde a primeira versão, com os dois idiomas
publicados. Isso é restrição estrutural: afeta rotas, copy, metadados e SEO.

Aberto e não decidido, a ser registrado quando houver resposta: modelo comercial
(projeto, retainer ou diagnóstico pago), faixa de preço, e se e quando a vertical
de segurança ganha subdomínio próprio.

## Brand Commitments

Nome: Clov. Domínio: clov.com.br.

Voz: inteligente, técnica, precisa, ambiciosa e humana, com confiança sem exagero.
A sensação alvo é "essas pessoas sabem construir coisas".

Vocabulário proibido, definido pelo fundador e válido para toda copy futura:
"soluções inovadoras", "transformação digital", "potencialize seu negócio",
"próximo nível", "tecnologia de ponta", "empoderamos empresas", e qualquer
construção genérica de agência. Prefere-se frase concreta, observação específica e
tensão real a adjetivo empilhado.

A empresa não deve se apresentar como grande, nem como empresa de cybersecurity
estabelecida. Ambição sim, claim não comprovável não.

## Evidence on Hand

Clientes reais, com trabalho entregue, sem contrato ativo no momento:

- Platty, projeto FinalForms (finalforms.com)
- IH Roma, Accademia Britannica International House (ihroma.it)
- Dazze Móveis, e-commerce (dazzemoveis.com.br)

Capturas dos três sites estão em `public/projects/`. Os três depoimentos hoje em
`components/home/reviews.tsx` vieram de retorno real desses clientes. Falta coletar
nome e cargo da pessoa que assina cada um; até lá a atribuição fica incompleta.

Ausências que nenhum trabalho futuro pode preencher com invenção: a Clov não tem
certificação de segurança, não tem research publicada, não tem laboratório, não tem
relatório de pentest, não tem cliente ativo hoje e não tem métrica de resultado
auditável.

Os números "40+ projetos entregues", "12 dias de média até o go-live" e "98% de
retenção" estiveram publicados no site e **não são verdadeiros**. Foram removidos e
não podem voltar em nenhuma forma.

Números hoje publicados na seção `#numeros`, atribuídos explicitamente ao fundador
e não à empresa: mais de 5 anos desenvolvendo e posicionando produtos digitais, e
mais de 200 projetos desenvolvidos. Foram afirmados pelo fundador e não têm como
ser verificados de fora; a atribuição ao fundador é o que os mantém honestos, já
que a Clov como empresa não os realizou.

A contagem de linhas de código na mesma seção parte de uma base fixa em
`components/home/numeros.tsx` e incrementa alguns dígitos por minuto enquanto a
página está aberta. **O incremento é decorativo, não é telemetria.** A base precisa
ser um número que o fundador assine; enquanto for o valor de exemplo, a seção está
publicada com um dado que ele ainda não confirmou.

## Product Principles

1. Prova antes de claim. Nenhum número, certificação, cliente ou resultado entra em
   página sem origem verificável. A ausência é declarada, nunca disfarçada.
2. O problema do cliente é a estrutura, não a aparência. Toda página deve descrever
   a situação operacional antes de listar o que a Clov sabe fazer.
3. Pequeno por escolha. A escala atual é vendida como característica da experiência,
   com contato direto e decisão rápida, nunca como desculpa.
4. Segurança é propriedade de como se constrói, não produto a vender, até existir
   evidência publicada que sustente o contrário. Nesta fase ela nem aparece na
   interface.
5. Construir para evoluir. O que a Clov entrega precisa continuar servindo quando a
   empresa do cliente mudar de tamanho.

## Accessibility & Inclusion

Alvo WCAG AA. O site é bilíngue, portanto o atributo de idioma precisa acompanhar o
conteúdo servido em cada rota, e não ficar fixo. O estado atual do repositório
declara `lang="en"` servindo conteúdo em português, o que quebra leitor de tela e
precisa ser corrigido na primeira alteração.
