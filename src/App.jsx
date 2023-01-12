import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

function App() {
 
  
  const [text, setText] = useState("");
  const [url , setUrl]=useState("");
  const [size, setSize]=useState("512x512")
  const [number , setNumber]=useState(1)

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    const res=await openai.createImage({
      prompt: text,
      n: number,
      size: size,
    });
    setUrl(res.data.data[0].url);
  };

  return (
    <div className="App">
      <>
      <div className="container-fluid Heading">
        <h2>Generate Any Image</h2>
        </div>
        <br/>
    <div className="">
        <textarea
          className="TextInput"
          placeholder="Type To Generate Image"
          onChange={(e) => setText(e.target.value)}
          
        />
        </div>
        <br/>

        <div className="row m-3">
          <div className="col col-lg-6">
            <button className="btn btn-lg btn-dark" onClick={generateImage}>Generate an Image</button>
          </div>

          <div className="col col-lg-6">
              <div class="dropdown">
                <button class="btn btn-lg btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown button
                </button>
                <ul class="dropdown-menu ">
                  <li class="dropdown-item" value={"256x256"}>  Small</li>
                  <li class="dropdown-item" value={"512x512"}>  Large</li>
                  <li class="dropdown-item" value={"1024x1024"}>  Extra</li>
                </ul>
              </div>
        </div>
        </div>
        
        {url.length > 0 ? (<img className="result-image" src={url} alt="result"/>) : (<> </>)}
      </>
    </div>
  );
};
export default App;