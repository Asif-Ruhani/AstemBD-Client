import React, { useEffect, useRef } from 'react';
import useAuth from './useAuth';

const useHardenedShield = () => {
  const auth = useAuth();
  const user = auth?.user;

  // Track physical key state and throttle
  const isShiftDown = useRef(false);
  const isMetaDown = useRef(false);
  const lastLoggedAt = useRef(0);

  const triggerAuditLog = async (triggerType) => {
    // 800ms cooldown to prevent duplicate log bursts
    const now = Date.now();
    if (now - lastLoggedAt.current < 800) return;
    lastLoggedAt.current = now;

    if (!user || typeof user.getIdToken !== 'function') return;

    try {
      const token = await user.getIdToken();
      await fetch('https://astembd-server.onrender.com/audit/screenshot-detected', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          trigger: triggerType,
          pageUrl: window.location.pathname,
          screenResolution: `${window.screen.width}x${window.screen.height}`,
          capturedAt: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error('Audit send error:', err);
    }
  };

  useEffect(() => {
    // 1. Right-Click Prevention
    const handleContextMenu = (e) => {
      e.preventDefault();
      triggerAuditLog('RIGHT_CLICK_MENU');
    };

    // 2. Keydown: Monitor modifiers, PrintScreen, and DevTools/shortcuts
    const handleKeyDown = (e) => {
      // Track modifiers (checks both key name and standard physical code)
      if (e.key === 'Shift' || e.code?.includes('Shift')) {
        isShiftDown.current = true;
      }
      if (e.key === 'Meta' || e.key === 'OS' || e.code?.includes('Meta') || e.altKey) {
        isMetaDown.current = true;
      }

      // PrintScreen on keydown (catches immediately on Linux / standard keyboards)
      if (e.key === 'PrintScreen' || e.code === 'PrintScreen' || e.key === 'Snapshot') {
        triggerAuditLog('PRINT_SCREEN_KEY');
        if (navigator.clipboard?.writeText) {
          navigator.clipboard.writeText('');
        }
      }

      // DevTools & source inspection prevention
      if (e.key === 'F12') {
        e.preventDefault();
        triggerAuditLog('DEVTOOLS_F12');
      }

      if (
        (e.ctrlKey || e.metaKey) &&
        (e.shiftKey || isShiftDown.current) &&
        ['i', 'j', 'c'].includes(e.key?.toLowerCase())
      ) {
        e.preventDefault();
        triggerAuditLog('DEVTOOLS_SHORTCUT');
      }

      // Print / PDF export
      if ((e.ctrlKey || e.metaKey) && e.key?.toLowerCase() === 'p') {
        e.preventDefault();
        triggerAuditLog('PRINT_OR_PDF_TRIGGER');
      }
    };

    // 3. Keyup: Essential for Windows PrintScreen
    const handleKeyUp = (e) => {
      if (e.key === 'PrintScreen' || e.code === 'PrintScreen' || e.key === 'Snapshot') {
        triggerAuditLog('PRINT_SCREEN_KEY');
        if (navigator.clipboard?.writeText) {
          navigator.clipboard.writeText('');
        }
      }

      if (e.key === 'Shift' || e.code?.includes('Shift')) {
        isShiftDown.current = false;
      }
      if (e.key === 'Meta' || e.key === 'OS' || e.code?.includes('Meta') || !e.altKey) {
        isMetaDown.current = false;
      }
    };

    // 4. Catches Windows Snipping Tool (Win + Shift + S)
    // Windows steals OS focus before sending 'S', so blur fires while Shift or Meta is engaged
    const handleWindowBlur = () => {
      if (isShiftDown.current || isMetaDown.current) {
        triggerAuditLog('SNIPPING_TOOL_DEFOCUS');
      }
      isShiftDown.current = false;
      isMetaDown.current = false;
    };

    // Use capture phase (true) so listeners trigger before any child elements block propagation
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keyup', handleKeyUp, true);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('keyup', handleKeyUp, true);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [user]);
};

export default useHardenedShield;