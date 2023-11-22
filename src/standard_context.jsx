import React, { useContext, useEffect, useReducer } from 'react'
// import reducer from '../reducers/standard_reducer'


const initialState = {
  isSidebarOpen:false,
  isSidebarOverlayOpen:false,
}

const StandardContext = React.createContext()

export const StandardProvider = ({ children }) => {
    const [searchInputValue, setSearchInputValue] = React.useState("")
    // Can Use the EID for this among other thing like the name or title
    const [UserId, setUserId] = React.useState(null)


  const test = _ => {
    console.log("test")
  }



  return (
    <StandardContext.Provider
      value={{
        searchInputValue, 
        setSearchInputValue,

        UserId,
        setUserId,
        
        test,
      }}
    >
      {children}
    </StandardContext.Provider>
  )
}



// make sure to use this hook
export const useStandardContext = () => {
  return useContext(StandardContext)
}