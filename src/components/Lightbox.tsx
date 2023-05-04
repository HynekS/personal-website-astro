import { render, h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const attrs = (element: Element) =>
  element.getAttributeNames().reduce((acc, name) => {
    return { ...acc, [name]: element.getAttribute(name) };
  }, {});

let lightboxableNodes = [...document.querySelectorAll("[lightbox]")];

const ChevronLeftIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class={`w-12 h-12 ${props.class || ""}`}
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M15.75 19.5L8.25 12l7.5-7.5"
    />
  </svg>
);

const CloseIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class={`w-12 h-12 ${props.class || ""}`}
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const Lightbox = () => {
  const [elements, _] = useState<Array<Element>>(lightboxableNodes);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const rotateIndexIfOutOfLimits = (i: number, len: number = elements.length) =>
    ((i % len) + len) % len;

  const open = (e: Event) => {
    let targetIndex = elements.findIndex((elem) => elem === e.target);
    document.body.style.paddingRight = "16px";
    disableBodyScroll(document.body);
    setCurrentIndex(targetIndex);
    setIsOpen(true);
  };

  const close = () => {
    document.body.removeAttribute("style");
    enableBodyScroll(document.body);
    setIsOpen(false);
  };

  const handleKeyup = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      return close();
    }
    if (["ArrowRight", "D", "d", "ArrowDown", "S", "s"].includes(e.key)) {
      return setCurrentIndex((prevIndex) =>
        rotateIndexIfOutOfLimits(prevIndex + 1)
      );
    }

    if (["ArrowLeft", "A", "a", "ArrowUp", "W", "w"].includes(e.key)) {
      return setCurrentIndex((prevIndex) =>
        rotateIndexIfOutOfLimits(prevIndex - 1)
      );
    }
  };

  useEffect(() => {
    elements.forEach((element) => element.addEventListener("click", open));

    return () => {
      elements.forEach((element) => element.addEventListener("click", open));
    };
  }, []);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    return () => {
      window.removeEventListener("keyup", handleKeyup);
    };
  }, []);

  return elements.length && isOpen ? (
    <div class="fixed inset-0 px-12 flex items-center justify-center bg-black bg-opacity-75 text-white">
      <button
        onClick={() => {
          setCurrentIndex(rotateIndexIfOutOfLimits(currentIndex - 1));
        }}
        class="flex h-full basis-1/12 items-center justify-start opacity-75 hover:opacity-100"
      >
        <ChevronLeftIcon aria-label="previous" />
      </button>
      <div class="flex flex-1 basis-8/12 justify-center max-h-screen max-w-screen pt-10 pb-10">
        {h(
          elements[currentIndex].nodeName,
          Object.assign(
            {
              width: "1200",
              height: "1200",
            },
            attrs(elements[currentIndex])
          )
        )}
      </div>
      <button
        onClick={() => {
          setCurrentIndex(rotateIndexIfOutOfLimits(currentIndex + 1));
        }}
        class="flex h-full basis-1/12 items-center justify-end opacity-75 hover:opacity-100"
      >
        <ChevronLeftIcon aria-label="next" class="transform rotate-180" />
      </button>
      <button
        class="fixed top-0 right-0 p-8 opacity-75 hover:opacity-100"
        onClick={close}
      >
        <CloseIcon />
      </button>
    </div>
  ) : null;
};

const ConditionalLightbox = () => {
  render(lightboxableNodes.length ? <Lightbox /> : null, document.body);
  return null;
};

export default ConditionalLightbox;
