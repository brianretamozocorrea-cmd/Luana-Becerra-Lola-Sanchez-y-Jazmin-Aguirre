// 🌙 Modo Oscuro
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const btn = document.getElementById('themeBtn');
    btn.textContent = document.body.classList.contains('dark-mode')
      ? '☀️ Modo Claro'
      : '🌙 Modo Oscuro';
  }
  
  // 🌐 Traducción
  const translations = {
    es: {
      title: "Palabras Agudas, Graves y Esdrújulas - Lengua y Literatura",
      mainTitle: "Lengua y Literatura: Palabras Agudas, Graves y Esdrújulas",
      toggleTheory: "📘 Mostrar / Ocultar Teoría",
      theory: "Teoría",
      agudas: "Agudas:",
      agudasDesc: "Última sílaba tónica. Llevan tilde si terminan en n, s o vocal. Ejemplo: sofá, camión.",
      graves: "Graves (llanas):",
      gravesDesc: "Penúltima sílaba tónica. Llevan tilde si no terminan en n, s o vocal. Ejemplo: lápiz, árbol.",
      esdrujulas: "Esdrújulas:",
      esdrujulasDesc: "Antepenúltima sílaba tónica. Siempre llevan tilde. Ejemplo: música, lógico.",
      classifier: "Clasificador de Palabras",
      classifyButton: "Clasificar",
      contactTitle: "Formulario de Contacto",
      nameLabel: "Nombre:",
      emailLabel: "Correo Electrónico:",
      messageLabel: "Mensaje:",
      sendButton: "Enviar",
      vfTitle: "Preguntas Verdadero / Falso",
      testTitle: "Test de Opciones Múltiples"
    },
    en: {
      title: "Acute, Grave and Esdrújula Words - Language & Literature",
      mainTitle: "Language & Literature: Acute, Grave and Esdrújula Words",
      toggleTheory: "📘 Show / Hide Theory",
      theory: "Theory",
      agudas: "Acute:",
      agudasDesc: "Stress on the last syllable. Accented if ending in n, s, or a vowel. Example: sofá, camión.",
      graves: "Grave (plain):",
      gravesDesc: "Stress on the second-to-last syllable. Accented if NOT ending in n, s, or a vowel. Example: lápiz, árbol.",
      esdrujulas: "Esdrújulas:",
      esdrujulasDesc: "Stress on the third-to-last syllable. Always accented. Example: música, lógico.",
      classifier: "Word Classifier",
      classifyButton: "Classify",
      contactTitle: "Contact Form",
      nameLabel: "Name:",
      emailLabel: "Email:",
      messageLabel: "Message:",
      sendButton: "Send",
      vfTitle: "True / False Questions",
      testTitle: "Multiple Choice Test"
    }
  };
  
  function changeLanguage(lang) {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });
    document.documentElement.lang = lang;
    document.title = translations[lang].title;
  }
  
  // 📘 Mostrar / Ocultar teoría
  function toggleTeoria() {
    const teoria = document.getElementById('teoria');
    teoria.classList.toggle('oculto');
  }
  
  // 📩 Formulario de contacto
  function handleContactForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const lang = document.documentElement.lang;
    const message = lang === 'es'
      ? `Gracias por tu mensaje, ${name}!`
      : `Thank you for your message, ${name}!`;
    alert(message);
  }
  
  // Aquí agrego las funciones para el clasificador y preguntas que ya tenías
  
  function clasificarPalabra() {
    const palabra = document.getElementById('palabraInput').value.trim().toLowerCase();
    let tipo = "";
    if (!palabra) {
      document.getElementById('resultadoClasificador').textContent = "";
      return;
    }
  
    // Para simplificar, solo clasificamos con reglas básicas de tilde y acento
    const ultimaLetra = palabra.slice(-1);
    const tildes = ['á','é','í','ó','ú'];
    
    // Funciones auxiliares para saber dónde está la tilde
    function tieneTilde(s) {
      return tildes.some(t => s.includes(t));
    }
  
    // Determinar sílaba tónica simplificada
    if(tieneTilde(palabra.slice(-1)) || tieneTilde(palabra)) {
      // Simplificamos: si tiene tilde en la última sílaba, es aguda
      if(tildes.some(t => palabra.endsWith(t))) {
        tipo = "Aguda";
      } else if (tildes.some(t => palabra[palabra.length-2] === t)) {
        tipo = "Grave";
      } else {
        tipo = "Esdrújula";
      }
    } else {
      // Sin tilde explícita, según terminación
      if (ultimaLetra === 'n' || ultimaLetra === 's' || "aeiou".includes(ultimaLetra)) {
        tipo = "Aguda";
      } else {
        tipo = "Grave";
      }
    }
  
    const lang = document.documentElement.lang;
    const tipos = {
      es: {Aguda:"Aguda", Grave:"Grave (llana)", Esdrújula:"Esdrújula"},
      en: {Aguda:"Acute", Grave:"Grave (plain)", Esdrújula:"Esdrújula"}
    };
  
    document.getElementById('resultadoClasificador').textContent = 
      lang === 'es' ? `La palabra "${palabra}" es ${tipos.es[tipo]}.` : `The word "${palabra}" is ${tipos.en[tipo]}.`;
  }
  
  // Preguntas V/F
  function checkAnswer(selected, correct) {
    const lang = document.documentElement.lang;
    const feedback = selected === correct
      ? (lang === 'es' ? "¡Correcto!" : "Correct!")
      : (lang === 'es' ? "Incorrecto." : "Incorrect.");
    alert(feedback);
  }
  
  // Test
  function checkTestAnswer(selected) {
    const correctAnswer = "música";
    const lang = document.documentElement.lang;
    const feedback = selected === correctAnswer
      ? (lang === 'es' ? "¡Correcto!" : "Correct!")
      : (lang === 'es' ? "Incorrecto." : "Incorrect.");
    document.getElementById('resultadoTest').textContent = feedback;
  }
  