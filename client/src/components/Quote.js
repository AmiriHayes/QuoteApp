import React from 'react';
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from "react-icons/bs";
import { AiOutlinePlusCircle} from "react-icons/ai";
import { useGlobalContext } from '../../src/context';

const Quote = () => {
  const {quote, numQuotes, prevQuote, nextQuote, changeForm} = useGlobalContext();
  const {id, name, text, author, date, origin, color, infolink} = quote;
  
  return (<>
    <main className = "mb-3" style={{maxWidth: 100 + '%'}}>
      <section className = "container my-3">
        <div className = "one text-center">
          <button type = "button" className = "btn" onClick={prevQuote}>
              <BsFillArrowLeftSquareFill size="60px"/>
          </button>
          <button type = "button" className = "btn btn-dark mx-1" onClick={changeForm} style={{height: 70 + 'px'}}>
            <AiOutlinePlusCircle/>
            <span> add new quote</span>
          </button>
          <button type = "button" className = "btn" onClick={nextQuote}>
              <BsFillArrowRightSquareFill size="60px"/>
          </button>
        </div>
      </section>
      {id === numQuotes && 
        <div className = "lead my-3 mx-auto p-2 w-75 text-center rounded" 
          style={{backgroundColor: `${color}`}}> 
            <h3>Latest Quote!</h3>
        </div>
      }
      <article className = "text-center row">
        <span className="col-1"></span>
        <div className = "col-10 p-4 bg-dark text-white rounded">
          <span className = "display-6 mb-3" style={{color: `${color}`}}>
            Hayes Family 
            <span className = "br"><b> 'Quote of The Week'</b></span>
          </span>
          <div className = "lead mt-2 mb-1">
            <span style={{color: `${color}`}}>{date} from {name}:</span>
          </div>
          <div className = "d-flex">
            <div className = "py-5 px-4 mt-3 w-100 h-75 bg-white text-dark rounded">
              <blockquote className = "display-6">"{text}"</blockquote>
              <h3>
                <figcaption className = "blockquote-footer lead mt-4">
                  {author}, <cite title = "{origin}">{origin}</cite>
                </figcaption>
              </h3>
              {infolink && 
              <button className = "btn btn-sm my-3 px-2 py-2 text-center  rounded" 
                  style={{backgroundColor: `${color}`}}> 
                    <a 
                      className = "text-dark text-uppercase text-decoration-none"
                      href="{infolink}"
                    >learn more here</a>
              </button>} 
            </div>
          </div>
          <p className = "mt-3 mb-1"> [ Family Quote #{id} ] </p>
        </div>
      </article>
    </main>
  </>)
};

export default Quote;
