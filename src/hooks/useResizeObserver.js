import { useEffect, useState } from 'react';

// custom hook - resize
const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState(null);

  useEffect(() => {
    const observeTarget = ref.current;
    // Resize Observer는 인터넷 익스플로어에서는 사용할 수 없음 (Reference Error)
    // resize-observer-polyfill 같은 라이브러리를 설치하여 사용 권장
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setDimensions(entry.contentRect);
      });
    });
    resizeObserver.observe(observeTarget);
    // clean up event
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  return dimensions;
};

export default useResizeObserver;
