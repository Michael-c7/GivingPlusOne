import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className=' text-center'>givingPlusOne</h1>
      <div className="  bg-fuchsia-500 rounded text-zinc-900 p-2 text-3xl my-4">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>


      <p className="text-3xl  underline bg-blue-500">
      Hello world!
      </p>
    </>
  )
}

export default App
