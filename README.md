<div>
<div class="sectionContent">
<table class="sectionTable" border="0" cellspacing="0" cellpadding="0">
<tbody><tr valign="top">
<td class="sectionTableSingleCell"><h1 style="MARGIN: 24pt 0cm 18pt; TEXT-INDENT: 0cm; mso-list: l0 level1 lfo1">
    Políticas de Gerenciamento de Configuração e Mudanças
</h1>
<p style="MARGIN: 24pt 0cm 18pt; TEXT-INDENT: 0cm; mso-list: l0 level1 lfo1">
    <strong><font size="4">CONCEITOS:</font></strong>
</p>
<p style="MARGIN: 24pt 0cm 18pt; TEXT-INDENT: 0cm; mso-list: l0 level1 lfo1">
    <strong><font size="3">1. Item de Configuração e Configuração Base</font></strong>
</p>
<blockquote style="MARGIN-RIGHT: 0px" dir="ltr">
    <p style="MARGIN: 24pt 0cm 18pt; TEXT-INDENT: 0cm; mso-list: l0 level1 lfo1">
        <strong>Item de Configuração (IC)</strong>
    </p>
    <p style="MARGIN: 24pt 0cm 18pt; TEXT-INDENT: 0cm; mso-list: l0 level1 lfo1">
        &nbsp;“Cada um dos elementos de informação que são criados durante o desenvolvimento de um produto de software, ou
        que para este desenvolvimento sejam necessários, que são identificados de maneira única e cuja evolução é passível
        de rastreamento” (Pressman, 1992).
    </p>
    <p style="MARGIN: 24pt 0cm 18pt; TEXT-INDENT: 0cm; mso-list: l0 level1 lfo1">
        <strong>Configurações-Base (CB)</strong>
    </p>
    <p style="MARGIN: 24pt 0cm 18pt; TEXT-INDENT: 0cm; mso-list: l0 level1 lfo1">
        Um conjunto bem definido de itens de configuração que representam um estágio do desenvolvimento no tempo.
    </p>
</blockquote>
<p style="MARGIN: 24pt 0cm 18pt; TEXT-INDENT: 0cm; mso-list: l0 level1 lfo1">
    <strong><font size="3">2.&nbsp;Identificação dos ICs</font></strong>
</p>
<blockquote style="MARGIN-RIGHT: 0px" dir="ltr">
    <p style="MARGIN: 24pt 0cm 18pt; TEXT-INDENT: 0cm; mso-list: l0 level1 lfo1">
        Os ICs que serão controlados, <strong>com exceção de códigos fonte</strong>, devem utilizar a seguinte estrutura de
        rótulo de identificação única:
    </p>
    <blockquote style="MARGIN-RIGHT: 0px" dir="ltr">
        <p style="MARGIN: 24pt 0cm 18pt; TEXT-INDENT: 0cm; mso-list: l0 level1 lfo1">
            <strong>&lt;SIGLA do projeto&gt; - &lt;NOME do artefato&gt;</strong>
        </p>
    </blockquote>
    <p style="MARGIN: 24pt 0cm 18pt; TEXT-INDENT: 0cm; mso-list: l0 level1 lfo1" dir="ltr">
        Exemplo:&nbsp; <strong>SVSA - Visão</strong>
    </p>
</blockquote>
<p style="MARGIN: 24pt 0cm 18pt; TEXT-INDENT: 0cm; mso-list: l0 level1 lfo1" dir="ltr">
    <strong><font size="3">3. Identificação de CBs</font></strong>
</p>
<blockquote style="MARGIN-RIGHT: 0px" dir="ltr">
    <p style="MARGIN: 24pt 0cm 18pt; TEXT-INDENT: 0cm; mso-list: l0 level1 lfo1" dir="ltr">
        As configurações base devem ser identificadas por um número que segue o padrão de versionamento semântico composto
        de 3 números conforme exemplo abaixo:&nbsp;
    </p>
    <blockquote style="MARGIN-RIGHT: 0px" dir="ltr">
        <p style="MARGIN: 24pt 0cm 18pt; TEXT-INDENT: 0cm; mso-list: l0 level1 lfo1">
            <strong>v-&lt;Primeiro&gt;.&lt;Segundo&gt;.</strong><strong>&lt;Terceiro&gt;</strong>
        </p>
    </blockquote>
    <p style="MARGIN: 24pt 0cm 18pt; TEXT-INDENT: 0cm; mso-list: l0 level1 lfo1" dir="ltr">
        Onde:
    </p>
    <blockquote style="MARGIN-RIGHT: 0px" dir="ltr">
        <p style="MARGIN: 24pt 0cm 18pt; TEXT-INDENT: 0cm; mso-list: l0 level1 lfo1">
            <strong>Primeiro</strong>: mudança significativa que não mantém compatibilidade com a versão anterior.
        </p>
        <p style="MARGIN: 24pt 0cm 18pt; TEXT-INDENT: 0cm; mso-list: l0 level1 lfo1">
            <b style="mso-bidi-font-weight: normal">Segundo</b>: inclusão de novas funcionalidades.
        </p>
        <p style="MARGIN: 24pt 0cm 18pt; TEXT-INDENT: 0cm; mso-list: l0 level1 lfo1">
            <b style="mso-bidi-font-weight: normal">Terceiro</b>: correção de defeitos e melhorias.
        </p>
    </blockquote>
    <p style="MARGIN: 24pt 0cm 18pt; TEXT-INDENT: 0cm; mso-list: l0 level1 lfo1" dir="ltr">
        Exemplo: <strong>v-2.8.11</strong>&nbsp;
    </p>
