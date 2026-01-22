// AENIGMA: The Evolution of Secrets - Level Manager
// Handles level loading, interaction, and validation

class LevelManager {
    constructor(gameData, gameState) {
        this.gameData = gameData;
        this.gameState = gameState;
        this.currentLevelData = null;
        this.rotationAngle = 0;
        this.extractedBits = [];
        this.lsbChannel = 'blue';
        this.lsbBit = 0;
        this.dctBlocks = [];
        this.layerProgress = {
            visual: false,
            acoustic: false,
            mathematical: false,
            runic: false,
            geographic: false
        };
    }

    loadLevel(levelId) {
        const levelData = this.gameData.levels.find(l => l.id === levelId);
        if (!levelData) {
            console.error(`Level ${levelId} not found`);
            return;
        }

        this.currentLevelData = levelData;
        this.gameState.currentLevel = levelId;
        this.resetLevelState();

        // Update UI
        this.updateLevelHeader(levelData);
        this.updateArtifactPanel(levelData);
        this.updateToolsPanel(levelData);
        this.updateLevelNavigation();

        // Level-specific initialization
        this.initializeLevelContent(levelData);

        // Add fade-in animation
        document.getElementById('level-container').classList.add('fade-in');
    }

    resetLevelState() {
        this.rotationAngle = 0;
        this.extractedBits = [];
        this.lsbChannel = 'blue';
        this.lsbBit = 0;
        this.dctBlocks = [];
        this.layerProgress = {
            visual: false,
            acoustic: false,
            mathematical: false,
            runic: false,
            geographic: false
        };
    }

    updateLevelHeader(levelData) {
        const difficultyBadge = document.getElementById('level-difficulty');
        document.getElementById('level-title').textContent = `Nivel ${levelData.id}: ${levelData.title}`;
        
        const difficultyLabels = {
            'easy': 'Principiante',
            'medium': 'Intermedio',
            'hard': 'Avanzado',
            'expert': 'Experto',
            'master': 'Maestro'
        };

        difficultyBadge.textContent = difficultyLabels[levelData.difficulty] || levelData.difficulty;
        difficultyBadge.className = `difficulty-badge ${levelData.difficulty}`;
    }

    updateArtifactPanel(levelData) {
        const container = document.getElementById('artifact-container');
        container.innerHTML = '';
        
        // Add level description
        const description = document.createElement('div');
        description.className = 'level-description';
        description.innerHTML = levelData.description;
        description.style.cssText = 'padding: 1rem; max-width: 600px; text-align: center;';
        container.appendChild(description);
    }

    updateToolsPanel(levelData) {
        const container = document.getElementById('analysis-tools');
        container.innerHTML = '';

        if (levelData.tools && levelData.tools.length > 0) {
            levelData.tools.forEach(tool => {
                const toolBtn = document.createElement('button');
                toolBtn.className = 'tool-action-btn';
                toolBtn.textContent = this.getToolName(tool);
                toolBtn.onclick = () => this.openTool(tool);
                container.appendChild(toolBtn);
            });
        }
    }

    getToolName(tool) {
        const toolNames = {
            'hex': 'Editor HEX',
            'binary': 'Conversor BIN',
            'caesar': 'Descifrar CÉSAR',
            'frequency': 'Análisis FREQ',
            'rsa': 'Calculadora RSA',
            'runes': 'Decod RUNAS'
        };
        return toolNames[tool] || tool;
    }

    openTool(tool) {
        const toolPanel = document.getElementById(`${tool}-tool`);
        if (toolPanel) {
            toolPanel.classList.remove('hidden');
        }
    }

    closeTool(tool) {
        const toolPanel = document.getElementById(`${tool}-tool`);
        if (toolPanel) {
            toolPanel.classList.add('hidden');
        }
    }

    initializeLevelContent(levelData) {
        const container = document.getElementById('artifact-container');
        
        switch (levelData.type) {
            case 'interactive':
                this.initInteractiveLevel(levelData, container);
                break;
            case 'text':
                this.initTextLevel(levelData, container);
                break;
            case 'image':
                this.initImageLevel(levelData, container);
                break;
            case 'cryptographic':
                this.initCryptographicLevel(levelData, container);
                break;
            case 'multi-layer':
                this.initMultiLayerLevel(levelData, container);
                break;
            default:
                this.initDefaultLevel(levelData, container);
        }
    }

