import { nanoid } from "nanoid";
import { useState } from "react";
import { Node } from "./Node";

const ToolBar = ({ onAdd, onEdit, onDelete }) => {
  return (
    <div className="ml-3">
      <button
        type="button"
        className="mx-1 px-2 bg-blue-100 hover:bg-blue-300 rounded-full"
        onClick={onAdd}
      >
        A
      </button>
      <button
        type="button"
        className="mx-1 px-2 bg-blue-100 hover:bg-blue-300 rounded-full"
        onClick={onEdit}
      >
        E
      </button>
      <button
        type="button"
        className="mx-1 px-2 bg-blue-100 hover:bg-blue-300 rounded-full"
        onClick={onDelete}
      >
        D
      </button>
    </div>
  );
};

const Tree = ({ root, onUpdateNode, deleteNode }) => {
  const [isExpanded, setExpanded] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [newName, setNewName] = useState(root.name);
  const [isAdd, setIsAdd] = useState(false);

  const isExpandable = root.children && root.children.length > 0;

  const addNode = () => {
    setIsAdd(false);
    if (newName) {
      const node = {
        id: nanoid(),
        name: newName,
        children: [],
      };
      // onUpdateNode({...root, children: [...root.children, node]});
      root.children = root.children ? [...root.children, node] : [node];
      onUpdateNode(root);
    }
  };

  const editNode = () => {
    setIsEdit(false);
    // onUpdateNode({...root, name: newName});
    root.name = newName;
    onUpdateNode(root);
  };

  const deleteChild = (node) => {
    // onUpdateNode({...root, children: root.children.filter((child) => child.id !== node.id)});
    root.children = root.children.filter((child) => child.id !== node.id);
    onUpdateNode(root);
  };

  return (
    <div>
      <div className="flex">
        {isExpandable && (
          <button className="-ml-5 w-5" type="button" onClick={() => setExpanded(!isExpanded)}>
            {isExpanded ? "-" : "+"}
          </button>
        )}
        {isEdit ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={editNode}
          />
        ) : (
          <div>{root.name}</div>
        )}
        <ToolBar
          onAdd={() => setIsAdd(!isAdd)}
          onEdit={() => setIsEdit(!isEdit)}
          onDelete={() => deleteNode(root)}
        />
      </div>
      {((isExpandable && isExpanded) || isAdd) && (
        <ul className="ml-4">
          {root.children?.map((node) => {
            return (
              <li key={node.id}>
                <div className="flex">
                  <Tree root={node} onUpdateNode={onUpdateNode} deleteNode={deleteChild} />
                </div>
              </li>
            );
          })}
          {isAdd && (
            <li>
              <input type="text" onChange={(e) => setNewName(e.target.value)} onBlur={addNode} />
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export const TreeList = ({ nodes, onUpdateNode }) => {
  const deleteItem = (node) => {
    const index = nodes.findIndex((item) => item.id === node.id);
    nodes.splice(index, 1);
    onUpdateNode(nodes[0]);
  };

  return (
    <ul>
      {nodes.map((node) => (
        <li key={node.id}>
          <Tree root={node} onUpdateNode={onUpdateNode} deleteNode={deleteItem} />
        </li>
      ))}
    </ul>
  );
};
