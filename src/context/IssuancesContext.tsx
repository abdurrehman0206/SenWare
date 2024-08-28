"use client";

import { getIssuances } from "@/actions/Issue/getIssuances";
import { IssuanceType } from "@/lib/types";
import {
  createContext,
  useEffect,
  useReducer,
  useState,
  useTransition,
  ReactNode,
} from "react";

interface State {
  issuances: IssuanceType[];
}
interface Action {
  type: "SET_ISSUANCES" | "ISSUANCES_REFRESH";
  payload?: IssuanceType[];
}
export const issuancesReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_ISSUANCES":
      return { issuances: action.payload };
    case "ISSUANCES_REFRESH":
      return state;
    default:
      return state;
  }
};
export const IssuancesContext = createContext<{
  issuances: IssuanceType[];
  dispatch: React.Dispatch<Action>;
  isPending: boolean;
  error?: string;
  refreshIssuances: () => void;
} | null>(null);
export const IssuancesContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const initialState: State = {
    issuances: [],
  };
  const [state, dispatch] = useReducer(issuancesReducer, initialState);
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const fetchIssuances = async () => {
    const response = await getIssuances();
    if (response.error) {
      setError(response.error);
    } else if (response.issuances) {
      dispatch({ type: "SET_ISSUANCES", payload: response.issuances });
    }
  };
  useEffect(() => {
    startTransition(() => {
      fetchIssuances();
    });
  }, []);

  const refreshIssuances = () => {
    startTransition(() => {
      fetchIssuances();
    });
  };

  return (
    <IssuancesContext.Provider
      value={{ ...state, dispatch, isPending, error, refreshIssuances }}
    >
      {children}
    </IssuancesContext.Provider>
  );
};
