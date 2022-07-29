import React from 'react'

export default function Form({value,setValue,handleSubmit}) {
  console.log('Form in rendered');
    let handleChange = (e)=>{
        setValue(e.target.value)
      }
    
   return (
      <form className='flex pt-2'>
        <input
          type="text"
          name="value"
          placeholder="input To do"
          value={value}
          className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
          onChange={handleChange}>
        </input>
        <input type="submit" value="input"
            className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-200"
          onClick={handleSubmit}></input>
      </form>
  )
}
