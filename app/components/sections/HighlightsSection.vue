<script setup lang="ts">
/** Recursos que valem para o app inteiro: o editor, o celular e a personalização. */
</script>

<template>
  <section id="recursos" class="section highlights" aria-labelledby="recursos-title">
    <div class="container">
      <h2 id="recursos-title" class="section-title">Feito para ser usado todo dia</h2>
      <p class="section-lead">Os detalhes que tiram o atrito do caminho: escrever, continuar no celular e deixar tudo com a sua cara.</p>

      <div class="rows">
        <article class="row">
          <div class="visual">
            <div class="crop">
              <ThemedShot name="editor" sizes="(min-width: 1240px) 640px, (min-width: 900px) 52vw, 94vw" />
            </div>
          </div>
          <div class="text">
            <h3>Formatação sem símbolos na tela</h3>
            <p>
              Selecione um trecho e escolha: negrito, marca-texto, cor, título, lista ou checklist. Você vê o texto já formatado, nunca os
              asteriscos, e o arquivo continua sendo Markdown comum.
            </p>
            <ul>
              <li>Cole código e ele vira um bloco colorido, com a linguagem reconhecida.</li>
              <li>Cole um print e ele vira imagem dentro da nota.</li>
              <li>Listas numeradas se renumeram sozinhas.</li>
              <li><kbd>Ctrl</kbd> + <kbd>D</kbd> seleciona a próxima ocorrência para editar várias de uma vez.</li>
            </ul>
          </div>
        </article>

        <article class="row flip">
          <div class="visual devices">
            <PhoneFrame class="fold">
              <ThemedShot name="fold" sizes="(min-width: 1240px) 400px, (min-width: 900px) 34vw, 60vw" />
            </PhoneFrame>
            <PhoneFrame class="phone">
              <ThemedShot name="phoneNotes" sizes="(min-width: 900px) 200px, 34vw" />
            </PhoneFrame>
          </div>
          <div class="text">
            <h3>O mesmo app no computador e no celular</h3>
            <p>
              A versão Android tem a mesma interface do Windows, reorganizada para cada tela: uma coisa por vez no celular, lista e nota lado
              a lado na tela maior de um dobrável ou tablet.
            </p>
            <ul>
              <li>Segure o dedo onde, no computador, você usaria o botão direito.</li>
              <li>No mapa mental, pinça para o zoom e uma alça para ligar as notas.</li>
              <li>Sincronize a pasta com o serviço que você já usa e tenha as mesmas notas nos dois aparelhos.</li>
            </ul>
          </div>
        </article>

        <article class="row">
          <div class="visual">
            <ThemeCompare />
          </div>
          <div class="text">
            <h3>Claro, escuro e do seu jeito</h3>
            <p>
              Arraste a divisória para comparar os dois temas. O tema segue o sistema ou fica do jeito que você escolher, e cada workspace guarda
              as próprias configurações.
            </p>
            <ul>
              <li><kbd>F1</kbd> abre o tutorial do módulo ao lado, sem tirar você do que está fazendo.</li>
              <li>Atalhos para quase tudo, como <kbd>Ctrl</kbd> + <kbd>1</kbd> a <kbd>5</kbd> para trocar de módulo.</li>
              <li>Quando sai uma versão nova, o próprio 4notes avisa e instala quando você quiser.</li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.highlights {
  background: var(--surface);
  border-block: 1px solid var(--border);
}
.rows {
  display: grid;
  gap: clamp(72px, 10vw, 128px);
  margin-top: clamp(48px, 7vw, 88px);
}
.row {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  align-items: center;
  gap: clamp(32px, 5vw, 72px);
}
.row.flip .visual {
  order: 2;
}
.text h3 {
  font-size: var(--fs-xl);
  max-width: 20ch;
}
.text p {
  margin-top: 14px;
  max-width: 50ch;
  font-size: var(--fs-md);
  line-height: 1.55;
  color: var(--text-2);
}
.text ul {
  display: grid;
  gap: 10px;
  margin-top: 22px;
  padding-left: 0;
  list-style: none;
}
.text li {
  position: relative;
  padding-left: 22px;
  max-width: 52ch;
}
.text li::before {
  content: '';
  position: absolute;
  left: 2px;
  top: 0.62em;
  width: 8px;
  height: 8px;
  border-radius: 2px;
  background: var(--accent);
  rotate: 45deg;
}

/* Recorte do editor, como um pedaço de papel solto */
.crop {
  border-radius: var(--r-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg), 0 0 0 1px var(--frame-border);
  rotate: -1.2deg;
}

/* Dobrável aberto + celular */
.devices {
  position: relative;
  padding: 0 14% 10% 0;
}
.devices .fold {
  width: 78%;
}
.devices .phone {
  position: absolute;
  right: 4%;
  bottom: 0;
  width: 34%;
}

@media (max-width: 899px) {
  .row {
    grid-template-columns: minmax(0, 1fr);
  }
  .row.flip .visual {
    order: 0;
  }
  .crop {
    rotate: none;
  }
}
</style>