</blockquote>
<p style="MARGIN: 24pt 0cm 18pt; TEXT-INDENT: 0cm; mso-list: l0 level1 lfo1" dir="ltr">
    <strong><font size="4">CONTROLE DE MUDANÇAS</font></strong>
</p>
<blockquote style="MARGIN-RIGHT: 0px" dir="ltr">
    <p style="MARGIN: 24pt 0cm 18pt; TEXT-INDENT: 0cm; mso-list: l0 level1 lfo1">
        Para realizar qualquer&nbsp;mudança no projeto deve-se criar um dos tipos de branches abaixo,&nbsp;de acordo com a
        característica da mudança:
    </p>
</blockquote>
<p style="MARGIN: 24pt 0cm 18pt; TEXT-INDENT: 0cm; mso-list: l0 level1 lfo1">
    <font size="3"><strong>1. Workflow baseado em tronco</strong></font>
</p>
<blockquote style="MARGIN-RIGHT: 0px" dir="ltr">
    <p style="MARGIN: 24pt 0cm 18pt; TEXT-INDENT: 0cm; mso-list: l0 level1 lfo1">
        Um workflow baseado em tronco é uma estratégia de desenvolvimento de software&nbsp;onde os desenvolvedores integram
        pequenas e frequentes alterações diretamente&nbsp;em um único ramo "tronco" ou "principal". Essa abordagem
        simplifica o desenvolvimento,&nbsp;reduzindo conflitos de mesclagem e mantendo a base de código sempre estável
        e&nbsp;pronta para implantação, sendo um pilar para práticas modernas&nbsp;como Integração Contínua (CI) e Entrega
        Contínua (CD).
    </p>
    <p style="MARGIN: 24pt 0cm 18pt; TEXT-INDENT: 0cm; mso-list: l0 level1 lfo1">
</blockquote>
<p style="MARGIN: 24pt 0cm 18pt; TEXT-INDENT: 0cm; mso-list: l0 level1 lfo1">
    <strong><font size="3">2. Tipos de Branches</font></strong>
</p>
<ul>
    <li>
        <b>Master:</b> Branch principal, utilizada em produção, sendo que nela são feitas as tags de versão.
    </li>
    <li>
        <b>Develop:</b> Branch de desenvolvimento, onde são feitas as junções de features prontas. (a partir da Master)
    </li>
    <li>
        <b>Release:</b> Branch de publicação, onde são feitas as correções finais antes de subir para produção. (a partir
        da Master)
    </li>
    <li>
        <b>Feature:</b> Branch para o desenvolvimento de novas funcionalidades ou melhorias em funcionalidades já
        existentes. (a partir da Develop)
    </li>
    <li>
        <b>Hotfix:</b> Branch para correções de bugs, defeitos que impactam a utilização do sistema. (a partir da
        Develop)&nbsp;
    </li>
</ul>
<p style="MARGIN: 24pt 0cm 18pt; TEXT-INDENT: 0cm; mso-list: l0 level1 lfo1">
    <strong>3.&nbsp;Nomeação dos branches</strong>
</p>
<p style="MARGIN: 24pt 0cm 18pt; TEXT-INDENT: 0cm; mso-list: l0 level1 lfo1">
    A nomeação dos branches devem&nbsp;o formato abaixo:&nbsp; <strong>&lt;numero do issue no git&gt;</strong> -
    <strong>&lt;tipo de branch&gt;</strong>
</p>
<p style="MARGIN: 24pt 0cm 18pt; TEXT-INDENT: 0cm; mso-list: l0 level1 lfo1">
    Exemplo: <strong>156-feature-descrição resumida</strong>
</p>
<p style="MARGIN: 24pt 0cm 18pt; TEXT-INDENT: 0cm; mso-list: l0 level1 lfo1">
    <strong>IMPORTANTE:</strong> <em>O branch deve ser criado a partir do issue na ferramenta de MCP (Project do GitHub),
    isso gera o no do branch automaticamente.<br>
    </em><br>
</p></td>
</tr>
</tbody></table>
</div>
