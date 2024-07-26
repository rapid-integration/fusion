import { createAsync } from "@solidjs/router";
import { type Accessor, type ParentComponent, createContext, useContext } from "solid-js";
import { type components } from "~/lib/api/schema";
import { getCurrentUser } from "~/lib/auth";

export type CurrentUserContextValue = Accessor<components["schemas"]["CurrentUserResponse"] | undefined>;

export const CurrentUserContext = createContext<CurrentUserContextValue>(() => undefined);

export const CurrentUserProvider: ParentComponent = (props) => {
  const currentUser = createAsync(() => getCurrentUser());

  return <CurrentUserContext.Provider value={currentUser}>{props.children}</CurrentUserContext.Provider>;
};

export const useCurrentUser = () => useContext(CurrentUserContext);
