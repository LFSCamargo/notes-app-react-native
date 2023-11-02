import AsyncStorage from "@react-native-async-storage/async-storage";
import { assign, createMachine } from "xstate";

type UserMachineEvents = {
  type: "LOGOUT"
} | {
  type: 'ONBOARD',
  data: {
    name: string
  }
}

type UserMachienServices = {
  getUser: {
    data: {
      name: string
    }
  },
  saveUser: {
    data: {
      name: string
    }
  },
  removeUser: {
    data: void
  }
}

type UserMachineContext = {
  user: {
    name: string
  } | null
}

export const userMachine = createMachine({
  tsTypes: {} as import("./user.machine.typegen").Typegen0,
  context: {
    user: null,
  },
  schema: {
    context: {} as UserMachineContext,
    events: {} as UserMachineEvents,
    services: {} as UserMachienServices
  },
  id: "user",
  states: {
    loading: {
      invoke: {
        src: "getUser",
        doneData: (_, e) => e.data,
        onDone: {
          target: "loaded",
          actions: ["assignUser"]
        },
        onError: {
          target: "noUser"
        }
      }
    },
    loaded: {
      on: {
        LOGOUT: 'removing'
      }
    },
    removing: {
      invoke: {
        src: "removeUser",
        onDone: {
          target: "noUser"
        }
      }
    },
    savingUser: {
      invoke: {
        src: "saveUser",
        onDone: {
          target: "loaded",
          actions: ["assignUser"]
        }
      }
    },
    noUser: {
      on: {
        ONBOARD: "savingUser"
      }
    }
  }
}, {
  actions: {
    assignUser: assign({
      user: (_, event) => event.data
    })
  },
  services: {
    removeUser: async () => {
      await AsyncStorage.removeItem("user")
    },
    saveUser: async (_, event) => {
      await AsyncStorage.setItem("user", event.data.name)
      return event.data
    },
    getUser: async () => {
      const user = await AsyncStorage.getItem("user")
      if (!user) {
        throw new Error("No user")
      }
      return {
        name: user
      }
    }
  }
})