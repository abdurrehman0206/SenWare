"use client";

import { getItems } from "@/actions/Item/getItems";
import {
  createContext,
  useEffect,
  useReducer,
  useState,
  useTransition,
  ReactNode,
} from "react";
import { ItemType } from "@/lib/types";

interface State {
  items: ItemType[];
}
interface Action {
  type: "SET_ITEMS" | "ITEM_REFRESH";
  payload?: ItemType[];
}
export const itemsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_ITEMS":
      return { items: action.payload };
    case "ITEM_REFRESH":
      return state;
    default:
      return state;
  }
};
export const ItemsContext = createContext<{
  items: ItemType[];
  dispatch: React.Dispatch<Action>;
  isPending: boolean;
  error?: string;
  refreshItems: () => void;
} | null>(null);
export const ItemsContextProvider = ({ children }: { children: ReactNode }) => {
  const initialState: State = {
    items: [],
  };
  const [state, dispatch] = useReducer(itemsReducer, initialState);
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const fetchItems = async () => {
    const response = await getItems();
    if (response.error) {
      setError(response.error);
    } else if (response.items) {
      dispatch({ type: "SET_ITEMS", payload: response.items });
    }
  };
  useEffect(() => {
    startTransition(() => {
      fetchItems();
    });
  }, []);

  const refreshItems = () => {
    startTransition(() => {
      fetchItems();
    });
  };

  return (
    <ItemsContext.Provider
      value={{ ...state, dispatch, isPending, error, refreshItems }}
    >
      {children}
    </ItemsContext.Provider>
  );
};
