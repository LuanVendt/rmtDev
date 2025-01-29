import { createContext } from "react";
import { useActiveId } from "../lib/hooks/hooks";
import { TActiveIdContext } from "../lib/types";

export const ActiveIdContext = createContext<TActiveIdContext | null>(null);

export default function ActiveIdContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeId = useActiveId();

  return (
    <ActiveIdContext.Provider
      value={{
        activeId,
      }}
    >
      {children}
    </ActiveIdContext.Provider>
  );
}
