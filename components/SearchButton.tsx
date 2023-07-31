"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

function SearchButton() {
  const { pending } = useFormStatus();
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-6 py-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed">
      {pending ? "Searching..." : <MagnifyingGlassIcon className="h-5 w-5" />}
    </button>
  );
}

export default SearchButton;
