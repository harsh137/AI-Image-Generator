import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";
import "./loader.css"

function App() {
  

     
   
    
 
  const options = ["256x256", "512x512", "1024x1024"];
  const [text, setText] = useState("");
  const [url , setUrl]=useState("");
  const [size, setSize]=useState(options[0])
  const [loading, setLoading] = useState(false);
  const [number , setNumber]=useState(1)

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
      setLoading(true);
    const res=await openai.createImage({
      prompt: text,
      n: number,
      size: size,
    });
    setLoading(false);
    setUrl(res.data.data[0].url);
  };

  return (
    <div className="App">
      {loading ? (
        <>
           <div className="col-sm-2">
                <div id="square4">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <h3 id="laoding_text">LOADING</h3>
            </div>
        </>
      )
      :(
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
                    <form>
                <select 
                value={size} 
                onChange={(e) => setSize(e.target.value)}>
                  {options.map((value) => (
                    <option value={value} key={value}>
                      {value}
                    </option>
                  ))}
                </select>
                
              </form>
        </div>
        </div>
        
        {url.length > 0 ? (<img className="result-image" src={url} alt="result"/>) : (<> </>)}
      
      </>
      )}
    </div>
  );
                  
};
export default App;