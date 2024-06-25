import React from "react";
import "../../input.css";
import "../../index.css";
const BlockQuote = () => {
  return (
    <blockquote className="w-1/2 relative border-s-4 ps-4 sm:ps-6 dark:border-neutral-700 pt-10 ms-4">
      <p className="text-gray-800 sm:text-xl dark:text-white">
        <em>
          I just wanted to say that I'm very happy with my purchase so far. The
          documentation is outstanding - clear and detailed.
        </em>
      </p>

      <footer className="mt-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img
              className="size-10 rounded-full"
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
              alt="Image Description"
            />
          </div>
          <div className="ms-4">
            <div className="text-base font-semibold text-gray-800 dark:text-neutral-400">
              Josh Grazioso
            </div>
            <div className="text-xs text-gray-500 dark:text-neutral-500">
              Source title
            </div>
          </div>
        </div>
      </footer>
    </blockquote>
  );
};
export default BlockQuote;
