import { useState } from "react";

import  openai from "../keys.js"
import "./App.css";
import "./loader.css";


function App() {

  const options = ["256x256", "512x512", "1024x1024"];
  const imgSize=[256 , 512,1024 ];
  const num=[1,2,3,4,5];
  const [text, setText] = useState("");
  const [title,setTitle]=useState("")
  var [urls , setUrls]=useState([]);
  const [sizee, setSizee]=useState(options[0])
  const [loading, setLoading] = useState(false);
  const [number , setNumber]=useState(1);
  // const [imageSize, setImageSize]=useState(imgSize[0])
  const [mainImg, setMainImg]=useState("");  

//////////////////State URL Array Setting Function////////////
  const addUrl =(e)=>{
    setUrls(urls => [e,...urls] );

  }
  
  ///////////////////Main Image SRC Function////////////////////  
  
  const MainImage=(e)=>{
    e.preventDefault();
    console.log("resource path: ", e.target.src);
    setMainImg(e.target.src)
    console.log("ANSSS=====  ",mainImg)
  }
  ////////Image Generate Function and Api Call/////////////////

  const generateImage = async () => {
      urls.length=0;
      setMainImg("");
      
      setLoading(true);
      
      
    const resData=await openai.createImage({
      prompt: text,
      n: parseInt(number),
      size: sizee,
    });
    setTitle(text);
    
    setLoading(false);
    // var ans=resData.data.data[0].url;
    console.log(resData)
    // if(sizee==options[0]){
    //   setImageSizee(imgSize[0])
    // }
    // else if(sizee==options[1]){
    //   setImageSize(imgSize[1])
    // }
    // else if(sizee==options[1]){
    //   setImageSize(imgSize[2])
    // }
  

    var i=1;
    
      while(i<=number){
        
        
    

    var url=resData.data.data[i-1].url
    console.log(url)
    addUrl(url)

    // console.log(url);
    

    

    // var url1=resData.data.data[1].url
    // setUrls([...urls, {id:i++, urls:url}]);
    
    


   

    // {urls.map(urls=>(
    //   console.log("Ans= ", urls))
    //   )}
    


    // setUrls((urls) => urls.concat(res.data.data[i].url));
      // res.data.data.map((e)=>
      // setUrls(e))

    
    
      
    i++;
      }
      // var xx=urls.clone();
      // urls.map(e =>(
      //   console.log(e)
      // ))
      // const [urls , setUrls]=useState([]);

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

        <div className="row m-3 ">
          <div className="col col-lg-4 col-md-4 col-sm-6 col-xs">
            <button className="btn  btn-outline-light" onClick={generateImage}>Generate an Image</button>
          </div>
          <div className="col col-lg-4 col-md-4 col-sm-6 col-xs">
            
          <select
          className="customSize" 
                value={number} 
                onChange={(e) => setNumber(e.target.value)}>
                  {num.map((value) => (
                    <option value={value} key={value}>
                      {value}
                    </option>
                  ))}
                </select>

          </div>

          <div className="col col-lg-4 col-md-4 col-sm-6 col-xs">
                <select 
                value={sizee} 
                onChange={(e) => setSizee(e.target.value)}>
                  {options.map((value) => (
                    <option value={value} key={value}>
                      {value}
                    </option>
                  ))}
                </select>
        </div>

        </div>
        
        {loading ?  (
        <div >
            <svg className="pl" viewBox="0 0 128 128" width="128px" height="128px" >
              <defs>
                <linearGradient id="pl-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="hsl(193,90%,55%)" />
                  <stop offset="100%" stop-color="hsl(223,90%,55%)" />
                </linearGradient>
              </defs>
              <circle className="pl__ring" r="56" cx="64" cy="64" fill="none" stroke="hsla(0,10%,10%,0.1)" stroke-width="16" stroke-linecap="round" />
              <path className="pl__worm" d="M92,15.492S78.194,4.967,66.743,16.887c-17.231,17.938-28.26,96.974-28.26,96.974L119.85,59.892l-99-31.588,57.528,89.832L97.8,19.349,13.636,88.51l89.012,16.015S81.908,38.332,66.1,22.337C50.114,6.156,36,15.492,36,15.492a56,56,0,1,0,56,0Z" fill="none" stroke="url(#pl-grad)" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="44 1111" stroke-dashoffset="10" />
            </svg>
            </div>
            )
            :
              (
                urls.length > 0 ? (
                  <>
                  
                  <h3 className="TextColor">Search Results for: {title}</h3><br/>
                  <div className="CarousalBody">

                  <section className="wrapper">

                    <img className="mainPhoto"   src={mainImg.length>0?mainImg:urls[0]} alt="result"/>

                    <div className="image-wrapper">
                      <ul>
                      {urls.map((e) =>(
                        <li><img className="imgCarousel" src={e} onClick={MainImage}/></li>
                      ))}
                      </ul>

                      <br/>
                      <br/>

                    </div>

                  </section>
                  </div>
                  </>
                  ) : (<> </>)
              )
             }
      
      </>
      
    </div>
  );
                  
};
export default App;