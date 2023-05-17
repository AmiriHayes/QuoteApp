import React, { useState } from 'react';
import { useGlobalContext } from '../../src/context';

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
if (mm < 10 ) mm = mm.slice(1)
if (dd < 10 ) dd = dd.slice(1)
const yy = today.getFullYear().toString().slice(-2);
today = `${mm}/${dd}/${yy}`

let format = {
  id: 3,
  name: "",
  text: "",
  author: "",
  origin: "",
  infolink: "",
  date: `${today || "< date >"}`,
  color: "white"
}

const Form = () => {
  const {changeForm, handleInput} = useGlobalContext();
  const [input, setInput] = useState(format)

  const handleSubmit = (e) => {
    e.preventDefault()
    changeForm()
    try {
      let validData = handleInput(input)
      if (validData) {
        // post to db
        fetch("https://quote-app-c601.onrender.com/api", {
          method: "POST",
          headers: { "Content-Type": "application/json", },
          body: JSON.stringify(validData),
        }).then(() => {
          console.log("success")
          setInput(format)
          window.location.reload();
        })
      } 
    } catch (error) {
        console.log('msg', error)
    }
  }

  return (<>
    <main className = "my-5" style={{maxWidth: 100 + '%'}}>
      <form onSubmit={handleSubmit} method = "post" className = "container d-flex justify-content-center">
        <div className = "col-10 p-4 bg-dark text-white rounded">
        <button type = "button" className = "btn-close btn-close-white" onClick={changeForm}></button>
        <div className = "text-center display-6 mb-3">Submit Here!</div>
          <div className = "row">
            <span className = "col-sm-3"></span>
            <textarea
                type = "text"
                value = {input.text}
                onChange={(e) => setInput({...input, text: e.target.value})}
                className = "col-sm-6 p-3 my-2 mx-1 d-flex flex-row justify-content-between"
                style={{height: 150 + 'px', maxHeight: 200 + 'px'}}
                placeholder = "write your quote here...&#10;(don't add quotation marks)"
            />
          </div>
          <div className = "row">
            <span className = "col-sm-3"/>
              <span className = "col-sm-6">
                <div className = "d-flex flex-row justify-content-between">
                  <span className = "mt-2">Author:&nbsp;&nbsp;</span>
                  <input type = "text" value = {input.author} className = "w-75 p-1 my-1"
                    onChange={(e) => setInput({...input, author: e.target.value})} />
                </div>
                <div className = "d-flex flex-row justify-content-between">
                  <span className = "mt-2">Origin:&nbsp;&nbsp;</span>
                  <input type = "text" value = {input.origin} className = "w-75 p-1 my-1"
                    onChange={(e) => setInput({...input, origin: e.target.value})} />
                </div>
                <div className = "d-flex flex-row justify-content-between">
                  <span className = "mt-2">Link:&nbsp;&nbsp;</span>
                  <input type = "text" value = {input.infolink} 
                    className = "w-75 p-1 my-1"
                    placeholder = "totally optional"
                    onChange={(e) => setInput({...input, origin: e.target.value})} />
                </div>
                <div className = "d-flex flex-row justify-content-between">
                  <span className = "mt-2">Name:&nbsp;&nbsp;</span>
                  <input type = "text" value = {input.name} 
                    className = "w-75 p-1 my-1"
                    placeholder = "first name here!"
                    onChange={(e) => setInput({...input, name: e.target.value})} />
                </div>
              </span>
          </div>
          <div className = "text-center mt-3">
            <button type="submit" className = "btn submit-btn btn-light text-center">
              submit quote
            </button>
          </div>
        </div>
      </form>
      <div className = "d-flex justify-content-center">
        <p className = "text-center text-light bg-dark w-75 mt-4 px-4 py-3 rounded"> 
          On submitting this form, you'll receive 
          an SMS text message to verify your identity;
          to be added as a quote submitter, email&nbsp;  
          <a 
            href = "https://amirihayes.github.io/YearOfTheSenior/"
            className = "link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
          >Amiri</a>.
        </p>
      </div>
    </main>
  </>)
};

export default Form;
