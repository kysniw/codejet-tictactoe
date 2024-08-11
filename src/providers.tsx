import { createActorContext } from "@xstate/react";
import React from "react";
import { gameStateMachine } from "./gameMachine";

export const GameMachineContext = createActorContext(gameStateMachine);

const Providers = ({ children }: { children: React.ReactElement }) => {
  return <GameMachineContext.Provider>{children}</GameMachineContext.Provider>;
};

export default Providers;
