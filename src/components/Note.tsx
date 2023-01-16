const Note = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="not-prose rounded-l-sm rounded-r-lg bg-sky-100 text-sky-700 flex p-4 pb-6 pr-5 relative mb-4 before:absolute before:top-0 before:bottom-0 before:left-0 before:w-1 before:bg-sky-200 before:rounded-l-sm dark:text-sky-200 dark:bg-sky-900 dark:bg-opacity-70 dark:before:bg-sky-300 dark:before:bg-opacity-50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width={1.5}
        stroke="currentColor"
        className="h-5 w-5 mt-1.5 ml-1.5 mr-4 flex-shrink-0"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        />
      </svg>

      <div>{children}</div>
    </div>
  );
};

export default Note;
