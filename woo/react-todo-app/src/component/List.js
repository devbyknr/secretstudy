import React from "react";

function List({ todoData, setToDoData }) {
  const handleChageComplete = (id) => {
    let newTodoData = todoData.map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    });
    setToDoData(newTodoData);
  };
  const handleClick = (id) => {
    //filter는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환합니다.
    let results = todoData.filter((filterData) => filterData.id !== id);
    console.log("result", results);
    //hook을 안쓰고이렇게 바꿀수가 있네??
    setToDoData(results);
  };

  return (
    <div>
      {/* 소스코드가 중복이 되기때문에 데이터를 받아서 map으로 처리하자(반복문) */}
      {todoData.map((item) => (
        // 여기서 map을 쓸경우에 key를 명시해주어야 한다!
        // 키는 요소변경 식별에 도움이 되기때문에 안정적인 ID를 부여하려면 key속성을 주어야 한다
        // 계속해서 경고가 뜨기 떄문에 가급적 명시하여 주자!!!
        // 키는 유니크한 값으로 해야 한다.
        <div key={item.id}>
          <div className="flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded">
            <div className="items-center">
              <input
                type="checkbox"
                defaultChecked={false}
                onClick={() => handleChageComplete(item.id)}
              />
              <span className={item.completed ? "line-through" : ""}>
                {item.title}
              </span>
            </div>
            <div className="items-center">
              <button
                className="px-4 py-2 float-right"
                onClick={() => handleClick(item.id)}
              >
                X
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default List;
