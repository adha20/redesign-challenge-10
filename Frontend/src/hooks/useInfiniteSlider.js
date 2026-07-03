import { useRef, useState, useEffect } from 'react';

export function useInfiniteSlider(items, itemWidthLg = 1069, itemWidthRatioSm = 0.85, paddingSm = 16, autoScrollInterval = 4000) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isInitialized = useRef(false);
  const scrollTimeoutRef = useRef(null);

  const getScrollAmount = () => {
    return window.innerWidth >= 1024 ? itemWidthLg : (window.innerWidth * itemWidthRatioSm) + paddingSm;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
      }
    }, autoScrollInterval);

    return () => clearInterval(timer);
  }, [autoScrollInterval]);

  const handleScrollEvent = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const scrollAmt = getScrollAmount();
      const newIndex = Math.round(scrollLeft / scrollAmt);
      
      const itemCount = items.length;
      if (itemCount === 0) return;

      setActiveIndex(newIndex % itemCount);

      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        if (!scrollRef.current) return;
        
        // Infinite loop adjustment
        if (newIndex >= itemCount * 2) {
          scrollRef.current.scrollLeft = (newIndex - itemCount) * scrollAmt;
        } 
        else if (newIndex <= itemCount - 1 && newIndex > 0) {
          scrollRef.current.scrollLeft = (newIndex + itemCount) * scrollAmt;
        }
      }, 150);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    }
  };

  const scrollTo = (index) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * getScrollAmount(),
        behavior: 'smooth'
      });
    }
  };

  // Set initial position
  useEffect(() => {
    if (items.length > 0 && scrollRef.current && !isInitialized.current) {
      scrollRef.current.scrollLeft = items.length * getScrollAmount();
      isInitialized.current = true;
    }
  }, [items]);

  // Extended items (left, center, right sets)
  const extendedItems = [
    ...items.map((c) => ({ ...c, uniqueId: `set1-${c.id || Math.random()}` })),
    ...items.map((c) => ({ ...c, uniqueId: `set2-${c.id || Math.random()}` })),
    ...items.map((c) => ({ ...c, uniqueId: `set3-${c.id || Math.random()}` }))
  ];

  return {
    scrollRef,
    activeIndex,
    scrollLeft,
    scrollRight,
    scrollTo,
    handleScrollEvent,
    extendedItems
  };
}
