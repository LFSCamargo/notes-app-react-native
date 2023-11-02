import { createContext, useContext } from "react";
import { InterpreterFrom } from 'xstate';
import { userMachine } from '../machines'
import { useInterpret } from "@xstate/react";
import { xstateLogger} from 'xstate-logger'
import { any } from "zod";

export const MachinesContext = createContext({} as {
  user: InterpreterFrom<typeof userMachine>
})

export function MachinesProvider({ children }: { children: React.ReactNode }) {
  const user = useInterpret(userMachine).start().onTransition(state => xstateLogger(state as any));
  return (
    <MachinesContext.Provider value={{ user }}>
      {children}
    </MachinesContext.Provider>
  )
}