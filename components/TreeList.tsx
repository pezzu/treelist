import { SyntheticEvent, useState } from "react";
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


export const TreeList = ({ root, onUpdateNode, deleteNode }) => {
  const [isExpanded, setExpanded] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [newName, setNewName] = useState(root.name);

  const isExpandable = root.children && root.children.length > 0;


  const addNode = (e: SyntheticEvent) => {};

  const editNode = (e: SyntheticEvent) => {
    setIsEdit(!isEdit);
  };

  const deleteChild = (node) => {
    // onUpdateNode({...root, children: root.children.filter((child) => child.id !== node.id)});
    root.children = root.children.filter((child) => child.id !== node.id);
    onUpdateNode(root);
  };

  const saveNode = () => {
    setIsEdit(false);
    // onUpdateNode({...root, name: newName});
    root.name = newName;
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
          <input value={newName} onChange={(e) => setNewName(e.target.value)} onBlur={saveNode} />
        ) : (
          <div>{root.name}</div>
        )}
        <ToolBar onAdd={addNode} onEdit={editNode} onDelete={() => deleteNode(root)} />
      </div>
      {isExpandable && isExpanded && (
        <ul className="ml-4">
          {root.children.map((node) => {
            return (
              <li key={node.id}>
                <div className="flex">
                  <TreeList root={node} onUpdateNode={onUpdateNode} deleteNode={deleteChild} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