    initInteractiveLevel(levelData, container) {
        container.innerHTML = '';
        
        if (levelData.id === 1) {
            // Wax tablets level
            const waxContainer = document.createElement('div');
            waxContainer.className = 'wax-tablet-container';
            
            const waxSurface = document.createElement('div');
            waxSurface.className = 'wax-surface';
            
            const waxLayer = document.createElement('div');
            waxLayer.className = 'wax-layer';
            waxLayer.id = 'wax-layer';
            
            const hiddenMessage = document.createElement('div');
            hiddenMessage.className = 'hidden-message';
            hiddenMessage.innerHTML = `<strong>${levelData.solution}</strong>`;
            
            waxSurface.appendChild(waxLayer);
            waxSurface.appendChild(hiddenMessage);
            waxContainer.appendChild(waxSurface);
            container.appendChild(waxContainer);
            
            // Add scratch effect
            this.setupScratchEffect(waxSurface, waxLayer, levelData.solution);
            
        } else if (levelData.id === 4) {
            // Cardano grille level
            this.initCardanoLevel(levelData, container);
        }
    }

    setupScratchEffect(surface, layer, solution) {
        let scratched = 0;
        const totalPixels = 300 * 400; // Approximate
        
        const scratchHandler = (e) => {
            const rect = surface.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create scratch effect
            const scratch = document.createElement('div');
            scratch.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 30px;
                height: 30px;
                background: radial-gradient(circle, transparent 40%, rgba(166, 124, 82, 0.3) 70%);
                border-radius: 50%;
                pointer-events: none;
                transform: translate(-50%, -50%);
            `;
            layer.appendChild(scratch);
            
            // Reveal underlying content
            layer.style.opacity = Math.max(0, 1 - (++scratched / 5000));
            
            if (scratched > 5000) {
                layer.style.opacity = 0;
                surface.style.cursor = 'default';
            }
        };
        
        surface.addEventListener('mousemove', scratchHandler);
        surface.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            scratchHandler({
                clientX: touch.clientX,
                clientY: touch.clientY
            });
        });
    }

    initCardanoLevel(levelData, container) {
        const cardanoContainer = document.createElement('div');
        cardanoContainer.className = 'cardano-container';
        
        const grilleWrapper = document.createElement('div');
        grilleWrapper.className = 'grille-wrapper';
        
        // Create letter grid
        const letterGrid = document.createElement('div');
        letterGrid.className = 'letter-grid';
        
        const gridData = levelData.gridData.join('');
        for (let i = 0; i < 36; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.textContent = gridData[i];
            letterGrid.appendChild(cell);
        }
        
        // Create overlay with holes
        const overlay = document.createElement('div');
        overlay.className = 'cardan-overlay';
        overlay.id = 'cardano-overlay';
        
        const pattern = levelData.grillePattern;
        const cellSize = 50; // 300px / 6
        
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 6; col++) {
                if (pattern[row][col] === 1) {
                    const hole = document.createElement('div');
                    hole.className = 'hole';
                    hole.style.left = `${col * cellSize}px`;
                    hole.style.top = `${row * cellSize}px`;
                    hole.style.width = `${cellSize - 2}px`;
                    hole.style.height = `${cellSize - 2}px`;
                    overlay.appendChild(hole);
                }
            }
        }
        
        grilleWrapper.appendChild(letterGrid);
        grilleWrapper.appendChild(overlay);
        
        // Controls
        const controls = document.createElement('div');
        controls.className = 'rotation-controls';
        
        const rotateBtn = document.createElement('button');
        rotateBtn.className = 'rotation-btn';
        rotateBtn.textContent = 'Rotar 90°';
        rotateBtn.onclick = () => this.rotateCardanoGrille(overlay, letterGrid, levelData);
        
        const extractBtn = document.createElement('button');
        extractBtn.className = 'rotation-btn';
        extractBtn.textContent = 'Extraer Mensaje';
        extractBtn.onclick = () => this.extractCardanoMessage(overlay, letterGrid, levelData);
        
        controls.appendChild(rotateBtn);
        controls.appendChild(extractBtn);
        
        // Extracted message display
        const messageDisplay = document.createElement('div');
        messageDisplay.className = 'extracted-message';
        messageDisplay.id = 'cardano-message';
        messageDisplay.textContent = 'Gira la rejilla para revelar el mensaje...';
        
        cardanoContainer.appendChild(grilleWrapper);
        cardanoContainer.appendChild(controls);
        cardanoContainer.appendChild(messageDisplay);
        
        container.appendChild(cardanoContainer);
        
        this.cardanoMessage = [];
    }

    rotateCardanoGrille(overlay, letterGrid, levelData) {
        this.rotationAngle = (this.rotationAngle + 90) % 360;
        overlay.style.transform = `rotate(${this.rotationAngle}deg)`;
        
        // Extract visible letters
        this.extractVisibleLetters(overlay, letterGrid, levelData);
    }

    extractVisibleLetters(overlay, letterGrid, levelData) {
        const holes = overlay.querySelectorAll('.hole');
        const cells = letterGrid.querySelectorAll('.grid-cell');
        const pattern = levelData.grillePattern;
        
        // Calculate visible positions based on rotation
        const rotation = this.rotationAngle / 90;
        let visiblePositions = [];
        
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 6; col++) {
                if (pattern[row][col] === 1) {
                    let newRow, newCol;
                    if (rotation === 1) {
                        newRow = col;
                        newCol = 5 - row;
                    } else if (rotation === 2) {
                        newRow = 5 - row;
                        newCol = 5 - col;
                    } else if (rotation === 3) {
                        newRow = 5 - col;
                        newCol = row;
                    } else {
                        newRow = row;
                        newCol = col;
                    }
                    visiblePositions.push(newRow * 6 + newCol);
                }
            }
        }
        
        // Extract letters
        const extracted = [];
        visiblePositions.forEach(pos => {
            extracted.push(cells[pos].textContent);
        });
        
        this.cardanoMessage.push(extracted.join(''));
        
        const messageDisplay = document.getElementById('cardano-message');
        messageDisplay.textContent = `Posición ${this.rotationAngle}°: ${extracted.join('')}`;
    }

    extractCardanoMessage(overlay, letterGrid, levelData) {
        if (this.cardanoMessage.length < 4) {
            const messageDisplay = document.getElementById('cardano-message');
            messageDisplay.textContent = `Gira la rejilla en las 4 posiciones primero (actual: ${this.rotationAngle}°)`;
            return;
        }
        
        const fullMessage = this.cardanoMessage.join('');
        const messageDisplay = document.getElementById('cardano-message');
        messageDisplay.innerHTML = `<strong>Mensaje Extraído:</strong> ${fullMessage}`;
        messageDisplay.style.color = '#00FF41';
        
        // Enable answer input
        document.getElementById('level-answer').dataset.extracted = fullMessage;
    }

    initTextLevel(levelData, container) {
        if (levelData.id === 2) {
            // Acrostic level
            const poemContainer = document.createElement('div');
            poemContainer.className = 'poem-container';
            poemContainer.innerHTML = levelData.poem;
            
            // Add caesar wheel visualization
            const wheelContainer = document.createElement('div');
            wheelContainer.className = 'caesar-wheel';
            wheelContainer.innerHTML = `
                <div class="wheel-ring wheel-outer">
                    <div class="wheel-ring wheel-inner">
                        <div class="wheel-pointer"></div>
                    </div>
                </div>
            `;
            
            container.appendChild(poemContainer);
            container.appendChild(wheelContainer);
        }
    }

    initImageLevel(levelData, container) {
        if (levelData.id === 3) {
            // LSB steganography level
            this.initLSBLevel(levelData, container);
        } else if (levelData.id === 5) {
            // DCT analysis level
            this.initDCTLevel(levelData, container);
        }
    }

    initLSBLevel(levelData, container) {
        const lsbContainer = document.createElement('div');
        lsbContainer.className = 'lsb-container';
        
        // Create image canvas
        const imagePanel = document.createElement('div');
        imagePanel.className = 'lsb-image-panel';
        
        const canvas = document.createElement('canvas');
        canvas.className = 'lsb-canvas';
        canvas.width = 200;
        canvas.height = 100;
        
        // Generate image with hidden message
        const ctx = canvas.getContext('2d');
        this.generateLSBTestImage(ctx, levelData.imageData.embeddedMessage);
        
        const img = new Image();
        img.src = canvas.toDataURL();
        img.className = 'lsb-canvas';
        img.id = 'lsb-image';
        
        imagePanel.appendChild(img);
        
        // Controls
        const controls = document.createElement('div');
        controls.className = 'lsb-controls';
        
        // Channel selector
        const channelSelector = document.createElement('div');
        channelSelector.className = 'channel-selector';
        
        ['Rojo', 'Verde', 'Azul'].forEach((channel, index) => {
            const btn = document.createElement('button');
            btn.className = `channel-btn ${index === 2 ? 'active' : ''}`;
            btn.textContent = channel;
            btn.onclick = () => this.selectLSBChannel(index, btn);
            channelSelector.appendChild(btn);
        });
        
        // Bit selector
        const bitSelector = document.createElement('div');
        bitSelector.className = 'bit-selector';
        
        const bitLabel = document.createElement('label');
        bitLabel.textContent = 'Bit: 0 (LSB)';
        bitLabel.style.color = '#94A3B8';
        bitLabel.style.fontSize = '0.75rem';
        
        const bitSlider = document.createElement('input');
        bitSlider.type = 'range';
        bitSlider.className = 'bit-slider';
        bitSlider.min = 0;
        bitSlider.max = 7;
        bitSlider.value = 0;
        bitSlider.oninput = (e) => {
            this.lsbBit = parseInt(e.target.value);
            bitLabel.textContent = `Bit: ${this.lsbBit} ${this.lsbBit === 0 ? '(LSB)' : ''}`;
            this.updateLSBVisualization();
        };
        
        bitSelector.appendChild(bitLabel);
        bitSelector.appendChild(bitSlider);
        
        // Extract button
        const extractBtn = document.createElement('button');
        extractBtn.className = 'tool-action-btn';
        extractBtn.textContent = 'Extraer Bits';
        extractBtn.onclick = () => this.extractLSBBits(canvas, levelData);
        
        // Result display
        const resultDisplay = document.createElement('div');
        resultDisplay.className = 'lsb-extracted';
        resultDisplay.id = 'lsb-result';
        
        controls.appendChild(channelSelector);
        controls.appendChild(bitSelector);
        controls.appendChild(extractBtn);
        controls.appendChild(resultDisplay);
        
        lsbContainer.appendChild(imagePanel);
        lsbContainer.appendChild(controls);
        
        container.appendChild(lsbContainer);
    }

    generateLSBTestImage(ctx, message) {
        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, 200, 100);
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(1, '#16213e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 200, 100);
        
        // Add decorative elements
        for (let i = 0; i < 20; i++) {
            ctx.fillStyle = `hsla(${Math.random() * 360}, 50%, 50%, 0.3)`;
            ctx.beginPath();
            ctx.arc(Math.random() * 200, Math.random() * 100, Math.random() * 15 + 5, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Embed message in blue channel LSB
        const imageData = ctx.getImageData(0, 0, 200, 100);
        const data = imageData.data;
        const messageBits = this.textToBits(message);
        
        for (let i = 0; i < messageBits.length && i < data.length / 4; i++) {
            data[i * 4 + 2] = (data[i * 4 + 2] & 0xFE) | messageBits[i];
        }
        
        ctx.putImageData(imageData, 0, 0);
        
        // Draw text overlay
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.font = '20px monospace';
        ctx.fillText('IMAGEN DE PRUEBA', 35, 55);
    }

    selectLSBChannel(index, btn) {
        const channels = ['red', 'green', 'blue'];
        this.lsbChannel = channels[index];
        
        document.querySelectorAll('.channel-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }

    updateLSBVisualization() {
        const canvas = document.getElementById('lsb-image');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const channelValue = data[i + ['red', 'green', 'blue'].indexOf(this.lsbChannel)];
            const bitValue = (channelValue >> this.lsbBit) & 1;
            
            if (this.lsbChannel === 'red') {
                data[i] = bitValue * 255;
                data[i + 1] = 0;
                data[i + 2] = 0;
            } else if (this.lsbChannel === 'green') {
                data[i] = 0;
                data[i + 1] = bitValue * 255;
                data[i + 2] = 0;
            } else {
                data[i] = 0;
                data[i + 1] = 0;
                data[i + 2] = bitValue * 255;
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
    }

    extractLSBBits(canvas, levelData) {
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        let bits = [];
        for (let i = 0; i < data.length / 4 && i < levelData.imageData.embeddedMessage.length * 8; i++) {
            bits.push((data[i * 4 + 2] >> this.lsbBit) & 1);
        }
        
        const extractedText = this.bitsToText(bits);
        document.getElementById('lsb-result').textContent = `Extraído: "${extractedText}"`;
    }

    initDCTLevel(levelData, container) {
        const dctContainer = document.createElement('div');
        dctContainer.className = 'dct-container';
        
        // Image panel
        const imagePanel = document.createElement('div');
        imagePanel.className = 'dct-visualizer';
        
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        
        // Generate test image
        const gradient = ctx.createLinearGradient(0, 0, 256, 256);
        gradient.addColorStop(0, '#0D1117');
        gradient.addColorStop(1, '#1E3A5F');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 256);
        
        // Add DCT block visualization
        const spectrum = document.createElement('div');
        spectrum.className = 'dct-spectrum';
        
        const messageChars = levelData.coefficientData.message.split('');
        const blockIndex = levelData.coefficientData.blockPosition;
        
        for (let i = 0; i < 64; i++) {
            const block = document.createElement('div');
            block.className = 'dct-block';
            
            // Embed message in specific blocks
            if (i >= blockIndex && i < blockIndex + messageChars.length) {
                const charCode = messageChars[i - blockIndex].charCodeAt(0);
                const intensity = Math.floor(charCode * 0.5);
                block.style.background = `rgb(${intensity}, ${255 - intensity}, ${intensity})`;
                block.style.boxShadow = '0 0 5px rgba(59, 130, 246, 0.5)';
            } else {
                const intensity = Math.floor(Math.random() * 100);
                block.style.background = `rgb(${intensity * 0.3}, ${intensity * 0.5}, ${intensity})`;
            }
            
            block.onmouseover = () => this.showDCTInfo(block, i);
            spectrum.appendChild(block);
        }
        
        const imageDisplay = new Image();
        imageDisplay.src = canvas.toDataURL();
        imageDisplay.className = 'dct-image';
        
        imagePanel.appendChild(imageDisplay);
        imagePanel.appendChild(spectrum);
        
        // Info panel
        const infoPanel = document.createElement('div');
        infoPanel.className = 'coefficient-info';
        infoPanel.innerHTML = `
            <h4>Análisis DCT</h4>
            <p>Los bloques modificados contienen patrones estadísticos anómalos.</p>
            <p>Examina los bloques con intensidad alterada y extrae los valores.</p>
            <div id="dct-coefficients">
                <p style="color: var(--accent-orange); margin-top: 1rem;">
                    Pista: Los valores de los bloques con color alterado, convertidos a texto ASCII, revelan el mensaje.
                </p>
            </div>
        `;
        
        // Input for solution
        const inputGroup = document.createElement('div');
        inputGroup.className = 'final-input-group';
        inputGroup.style.marginTop = '1rem';
        
        const label = document.createElement('label');
        label.textContent = 'Mensaje extraído de coeficientes:';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'final-input';
        input.id = 'dct-solution';
        input.placeholder = 'Ingresa el mensaje...';
        
        inputGroup.appendChild(label);
        inputGroup.appendChild(input);
        
        dctContainer.appendChild(imagePanel);
        dctContainer.appendChild(infoPanel);
        dctContainer.appendChild(inputGroup);
        
        container.appendChild(dctContainer);
    }

    showDCTInfo(block, index) {
        const info = document.getElementById('dct-coefficients');
        const intensity = parseInt(block.style.background.match(/\d+/)[0]);
        const charCode = Math.round(intensity * 2);
        const char = charCode >= 32 && charCode <= 126 ? String.fromCharCode(charCode) : '?';
        
        info.innerHTML = `
            <div class="coefficient-row">
                <span>Bloque:</span>
                <span>${index}</span>
            </div>
            <div class="coefficient-row">
                <span>Coeficiente:</span>
                <span>${intensity}</span>
            </div>
            <div class="coefficient-row">
                <span>Carácter ASCII:</span>
                <span>${char} (${charCode})</span>
            </div>
        `;
    }

    initCryptographicLevel(levelData, container) {
        if (levelData.id === 6) {
            // RSA + Cicada level
            const rsaContainer = document.createElement('div');
            rsaContainer.className = 'rsa-puzzle-container';
            
            // Runic clue
            const cluePanel = document.createElement('div');
            cluePanel.className = 'rsa-clue';
            cluePanel.innerHTML = `
                <h4>El Enigma de las Runas</h4>
                <p>Las runas antiguas encierran un número. Descifra su significado y encuentra los factores primos.</p>
                <div class="runic-text">${levelData.runes}</div>
            `;
            
            // RSA values display
            const valuesPanel = document.createElement('div');
            valuesPanel.className = 'rsa-values';
            
            const rsaData = levelData.rsaData;
            
            valuesPanel.innerHTML = `
                <div class="rsa-value-item">
                    <label>N (Módulo)</label>
                    <div class="value">${rsaData.N}</div>
                </div>
                <div class="rsa-value-item">
                    <label>e (Exponente Público)</label>
                    <div class="value">${rsaData.e}</div>
                </div>
                <div class="rsa-value-item">
                    <label>Traducción Rúnica</label>
                    <div class="value">${this.runesToLatin(levelData.runes)}</div>
                </div>
            `;
            
            // Instructions
            const instructions = document.createElement('div');
            instructions.style.cssText = 'margin-top: 1rem; padding: 1rem; background: var(--bg-tertiary); border-radius: 8px;';
            instructions.innerHTML = `
                <h4 style="color: var(--accent-purple); margin-bottom: 0.5rem;">Instrucciones:</h4>
                <ol style="padding-left: 1.5rem; color: var(--text-secondary); line-height: 2;">
                    <li>Traduce las runas a letras latinas</li>
                    <li>Convierte el mensaje a número decimal</li>
                    <li>Factoriza N para encontrar p y q</li>
                    <li>Calcula φ(n) = (p-1)(q-1)</li>
                    <li>Calcula d ≡ e⁻¹ (mod φ(n))</li>
                    <li>Usa d para descifrar el mensaje final</li>
                </ol>
            `;
            
            rsaContainer.appendChild(cluePanel);
            rsaContainer.appendChild(valuesPanel);
            rsaContainer.appendChild(instructions);
            
            container.appendChild(rsaContainer);
        }
    }

    initMultiLayerLevel(levelData, container) {
        const enigmaContainer = document.createElement('div');
        enigmaContainer.className = 'enigma-container';
        
        // Layers visualization
        const layersPanel = document.createElement('div');
        layersPanel.className = 'enigma-layers';
        
        levelData.layers.forEach((layer, index) => {
            const layerEl = document.createElement('div');
            layerEl.className = `enigma-layer ${this.layerProgress[layer.id] ? 'completed' : ''}`;
            layerEl.dataset.layer = layer.id;
            
            const icons = {
                'visual': '👁️',
                'acoustic': '🔊',
                'mathematical': '🔢',
                'runic': 'ᚱ',
                'coordinates': '🗺️'
            };
            
            layerEl.innerHTML = `
                <div class="layer-icon">${icons[layer.id] || '🔐'}</div>
                <div class="layer-name">${layer.name}</div>
                <div class="layer-status">${this.layerProgress[layer.id] ? '✓ Completado' : 'Bloqueado'}</div>
            `;
            
            layerEl.onclick = () => this.activateLayer(layer.id, layerData);
            layersPanel.appendChild(layerEl);
        });
        
        // Final input section
        const finalSection = document.createElement('div');
        finalSection.className = 'enigma-final-input';
        finalSection.innerHTML = `
            <div class="final-input-group">
                <label>Capa Visual:</label>
                <input type="text" class="final-input" id="final-visual" placeholder="Letra 1..." disabled>
            </div>
            <div class="final-input-group">
                <label>Capa Acústica:</label>
                <input type="text" class="final-input" id="final-acoustic" placeholder="Letra 2..." disabled>
            </div>
            <div class="final-input-group">
                <label>Capa Matemática:</label>
                <input type="text" class="final-input" id="final-mathematical" placeholder="Letra 3..." disabled>
            </div>
            <div class="final-input-group">
                <label>Capa Rúnica:</label>
                <input type="text" class="final-input" id="final-runic" placeholder="Letra 4..." disabled>
            </div>
            <div class="final-input-group">
                <label>Capa Geográfica:</label>
                <input type="text" class="final-input" id="final-geographic" placeholder="Letra 5..." disabled>
            </div>
        `;
        
        // Map placeholder
        const mapContainer = document.createElement('div');
        mapContainer.className = 'map-container';
        mapContainer.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 0.5rem;">🗺️</div>
                <p>Completa todas las capas para desbloquear el mapa</p>
            </div>
        `;
        mapContainer.id = 'enigma-map';
        
        enigmaContainer.appendChild(layersPanel);
        enigmaContainer.appendChild(finalSection);
        enigmaContainer.appendChild(mapContainer);
        
        container.appendChild(enigmaContainer);
        
        this.enigmaLayers = levelData.layers;
    }

    activateLayer(layerId, layerData) {
        // Show layer-specific content
        console.log(`Activating layer: ${layerId}`);
        
        // Each layer requires specific puzzle solving
        switch (layerId) {
            case 'visual':
                this.activateVisualLayer();
                break;
            case 'acoustic':
                this.activateAcousticLayer();
                break;
            case 'mathematical':
                this.activateMathematicalLayer();
                break;
            case 'runic':
                this.activateRunicLayer();
                break;
            case 'geographic':
                this.activateGeographicLayer();
                break;
        }
    }

    activateVisualLayer() {
        alert('Capa Visual: Busca la imagen con esteganografía LSB. Extrae los bits del canal azul.');
        document.getElementById('final-visual').disabled = false;
    }

    activateAcousticLayer() {
        alert('Capa Acústica: Analiza el espectrograma. Las frecuencias forman un patrón que revela una letra.');
        document.getElementById('final-acoustic').disabled = false;
    }

    activateMathematicalLayer() {
        alert('Capa Matemática: Resuelve la ecuación RSA. El resultado descifra una letra.');
        document.getElementById('final-mathematical').disabled = false;
    }

    activateRunicLayer() {
        alert('Capa Rúnica: Traduce las runas. El mensaje oculta una letra.');
        document.getElementById('final-runic').disabled = false;
    }

    activateGeographicLayer() {
        const mapContainer = document.getElementById('enigma-map');
        mapContainer.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 0.5rem;">📍</div>
                <p style="color: var(--accent-orange);">37.7749° N, 122.4194° W</p>
                <p>San Francisco, California</p>
                <p style="color: var(--text-muted); font-size: 0.875rem;">La letra inicial del nombre revela la posición</p>
            </div>
        `;
        document.getElementById('final-geographic').disabled = false;
    }

    checkAnswer(answer) {
        if (!this.currentLevelData) return false;
        
        const normalizedAnswer = answer.toUpperCase().trim();
        const correctAnswer = this.currentLevelData.solution.toUpperCase();
        
        if (normalizedAnswer === correctAnswer) {
            this.completeLevel();
            return true;
        }
        
        return false;
    }

    completeLevel() {
        const levelId = this.currentLevelData.id;
        
        // Add to completed levels
        if (!this.gameState.completedLevels.includes(levelId)) {
            this.gameState.completedLevels.push(levelId);
        }
        
        // Check for achievements
        this.checkAchievements();
        
        // Update UI
        this.updateLevelNavigation();
        
        // Show completion modal
        this.showCompletionModal();
        
        // Unlock next level
        if (levelId < this.gameData.totalLevels) {
            this.unlockNextLevel(levelId + 1);
        } else {
            // Game complete!
            this.showGameCompleteModal();
        }
        
        // Save progress
        this.saveProgress();
    }

    unlockNextLevel(levelId) {
        this.gameState.unlockedLevels.push(levelId);
        
        // Update navigation
        const nextLevelItem = document.querySelector(`[data-level="${levelId}"]`);
        if (nextLevelItem) {
            nextLevelItem.classList.remove('locked');
            nextLevelItem.querySelector('.level-status').classList.remove('locked');
            nextLevelItem.querySelector('.level-status').classList.add('unlocked');
        }
    }

    updateLevelNavigation() {
        document.querySelectorAll('.level-item').forEach(item => {
            const levelNum = parseInt(item.dataset.level);
            
            // Remove all status classes
            item.classList.remove('active', 'completed', 'locked');
            
            if (this.gameState.completedLevels.includes(levelNum)) {
                item.classList.add('completed');
                item.querySelector('.level-status').classList.remove('locked', 'unlocked');
                item.querySelector('.level-status').classList.add('completed');
            } else if (this.gameState.currentLevel === levelNum) {
                item.classList.add('active');
                item.querySelector('.level-status').classList.remove('locked', 'completed');
                item.querySelector('.level-status').classList.add('unlocked');
            } else if (this.gameState.unlockedLevels.includes(levelNum)) {
                item.querySelector('.level-status').classList.remove('locked');
                item.querySelector('.level-status').classList.add('unlocked');
            } else {
                item.classList.add('locked');
                item.querySelector('.level-status').classList.add('locked');
                item.querySelector('.level-status').classList.remove('unlocked', 'completed');
            }
        });
    }

    showCompletionModal() {
        const modal = document.getElementById('modal-overlay');
        const icon = document.getElementById('modal-icon');
        const title = document.getElementById('modal-title');
        const message = document.getElementById('modal-message');
        const rewards = document.getElementById('modal-rewards');
        const actionBtn = document.getElementById('modal-action');
        
        icon.textContent = '✓';
        title.textContent = `¡Nivel ${this.currentLevelData.id} Completado!`;
        message.innerHTML = this.currentLevelData.explanation;
        
        // Show rewards
        rewards.classList.remove('hidden');
        const rewardsList = document.getElementById('rewards-list');
        rewardsList.innerHTML = `
            <li>✓ Desbloqueado: ${this.currentLevelData.title}</li>
            <li>✓ Siguiente nivel disponible</li>
        `;
        
        actionBtn.textContent = 'Continuar';
        actionBtn.onclick = () => {
            modal.classList.add('hidden');
            
            // Load next level if available
            if (this.currentLevelData.id < this.gameData.totalLevels) {
                this.loadLevel(this.currentLevelData.id + 1);
            }
        };
        
        modal.classList.remove('hidden');
    }

    showGameCompleteModal() {
        const modal = document.getElementById('modal-overlay');
        const icon = document.getElementById('modal-icon');
        const title = document.getElementById('modal-title');
        const message = document.getElementById('modal-message');
        const rewards = document.getElementById('modal-rewards');
        const actionBtn = document.getElementById('modal-action');
        
        icon.textContent = '🏆';
        title.textContent = '¡AENIGMA COMPLETADO!';
        message.innerHTML = `
            <p>Has dominado la evolución del secreto. Desde las tablillas de cera griegas hasta la criptografía moderna, has demostrado ser un verdadero guardián del conocimiento oculto.</p>
            <p style="margin-top: 1rem; color: var(--accent-gold);">
                Bienvenido a la hermandad de AENIGMA.
            </p>
        `;
        
        // Show all achievements
        rewards.classList.remove('hidden');
        const completedAchievements = Object.keys(this.gameState.achievements);
        const rewardsList = document.getElementById('rewards-list');
        
        let achievementsHtml = '';
        Object.values(this.gameData.achievements).forEach(achievement => {
            if (completedAchievements.includes(achievement.id)) {
                achievementsHtml += `<li>${achievement.icon} ${achievement.name}</li>`;
            }
        });
        rewardsList.innerHTML = achievementsHtml || '<li>¡Sin logros obtenidos aún!</li>';
        
        actionBtn.textContent = 'Reiniciar Juego';
        actionBtn.onclick = () => {
            modal.classList.add('hidden');
            this.resetGame();
        };
        
        modal.classList.remove('hidden');
    }

    checkAchievements() {
        const levelId = this.currentLevelData.id;
        
        // First steps achievement
        if (levelId === 1 && !this.gameState.achievements.firstSteps) {
            this.gameState.achievements.firstSteps = true;
            this.showAchievementNotification(this.gameData.achievements.firstSteps);
        }
        
        // Level-specific achievements
        const levelAchievements = {
            1: 'waxMaster',
            2: 'romanScholar',
            3: 'digitalVeil',
            4: 'cardanSolver',
            5: 'dctAnalyst',
            6: 'rsaBreaker',
            7: 'enigmaMaster'
        };
        
        if (levelAchievements[levelId]) {
            const achievementId = levelAchievements[levelId];
            if (!this.gameState.achievements[achievementId]) {
                this.gameState.achievements[achievementId] = true;
                this.showAchievementNotification(this.gameData.achievements[achievementId]);
            }
        }
        
        // Perfect score (no hints used)
        const totalHintsUsed = Object.values(this.gameState.usedHints).reduce((a, b) => a + b, 0);
        if (this.gameData.totalLevels === this.gameState.completedLevels.length && totalHintsUsed === 0) {
            if (!this.gameState.achievements.perfectScore) {
                this.gameState.achievements.perfectScore = true;
                this.showAchievementNotification(this.gameData.achievements.perfectScore);
            }
        }
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-info">
                <div class="achievement-title">¡Logro Desbloqueado!</div>
                <div class="achievement-name">${achievement.name}</div>
            </div>
        `;
        notification.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem 1.5rem;
            background: var(--bg-secondary);
            border: 2px solid var(--accent-gold);
            border-radius: 12px;
            box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    saveProgress() {
        const progress = {
            completedLevels: this.gameState.completedLevels,
            unlockedLevels: this.gameState.unlockedLevels,
            currentLevel: this.gameState.currentLevel,
            achievements: this.gameState.achievements,
            usedHints: this.gameState.usedHints,
            totalTime: this.gameState.totalTime
        };
        
        localStorage.setItem('aenigmaProgress', JSON.stringify(progress));
    }

    loadProgress() {
        const saved = localStorage.getItem('aenigmaProgress');
        if (saved) {
            const progress = JSON.parse(saved);
            this.gameState.completedLevels = progress.completedLevels || [];
            this.gameState.unlockedLevels = progress.unlockedLevels || [1];
            this.gameState.currentLevel = progress.currentLevel || 1;
            this.gameState.achievements = progress.achievements || {};
            this.gameState.usedHints = progress.usedHints || {};
            this.gameState.totalTime = progress.totalTime || 0;
            
            return true;
        }
        return false;
    }

    resetGame() {
        localStorage.removeItem('aenigmaProgress');
        this.gameState = {
            currentLevel: 1,
            completedLevels: [],
            unlockedLevels: [1],
            achievements: {},
            usedHints: {},
            totalTime: 0,
            isActive: false
        };
        
        this.updateLevelNavigation();
        this.loadLevel(1);
    }

    // Utility methods
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
            text += String.fromCharCode(charCode);
        }
        return text;
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
}

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LevelManager;
}
