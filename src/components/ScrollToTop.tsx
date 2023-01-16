import { useEffect, useState } from "preact/hooks";
import { createRef } from "preact";

const ScrollToTop = () => {
  const [treshold, _] = useState(() =>
    globalThis ? globalThis.innerHeight : 1000
  );
  const scrollContainer = globalThis ? globalThis : null;

  const previoulyScrolled = createRef<number>();
  const beforeHideTimeout = createRef<ReturnType<typeof setTimeout>>();
  const bounceInterval = createRef<ReturnType<typeof setInterval>>();

  const [visible, setVisible] = useState(false);
  const [isLoopingAnimation, setIsLoopingAnimation] = useState(false);
  const [shouldPlayAnimation, setShouldPlayAnimation] = useState(false);

  useEffect(() => {
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", throttle(toggleVisible, 200));
      return () => {
        scrollContainer.removeEventListener(
          "scroll",
          throttle(toggleVisible, 300)
        );
      };
    }
  }, [scrollContainer]);

  useEffect(() => {
    function startTimer() {
      bounceInterval.current = setInterval(() => {
        if (!shouldPlayAnimation) setIsLoopingAnimation(false);
      }, 800);
    }
    startTimer();

    return () => {
      if (bounceInterval.current) clearInterval(bounceInterval.current);
    };
  }, [shouldPlayAnimation]);

  const throttle = (cb: Function, timeout = 0) => {
    let inProgress = false;
    return (...args: any) => {
      if (!inProgress) {
        cb(...args);
        inProgress = true;
        setTimeout(() => {
          inProgress = false;
        }, timeout);
      }
    };
  };

  const toggleVisible = () => {
    const currentlyScrolled =
      scrollContainer instanceof Window
        ? scrollContainer?.scrollY
        : scrollContainer?.scrollTop;

    if (
      currentlyScrolled > treshold &&
      currentlyScrolled < previoulyScrolled.current
    ) {
      setVisible(true);
      if (beforeHideTimeout.current) clearTimeout(beforeHideTimeout.current);
      beforeHideTimeout.current = setTimeout(() => {
        setVisible(false);
      }, 2400);
    }
    if (
      currentlyScrolled < treshold ||
      currentlyScrolled >= previoulyScrolled.current
    ) {
      setShouldPlayAnimation(false);
      setVisible(false);
    }
    previoulyScrolled.current = currentlyScrolled;
  };

  const scrollToTop = () => {
    setShouldPlayAnimation(false);
    scrollContainer?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const css = `
  @keyframes bounce-reverse {
    0%, 100% {
      transform: translateY(0);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    50% {
      transform: translateY(-25%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
  }
  `;

  return (
    <>
      <style>{css}</style>
      <button
        onMouseEnter={() => {
          setShouldPlayAnimation(true);
          if (!isLoopingAnimation) {
            setIsLoopingAnimation(true);
          }
        }}
        onMouseLeave={() => {
          setShouldPlayAnimation(false);
          if (bounceInterval.current) clearInterval(bounceInterval.current);
        }}
        class={`fixed bottom-6 right-10 bg-primary origin-center transition-transform shadow-xl rounded-full text-primary flex items-center justify-center border-2 p-3 focus:outline-none focus:ring-0 dark:border-slate-600 ${
          visible || shouldPlayAnimation ? `scale-100` : `scale-0`
        } ${isLoopingAnimation && `[animation:bounce-reverse_0.8s_infinite]`}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </>
  );
};

export default ScrollToTop;
