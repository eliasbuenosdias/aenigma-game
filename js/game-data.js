// AENIGMA: The Evolution of Secrets - Game Data
// Contains all level configurations, puzzles, and solutions

const GAME_DATA = {
    gameName: "AENIGMA: The Evolution of Secrets",
    version: "1.0.0",
    totalLevels: 7,
    
    // Level configurations
    levels: [
        {
            id: 1,
            title: "Tablillas de Cera",
            subtitle: "El Arte Antiguo del Oculto",
            difficulty: "easy",
            description: `
                <p>En la antigua Grecia, Demaratus utilizó tablillas de cera para advertir a Grecia sobre la invasión de Jerjes. Escribía en la madera subyacente y luego cubría con cera, creando un mensaje invisible bajo la superficie.</p>
                <p>Tu desafío: Utiliza tu cursor como una herramienta de raspado para revelar el mensaje oculto bajo la capa de cera digital.</p>
            `,
            hint: "Mueve tu cursor sobre la superficie de cera como si estuvieras raspando con una herramienta. El mensaje está justo debajo de la superficie.",
            solution: "SPARTA",
            explanation: "¡Excelente! Has revelado el mensaje de advertencia. Las tablillas de cera representan una de las formas más antiguas de esteganografía física.",
            tools: [],
            type: "interactive"
        },
        {
            id: 2,
            title: "Acrósticos Romanos",
            subtitle: "Las Palabras del Senado",
            difficulty: "easy",
            description: `
                <p>Los romanos utilizaban acrósticos para ocultar mensajes importantes. Las primeras letras de cada línea o verso formaban un mensaje secreto que solo los iniciados podían descifrar.</p>
                <p>Tu desafío: Lee cuidadosamente el poema y extrae las primeras letras. Luego, descifra el mensaje utilizando el cifrado César.</p>
            `,
            hint: "Extrae las primeras letras de cada verso. El acróstico resultante está cifrado con César. El desplazamiento es el número de líneas del poema.",
            solution: "CESAR",
            explanation: "¡Perfecto! Has dominado el arte del acróstico romano. Las primeras letras formaban 'GVOUSH', que con desplazamiento 3 descifra 'CESAR'.",
            tools: ["caesar", "frequency"],
            type: "text",
            poem: `
                <span class="poem-line">Guerra se avecina en el horizonte lejano,</span>
                <span class="poem-line">Venid pues, guerreros de Roma noble,</span>
                <span class="poem-line">Octubre traerá la batalla final,</span>
                <span class="poem-line">Unidos marchemos con fuerza y honor,</span>
                <span class="poem-line">Salve, Roma eterna, nuestra madre.</span>
                <span class="poem-line">Hermanos de armas, a por gloria.</span>
            `
        },
        {
            id: 3,
            title: "Velo Digital LSB",
            subtitle: "El Bit Menos Significativo",
            difficulty: "medium",
            description: `
                <p>La esteganografía LSB (Least Significant Bit) modifica el bit menos significativo de cada byte de píxel para ocultar información. El cambio es imperceptible al ojo humano pero detectable mediante análisis.</p>
                <p>Tu desafío: Manipula los canales de color y los bits para revelar el mensaje oculto en la imagen.</p>
            `,
            hint: "El mensaje está oculto en el canal azul. Extrae el LSB de cada píxel y recombínalos para formar caracteres ASCII.",
            solution: "CLAUDIA",
            explanation: "¡Brillante! Has penetrado el velo digital. La esteganografía LSB es fundamental para entender la ocultación moderna.",
            tools: ["hex", "binary"],
            type: "image",
            imageType: "generated",
            imageData: {
                width: 200,
                height: 100,
                embeddedMessage: "CLAUDIA"
            }
        },
        {
            id: 4,
            title: "Rejilla de Cardano",
            subtitle: "El Misterio de la Rotación",
            difficulty: "medium",
            description: `
                <p>Girolamo Cardano desarrolló en el siglo XVI un sistema de rejilla giratoria. Una hoja perforada permitía leer mensajes ocultos cuando se giraba 90°, 180° y 270°.</p>
                <p>Tu desafío: Rota la rejilla en las cuatro posiciones para revelar el mensaje completo oculto en la matriz de letras.</p>
            `,
            hint: "La rejilla debe girarse en cuatro posiciones: 0°, 90°, 180° y 270°. Lee las letras visibles en cada posición y luego únelas.",
            solution: "CIPHER",
            explanation: "¡Excelente trabajo! Has descifrado la Rejilla de Cardano. Este método fue utilizado por espionaje durante siglos.",
            tools: [],
            type: "interactive",
            gridSize: 6,
            gridData: [
                "ABCDEF",
                "GHIJKL",
                "MNOPQR",
                "STUVWX",
                "YZABCD",
                "EFGHIJ"
            ],
            grillePattern: [
                [1, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 1]
            ]
        },
        {
            id: 5,
            title: "Análisis DCT",
            subtitle: "El Dominio de la Frecuencia",
            difficulty: "hard",
            description: `
                <p>La Transformada Discreta del Coseno (DCT) comprime imágenes JPEG alterando coeficientes de frecuencia. Los métodos modernos de esteganografía aprovechan esto.</p>
                <p>Tu desafío: Analiza los coeficientes DCT de la imagen JPEG. Busca anomalías en los bloques que indiquen información oculta.</p>
            `,
            hint: "Examina los coeficientes DCT en los bloques de alta frecuencia. Los valores anómalos en las esquinas de cada bloque 8x8 contienen el mensaje.",
            solution: "STEGANOS",
            explanation: "¡Impresionante! Has dominado el análisis DCT. La esteganografía JPEG es una de las técnicas más sofisticadas.",
            tools: ["frequency", "hex"],
            type: "image",
            imageType: "dct-simulation",
            coefficientData: {
                message: "STEGANOS",
                blockPosition: 15
            }
        },
        {
            id: 6,
            title: "Factorización RSA",
            subtitle: "El Desafío de Cicada 3301",
            difficulty: "hard",
            description: `
                <p>Cicada 3301 desafiaba a los participantes a factorizar números semiprimos para descifrar mensajes. Esta técnica es la base de la criptografía asimétrica moderna.</p>
                <p>Tu desafío: Las runas encierran un número. Factorízalo para encontrar los primos p y q, luego calcula la clave privada d.</p>
            `,
            hint: "Las runas representan un número N semiprimo. Tradúcelas a decimal, encuentra p y q, calcula φ(N) = (p-1)(q-1), y luego d ≡ e⁻¹ (mod φ(N)) con e = 17.",
            solution: "PRIME",
            explanation: "¡Extraordinario! Has descifrado el enigma RSA. La factorización de enteros es el talonón de Aquiles de RSA.",
            tools: ["rsa", "runes"],
            type: "cryptographic",
            runes: "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛈᛇᛉᛊᛏᛒᛖᛗᛚᛜᛟᛞ",
            rsaData: {
                N: 3233,
                e: 17,
                p: 53,
                q: 61,
                phi: 3120,
                d: 2753
            }
        },
        {
            id: 7,
            title: "Enigma Final",
            subtitle: "La Convergencia de los Secretos",
            difficulty: "master",
            description: `
                <p>El nivel final integra todas las técnicas aprendidas. Debes descifrar un mensaje oculto mediante múltiples capas de protección y encontrar coordenadas reales.</p>
                <p>Tu desafío: Descifra cada capa, combina los resultados y encuentra la ubicación que conduce a la verdad final.</p>
            `,
            hint: "Cada capa requiere una técnica diferente. Las cinco capas convergen para formar un código de acceso final. El mapa te guiará.",
            solution: "LIBERPRIMUS",
            explanation: "¡HAS COMPLETADO AENIGMA! Eres ahora un maestro de la evolución del secreto. Bienvenido a la hermandad de los guardianes del conocimiento oculto.",
            tools: ["hex", "binary", "caesar", "frequency", "rsa", "runes"],
            type: "multi-layer",
            layers: [
                {
                    id: "visual",
                    name: "Capa Visual",
                    type: "lsb",
                    solution: "L",
                    description: "Imagen con esteganografía LSB"
                },
                {
                    id: "acoustic",
                    name: "Capa Acústica",
                    type: "frequency",
                    solution: "I",
                    description: "Espectrograma con mensaje oculto"
                },
                {
                    id: "mathematical",
                    name: "Capa Matemática",
                    type: "rsa",
                    solution: "B",
                    description: "Ecuaciones y números primos"
                },
                {
                    id: "runic",
                    name: "Capa Rúnica",
                    type: "runes",
                    solution: "E",
                    description: "Mensaje en escritura rúnica"
                },
                {
                    id: "geographic",
                    name: "Capa Geográfica",
                    type: "coordinates",
                    solution: "R",
                    description: "Coordenadas geográficas"
                }
            ],
            finalCoordinates: {
                latitude: 37.7749,
                longitude: -122.4194,
                location: "San Francisco"
            }
        }
    ],

    // Hints for each level (unlocked progressively)
    hints: {
        1: [],
        2: [
            "Las primeras letras de cada verso forman una palabra.",
            "La palabra tiene 6 letras.",
            "El cifrado César tiene un desplazamiento de 3 posiciones."
        ],
        3: [
            "El canal azul contiene la información.",
            "Cada 8 bits forman un carácter ASCII.",
            "El mensaje es un nombre propio."
        ],
        4: [
            "La rejilla debe rotarse exactamente 90° cada vez.",
            "Lee las letras de izquierda a derecha en cada posición.",
            "El mensaje completo tiene 6 letras."
        ],
        5: [
            "Los coeficientes DCT modificados tienen valores específicos.",
            "Busca patrones en las posiciones (0,1) de cada bloque.",
            "Convierte los valores a letras ASCII."
        ],
        6: [
            "Las runas representan: FUTHARKGWHNPIZE STBEMLNGOD",
            "N = 3233, e = 17",
            "Los primos están cerca de sqrt(3233) = 56.86"
        ],
        7: [
            "Resuelve cada capa individualmente.",
            "Las iniciales de cada solución forman una palabra.",
            "La ubicación está en la Bahía de San Francisco."
        ]
    },

    // Achievement system
    achievements: {
        firstSteps: {
            id: "firstSteps",
            name: "Primeros Pasos",
            description: "Completa el primer nivel",
            icon: "🎯"
        },
        waxMaster: {
            id: "waxMaster",
            name: "Maestro de la Cera",
            description: "Completa el nivel de tablillas de cera",
            icon: "🕯️"
        },
        romanScholar: {
            id: "romanScholar",
            name: "Erudito Romano",
            description: "Descifra los acrósticos romanos",
            icon: "📜"
        },
        digitalVeil: {
            id: "digitalVeil",
            name: "Velo Digital",
            description: "Penetra la esteganografía LSB",
            icon: "👁️"
        },
        cardanSolver: {
            id: "cardanSolver",
            name: "Descifrador de Cardano",
            description: "Resuelve la rejilla giratoria",
            icon: "🎲"
        },
        dctAnalyst: {
            id: "dctAnalyst",
            name: "Analista DCT",
            description: "Domina el análisis de frecuencia",
            icon: "📊"
        },
        rsaBreaker: {
            id: "rsaBreaker",
            name: "Rompedor RSA",
            description: "Factoriza y descifra RSA",
            icon: "🔐"
        },
        enigmaMaster: {
            id: "enigmaMaster",
            name: "Maestro del Enigma",
            description: "Completa todos los niveles",
            icon: "🏆"
        },
        speedRunner: {
            id: "speedRunner",
            name: "Velocista",
            description: "Completa el juego en menos de 2 horas",
            icon: "⚡"
        },
        perfectScore: {
            id: "perfectScore",
            name: "Puntuación Perfecta",
            description: "Resuelve todos los niveles sin pistas",
            icon: "💎"
        }
    },

    // Terminal commands
    terminalCommands: {
        help: {
            description: "Muestra lista de comandos",
            execute: () => {
                return `
                    Comandos disponibles:
                    ─────────────────────
                    help     - Muestra este mensaje
                    clear    - Limpia la terminal
                    status   - Muestra estado del juego
                    progress - Muestra progreso detallado
                    hint     - Muestra una pista
                    time     - Muestra tiempo transcurrido
                    level    - Salta al nivel [n]
                    reset    - Reinicia el progreso
                `;
            }
        },
        clear: {
            description: "Limpia la terminal",
            execute: () => {
                document.getElementById('terminal-output').innerHTML = '';
                return 'Terminal limpiada.';
            }
        },
        status: {
            description: "Muestra estado del juego",
            execute: (gameState) => {
                const completed = gameState.completedLevels.length;
                return `
                    Estado del Juego
                    ────────────────
                    Progreso: ${completed}/${GAME_DATA.totalLevels} niveles
                    Nivel actual: ${gameState.currentLevel}
                    Logros: ${Object.keys(gameState.achievements).length}
                    Tiempo total: ${formatTime(gameState.totalTime)}
                `;
            }
        },
        progress: {
            description: "Muestra progreso detallado",
            execute: (gameState) => {
                let output = 'Progreso Detallado\n────────────────\n';
                GAME_DATA.levels.forEach(level => {
                    const status = gameState.completedLevels.includes(level.id) ? '✓' : 
                                  gameState.currentLevel === level.id ? '◐' : '○';
                    output += `Nivel ${level.id.toString().padStart(2, '0')}: ${status} ${level.title}\n`;
                });
                return output;
            }
        },
        hint: {
            description: "Muestra una pista",
            execute: (gameState) => {
                const currentLevel = gameState.currentLevel;
                const levelHints = GAME_DATA.hints[currentLevel];
                if (levelHints && levelHints.length > 0) {
                    const usedHints = gameState.usedHints[currentLevel] || 0;
                    if (usedHints < levelHints.length) {
                        gameState.usedHints[currentLevel] = usedHints + 1;
                        return `Pista ${usedHints + 1}/${levelHints.length}:\n${levelHints[usedHints]}`;
                    }
                    return 'No hay más pistas disponibles para este nivel.';
                }
                return 'No hay pistas disponibles para este nivel.';
            }
        },
        time: {
            description: "Muestra tiempo transcurrido",
            execute: (gameState) => {
                return `Tiempo total: ${formatTime(gameState.totalTime)}`;
            }
        }
    }
};

