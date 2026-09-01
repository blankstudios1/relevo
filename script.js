(() => {
  "use strict";

  const QUESTIONS = [
    {
      q: "Qual era o desenho que a colher do café onde foi o nosso primeiro date, no Rato, tinha?",
      photo: "assets/q1.jpg",
      options: [
        { label: "Um coração", correct: true },
        { label: "Um Pai Natal", correct: false },
        { label: "Uma flor", correct: false },
      ],
    },
    {
      q: "Qual destas é a prova mais clara de que somos o casal de pinguins perfeito?",
      options: [
        { label: "Andamos sempre agarradinhos", reply: "Confirmado pelos registos da colónia." },
        { label: "Aquecemos um ao outro no frio", reply: "Função oficial, sem dúvida." },
        { label: "Fazemos tudo em bando... só nós os dois", reply: "O melhor tipo de bando." },
      ],
    },
    {
      q: "Se eu fosse o pinguim azul e tu o rosa, o que fazíamos ao encontrarmo-nos no gelo?",
      options: [
        { label: "Abraço apertado", reply: "Já sinto o frio a fugir." },
        { label: "Uma dancinha desengonçada", reply: "A mais fofa de sempre." },
        { label: "As duas coisas, sem hipótese", reply: "Óbvio que sim." },
      ],
    },
    {
      q: "O que é mais fofo no mundo?",
      options: [
        { label: "Um bebé pinguim a aprender a andar", reply: "É difícil competir com isso." },
        { label: "Nós os dois a dormir agarradinhos", reply: "Isto ganha sempre." },
        { label: "Impossível escolher, empatam", reply: "Resposta diplomática, aceite." },
      ],
    },
    {
      q: "Numa escala de pinguim a pinguim apaixonado, quanto gostas de mim?",
      options: [
        { label: "Um bocadinho", reply: "Vamos trabalhar nisso." },
        { label: "Muito muito", reply: "Já é um bom começo." },
        { label: "Ao infinito e mais um bocado", reply: "Essa é a resposta certa." },
      ],
    },
    {
      q: "O que fazes quando tens saudades minhas?",
      options: [
        { label: "Fico a pensar em ti", reply: "Eu também penso em ti." },
        { label: "Vejo as nossas fotos", reply: "As melhores fotos da colónia." },
        { label: "As duas, sempre", reply: "É exatamente isso." },
      ],
    },
    {
      q: "Se houvesse um prémio \"Melhor Casal de Pinguins do Ano\", quem ganhava?",
      options: [
        { label: "Nós, obviamente", reply: "Sem surpresas aqui." },
        { label: "Nós, sem sombra de dúvida", reply: "O júri concorda." },
        { label: "Nós... não há concorrência", reply: "Categoria cancelada por falta de rivais." },
      ],
    },
    {
      q: "Qual é a atividade de casal-pinguim perfeita?",
      options: [
        { label: "Andar juntinhos devagarinho", reply: "O passeio ideal." },
        { label: "Ficar aconchegados a ver o gelo passar", reply: "Alta definição de romance." },
        { label: "Rir das nossas piadas internas", reply: "O passatempo favorito." },
      ],
    },
    {
      q: "Se me pedissem para te descrever com um só emoji, qual seria?",
      options: [
        { label: "🐧", reply: "Escolha nobre." },
        { label: "💙", reply: "Também serve." },
        { label: "💗", reply: "Perfeito também." },
      ],
    },
    {
      q: "Estás pronta para descobrir a tua surpresa?",
      options: [
        { label: "Sim!!", reply: "Então vamos lá." },
        { label: "Já não aguento a curiosidade", reply: "Só mais uns segundos." },
        { label: "Força, mostra lá", reply: "Como quiseres." },
      ],
    },
  ];

  const PRIZE = {
    heading: "Jantar a dois 🍝",
    place: "Sophia — Cucina della Nonna",
    date: "Sexta-feira, 4 de setembro",
    note: "Só precisas aparecer linda. O resto já está tratado. 💙💗",
  };

  const DEFAULT_PHOTO = "assets/nos.jpg";

  const card = document.getElementById("card");
  const speech = document.getElementById("speech");
  const progressEl = document.getElementById("progress");
  const topPhoto = document.getElementById("top-photo");

  let step = -1; // -1 = intro

  function buildProgress() {
    progressEl.innerHTML = "";
    QUESTIONS.forEach(() => {
      const i = document.createElement("i");
      progressEl.appendChild(i);
    });
  }

  function updateProgress() {
    const bars = progressEl.querySelectorAll("i");
    bars.forEach((bar, i) => bar.classList.toggle("done", i < step));
  }

  function say(text) {
    speech.textContent = text;
  }

  function renderIntro() {
    progressEl.hidden = true;
    topPhoto.src = DEFAULT_PHOTO;
    say("Psiu... tenho aqui um quiz só para ti.");
    card.innerHTML = `
      <p class="eyebrow">Colónia de Dois &middot; edição especial</p>
      <h1 class="intro-title">Um Quiz Só Para Ti</h1>
      <p class="intro-sub">10 perguntas rápidas, um casal de pinguins a comentar tudo, e uma surpresa à espera no fim.</p>
      <div class="intro-actions">
        <button class="btn-primary" id="start-btn" type="button">Começar</button>
      </div>
    `;
    document.getElementById("start-btn").addEventListener("click", () => {
      step = 0;
      progressEl.hidden = false;
      renderQuestion();
    });
  }

  function renderQuestion() {
    updateProgress();
    const data = QUESTIONS[step];
    topPhoto.src = data.photo || DEFAULT_PHOTO;
    say(`Pergunta ${step + 1} de ${QUESTIONS.length}...`);
    const hasCorrectAnswer = data.options.some((opt) => typeof opt.correct === "boolean");
    card.innerHTML = `
      <p class="eyebrow">Pergunta ${step + 1} de ${QUESTIONS.length}</p>
      <h2 class="question">${data.q}</h2>
      <div class="options">
        ${data.options.map((opt, i) => `<button class="option" type="button" data-i="${i}">${opt.label}</button>`).join("")}
      </div>
    `;
    card.querySelectorAll(".option").forEach((btn) => {
      btn.addEventListener("click", () => {
        card.querySelectorAll(".option").forEach((b) => b.disabled = true);
        const opt = data.options[Number(btn.dataset.i)];
        btn.classList.add("chosen");

        if (hasCorrectAnswer) {
          btn.classList.add(opt.correct ? "correct" : "wrong");
          if (opt.correct) {
            say(opt.reply || "Acertaste! 💙");
          } else {
            const correctOpt = data.options.find((o) => o.correct);
            const correctBtn = [...card.querySelectorAll(".option")][data.options.indexOf(correctOpt)];
            if (correctBtn) correctBtn.classList.add("correct");
            say(opt.reply || `Quase... era "${correctOpt.label}".`);
          }
        } else {
          say(opt.reply);
        }

        const nextRow = document.createElement("div");
        nextRow.className = "next-row";
        nextRow.innerHTML = `<button class="next-btn" type="button" aria-label="Próxima pergunta">→</button>`;
        card.appendChild(nextRow);
        nextRow.querySelector(".next-btn").addEventListener("click", () => {
          step += 1;
          if (step < QUESTIONS.length) {
            renderQuestion();
          } else {
            renderLoading();
          }
        });
      });
    });
  }

  function renderLoading() {
    updateProgress();
    say("A preparar uma coisa especial...");
    card.innerHTML = `
      <div class="loading">
        <svg class="waddle" width="64" height="64" viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M60 18c26 0 42 22 42 52s-16 52-42 52-42-22-42-52 16-52 42-52z" fill="#3e86c9"/>
          <path d="M60 42c15 0 25 16 25 40s-10 38-25 38-25-14-25-38 10-40 25-40z" fill="#fdfdfd"/>
        </svg>
        <p class="loading-text">A calcular o vosso nível de fofura...</p>
      </div>
    `;
    setTimeout(renderReveal, 1600);
  }

  function renderReveal() {
    progressEl.hidden = true;
    say("Ta-dah! 🎉");
    card.innerHTML = `
      <div class="reveal-card">
        <p class="reveal-kicker">A tua surpresa</p>
        <h1 class="reveal-title">Encontrámos o par perfeito.</h1>
        <div class="reveal-prize">
          <div>${PRIZE.heading}</div>
          <div class="reveal-place">${PRIZE.place}</div>
          <div class="reveal-date">${PRIZE.date}</div>
        </div>
        <p class="reveal-note">${PRIZE.note}</p>
      </div>
    `;
    launchConfetti();
  }

  // -- Confetti --------------------------------------------------------

  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  const COLORS = ["#3e86c9", "#f3a0c2", "#ff8a5b", "#eaf6ff", "#d97aa3"];

  function launchConfetti() {
    if (reduceMotion) return;
    const pieces = Array.from({ length: 140 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.5,
      w: 6 + Math.random() * 6,
      h: 8 + Math.random() * 8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      speed: 2 + Math.random() * 3,
      drift: (Math.random() - 0.5) * 2,
      spin: Math.random() * Math.PI,
      spinSpeed: (Math.random() - 0.5) * 0.2,
    }));

    let frame = 0;
    const maxFrames = 260;

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        p.y += p.speed;
        p.x += p.drift;
        p.spin += p.spinSpeed;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.spin);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      frame += 1;
      if (frame < maxFrames) {
        requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    requestAnimationFrame(tick);
  }

  buildProgress();
  renderIntro();

  // -- Curtain intro ----------------------------------------------------

  const curtain = document.getElementById("curtain");
  if (curtain) {
    if (reduceMotion) {
      curtain.remove();
    } else {
      const leftPanel = curtain.querySelector(".curtain-left");
      setTimeout(() => curtain.classList.add("is-open"), 550);
      leftPanel.addEventListener("animationend", () => curtain.remove(), { once: true });
    }
  }
})();
