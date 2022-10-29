import React from "react";

export default function Meme() {
const[meme , setMeme ] = React.useState(
    {topText:"",
     bottomText:"",
     randomImage:"./images/class-knk.jpg"
    }
)
const[allMemes,setAllMemes] = React.useState([])

React.useEffect( () => {
  async function getMemes(){
  const res = await fetch("https://api.imgflip.com/get_memes")
  const data = await res.json()
    setAllMemes(data.data.memes)
}

getMemes()

return ()=> { 
   console.log("d")
}
},[])

function getMemeImage(){
  const randomNo =  Math.floor(Math.random() * allMemes.length)
  const url = allMemes[randomNo].url

  setMeme(prevMeme => (
    {  
      ...prevMeme,
         randomImage : url
    })) 
}

function toggle(event){
const{name,value} = event.target
setMeme( prevMeme => (
  {
    ...prevMeme,
    [name]: value
  }
)
)

}

  return (
<main>
    <div 
      className="form">  
      <input type="text" 
      placeholder="Top text" 
      className="form-input" 
      name="topText" 
      value={meme.topText} 
      onChange={toggle}
      />
      <input type="text" 
      placeholder="Bottom text" 
      className="form-input" 
      name="bottomText" 
      value={meme.bottomText} 
      onChange={toggle}></input>
      
     <button className="form-button" onClick={getMemeImage}>Get a new meme image</button>
    </div>
    
    <div className="meme">
        <img src={meme.randomImage} className="meme-image" />
        <h2 className="meme-top">{meme.topText}</h2>
        <h2 className="meme-bottom" >{meme.bottomText}</h2>
    </div>
    {/* <div>
      <pre>{JSON.stringify(allMemes,null,2)}</pre>
    </div> */}
</main>   
  );
}

