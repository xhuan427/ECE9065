/* add your code here */
document.addEventListener('DOMContentLoaded', function() {
//transform the JSON datd into a javascript object
const jsonObjects = JSON.parse(content)
//get the ul element
ul = document.querySelector("#paintings>ul")
//loop through the JSON data 
for(let i = 0;i<jsonObjects.length;i++){
    liNode = document.createElement('li')
    imgNode = document.createElement('img')
    imgNode.src = './images/small/'+jsonObjects[i].id+'.jpg'
    imgNode.id = jsonObjects[i].id
    liNode.append(imgNode)
    ul.append(liNode)
  }
  //add click event to ul, event delegation
  ul.addEventListener('click', function(event) {
     let liId = event.target.id
     let result = jsonObjects.find(function(obj){
      return obj.id === liId
     })
   //empty figure
   let figure = document.querySelector('figure')
   figure.innerHTML = ''
   //create new img element
   imgElement =  document.createElement('img')
   imgElement.src = './images/large/'+result.id+'.jpg'
   // add content to figure
   figure.appendChild(imgElement)
   document.getElementById("title").textContent = result.title
   document.getElementById("artist").textContent = result.artist

   //loop the features
   for(let j = 0; j<result.features.length;j++){
    div = document.createElement('div')
    figure.append(div)
    div.classList.add('box')
    let left = result.features[j].upperLeft[0]
    let top = result.features[j].upperLeft[1]
    let width  = result.features[j].lowerRight[0]- result.features[j].upperLeft[0]
    let height = result.features[j].lowerRight[1]- result.features[j].upperLeft[1]
    div.style.left = left+'px'
    div.style.top = top+'px'
    div.style.width = width+'px'
    div.style.height = height+'px'
    div.style.position = "absolute"
    //mouseover function
    div.addEventListener('mouseover', function() {
     document.querySelector('#description').textContent = result.features[j].description
    })
    //mouseout function
    div.addEventListener('mouseout', function() {
     document.querySelector('#description').textContent = ''
    })
   }
  });
});



