
import {React, useState } from 'react';
import axios from "axios"
import "./App.css";

const Editor = () => {
  
    const [Code,setCode] = useState("");
    const [output,setOutput] = useState("")

   const  showOutput = async ()=>
   {

    const result = await axios.get('https://lovely-pink-walkingstick.cyclic.app/getOutput', {
        params: {
          code: Code,
          language: 'python3'
        }
      });

      setOutput(result.data.data.output);
      console.log(result.data.data.output)
      
   }

  return (
    <div className="main">
        <div className="container">
        <div className="main-editor">
           <textarea  className="editor-form" onChange={(e)=>setCode(e.target.value)}></textarea>
      </div>
      <div className="main-editor-output">
           <textarea  className="editor-form-output" onChange={(e)=>setCode(e.target.value)} disabled value={output}></textarea>
      </div>
        </div>
      <div type="button" onClick={showOutput} className="editor-execute">
        <p className="word">Execute Code</p>
        </div>
    </div>
  )
}

export default Editor
