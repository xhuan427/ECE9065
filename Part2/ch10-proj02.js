import { Play,Scene} from "./play-module.js";
document.addEventListener("DOMContentLoaded", function() {
   
   const url = 'https://www.randyconnolly.com//funwebdev/3rd/api/shakespeare/play.php';
   let currentData  = {}
   
   //Add a change event handler to the first <select>
   let firstSelect = document.querySelector("#playList")
   document.querySelector("#playHere").style.visibility = 'hidden'
   document.querySelector("#interface").style.visibility = 'hidden'
   firstSelect.addEventListener("change",function(e){
    if(e.target.value != 0){
      let link = url + '?name='+e.target.value
      fetch(link)
      .then(response => response.json())
      .then(data => {
          currentData = data
          let play = new Play(data)
          play.makeMarkup()
          addPlayerList(data.persona)
          filter()
          document.querySelector("#playHere").style.visibility = 'visible'
          document.querySelector("#interface").style.visibility = 'visible'
      })
      .catch(error => {
         console.error('error：', error);
      });
   }
    //playerList
   function addPlayerList(data){
      let playSelect = document.querySelector("#playerList")
      playSelect.innerHTML = ''
      data.forEach(element => {
         let option = document.createElement('option')
         option.textContent = element.player
         option.value = element.player
         playSelect.appendChild(option)
      });
   }
   // highlight the user-entered text in the play and show the speeches from the specified player
   function filter(){
      let button = document.querySelector("#btnHighlight")
      button.addEventListener("click",()=>{
         //show the speeches from the specified player
         let actSelect = document.querySelector("#actList")
         let data1 = currentData.acts.find(item=>item.name == actSelect.value)
         let sceneList = document.querySelector("#sceneList")
         let data2 = data1.scenes.find(item=>item.name == sceneList.value)
         let player = document.querySelector("#playerList").value
         let speech = data2.speeches.filter(item=> item.speaker === player)
         let scene = new Scene(currentData)
         scene.makeSceneElement(data2,speech)
         //highlight the user-entered text 
         let inputValue = document.querySelector("#txtHighlight").value
         let sceneHere = document.querySelector("#sceneHere")
         if(inputValue){
            sceneHere.innerHTML = sceneHere.innerHTML.replace(new RegExp(inputValue, 'gi'), `<b>${inputValue}</b>`)
         }
      })

   }
   })



	
	

   /*
     To get a specific play, add play name via query string, 
	   e.g., url = url + '?name=hamlet';
	 
	 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=hamlet
	 https://www.randyconnolly.com/funwebdev/3rd/api/shakespeare/play.php?name=jcaesar
     
   */
	 
   
    /* note: you may get a CORS error if you test this locally (i.e., directly from a
       local file). To work correctly, this needs to be tested on a local web server.  
       Some possibilities: if using Visual Code, use Live Server extension; if Brackets,
       use built-in Live Preview.
    */
});