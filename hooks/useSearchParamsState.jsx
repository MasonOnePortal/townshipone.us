"use client";
import { useSearchParams } from "next/navigation";

export function useSearchParamsState(searchParamName, defaultValue) {
  const [searchParams, setSearchParams] = useSearchParams();

  const acquiredSearchParam = searchParams
    ? searchParams.get(searchParamName)
    : null;
  const searchParamsState = acquiredSearchParam ?? defaultValue;

  const setSearchParamsState = (newState) => {
    const params = searchParams || new URLSearchParams();
    const next = Object.assign(
      {},
      [...params.entries()].reduce(
        (o, [key, value]) => ({ ...o, [key]: value }),
        {}
      ),
      { [searchParamName]: newState }
    );
    setSearchParams(next);
  };

  return [searchParamsState, setSearchParamsState];
}
