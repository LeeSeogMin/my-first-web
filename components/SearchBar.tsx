"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    onSearch(e.target.value);
  }

  return (
    <input
      type="text"
      placeholder="제목으로 검색..."
      value={query}
      onChange={handleChange}
      className="mb-4 w-full rounded border px-3 py-2"
    />
  );
}
