import React, { useState } from "react";

const List = React.memo(
  ({
    handleClick,
    key,
    id,
    title,
    completed,
    setToDoData,
    todoData,
    provided,
    snapshot,
  }) => {
    const [isEditing, setIsEditting] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const handleChageComplete = (id) => {
      let newTodoData = todoData.map((item) => {
        if (item.id === id) {
          item.completed = !item.completed;
        }
        return item;
      });
      setToDoData(newTodoData);
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
    };

    const handelEditChange = (e) => {
      setEditedTitle(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      let newTodoData = todoData.map((item) => {
        if (item.id === id) {
          item.title = editedTitle;
        }
        return item;
      });
      setToDoData(newTodoData);
      localStorage.setItem("todoData", JSON.stringify(newTodoData));
      setIsEditting(false);
    };

    if (isEditing) {
      return (
        <div
          className={`flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
        >
          <div className="items-center">
            <form onSubmit={handleSubmit}>
              <input
                value={editedTitle}
                onChange={handelEditChange}
                className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
              />
            </form>
          </div>
          <div className="items-center">
            <button
              className="px-4 py-2 float-right"
              onClick={() => setIsEditting(false)}
            >
              X
            </button>
            <button
              className="px-4 py-2 float-right"
              type="submit"
              onClick={handleSubmit}
            >
              save
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={key}
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          className={`${
            snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
          } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
        >
          <div className="items-center">
            <input
              type="checkbox"
              defaultChecked={false}
              onClick={() => handleChageComplete(id)}
            />
            <span className={completed ? "line-through" : ""}>{title}</span>
          </div>
          <div className="items-center">
            <button
              className="px-4 py-2 float-right"
              onClick={() => handleClick(id)}
            >
              X
            </button>
            <button
              className="px-4 py-2 float-right"
              onClick={() => setIsEditting(true)}
            >
              edit
            </button>
          </div>
        </div>
      );
    }
  }
);

export default List;
