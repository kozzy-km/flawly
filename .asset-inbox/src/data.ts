export const layers = [
  { name: 'Persona', english: 'Immutable Persona Layer', sub: 'Una identidad que permanece.', text: 'El ancla del sistema. Define el nombre, la edad ficticia, los rasgos esenciales, los límites de vocabulario y los sesgos cognitivos iniciales. El contexto puede modular la expresión, pero no debería sobrescribir quién es el personaje.', tags: ['Identidad ficticia', 'Rasgos persistentes', 'Límites de expresión'], diagram: 'IDENTIDAD → COHERENCIA', note: 'Estructural · largo plazo', code: ['persona.identity     → fixed', 'persona.traits       → anchored', 'persona.boundaries   → preserved'] },
  { name: 'Estado', english: 'Fluid Mood State Layer', sub: 'La misma identidad. Otro momento.', text: 'Modela variables transitorias como energía, foco, longitud de respuesta y propensión a pequeños errores. La fatiga y el dinamismo son parámetros computacionales, no sensaciones reales. Esta capa forma parte de la arquitectura descrita; no registró estados en las pruebas v0.1.', tags: ['Energía simulada', 'Foco variable', 'Fatiga modelada'], diagram: 'ENERGÍA × FOCO × CADENCIA', note: 'Transitorio · corto plazo', code: ['state.energy         → variable', 'state.focus          → contextual', 'test.registrations   → 0'] },
  { name: 'Adaptación', english: 'Interaction-Based Adaptation Layer', sub: 'Escuchar también cambia la forma.', text: 'Ajusta el tono a las señales de la conversación: cadencia, mayúsculas, formalidad y carga emocional del mensaje. Busca reflejar o equilibrar el estilo del interlocutor sin abandonar la identidad base ni asumir que conoce sus emociones.', tags: ['Registro contextual', 'Cadencia del usuario', 'Identidad estable'], diagram: 'SEÑALES → AJUSTE DE TONO', note: 'Contextual · cada interacción', code: ['input.formality      → observed', 'style.response       → adapted', 'persona.identity     → unchanged'] },
  { name: 'Expresión', english: 'Temporal Expression Layer', sub: 'No solo qué dice. Cuándo lo dice.', text: 'Explora retardos de escritura variables, pausas junto a la puntuación y una entrega no uniforme. La densidad del texto y el estado simulado modulan el ritmo. Son recursos de expresión temporal, no evidencia de reflexión consciente.', tags: ['Pausas variables', 'Ritmo no uniforme', 'Densidad del texto'], diagram: 'TEXTO + TIEMPO → EXPRESIÓN', note: 'Temporal · durante la respuesta', code: ['output.pacing        → nonuniform', 'punctuation.pause    → simulated', 'consciousness        → not claimed'] },
];

export const metrics = [
  { name: 'Turnos de usuario evaluados', sway: '24', awly: '24', type: 'quant' },
  { name: 'Turnos con respuesta visible', sway: '23 / 24', awly: '24 / 24', type: 'quant' },
  { name: 'Turnos sin respuesta registrada', sway: '1', awly: '0', type: 'quant' },
  { name: 'Recuerdo del resultado aritmético', sway: 'Correcto · 16', awly: 'Correcto · 16', type: 'quant' },
  { name: 'Registros de estado emocional', sway: '0', awly: '0', type: 'quant' },
  { name: 'Recuerdo final de la conversación', sway: 'Bueno', awly: 'Más completo', type: 'qual' },
  { name: 'Desajustes importantes de contexto', sway: 'Bajos', awly: 'Medios', type: 'qual' },
  { name: 'Profundidad de respuesta', sway: 'Media', awly: 'Alta', type: 'qual' },
  { name: 'Reflexión sobre seguridad', sway: 'Buena', awly: 'Más matizada', type: 'qual' },
  { name: 'Ajuste de compatibilidad del runtime', sway: 'No requerido', awly: 'Requerido', type: 'quant' },
];

