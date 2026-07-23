import { useCallback, useState } from "react";
import type { KeyboardEvent } from "react";

type UseKeyboardNavOptions = {
  itemCount: number;
  onSelect: (index: number) => void;
  onEscape?: () => void;
};

export function useKeyboardNav({ itemCount, onSelect, onEscape }: UseKeyboardNavOptions) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const reset = useCallback(() => setActiveIndex(-1), []);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (itemCount === 0) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setActiveIndex((i) => (i + 1) % itemCount);
          break;
        case "ArrowUp":
          event.preventDefault();
          setActiveIndex((i) => (i <= 0 ? itemCount - 1 : i - 1));
          break;
        case "Enter":
          if (activeIndex >= 0) {
            event.preventDefault();
            onSelect(activeIndex);
          }
          break;
        case "Escape":
          setActiveIndex(-1);
          onEscape?.();
          break;
      }
    },
    [itemCount, activeIndex, onSelect, onEscape]
  );

  return { activeIndex, setActiveIndex, onKeyDown, reset };
}
