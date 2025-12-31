        const btn = document.getElementById('launch-btn');
        const y2025 = document.getElementById('year-2025');
        const y2026 = document.getElementById('year-2026');
        const hnyText = document.getElementById('hny-text');
        const wishText = document.getElementById('wish-text');
        const subHeader = document.getElementById('sub-header');
        const loadingArea = document.getElementById('loading-area');
        const syncTimer = document.getElementById('sync-timer');
        const fill = document.getElementById('fill');
        const farewell = document.getElementById('farewell-text');
        const creditText = document.getElementById('credit-text');
        const actionSection = document.getElementById('action-section');
        const fwContainer = document.getElementById('fireworks-container');

        let syncInterval;
        let fireworks;

        if (window.Fireworks) {
            fireworks = new Fireworks.default(fwContainer, {
                autoresize: true,
                opacity: 0.6,
                acceleration: 1.02,
                friction: 0.96,
                gravity: 1.5,
                particles: 70,
                traceLength: 3,
                explosion: 6,
                intensity: 40,
                hue: { min: 0, max: 360 },
                delay: { min: 15, max: 30 },
                rocketsPoint: { min: 30, max: 70 },
                lineWidth: { explosion: { min: 1, max: 3 } }
            });
        }

        function startSyncEffect() {
            syncInterval = setInterval(() => {
                const h = Math.floor(Math.random() * 24).toString().padStart(2, '0');
                const m = Math.floor(Math.random() * 60).toString().padStart(2, '0');
                const s = Math.floor(Math.random() * 60).toString().padStart(2, '0');
                const ms = Math.floor(Math.random() * 999).toString().padStart(3, '0');
                syncTimer.innerText = `UTC_SYNC: ${h}:${m}:${s}:${ms}`;
            }, 50);
        }

        btn.addEventListener('click', () => {
            btn.style.display = 'none';
            loadingArea.style.display = 'flex';
            subHeader.classList.add('pulse-sub');
            
            startSyncEffect();
            setTimeout(() => { fill.style.width = '100%'; }, 50);

            setTimeout(() => {
                clearInterval(syncInterval);
                loadingArea.style.display = 'none';

                subHeader.classList.remove('pulse-sub');
                subHeader.style.opacity = "0";
                subHeader.style.pointerEvents = "none";
                
                y2025.style.opacity = "0";
                y2025.style.transform = "scale(0.5)"; 
                y2026.style.opacity = "1";
                y2026.style.transform = "scale(1)";
                y2026.style.filter = "blur(0px)";

                const isPortrait = window.innerHeight > window.innerWidth;
                
                confetti({
                    particleCount: isPortrait ? 250 : 600,
                    spread: isPortrait ? 100 : 200,
                    origin: { y: 0.6 },
                    scalar: isPortrait ? 0.8 : 1.5,
                    colors: ['#fbbf24', '#f472b6', '#60a5fa', '#ffffff']
                });

                if (fireworks) fireworks.start();

                setTimeout(() => {
                    hnyText.style.opacity = "1";
                    hnyText.style.transform = "translateY(0)";
                }, 50); 

                setTimeout(() => { playEndingSequence(); }, 8500);
            }, 3200);
        });

        function playEndingSequence() {
            if (fireworks) {
                fireworks.updateOptions({ intensity: 2 });
                setTimeout(() => fireworks.stop(), 2000);
            }
            
            hnyText.style.transition = "all 1.5s cubic-bezier(0.4, 0, 0.2, 1)";
            hnyText.style.opacity = "0";
            hnyText.style.transform = "translateY(-150px)";
            y2026.style.transition = "all 1.5s cubic-bezier(0.4, 0, 0.2, 1)";
            y2026.style.opacity = "0";
            y2026.style.transform = "translateY(150px)";
            actionSection.style.opacity = "0";

            setTimeout(() => {
                farewell.style.opacity = "1";
                setTimeout(() => {
                    farewell.style.opacity = "0";
                    setTimeout(() => {
                        wishText.style.opacity = "1";
                        setTimeout(() => {
                            wishText.style.opacity = "0";
                            setTimeout(() => {
                                creditText.style.opacity = "1";
                                creditText.style.pointerEvents = "auto";
                            }, 1500);
                        }, 6000);
                    }, 1500);
                }, 5000); 
            }, 1500); 
        }
