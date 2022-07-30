import React from 'react'
import BBSLists from './components/BBSLists'
import {useState} from 'react'

function App() {

  const [postListData, setPostListData] = useState([{
    id : "1",
    title : "제목",
    date : "날짜",
    views : "조회수"
  }]);
  
  

  return (
     <BBSLists postListData={postListData} setpostListData={setPostListData}/>
  )
}

export default App