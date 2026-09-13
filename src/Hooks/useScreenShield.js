import { useEffect, useState } from 'react';

export const useScreenShield = (options = { autoRecover: true }) => {
  const [isProtected, setIsProtected] = useState(false);

  useEffect(() => {
    // 1. Triggered when external snipping tools or OS menus steal window focus
    const handleBlur = () => {
      setIsProtected(true);
    };

    // 2. Restore visibility when user clicks back inside the browser
    const handleFocus = () => {
      if (options.autoRecover) {
        setIsProtected(false);
      }
    };

    // 3. Tab switching or minimizing
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsProtected(true);
      } else if (options.autoRecover) {
        setIsProtected(false);
      }
    };

    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [options.autoRecover]);

  return { isProtected, resetShield: () => setIsProtected(false) };
};