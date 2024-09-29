import { useState, useEffect, RefObject } from 'react';

export function useResizeObserver(divRef: RefObject<HTMLElement>) {
  const WIDTH_XL_SIZE = 1200;
  const [navPrsHeight, setNavPrsHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    function calculateHeight() {
      if (divRef) {
        const container = divRef.current?.parentElement!;
        if (container) {
          if (container.clientWidth < WIDTH_XL_SIZE) {
            setNavPrsHeight(undefined);
          } else {
            const divHeight = divRef.current!.clientHeight - 12;
            setNavPrsHeight(divHeight);
          }
        }
      }
    }

    // Set up a ResizeObserver to dynamically adjust navPrsHeight based on divRef's height changes
    const resizeObserver = new ResizeObserver(calculateHeight);
    if (divRef.current) {
      resizeObserver.observe(divRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [divRef]);

  return navPrsHeight;
}