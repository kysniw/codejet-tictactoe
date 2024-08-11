import { GameMachineContext } from "../providers";

const Panel = () => {
  const actor = GameMachineContext.useSelector((state) => state);

  return <div>{actor.context.count}</div>;
};

export default Panel;
