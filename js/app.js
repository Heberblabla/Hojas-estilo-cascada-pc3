/* ==========================================================================
   CSS MOTION LAB — CONTROLADOR INTERACTIVO VANILLA JS (js/app.js)
   Gestiona la navegación SPA sin recarga, telemetría del cursor, controles
   de laboratorio para las 4 preguntas y simuladores de compatibilidad.
   Las animaciones, transiciones y transformaciones reales residen en CSS.
   ========================================================================== */

(function () {
  'use strict';

  const VALID_VIEWS = ['hub', 'pregunta-1', 'pregunta-2', 'pregunta-3', 'pregunta-4'];
  let currentView = 'hub';

  /* --- 1. Sistema de Navegación Fluida entre Vistas sin Recargar --- */
  function navigateTo(viewId, updateHash = true) {
    const targetId = VALID_VIEWS.includes(viewId) ? viewId : 'hub';
    const sections = document.querySelectorAll('.view-section');
    const navPills = document.querySelectorAll('.nav-pill[data-target]');

    sections.forEach((sec) => {
      if (sec.id === targetId) {
        sec.classList.add('is-visible');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            sec.classList.add('is-active-anim');
          });
        });
      } else {
        sec.classList.remove('is-active-anim', 'is-visible');
      }
    });

    navPills.forEach((pill) => {
      const isMatch = pill.getAttribute('data-target') === targetId;
      pill.classList.toggle('is-active', isMatch);
      pill.setAttribute('aria-current', isMatch ? 'page' : 'false');
    });

    currentView = targetId;

    if (updateHash) {
      try {
        history.replaceState(null, '', '#' + targetId);
      } catch (_) {
        window.location.hash = targetId;
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    const liveStatus = document.getElementById('a11y-live-announcer');
    if (liveStatus) {
      const titles = {
        'hub': 'Menú Principal CSS Motion Lab cargado.',
        'pregunta-1': 'Pregunta 1: Laboratorio de Transiciones Interactivas cargado.',
        'pregunta-2': 'Pregunta 2: Galería de Transformaciones 2D y 3D cargada.',
        'pregunta-3': 'Pregunta 3: Universo Animado Autónomo cargado.',
        'pregunta-4': 'Pregunta 4: CSS Moderno y Compatibilidad Progresiva cargado.'
      };
      liveStatus.textContent = titles[targetId] || '';
    }
  }

  /* --- 2. Eventos de Navegación Global --- */
  function initNavigation() {
    document.addEventListener('click', (e) => {
      const navTrigger = e.target.closest('[data-target]');
      if (navTrigger) {
        e.preventDefault();
        const targetView = navTrigger.getAttribute('data-target');
        navigateTo(targetView, true);
      }
    });

    window.addEventListener('hashchange', () => {
      const rawHash = window.location.hash.replace('#', '');
      if (VALID_VIEWS.includes(rawHash) && rawHash !== currentView) {
        navigateTo(rawHash, false);
      }
    });

    /* Atajos de teclado rápidos: Esc regresa al menú principal */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && currentView !== 'hub') {
        navigateTo('hub', true);
      }
    });

    const initialHash = window.location.hash.replace('#', '');
    if (VALID_VIEWS.includes(initialHash)) {
      navigateTo(initialHash, false);
    } else {
      navigateTo('hub', false);
    }
  }

  /* --- 3. Seguimiento Suave del Cursor e Indicadores del Hub --- */
  function initCursorTelemetry() {
    const coordReadout = document.getElementById('telemetry-coords');
    let rafPending = false;
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;

    window.addEventListener('pointermove', (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(() => {
          document.documentElement.style.setProperty('--cursor-x', lastX + 'px');
          document.documentElement.style.setProperty('--cursor-y', lastY + 'px');
          if (coordReadout) {
            coordReadout.textContent = `X:${String(Math.round(lastX)).padStart(4, '0')} Y:${String(Math.round(lastY)).padStart(4, '0')}`;
          }
          rafPending = false;
        });
      }
    }, { passive: true });
  }

  /* --- 4. Conmutadores Superiores: Inspector de Rúbrica y Reduced Motion --- */
  function initHudToggles() {
    const rubricBtn = document.getElementById('toggle-rubric');
    const motionBtn = document.getElementById('toggle-reduced-motion');

    if (rubricBtn) {
      rubricBtn.addEventListener('click', () => {
        const active = document.body.classList.toggle('show-rubric');
        rubricBtn.setAttribute('aria-pressed', String(active));
      });
    }

    if (motionBtn) {
      motionBtn.addEventListener('click', () => {
        const active = document.body.classList.toggle('simulate-reduced-motion');
        motionBtn.setAttribute('aria-pressed', String(active));
        syncQ4SimulatorButtons();
      });
    }
  }

  /* --- 5. Controles Interactivos de Pregunta 1 (Transiciones) --- */
  function initQuestion1Controls() {
    const q1Section = document.getElementById('pregunta-1');
    const chamber = document.getElementById('q1-timing-chamber');
    const launchBtn = document.getElementById('q1-launch-btn');
    const telemetryLog = document.getElementById('q1-live-telemetry');

    if (!q1Section) return;

    /* Selector de transition-duration */
    q1Section.querySelectorAll('[data-q1-duration]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-q1-duration');
        q1Section.style.setProperty('--q1-duration', val);
        q1Section.querySelectorAll('[data-q1-duration]').forEach((b) => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');
        if (telemetryLog) {
          telemetryLog.textContent = `transition-duration actualizado a ${val}`;
        }
      });
    });

    /* Selector de transition-delay */
    q1Section.querySelectorAll('[data-q1-delay]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-q1-delay');
        q1Section.style.setProperty('--q1-delay-base', val);
        q1Section.querySelectorAll('[data-q1-delay]').forEach((b) => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');
        if (telemetryLog) {
          telemetryLog.textContent = `transition-delay base actualizado a ${val}`;
        }
      });
    });

    /* Disparador persistente de la carrera de curvas de tiempo */
    if (launchBtn && chamber) {
      launchBtn.addEventListener('click', () => {
        const launched = chamber.classList.toggle('is-launched');
        launchBtn.setAttribute('aria-pressed', String(launched));
        launchBtn.querySelector('.q1-launch-label').textContent = launched
          ? 'Reiniciar Posición de Cápsulas'
          : 'Disparar Pulso Cinético';
      });
    }

    /* Registro en vivo de estados :hover, :focus-visible y :active en los 6 módulos */
    q1Section.querySelectorAll('.q1-module-card').forEach((card) => {
      const modName = card.getAttribute('data-mod-name') || 'Módulo';
      const pill = card.querySelector('.q1-mod-state-pill');

      card.addEventListener('pointerenter', () => {
        if (pill) pill.textContent = ':hover ACTIVO';
        if (telemetryLog) telemetryLog.textContent = `${modName} -> Estado :hover activado`;
      });

      card.addEventListener('pointerleave', () => {
        if (pill) pill.textContent = 'IDLE';
      });

      card.addEventListener('focus', () => {
        if (pill) pill.textContent = ':focus-visible';
        if (telemetryLog) telemetryLog.textContent = `${modName} -> Foco de teclado :focus-visible activo`;
      });

      card.addEventListener('blur', () => {
        if (pill) pill.textContent = 'IDLE';
      });

      card.addEventListener('pointerdown', () => {
        if (pill) pill.textContent = ':active PRESIONADO';
        if (telemetryLog) telemetryLog.textContent = `${modName} -> Estado :active (respuesta háptica inmediata)`;
      });

      card.addEventListener('pointerup', () => {
        if (pill) pill.textContent = ':hover ACTIVO';
      });
    });
  }

  /* --- 6. Controles Interactivos de Pregunta 2 (Transformaciones 2D/3D) --- */
  function initQuestion2Controls() {
    const specimen = document.getElementById('q2-sandbox-specimen');
    const codeReadout = document.getElementById('q2-live-css');
    const pin = document.getElementById('q2-origin-pin');
    const q2Section = document.getElementById('pregunta-2');

    if (!q2Section || !specimen) return;

    const presets = {
      'reset': {
        tx: '0px', ty: '0px', scale: '1', rot: '0deg', rx: '0deg', ry: '0deg', skewx: '0deg', skewy: '0deg',
        label: 'transform: translate(0px, 0px) scale(1) rotate(0deg) rotateX(0deg) rotateY(0deg) skew(0deg, 0deg);'
      },
      '3d-tilt': {
        tx: '0px', ty: '-10px', scale: '1.08', rot: '0deg', rx: '28deg', ry: '-32deg', skewx: '0deg', skewy: '0deg',
        label: 'transform: perspective(900px) translate(0px, -10px) scale(1.08) rotateX(28deg) rotateY(-32deg);'
      },
      'skew-slash': {
        tx: '18px', ty: '-8px', scale: '1.06', rot: '-6deg', rx: '0deg', ry: '0deg', skewx: '-16deg', skewy: '4deg',
        label: 'transform: translate(18px, -8px) scale(1.06) rotate(-6deg) skew(-16deg, 4deg);'
      },
      'orbit-spin': {
        tx: '0px', ty: '0px', scale: '1.18', rot: '135deg', rx: '18deg', ry: '18deg', skewx: '0deg', skewy: '0deg',
        label: 'transform: scale(1.18) rotate(135deg) rotateX(18deg) rotateY(18deg);'
      },
      'hyper-combo': {
        tx: '-12px', ty: '-14px', scale: '1.14', rot: '15deg', rx: '24deg', ry: '28deg', skewx: '-8deg', skewy: '2deg',
        label: 'transform: perspective(900px) translate(-12px, -14px) scale(1.14) rotate(15deg) rotateX(24deg) rotateY(28deg) skew(-8deg, 2deg);'
      }
    };

    let currentOrigin = '50% 50%';
    let currentPresetKey = '3d-tilt';

    function updateSandboxReadout() {
      if (!codeReadout) return;
      const preset = presets[currentPresetKey] || presets.reset;
      codeReadout.textContent = `transform-origin: ${currentOrigin}; ${preset.label}`;
    }

    q2Section.querySelectorAll('[data-q2-preset]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-q2-preset');
        const p = presets[key];
        if (!p) return;
        currentPresetKey = key;
        specimen.style.setProperty('--sb-tx', p.tx);
        specimen.style.setProperty('--sb-ty', p.ty);
        specimen.style.setProperty('--sb-scale', p.scale);
        specimen.style.setProperty('--sb-rot', p.rot);
        specimen.style.setProperty('--sb-rx', p.rx);
        specimen.style.setProperty('--sb-ry', p.ry);
        specimen.style.setProperty('--sb-skewx', p.skewx);
        specimen.style.setProperty('--sb-skewy', p.skewy);

        q2Section.querySelectorAll('[data-q2-preset]').forEach((b) => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');
        updateSandboxReadout();
      });
    });

    q2Section.querySelectorAll('[data-q2-origin]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const origin = btn.getAttribute('data-q2-origin');
        const pinX = btn.getAttribute('data-pin-x') || '50%';
        const pinY = btn.getAttribute('data-pin-y') || '50%';
        currentOrigin = origin;
        specimen.style.setProperty('--sb-origin', origin);
        if (pin) {
          pin.style.setProperty('--sb-pin-x', pinX);
          pin.style.setProperty('--sb-pin-y', pinY);
        }
        q2Section.querySelectorAll('[data-q2-origin]').forEach((b) => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');
        updateSandboxReadout();
      });
    });

    /* Botón de volteo 180° accesible para la tarjeta Solaris Core */
    const solarisContainer = document.getElementById('q2-solaris-card');
    q2Section.querySelectorAll('.q2-flip-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (solarisContainer) {
          solarisContainer.classList.toggle('is-flipped');
        }
      });
    });
  }

  /* --- 7. Controles de Observador para Pregunta 3 (Universo Animado) --- */
  function initQuestion3Controls() {
    const q3Section = document.getElementById('pregunta-3');
    const playPauseBtn = document.getElementById('q3-play-pause');
    const stateLabel = document.getElementById('q3-state-label');

    if (!q3Section) return;

    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => {
        const current = q3Section.style.getPropertyValue('--q3-play-state') || 'running';
        const next = current.trim() === 'paused' ? 'running' : 'paused';
        q3Section.style.setProperty('--q3-play-state', next);
        playPauseBtn.setAttribute('aria-pressed', String(next === 'paused'));
        playPauseBtn.textContent = next === 'paused' ? 'Reanudar Animaciones CSS' : 'Pausar Animaciones CSS';
        if (stateLabel) {
          stateLabel.textContent = next === 'paused'
            ? 'ESTADO: PAUSADO (animation-play-state: paused)'
            : 'EJECUCIÓN AUTÓNOMA ACTIVA (14 @keyframes en paralelo)';
        }
      });
    }

    q3Section.querySelectorAll('[data-q3-speed]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const speed = btn.getAttribute('data-q3-speed');
        q3Section.style.setProperty('--q3-speed-scale', speed);
        q3Section.querySelectorAll('[data-q3-speed]').forEach((b) => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');
      });
    });
  }

  /* --- 8. Diagnóstico Real de @supports y Simulador de Pregunta 4 --- */
  function syncQ4SimulatorButtons() {
    const dashboard = document.getElementById('q4-quantum-dashboard');
    const q4Section = document.getElementById('pregunta-4');
    const topMotionBtn = document.getElementById('toggle-reduced-motion');
    if (!q4Section || !dashboard) return;

    const isReduced = document.body.classList.contains('simulate-reduced-motion');
    const isFallback = dashboard.classList.contains('force-fallback');

    q4Section.querySelectorAll('[data-q4-mode]').forEach((btn) => {
      const mode = btn.getAttribute('data-q4-mode');
      let selected = false;
      if (mode === 'reduced' && isReduced) selected = true;
      else if (mode === 'fallback' && !isReduced && isFallback) selected = true;
      else if (mode === 'modern' && !isReduced && !isFallback) selected = true;
      btn.classList.toggle('is-selected', selected);
    });

    if (topMotionBtn) {
      topMotionBtn.setAttribute('aria-pressed', String(isReduced));
    }
  }

  function initQuestion4Controls() {
    const q4Section = document.getElementById('pregunta-4');
    const dashboard = document.getElementById('q4-quantum-dashboard');
    const modeReadout = document.getElementById('q4-active-mode-readout');

    if (!q4Section || !dashboard) return;

    q4Section.querySelectorAll('[data-q4-mode]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-q4-mode');
        if (mode === 'modern') {
          dashboard.classList.remove('force-fallback');
          document.body.classList.remove('simulate-reduced-motion');
          if (modeReadout) modeReadout.textContent = 'Modo Activo: Mejora Progresiva @supports Completa';
        } else if (mode === 'fallback') {
          dashboard.classList.add('force-fallback');
          document.body.classList.remove('simulate-reduced-motion');
          if (modeReadout) modeReadout.textContent = 'Modo Activo: Versión Base Funcional (Reserva sin @supports)';
        } else if (mode === 'reduced') {
          dashboard.classList.remove('force-fallback');
          document.body.classList.add('simulate-reduced-motion');
          if (modeReadout) modeReadout.textContent = 'Modo Activo: @media (prefers-reduced-motion: reduce) Simulado';
        }
        syncQ4SimulatorButtons();
      });
    });

    /* Detección en tiempo real del motor CSS del navegador actual */
    if (window.CSS && typeof window.CSS.supports === 'function') {
      const hasBackdrop = CSS.supports('backdrop-filter', 'blur(20px)') || CSS.supports('-webkit-backdrop-filter', 'blur(20px)');
      const hasColorMix = CSS.supports('background', 'color-mix(in oklch, #2dd4bf 35%, #0f172a)');
      const badgeEl = document.getElementById('telemetry-engine');
      if (badgeEl) {
        badgeEl.textContent = hasBackdrop && hasColorMix ? '@supports 100% OK' : '@supports Base';
      }
    }
  }

  /* --- Inicialización General al Cargar el DOM --- */
  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCursorTelemetry();
    initHudToggles();
    initQuestion1Controls();
    initQuestion2Controls();
    initQuestion3Controls();
    initQuestion4Controls();
  });
})();
