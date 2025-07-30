"use client";
import { createContext, useContext, useState } from "react";

const initialQuery = {
  page: 1,
  items_per_page: 10,
};
const initialQueryRequest = {
  state: initialQuery,
  updateState: () => {},
};

const QueryRequestContext = createContext(initialQuery);

const QueryRequestProvider = ({ children }) => {
  const [state, setState] = useState(initialQueryRequest.state);

  const updateState = (updates) => {
    const updatedState = { ...state, ...updates };
    setState(updatedState);
  };

  return (
    <QueryRequestContext.Provider value={{ state, updateState }}>
      {children}
    </QueryRequestContext.Provider>
  );
};

const useQueryRequest = () => useContext(QueryRequestContext);
export { QueryRequestProvider, useQueryRequest };
