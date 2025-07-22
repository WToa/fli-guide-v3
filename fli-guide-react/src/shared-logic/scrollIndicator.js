import { useState, useLayoutEffect } from "react";

/**
 * A custom hook that returns true if a referenced element is scrollable
 * and not scrolled to the bottom.
 * @param {React.RefObject<HTMLElement>} elementRef - A ref to the scrollable element.
 * @param {any} dependency - A value that changes when content might change (e.g., tabIndex).
 * @returns {boolean} - True if a scroll indicator should be shown.
 */
export const useScrollIndicator = (elementRef, dependency) => {
   // <-- Add dependency
   const [showArrow, setShowArrow] = useState(false);

   useLayoutEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      const checkScroll = () => {
         const hasScrollbar = element.scrollHeight > element.clientHeight;
         const isScrolledToBottom =
            element.scrollTop + element.clientHeight >=
            element.scrollHeight - 5;

         setShowArrow(hasScrollbar && !isScrolledToBottom);
      };

      checkScroll();
      window.addEventListener("resize", checkScroll);
      element.addEventListener("scroll", checkScroll);

      return () => {
         window.removeEventListener("resize", checkScroll);
         element.removeEventListener("scroll", checkScroll);
      };
   }, [elementRef, dependency]); // <-- Add dependency here

   return showArrow;
};
