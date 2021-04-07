import { SyntheticEvent, useState } from "react";
import { Node } from "./Node";

const ItemHeader = ({ name }) => {
  return <div className="hover:bg-gray-100">{name}</div>;
};

export const TreeList = ({ root, onUpdateNode }) => {
  const [isExpanded, setExpanded] = useState(true);
  const isExpandable = root.children && root.children.length > 0;

  const addNode = (e: SyntheticEvent) => {};

  const editNode = (e: SyntheticEvent) => {};

  const deleteNode = (node) => {
    const newRoot = root;
    newRoot.children = root.children.filter((child) => child.id !== node.id);
    onUpdateNode(newRoot);
  };

  return (
    <div>
      <div className="flex">
        {isExpandable && (
          <button className="-ml-5 w-5" type="button" onClick={() => setExpanded(!isExpanded)}>
            {isExpanded ? "-" : "+"}
          </button>
        )}
        <ItemHeader name={root.name} />
      </div>
      {isExpandable && isExpanded && (
        <ul className="ml-4">
          {root.children.map((node) => {
            return (
              <li key={node.id}>
                <div className="flex">
                  <TreeList root={node} onUpdateNode={onUpdateNode} />
                  <div className="ml-3">
                    <button
                      type="button"
                      className="mx-1 px-2 bg-blue-100 hover:bg-blue-300 rounded-full"
                      onClick={addNode}
                    >
                      A
                    </button>
                    <button
                      type="button"
                      className="mx-1 px-2 bg-blue-100 hover:bg-blue-300 rounded-full"
                      onClick={editNode}
                    >
                      E
                    </button>
                    <button
                      type="button"
                      className="mx-1 px-2 bg-blue-100 hover:bg-blue-300 rounded-full"
                      onClick={() => deleteNode(node)}
                    >
                      D
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