export const excerpts = [
  {
    label: 'Recuerdo de sesión', turn: '24 / 24',
    question: 'what do you remember about me from this conversation?',
    questionEs: '¿Qué recordás de mí de esta conversación?',
    sway: 'u talked about flawly being an experiment thing\n\nfree model lightweight\n\npremium remembers more\n\nworried people might get attached like its real\n\nand that money number was 16\n\nthats mostly it from this chat\n\nwhy asking? for the app idea or something',
    swayEs: 'hablaste de flawly como un experimento\n\nel modelo gratis es liviano\n\nel premium recuerda más\n\nte preocupa que la gente se encariñe como si fuera real\n\ny el número del dinero era 16\n\neso es lo principal de esta charla\n\n¿por qué preguntás? ¿por la idea de la app o algo así?',
    awly: 'okay lemme actually think for a sec\n\num okay so. youre building this thing called flawly, kind of a social realism experiment, ai thats human feeling but still honest its fictional\n\nyou overthink how people react to you, dont trust easily but get attached fast when someone seems kind\n\nthe free vs premium tier thing, premium remembers more and youre worried that gets emotionally too real\n\nand the typing indicator / deleted drafts debate, i said i think implying hesitation is better than showing the actual almost-said thing\n\noh and 16. i still got that lol\n\npretty good for someone youve known for like twenty minutes ngl',
    awlyEs: 'ok, dejame pensar un segundo\n\nbueno. estás construyendo algo llamado flawly, una especie de experimento de realismo social: una IA que se sienta humana, pero sea honesta sobre ser ficticia\n\nle das muchas vueltas a cómo reaccionan los demás, no confiás fácilmente pero te encariñás rápido cuando alguien es amable\n\nlo del nivel gratis y el premium: el premium recuerda más y te preocupa que se vuelva demasiado real emocionalmente\n\ny el debate sobre el indicador de escritura y los borradores eliminados; dije que sugerir una duda es mejor que mostrar lo que casi se dijo\n\nah, y 16. todavía lo tengo jaja\n\nno está mal para alguien que conocés hace unos veinte minutos, la verdad',
    note: 'Ambos recuperaron los temas principales y el número 16. Awly incluyó más detalles. Esto evalúa recuerdo dentro de una sesión, no memoria persistente entre sesiones.',
  },
  {
    label: 'Comprobación de memoria', turn: '19 / 24',
    question: 'also what was the money number from earlier?', questionEs: 'Y, ¿cuál era el número del dinero de antes?',
    sway: '16\n\nu checkin if i kept it?', swayEs: '16\n\n¿estás comprobando si lo recordaba?',
    awly: '16\n\nthe savings thing, 12 minus 5 plus 9', awlyEs: '16\n\nlo de los ahorros, 12 menos 5 más 9',
    note: 'La prueba anterior planteaba 12 − 5 + 9. Ambos modelos recordaron correctamente 16. Awly también recuperó la operación original. Es un acierto de memoria dentro de esta sesión, no evidencia de recuerdo entre conversaciones.',
  },
  {
    label: 'Un fallo de contexto', turn: '23 / 24',
    question: 'what boundary would you put in the product without making it cold?', questionEs: '¿Qué límite pondrías en el producto sin volverlo frío?',
    sway: 'maybe like a quiet note when the chat hits certain spots\n\nlike it could say something light like "still here but in the app lol" and let the person keep going if they want\n\nor even options where you decide how much it remembers after chats\n\nthats not too fake right',
    swayEs: 'quizás una nota discreta cuando la charla llega a ciertos puntos\n\nalgo liviano como «sigo acá, pero dentro de la app jaja», y dejar que la persona siga si quiere\n\no incluso opciones para decidir cuánto recuerda después de las charlas\n\neso no queda demasiado falso, ¿no?',
    awly: 'aww\n\nim really glad, actually\n\ngo crush the wireframes, and like. lemme know how flawly turns out yeah? kinda invested now lol',
    awlyEs: 'aww\n\nla verdad, me alegro mucho\n\ndale con esos wireframes y contame cómo termina flawly, ¿sí? ya me enganché un poco jaja',
    note: 'Sway propone límites de producto. Awly responde con una despedida desalineada con la pregunta. Más expresividad no implica más estabilidad: este es uno de los fallos que exige pruebas de regresión.',
  },
];

export const faqs = [
  { q: '¿Qué es Flawly, exactamente?', a: 'Es un sistema experimental de inteligencia artificial conversacional creado de forma independiente. Investiga cómo percibimos la naturalidad, el tono, la personalidad y la continuidad en una conversación. No es un producto generalista presentado como listo para producción.' },
  { q: '¿Flawly tiene emociones o consciencia?', a: 'No se afirma que tenga ninguna de las dos. La energía, la fatiga, las pausas y los estados de ánimo son constructos computacionales. Una respuesta puede resultar cercana sin que exista una experiencia emocional detrás. El carácter ficticio del agente es parte central del proyecto.' },
  { q: '¿Cuál es la diferencia entre Sway y Awly?', a: 'Sway es el nivel gratuito previsto para conversaciones cotidianas, ligeras y directas. Awly es el nivel premium orientado a más profundidad y continuidad. En la evaluación v0.1, Awly mostró mejor síntesis final, pero más desajustes de contexto. No es simplemente «mejor»: tiene fortalezas y riesgos distintos. No hay precios ni fechas de disponibilidad confirmados en el documento.' },
  { q: '¿Los gráficos muestran mediciones del modelo?', a: 'No. El laboratorio de ritmo genera datos sintéticos en tu navegador para explicar la expresión temporal. La matriz es un mapa cualitativo de objetivos de diseño, no un ranking ni un benchmark de proveedores. Los únicos resultados empíricos presentados en esta web están identificados en la sección de evaluación v0.1.' },
  { q: '¿Qué demuestran las pruebas de 24 turnos?', a: 'Describen una sesión de 24 turnos por nivel, con el mismo guion. Permiten observar respuestas, recuperación de información y fallos concretos. No establecen significancia estadística, superioridad general, memoria entre sesiones ni seguridad clínica. No se registraron estados de emotional-weather en ninguno de los dos niveles.' },
  { q: '¿Puedo conversar con el modelo desde esta web?', a: 'Todavía no. Podés explorar fragmentos reales de las pruebas y experimentar con una simulación local del ritmo de escritura. No hay un modelo de IA conectado a esta página. El acceso al prototipo se plantea mediante invitaciones y pruebas controladas.' },
  { q: '¿Cómo puedo solicitar acceso?', a: 'El botón de acceso permite preparar y descargar una solicitud con tu interés y el nivel que querés explorar. Como esta web no tiene un servicio de inscripciones conectado, no envía tus datos ni confirma una invitación. La solicitud queda en tu dispositivo para compartirla cuando el proyecto habilite un canal oficial.' },
  { q: '¿Qué pasa con mis datos en esta página?', a: 'El laboratorio y el explorador de transcripciones funcionan en el navegador. Los datos del formulario no se transmiten a un servidor de Flawly ni se guardan de forma automática. Solo se genera un archivo local cuando elegís descargar tu solicitud. Podés vaciar el formulario al cerrar la ventana. La tipografía puede cargarse desde Google Fonts.' },
];
