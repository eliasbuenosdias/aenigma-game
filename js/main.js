// AENIGMA: The Evolution of Secrets - Main Game Controller
// Orchestrates all game components and manages user interactions

class AenigmaGame {
    constructor() {
        this.gameState = {
            currentLevel: 1,
            completedLevels: [],
            unlockedLevels: [1],
            achievements: {},
            usedHints: {},
            totalTime: 0,
            isActive: false
        };

        this.timerInterval = null;
        this.terminalHistory = [];
        this.terminalHistoryIndex = -1;

        this.init();
    }

    init() {
        // Initialize components
        this.levelManager = new LevelManager(GAME_DATA, this.gameState);
        this.cryptoTools = new CryptoTools();

        // Setup event listeners
        this.setupEventListeners();

        // Setup terminal
        this.setupTerminal();

        // Load saved progress or start fresh
        if (!this.levelManager.loadProgress()) {
            // First time playing
            console.log('AENIGMA: New game started');
        }

        // Show loading screen
        this.showLoadingScreen();
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const progressFill = document.getElementById('progress-fill');
        const loaderStatus = document.getElementById('loader-status');
        
        const steps = [
            'Cargando módulos criptográficos...',
            'Inicializando motor de esteganografía...',
            'Preparando niveles...',
            'Configurando herramientas...',
            'Sincronizando sistema de progreso...',
            '¡Listo para comenzar!'
        ];

        let currentStep = 0;
        
        const loadInterval = setInterval(() => {
            const progress = ((currentStep + 1) / steps.length) * 100;
            progressFill.style.width = `${progress}%`;
            
            if (currentStep < steps.length) {
                loaderStatus.textContent = steps[currentStep];
            }
            
            currentStep++;
            
            if (currentStep > steps.length) {
                clearInterval(loadInterval);
                
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    document.getElementById('main-container').classList.remove('hidden');
                    this.startGame();
                }, 500);
            }
        }, 300);
    }

    startGame() {
        this.gameState.isActive = true;
        
        // Start timer
        this.startTimer();
        
        // Update UI
        this.levelManager.updateLevelNavigation();
        
        // Show intro panel initially
        this.showIntro();
        
        // Log welcome message
        this.logToTerminal('AENIGMA v1.0 - Sistema inicializado');
        this.logToTerminal('Bienvenido, Guardián del Conocimiento Oculto');
        this.logToTerminal('Usa "help" para ver comandos disponibles');
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.gameState.totalTime++;
            this.updateTimerDisplay();
            
            // Save progress periodically
            if (this.gameState.totalTime % 60 === 0) {
                this.levelManager.saveProgress();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }

    updateTimerDisplay() {
        const timerEl = document.getElementById('game-timer');
        if (timerEl) {
            const hours = Math.floor(this.gameState.totalTime / 3600);
            const minutes = Math.floor((this.gameState.totalTime % 3600) / 60);
            const seconds = this.gameState.totalTime % 60;
            
            timerEl.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    setupEventListeners() {
        // Start button
        const startBtn = document.getElementById('start-btn');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.hideIntro();
                this.loadCurrentLevel();
            });
        }

        // Level navigation
        document.querySelectorAll('.level-item').forEach(item => {
            item.addEventListener('click', () => {
                const levelNum = parseInt(item.dataset.level);
                if (this.gameState.unlockedLevels.includes(levelNum)) {
                    this.loadLevel(levelNum);
                }
            });
        });

        // Tool buttons
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tool = btn.dataset.tool;
                this.openTool(tool);
            });
        });

        // Answer submission
        const answerInput = document.getElementById('level-answer');
        const submitBtn = document.getElementById('submit-answer');
        
        if (answerInput) {
            answerInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.submitAnswer(answerInput.value);
                }
            });
        }
        
        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                if (answerInput) {
                    this.submitAnswer(answerInput.value);
                }
            });
        }
    }

    setupTerminal() {
        const terminalInput = document.getElementById('terminal-input');
        
        if (terminalInput) {
            terminalInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const command = terminalInput.value.trim();
                    if (command) {
                        this.executeTerminalCommand(command);
                        this.terminalHistory.push(command);
                        this.terminalHistoryIndex = this.terminalHistory.length;
                    }
                    terminalInput.value = '';
                } else if (e.key === 'ArrowUp') {
                    if (this.terminalHistoryIndex > 0) {
                        this.terminalHistoryIndex--;
                        terminalInput.value = this.terminalHistory[this.terminalHistoryIndex];
                    }
                } else if (e.key === 'ArrowDown') {
                    if (this.terminalHistoryIndex < this.terminalHistory.length - 1) {
                        this.terminalHistoryIndex++;
                        terminalInput.value = this.terminalHistory[this.terminalHistoryIndex];
                    } else {
                        this.terminalHistoryIndex = this.terminalHistory.length;
                        terminalInput.value = '';
                    }
                }
            });
        }
    }

    executeTerminalCommand(command) {
        const parts = command.split(' ');
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);
        
        // Log command
        this.logToTerminal(`➜ ${command}`, 'command');
        
        // Execute command
        if (GAME_DATA.terminalCommands[cmd]) {
            const result = GAME_DATA.terminalCommands[cmd].execute(this.gameState, args);
            this.logToTerminal(result, 'system');
        } else if (cmd === 'level' && args[0]) {
            const levelNum = parseInt(args[0]);
            if (levelNum >= 1 && levelNum <= GAME_DATA.totalLevels) {
                if (this.gameState.unlockedLevels.includes(levelNum)) {
                    this.loadLevel(levelNum);
                    this.logToTerminal(`Nivel ${levelNum} cargado`, 'success');
                } else {
                    this.logToTerminal(`Nivel ${levelNum} bloqueado. Completa niveles anteriores primero.`, 'error');
                }
            } else {
                this.logToTerminal(`Nivel inválido. Usa: level [1-${GAME_DATA.totalLevels}]`, 'error');
            }
        } else if (cmd === 'reset') {
            if (confirm('¿Estás seguro de que quieres reiniciar el progreso?')) {
                this.levelManager.resetGame();
                this.logToTerminal('Juego reiniciado', 'success');
            }
        } else if (cmd === 'hint') {
            const hint = GAME_DATA.terminalCommands.hint.execute(this.gameState);
            this.logToTerminal(hint, 'hint');
        } else {
            this.logToTerminal(`Comando desconocido: ${cmd}. Usa "help" para ver comandos disponibles.`, 'error');
        }
    }

    logToTerminal(message, type = '') {
        const terminalOutput = document.getElementById('terminal-output');
        if (!terminalOutput) return;
        
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        line.textContent = message;
        
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    showIntro() {
        document.getElementById('intro-panel').classList.remove('hidden');
        document.getElementById('intro-panel').classList.add('active');
        document.getElementById('level-container').classList.add('hidden');
        document.getElementById('terminal-panel').classList.add('hidden');
    }

    hideIntro() {
        document.getElementById('intro-panel').classList.add('hidden');
        document.getElementById('intro-panel').classList.remove('active');
        document.getElementById('terminal-panel').classList.remove('hidden');
    }

    loadCurrentLevel() {
        this.loadLevel(this.gameState.currentLevel);
    }

    loadLevel(levelNum) {
        // Hide intro, show level
        this.hideIntro();
        
        document.getElementById('intro-panel').classList.add('hidden');
        document.getElementById('level-container').classList.remove('hidden');
        
        // Load level content
        this.levelManager.loadLevel(levelNum);
        
        // Log to terminal
        this.logToTerminal(`Cargando nivel ${levelNum}: ${GAME_DATA.levels[levelNum - 1].title}`, 'system');
        
        // Clear and focus answer input
        const answerInput = document.getElementById('level-answer');
        if (answerInput) {
            answerInput.value = '';
            answerInput.focus();
        }
    }

    submitAnswer(answer) {
        if (!answer || !answer.trim()) {
            this.showFeedback('error', 'Por favor ingresa una respuesta');
            return;
        }

        const isCorrect = this.levelManager.checkAnswer(answer.trim());

        if (isCorrect) {
            this.showFeedback('success', '¡Correcto! Nivel completado.');
            this.logToTerminal(`Respuesta correcta: ${answer}`, 'success');
        } else {
            this.showFeedback('error', 'Incorrecto. Intenta de nuevo.');
            this.logToTerminal(`Intento fallido: ${answer}`, 'error');
            
            // Add shake effect to input
            const answerInput = document.getElementById('level-answer');
            if (answerInput) {
                answerInput.classList.add('shake');
                setTimeout(() => answerInput.classList.remove('shake'), 500);
            }
        }
    }

    showFeedback(type, message) {
        const feedback = document.getElementById('input-feedback');
        if (!feedback) return;
        
        feedback.className = `feedback ${type}`;
        feedback.textContent = message;
        feedback.classList.remove('hidden');
        
        // Auto-hide after delay for error messages
        if (type === 'error') {
            setTimeout(() => {
                feedback.classList.add('hidden');
            }, 3000);
        }
    }

    openTool(tool) {
        const toolPanel = document.getElementById(`${tool}-tool`);
        if (toolPanel) {
            toolPanel.classList.remove('hidden');
            this.logToTerminal(`Herramienta abierta: ${tool}`, 'system');
        }
    }

    // Achievement management
    unlockAchievement(achievementId) {
        if (this.gameState.achievements[achievementId]) {
            return false; // Already unlocked
        }
        
        this.gameState.achievements[achievementId] = true;
        const achievement = GAME_DATA.achievements[achievementId];
        
        this.showAchievementNotification(achievement);
        this.logToTerminal(`¡Logro desbloqueado: ${achievement.name}!`, 'success');
        
        this.levelManager.saveProgress();
        return true;
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <div style="font-size: 2rem;">${achievement.icon}</div>
                <div>
                    <div style="color: var(--accent-gold); font-weight: 600;">¡Logro Desbloqueado!</div>
                    <div style="color: var(--text-secondary);">${achievement.name}</div>
                </div>
            </div>
        `;
        notification.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            padding: 1rem 1.5rem;
            background: var(--bg-secondary);
            border: 2px solid var(--accent-gold);
            border-radius: 12px;
            box-shadow: 0 0 30px rgba(251, 191, 36, 0.3);
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    }

    // Game completion
    checkGameCompletion() {
        if (this.gameState.completedLevels.length === GAME_DATA.totalLevels) {
            this.stopTimer();
            this.gameState.isActive = false;
            
            // Unlock master achievement
            this.unlockAchievement('enigmaMaster');
            
            // Check for speed runner
            if (this.gameState.totalTime < 7200) { // 2 hours
                this.unlockAchievement('speedRunner');
            }
            
            // Check for perfect score
            const totalHintsUsed = Object.values(this.gameState.usedHints).reduce((a, b) => a + b, 0);
            if (totalHintsUsed === 0) {
                this.unlockAchievement('perfectScore');
            }
            
            this.levelManager.showGameCompleteModal();
        }
    }

    // Save/Load
    saveGame() {
        const saveData = {
            gameState: this.gameState,
            timestamp: Date.now()
        };
        
        localStorage.setItem('aenigma_save', JSON.stringify(saveData));
        this.logToTerminal('Juego guardado', 'system');
    }

    loadGame() {
        const saveData = localStorage.getItem('aenigma_save');
        if (saveData) {
            try {
                const data = JSON.parse(saveData);
                this.gameState = data.gameState;
                this.levelManager.gameState = this.gameState;
                
                // Restore UI state
                this.levelManager.updateLevelNavigation();
                this.updateTimerDisplay();
                
                this.logToTerminal('Juego cargado desde guardado', 'system');
                return true;
            } catch (e) {
                console.error('Error loading save:', e);
            }
        }
        return false;
    }

    // Cleanup
    destroy() {
        this.stopTimer();
        
        // Remove event listeners
        document.querySelectorAll('.level-item').forEach(item => {
            item.replaceWith(item.cloneNode(true));
        });
        
        console.log('AENIGMA: Game destroyed');
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.game = new AenigmaGame();
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    .shake {
        animation: shake 0.5s ease;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Auto-save every 30 seconds
setInterval(() => {
    if (window.game && window.game.gameState.isActive) {
        window.game.saveGame();
    }
}, 30000);

// Warn before leaving
window.addEventListener('beforeunload', (e) => {
    if (window.game && window.game.gameState.isActive) {
        const message = '¿Estás seguro de que quieres salir? Tu progreso se perderá si no has guardado.';
        e.returnValue = message;
        return message;
    }
});
