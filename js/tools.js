// AENIGMA: The Evolution of Secrets - Cryptographic Tools
// Implements various cryptographic and steganographic tools

class CryptoTools {
    constructor() {
        this.initToolListeners();
    }

    initToolListeners() {
        // Close tool buttons
        document.querySelectorAll('.close-tool').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const toolPanel = e.target.closest('.tool-panel');
                toolPanel.classList.add('hidden');
            });
        });

        // Hex tool
        const hexInput = document.getElementById('hex-input');
        if (hexInput) {
            hexInput.addEventListener('input', () => this.processHex());
        }

        // Binary tool
        const binaryInput = document.getElementById('binary-text-input');
        if (binaryInput) {
            binaryInput.addEventListener('input', () => this.processBinary());
        }

        // Caesar tool
        const caesarInput = document.getElementById('caesar-input');
        const caesarShift = document.getElementById('caesar-shift');
        const caesarSlider = document.getElementById('caesar-slider');
        
        if (caesarSlider) {
            caesarSlider.addEventListener('input', (e) => {
                if (caesarShift) caesarShift.value = e.target.value;
                this.processCaesar();
            });
        }
        
        if (caesarShift) {
            caesarShift.addEventListener('input', (e) => {
                if (caesarSlider) caesarSlider.value = e.target.value;
                this.processCaesar();
            });
        }

        const encodeBtn = document.getElementById('caesar-encode');
        const decodeBtn = document.getElementById('caesar-decode');
        
        if (encodeBtn) {
            encodeBtn.addEventListener('click', () => this.processCaesar(false));
        }
        if (decodeBtn) {
            decodeBtn.addEventListener('click', () => this.processCaesar(true));
        }

        // Frequency tool
        const freqInput = document.getElementById('frequency-input');
        const analyzeBtn = document.getElementById('analyze-frequency');
        
        if (freqInput && analyzeBtn) {
            analyzeBtn.addEventListener('click', () => this.analyzeFrequency(freqInput.value));
        }

        // RSA tool
        const rsaCalcBtn = document.getElementById('calculate-rsa');
        if (rsaCalcBtn) {
            rsaCalcBtn.addEventListener('click', () => this.calculateRSA());
        }

        // Runes tool
        const runesInput = document.getElementById('runes-input');
        const decodeRunesBtn = document.getElementById('decode-runes');
        
        if (runesInput && decodeRunesBtn) {
            decodeRunesBtn.addEventListener('click', () => this.decodeRunes(runesInput.value));
        }
    }

    // Hex Tool
    processHex() {
        const input = document.getElementById('hex-input');
        const output = document.getElementById('hex-output');
        
        if (!input || !output) return;
        
        const hex = input.value.replace(/\s/g, '').replace(/0x/g, '');
        
        if (!hex) {
            output.textContent = '';
            return;
        }

        // Convert hex to different formats
        let result = '';
        const bytes = hex.match(/.{1,2}/g) || [];
        
        bytes.forEach((byte, index) => {
            const decimal = parseInt(byte, 16);
            const binary = decimal.toString(2).padStart(8, '0');
            const char = decimal >= 32 && decimal <= 126 ? String.fromCharCode(decimal) : '.';
            
            result += `${byte.toUpperCase().padEnd(4)} `;
            
            if ((index + 1) % 8 === 0) result += '\n';
        });
        
        // ASCII representation
        result += '\n\nASCII: ';
        bytes.forEach(byte => {
            const decimal = parseInt(byte, 16);
            const char = decimal >= 32 && decimal <= 126 ? String.fromCharCode(decimal) : '.';
            result += char;
        });

        output.textContent = result;
    }

    // Binary Tool
    processBinary() {
        const input = document.getElementById('binary-text-input');
        const binaryResult = document.getElementById('binary-result');
        const decimalResult = document.getElementById('decimal-result');
        const hexResult = document.getElementById('hex-result');
        
        if (!input || !binaryResult || !decimalResult || !hexResult) return;
        
        const text = input.value;
        
        if (!text) {
            binaryResult.textContent = '';
            decimalResult.textContent = '';
            hexResult.textContent = '';
            return;
        }

        // Convert to binary
        let binary = '';
        let decimal = BigInt(0);
        let hex = '';
        
        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i);
            const charBinary = charCode.toString(2).padStart(8, '0');
            binary += charBinary + ' ';
            decimal = (decimal << BigInt(8)) | BigInt(charCode);
            hex += charCode.toString(16).padStart(2, '0').toUpperCase();
        }
        
        binaryResult.textContent = binary.trim();
        decimalResult.textContent = decimal.toString();
        hexResult.textContent = '0x' + hex;
    }

    // Caesar Tool
    processCaesar(decode = false) {
        const input = document.getElementById('caesar-input');
        const shiftInput = document.getElementById('caesar-shift');
        const result = document.getElementById('caesar-result');
        
        if (!input || !shiftInput || !result) return;
        
        const text = input.value;
        const shift = parseInt(shiftInput.value) || 0;
        
        if (!text) {
            result.textContent = '';
            return;
        }

        result.textContent = this.caesarCipher(text, shift, decode);
    }

    caesarCipher(text, shift, decode = false) {
        if (decode) shift = (26 - shift) % 26;
        
        return text.replace(/[A-Z]/g, char => {
            const code = char.charCodeAt(0) - 65;
            return String.fromCharCode(((code + shift) % 26) + 65);
        }).replace(/[a-z]/g, char => {
            const code = char.charCodeAt(0) - 97;
            return String.fromCharCode(((code + shift) % 26) + 97);
        });
    }

    // Frequency Analysis Tool
    analyzeFrequency(text) {
        const input = document.getElementById('frequency-input');
        const chartContainer = document.getElementById('frequency-chart');
        const statsContainer = document.getElementById('frequency-stats');
        
        if (!input || !chartContainer || !statsContainer) return;
        
        const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
        
        if (!cleanText) {
            chartContainer.innerHTML = '<p style="color: var(--text-muted);">Ingresa texto para analizar</p>';
            statsContainer.innerHTML = '';
            return;
        }

        // Calculate frequencies
        const frequencies = {};
        const total = cleanText.length;
        
        for (const char of cleanText) {
            frequencies[char] = (frequencies[char] || 0) + 1;
        }

        // Sort by frequency
        const sorted = Object.entries(frequencies)
            .sort((a, b) => b[1] - a[1]);

        // Create chart
        chartContainer.innerHTML = '';
        sorted.forEach(([char, count]) => {
            const bar = document.createElement('div');
            bar.className = 'frequency-bar';
            bar.style.height = `${(count / total) * 100}%`;
            bar.title = `${char}: ${((count / total) * 100).toFixed(2)}%`;
            chartContainer.appendChild(bar);
        });

        // Show statistics
        let statsHtml = `
            <div><strong>Longitud:</strong> ${total} caracteres</div>
            <div><strong>Caracteres únicos:</strong> ${sorted.length}</div>
            <div><strong>Más frecuente:</strong> ${sorted[0][0]} (${((sorted[0][1] / total) * 100).toFixed(2)}%)</div>
            <div style="margin-top: 0.5rem;"><strong>Distribución:</strong></div>
        `;

        sorted.slice(0, 5).forEach(([char, count]) => {
            statsHtml += `<div>${char}: ${((count / total) * 100).toFixed(1)}% ${'█'.repeat(Math.floor(count / total * 20))}</div>`;
        });

        statsContainer.innerHTML = statsHtml;

        // Suggest possible Caesar shift
        const englishFreq = { 'E': 12.7, 'T': 9.1, 'A': 8.2, 'O': 7.5, 'I': 7.0, 'N': 6.7, 'S': 6.3, 'H': 6.1, 'R': 6.0, 'D': 4.3 };
        const mostFrequent = sorted[0][0];
        
        if (englishFreq[mostFrequent]) {
            statsContainer.innerHTML += `<div style="margin-top: 1rem; color: var(--accent-green);">Posible desplazamiento César: ${(englishFreq[mostFrequent] - parseInt(englishFreq[mostFrequent]) || 0)}</div>`;
        }
    }

    // RSA Tool
    calculateRSA() {
        const nInput = document.getElementById('rsa-n');
        const eInput = document.getElementById('rsa-e');
        const pInput = document.getElementById('rsa-p');
        const qInput = document.getElementById('rsa-q');
        const resultsContainer = document.getElementById('rsa-results');
        
        if (!nInput || !eInput || !resultsContainer) return;
        
        const n = BigInt(nInput.value);
        const e = BigInt(eInput.value);
        const p = pInput.value ? BigInt(pInput.value) : null;
        const q = qInput.value ? BigInt(qInput.value) : null;
        
        if (!n || !e) {
            alert('Por favor ingresa N y e');
            return;
        }

        // If p and q not provided, try to factorize
        let phi, d;
        
        if (p && q) {
            phi = (p - BigInt(1)) * (q - BigInt(1));
        } else {
            // Try simple factorization
            const factors = this.factorize(Number(n));
            if (factors.length >= 2) {
                p = BigInt(factors[0]);
                q = BigInt(factors[factors.length - 1]);
                phi = (p - BigInt(1)) * (q - BigInt(1));
            } else {
                alert('No se pudieron factorizar los primos. Proporciona p y q manualmente.');
                return;
            }
        }

        // Calculate d = e^-1 mod phi
        d = this.modInverse(e, phi);

        // Display results
        const phiEl = document.getElementById('rsa-phi');
        const dEl = document.getElementById('rsa-d');
        
        if (phiEl) phiEl.textContent = phi.toString();
        if (dEl) dEl.textContent = d.toString();
        
        resultsContainer.classList.remove('hidden');
    }

    factorize(n) {
        const factors = [];
        
        // Check 2
        while (n % 2 === 0) {
            factors.push(2);
            n /= 2;
        }
        
        // Check odd numbers
        for (let i = 3; i <= Math.sqrt(n); i += 2) {
            while (n % i === 0) {
                factors.push(i);
                n /= i;
            }
        }
        
        if (n > 2) {
            factors.push(n);
        }
        
        return factors;
    }

    extendedGCD(a, b) {
        if (b === 0n) return { x: 1n, y: 0n, gcd: a };
        const { x: x1, y: y1, gcd } = this.extendedGCD(b, a % b);
        return {
            x: y1,
            y: x1 - (a / b) * y1,
            gcd
        };
    }

    modInverse(e, phi) {
        const { x } = this.extendedGCD(e, phi);
        return ((x % phi) + phi) % phi;
    }

    // Runes Tool
    decodeRunes(runes) {
        const input = document.getElementById('runes-input');
        const result = document.getElementById('runes-result');
        
        if (!input || !result) return;
        
        const runeInput = runes || input.value;
        
        if (!runeInput) {
            result.textContent = '';
            return;
        }

        result.textContent = this.runesToLatin(runeInput);
    }

    runesToLatin(runes) {
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

    latinToRunes(text) {
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

    // LSB Steganography Helpers
    textToBits(text) {
        const bits = [];
        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i);
            for (let j = 7; j >= 0; j--) {
                bits.push((charCode >> j) & 1);
            }
        }
        return bits;
    }

    bitsToText(bits) {
        let text = '';
        for (let i = 0; i + 8 <= bits.length; i += 8) {
            let charCode = 0;
            for (let j = 0; j < 8; j++) {
                charCode = (charCode << 1) | bits[i + j];
            }
            if (charCode >= 32 && charCode <= 126) {
                text += String.fromCharCode(charCode);
            }
        }
        return text;
    }

    // Generate LSB image
    generateLSBImage(message, width = 200, height = 100) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(1, '#16213e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Add decorative elements
        for (let i = 0; i < 30; i++) {
            ctx.fillStyle = `hsla(${Math.random() * 360}, 50%, 50%, 0.2)`;
            ctx.beginPath();
            ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 20 + 5, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Embed message in blue channel LSB
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        const messageBits = this.textToBits(message);
        
        for (let i = 0; i < messageBits.length && i < data.length / 4; i++) {
            data[i * 4 + 2] = (data[i * 4 + 2] & 0xFE) | messageBits[i];
        }
        
        ctx.putImageData(imageData, 0, 0);
        
        return canvas.toDataURL();
    }

    // DCT helpers
    computeDCT(block) {
        // Simplified 2D DCT for 8x8 block
        const N = 8;
        const result = [];
        
        for (let u = 0; u < N; u++) {
            for (let v = 0; v < N; v++) {
                let sum = 0;
                
                for (let x = 0; x < N; x++) {
                    for (let y = 0; y < N; y++) {
                        sum += block[x][y] * Math.cos((2 * x + 1) * u * Math.PI / (2 * N)) * 
                                      Math.cos((2 * y + 1) * v * Math.PI / (2 * N));
                    }
                }
                
                let cu = u === 0 ? 1 / Math.sqrt(2) : 1;
                let cv = v === 0 ? 1 / Math.sqrt(2) : 1;
                
                result[u][v] = 0.25 * cu * cv * sum;
            }
        }
        
        return result;
    }

    // Frequency analysis for audio steganography simulation
    analyzeAudioSpectrum(samples) {
        const fftSize = 1024;
        const spectrum = new Array(fftSize / 2).fill(0);
        
        // Simplified FFT-like analysis
        for (let i = 0; i < spectrum.length; i++) {
            let real = 0, imag = 0;
            for (let j = 0; j < fftSize; j++) {
                const angle = (2 * Math.PI * i * j) / fftSize;
                real += samples[j] * Math.cos(angle);
                imag -= samples[j] * Math.sin(angle);
            }
            spectrum[i] = Math.sqrt(real * real + imag * imag) / fftSize;
        }
        
        return spectrum;
    }

    // Generate pseudo-random sequence for spreading
    generatePRN(sequence, key) {
        // LFSR-like pseudo-random sequence
        let state = key;
        const result = [];
        
        for (let i = 0; i < sequence.length; i++) {
            state = (state * 1103515245 + 12345) & 0x7fffffff;
            result.push((state >> 16) & 1);
        }
        
        return result;
    }
}

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CryptoTools;
}
