import {React, useState } from 'react';
import axios from "axios"
import "./App.css";
const Editor = () => {
    const [Code,setCode] = useState("");
    const [output,setOutput] = useState("")
    let [language,setLanguage] = useState("java")
    let [executing,setExecuting] = useState(false)
    
    const LanguageObject = {
      "Java":"java",
       "C":"c",
       "C-99":"c99",
       "C++":"cpp",
       "C++ 14":"cpp14",
       "PHP":"php",
       "Python":"python3"
    }
   const  showOutput = async ()=>
   {
    setOutput("")
    setExecuting(true);
    const result = await axios.get('https://lovely-pink-walkingstick.cyclic.app/getOutput', {
        params: {
          code: Code,
          language: language
        }
      });
      setOutput(result.data.data.output);
      setExecuting(false)
   }
  return (
    <div className="main">
        <div className="container">
        <div className="main-editor">
           <textarea  className="editor-form" onChange={(e)=>setCode(e.target.value)}></textarea>
      </div>
      <div className="editor-output">
      <div className="main-editor-output">
           <textarea  className="editor-form-output" onChange={(e)=>setCode(e.target.value)} disabled value={output}></textarea>
      </div>
      </div>
        </div>
        <div className="editor-controls">
        <div type="button" onClick={showOutput} className="editor-execute">
        <p className="word">Execute Code</p>
        </div>
        <div type="button" onClick={showOutput} className="editor-execute" style={{"margin-left":"10px"}}>
        <p className="word">Check GPT plagiarism</p>
        </div>
        <select className='editor-language-selector' onChange={(e)=>setLanguage(e.target.value)}>
      {Object.keys(LanguageObject).map((key)=>{
        return(
           <option value={LanguageObject[key]}>{key}</option>
        );
      })}
        </select>
        </div>
        <div className="execution-indicator">
        {output ? <p>Execution complete</p> : executing ? <p>Executing...</p> : <p></p>}
        </div>
    </div>
  )
}

export default Editor
