import { useSelector } from "@xstate/react";
import { useGlobalMachines } from "./globalMachines.hook";

export function useUser() {
  const { user } = useGlobalMachines();
  
  const isLoading = useSelector(user, state => state.matches("loading"));
  const userData = useSelector(user, state => state.context.user);
  
  function logout() {
    user.send("LOGOUT");
  }

  function onboard(name: string) {
    user.send({
      type: "ONBOARD",
      data: {
        name
      }
    });
  }

  return {
    userData,
    isLoading,
    handlers: {
      logout,
      onboard
    },
  };
}