// Utility functions
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function generateLSBImage(message, width = 200, height = 100) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    // Create a gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Add some random colored squares for visual noise
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 30 + 10;
        const hue = Math.random() * 360;
        ctx.fillStyle = `hsla(${hue}, 50%, 50%, 0.3)`;
        ctx.fillRect(x, y, size, size);
    }
    
    // Encode message in LSB
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const messageBits = textToBits(message);
    
    for (let i = 0; i < messageBits.length && i < data.length / 4; i++) {
        // Modify blue channel LSB
        data[i * 4 + 2] = (data[i * 4 + 2] & 0xFE) | messageBits[i];
    }
    
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
}

function textToBits(text) {
    const bits = [];
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        for (let j = 7; j >= 0; j--) {
            bits.push((charCode >> j) & 1);
        }
    }
    return bits;
}

function bitsToText(bits) {
    let text = '';
    for (let i = 0; i + 8 <= bits.length; i += 8) {
        let charCode = 0;
        for (let j = 0; j < 8; j++) {
            charCode = (charCode << 1) | bits[i + j];
        }
        text += String.fromCharCode(charCode);
    }
    return text;
}

function generateDCTVisualization(blockData) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    // Fill with dark background
    ctx.fillStyle = '#0D1117';
    ctx.fillRect(0, 0, 256, 256);
    
    // Draw DCT blocks
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const x = j * 32;
            const y = i * 32;
            const value = blockData[i * 8 + j] || 0;
            
            // Color based on value
            const intensity = Math.min(255, Math.floor(value * 20));
            ctx.fillStyle = `rgb(${intensity * 0.2}, ${intensity * 0.5}, ${intensity})`;
            ctx.fillRect(x, y, 31, 31);
            
            // Add grid lines
            ctx.strokeStyle = '#2D3748';
            ctx.strokeRect(x, y, 31, 31);
        }
    }
    
    return canvas.toDataURL();
}

