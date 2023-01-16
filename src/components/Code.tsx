import { createRef, ComponentChildren } from "preact";
import { signal, computed } from "@preact/signals";

const Code = ({ children, ...props }: { children: ComponentChildren }) => {
  const snippetRef = createRef<HTMLPreElement>();
  const timeoutRef = createRef<ReturnType<typeof setTimeout>>();
  const hasBeenCopiedRecently = signal(false);

  const buttonText = computed(() => {
    return hasBeenCopiedRecently.value ? "Copied!" : "Copy";
  });

  const copyToClipboard = () => {
    let snippet = snippetRef.current;
    let area = document.createElement("textarea");
    area.value = snippet ? snippet.innerText : "";
    area.select();
    area.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(area.value);
    hasBeenCopiedRecently.value = true;

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      hasBeenCopiedRecently.value = false;
    }, 1000);
  };

  return (
    <div className="relative group">
      <pre {...props} ref={snippetRef}>
        {children}
      </pre>
      <button
        className="text-sm text-gray-300 bg-gray-700 rounded absolute top-4 right-4 px-2 invisible group-hover:visible"
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
