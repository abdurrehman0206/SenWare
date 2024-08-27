"use client";

import {
  createContext,
  useEffect,
  useReducer,
  useState,
  useTransition,
  ReactNode,
} from "react";
import { RecipientType } from "@/lib/types";
import { getRecipients } from "@/actions/Recipient/getRecipients";

interface State {
  recipients: RecipientType[];
}
interface Action {
  type: "SET_RECIPIENTS" | "RECIPIENT_REFRESH";
  payload?: RecipientType[];
}
export const recipientsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_RECIPIENTS":
      return { recipients: action.payload };
    case "RECIPIENT_REFRESH":
      return state;
    default:
      return state;
  }
};
export const RecipientsContext = createContext<{
  recipients: RecipientType[];
  dispatch: React.Dispatch<Action>;
  isPending: boolean;
  error?: string;
  refreshRecipients: () => void;
} | null>(null);
export const RecipientsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const initialState: State = {
    recipients: [],
  };
  const [state, dispatch] = useReducer(recipientsReducer, initialState);
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const fetchRecipients = async () => {
    const response = await getRecipients();
    if (response.error) {
      setError(response.error);
    } else if (response.recipients) {
      dispatch({ type: "SET_RECIPIENTS", payload: response.recipients });
    }
  };
  useEffect(() => {
    startTransition(() => {
      fetchRecipients();
    });
  }, []);

  const refreshRecipients = () => {
    startTransition(() => {
      fetchRecipients();
    });
  };

  return (
    <RecipientsContext.Provider
      value={{ ...state, dispatch, isPending, error, refreshRecipients }}
    >
      {children}
    </RecipientsContext.Provider>
  );
};
