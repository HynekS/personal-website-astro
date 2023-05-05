import { createRef, ComponentChildren } from "preact";
import { signal, computed } from "@preact/signals";

const Code = ({ children, ...props }: { children: ComponentChildren }) => {
  const snippetRef = createRef<HTMLPreElement>();
  const timeoutRef = createRef<ReturnType<typeof setTimeout>>();
  const hasBeenCopiedRecently = signal(false);

  const buttonText = computed(() => {
    return hasBeenCopiedRecently.value ? "Copied!" : "Copy";
  });

  const copyToClipboard = async () => {
    let snippet = snippetRef.current;
    let snippetText = snippet?.innerText ?? "";
    await navigator.clipboard.writeText(snippetText);

    hasBeenCopiedRecently.value = true;

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      hasBeenCopiedRecently.value = false;
    }, 1000);
  };

  return (
    <div className="relative group">
      {/* prettier-ignore */}
      <pre {...props} ref={snippetRef}>{children}</pre>
      <button
        className="text-sm text-primary border dark:border-gray-800 dark:bg-primary dark:bg-primary rounded absolute top-4 right-4 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => {
          if (timeoutRef.current) {
            return false;
          } else {
            copyToClipboard();
          }
        }}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Code;
