import { useState } from "react";
import { Node } from "./Node";

const TreeListItem = ({ node }: Node) => {
  const [isExpanded, setExpanded] = useState(true);

  if (!node.children) {
    return <>{node.name}</>;
  } else {
    return (
      <>
        <button className="mx-2 -ml-4" type="button" onClick={() => setExpanded(!isExpanded)}>
          {isExpanded ? "-" : "+"}
        </button>
        {node.name}
        {isExpanded && <TreeList nodes={node.children} />}
      </>
    );
  }
};

export const TreeList = ({ nodes }: Node[]) => {
  return (
    <ul className="ml-4">
      {nodes.map((node) => {
        return (
          <li>
            <TreeListItem node={node} />
          </li>
        );
      })}
    </ul>
  );
};
