import React, { useRef } from "react";

interface Props {
  onSearch: (searchText: string) => void;
}
const SearchInput = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <form
      className="w-3/4"
      onChange={(e) => {
        e.preventDefault();
        if (ref.current) onSearch(ref.current.value);
      }}
    >
      <input
        ref={ref}
        type="search"
        placeholder="Search..."
        className="flex w-full justify-between rounded-lg bg-cyan-50 px-4 py-2 text-left text-sm font-medium text-cyan-900 hover:bg-cyan-200 focus:outline-none focus-visible:ring focus-visible:ring-cyan-500 focus-visible:ring-opacity-75"
      />
    </form>
  );
};

export default SearchInput;