function runesToLatin(runes) {
    const runeMap = {
        'ᚠ': 'F', 'ᚢ': 'U', 'ᚦ': 'TH', 'ᚨ': 'A', 'ᚱ': 'R', 'ᚲ': 'K',
        'ᚷ': 'G', 'ᚹ': 'W', 'ᚺ': 'H', 'ᚾ': 'N', 'ᛁ': 'I', 'ᛃ': 'J',
        'ᛈ': 'P', 'ᛇ': 'E', 'ᛉ': 'Z', 'ᛊ': 'S', 'ᛏ': 'T', 'ᛒ': 'B',
        'ᛖ': 'E', 'ᛗ': 'M', 'ᛚ': 'L', 'ᛜ': 'NG', 'ᛟ': 'O', 'ᛞ': 'D'
    };
    
    let result = '';
    for (const char of runes) {
        result += runeMap[char] || char;
    }
    return result;
}

function latinToRunes(text) {
    const runeMap = {
        'F': 'ᚠ', 'U': 'ᚢ', 'A': 'ᚨ', 'R': 'ᚱ', 'K': 'ᚲ', 'G': 'ᚷ',
        'W': 'ᚹ', 'H': 'ᚺ', 'N': 'ᚾ', 'I': 'ᛁ', 'P': 'ᛈ', 'E': 'ᛇ',
        'S': 'ᛊ', 'T': 'ᛏ', 'B': 'ᛒ', 'M': 'ᛗ', 'L': 'ᛚ', 'O': 'ᛟ',
        'D': 'ᛞ'
    };
    
    let result = '';
    for (const char of text.toUpperCase()) {
        result += runeMap[char] || char;
    }
    return result;
}

function caesarCipher(text, shift, decode = false) {
    if (decode) shift = (26 - shift) % 26;
    
    return text.replace(/[A-Z]/g, char => {
        const code = char.charCodeAt(0) - 65;
        return String.fromCharCode(((code + shift) % 26) + 65);
    });
}

function extendedGCD(a, b) {
    if (b === 0) return { x: 1, y: 0, gcd: a };
    const { x: x1, y: y1, gcd } = extendedGCD(b, a % b);
    return {
        x: y1,
        y: x1 - Math.floor(a / b) * y1,
        gcd
    };
}

function modInverse(e, phi) {
    const { x } = extendedGCD(e, phi);
    return ((x % phi) + phi) % phi;
}

function factorize(n) {
    const factors = [];
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            factors.push(i);
            if (i !== n / i) factors.push(n / i);
        }
    }
    return factors;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GAME_DATA;
}
