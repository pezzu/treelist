import { Node } from "./Node";

export const TreeList = ({ nodes }: Node[]) => {
  return (
    <ul>
      {nodes.map((node) => {
        return (
          <li>
            {node.name}
            {node.children && <TreeList nodes={node.children} />}
          </li>
        );
      })}
    </ul>
  );
};
