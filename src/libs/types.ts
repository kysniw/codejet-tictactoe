import { SnapshotFrom, ActorRefFrom } from "xstate";
import { gameStateMachine } from "../gameMachine";

export type ScoreBoard = null | "X" | "O";
export type GameMachineSnapshot = SnapshotFrom<typeof gameStateMachine>;
export type ActorGameMachineRef = ActorRefFrom<typeof gameStateMachine>;
