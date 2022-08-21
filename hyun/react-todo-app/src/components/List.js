import React, { useState } from 'react'

 const List = React.memo(({id,title,completed,todoData,setTodoData,provided,snapshot}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    let handleClick = (id)=>{
        let newTodoData = todoData.filter((data)=>{
          return id !== data.id;
        })
        setTodoData(newTodoData);
        localStorage.setItem("todoData",JSON.stringify(newTodoData));

      }

    let handleCompletChange = (id) => {
        let newTodoData = todoData.map((data)=>{
            if(id === data.id){
                data.completed = !data.completed;
            }
            return data
        })
        setTodoData(newTodoData);
        localStorage.setItem("todoData",JSON.stringify(newTodoData));

    }

    let handleEditedTitleChange = (e)=>{
        setEditedTitle(e.target.value)
    }

    let handleSubmit = (e) =>{
        e.preventDefault();

        let newTodoData = todoData.map((data)=>{
            if(id === data.id){
                data.title = editedTitle;
            }
            return data
        })
        setTodoData(newTodoData);
        localStorage.setItem("todoData",JSON.stringify(newTodoData));

        setIsEditing(false);

    }

    console.log("isEditing",isEditing)

    if(isEditing){
        return (
            <div 
            className={`flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}
            >
                <div className='items-center'>
                    <form onSubmit={handleSubmit}>
                        <input type="text"
                            value={editedTitle}
                            className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
                            onChange={handleEditedTitleChange}
                        />
                    </form>
                </div>
                <div>
                    <button className='px-4 py-2 float-right' onClick={()=>setIsEditing(false)} >x</button>
                    <button className='px-4 py-2 float-right' onClick={handleSubmit}type="submit">save</button>
                </div>
            </div>
        )
    } else {


        return (
            <div key={id}
                {...provided.draggableProps}
                ref={provided.innerRef}
                {...provided.dragHandleProps}
                className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}
            >
                <div className='items-center'>
                    <input type="checkbox"
                        defaultChecked={completed}
                        onChange={() => handleCompletChange(id)}
                    />{" "}
                    <span className={completed ? "line-through" : undefined} >{title}</span>
                </div>
                <div>
                    <button className='px-4 py-2 float-right' onClick={() => handleClick(id)} >x</button>
                    <button className='px-4 py-2 float-right' onClick={() => setIsEditing(true)} >edit</button>
                </div>
            </div>
        )
    }
})

export default List;