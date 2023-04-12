import React, { useState, useContext, useEffect } from 'react';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [backendData, setBackendData] = useState([])
  let [quote, setQuote] = useState({})
  let [form, setForm] = useState(false)
  let [index, setIndex] = useState(0)
  let [numQuotes, setNumQuotes] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const reponse = await fetch('https://jsonplaceholder.typicode.com/todos/1')
      const data = await reponse.json()
      setBackendData(data.quoteList)
      setNumQuotes(data.quoteList.length)
      setQuote(data.quoteList[index])
    }
    fetchData();
    
//     const fetchData = () => {
//       fetch('https://quote-app-c601.onrender.com/api')
//         .then((response) => {
//           response.json()
//           console.log(response)
//         })
//         .then((data) => {
//           console.log(data)
//           setBackendData(data.quoteList)
//           setNumQuotes(data.quoteList.length)
//           setQuote(data.quoteList[index])
//         })
//         .catch((err) => console.log(err))      
//     }
  }, [index])

  const changeForm = () => { setForm(!form) }
  const checkIndex = (number) => {
    if (number > backendData.length - 1) return 0;
    if (number < 0) return backendData.length - 1;
    return number;
  }
  const nextQuote = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkIndex(newIndex)
    })
    setQuote(backendData[index])
  }
  const prevQuote = () => {
    setIndex((index) => {
      let newIndex = index + 1;
      return checkIndex(newIndex)
    })
    setQuote(backendData[index])
  }

  // bandaid solution to match user data to user color
  const colorMap = {
    "amiri": "rgb(130, 176, 220)",
    "nissim": "rgb(209, 236, 192)",
    "imani": "rgb(154, 108, 159)",
    "mom": "rgb(241, 189, 150)",
    "dad": "rgb(235, 157, 157)",
  }

  const handleInput = (formData) => {
    let {id, author, origin, name, color, date} = formData
    if (id === -1) return null;
    if (author && origin && name && date) {
        color = colorMap[name.toLowerCase()] || 'bg-dark'
        let newData = {...formData, color}
        return newData;
    }
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        quote, 
        form,
        numQuotes,
        nextQuote, 
        prevQuote, 
        changeForm,
        handleInput 
      }}
    >{children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
