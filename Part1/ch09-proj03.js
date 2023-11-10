/* add your code here */
//add a DOMContentLoaded event handler
document.addEventListener('DOMContentLoaded',function(){
      
    // transform the JSON data in the two JSON data files into JavaScript objects
    let userData = JSON.parse(userContent)
    let stocksData = JSON.parse(stockContent)
    let currentId = ""

    // hide the details <section>
    let detailSection = document.querySelector(".Details")
    detailSection.style.display = "none"
   
    //ul element
    let ulNode = document.querySelector(".UserList>ul") 
   
    //showUserList function to show the user List
    function showUserList(){
        ulNode.innerHTML = ''
        //create array of DOM nodes
        let nodes =  userData.map(data => {
            let item  = document.createElement("li")
            item.textContent =  `${data.user.lastname}, ${data.user.firstname}`
            item.setAttribute('data-id',data.id)
            return item
        });
       // add them to ul
       nodes.forEach(n => {
         ulNode.appendChild(n)
       });

    }
    showUserList()

    // handle all click events in the user list
    ulNode.addEventListener("click",function(e){
        //show the detail section
        detailSection.style.display = "block"
        document.querySelector(".StockDetails").style.display = "none"
        
        if(e.target&&e.target.nodeName == "LI"){
            let id = e.target.dataset.id
            currentId = id
            let userInfo = userData.find(item => item.id === parseInt(id))
            //display the user information in the user details form
            document.querySelector("#firstname").value = userInfo.user.firstname
            document.querySelector("#lastname").value = userInfo.user.lastname
            document.querySelector("#address").value = userInfo.user.address
            document.querySelector("#city").value = userInfo.user.city
            document.querySelector("#email").value  = userInfo.user.email
            //display the portfolio section
            let divNode = document.querySelector("#listPortfolio")
            divNode.textContent = ''
            userInfo.portfolio.forEach(p=>{
              let left = document.createElement("h3")
              left.textContent = `${p.symbol}`
              divNode.appendChild(left)
              let middle = document.createElement("h3")
              middle.textContent = `${p.owned}`
              divNode.appendChild(middle)
              let right =  document.createElement("button")
              right.textContent = 'view'
              right.setAttribute('name', p.symbol)
              divNode.appendChild(right)
             })
             // add event handler to each View button in the portfolio list
            let buttons =  document.querySelectorAll("#listPortfolio>button")
            buttons.forEach(p=>{
                //display the information for that stock in the stock details section
                p.addEventListener("click",function(e){
                    document.querySelector(".StockDetails").style.display = "block"
                   let info = stocksData.find(s=>s.symbol === e.target.name)
                   document.querySelector("#logo").src = './logos/'+info.symbol+".svg"
                   document.querySelector("#stockName").textContent = info.name
                   document.querySelector("#stockSector").textContent = info.sector
                   document.querySelector("#stockIndustry").textContent = info.subIndustry
                   document.querySelector("#stockAddress").textContent = info.address
                })
            })
           
        }
    })
   

    //implement the Save buttons to revise the in-memory data
    document.querySelector("#btnSave").addEventListener("click",function(e){
         e.preventDefault()
         let userInfo = userData.find(item => item.id === parseInt(currentId))
         userInfo.user.firstname = document.querySelector("#firstname").value 
         userInfo.user.lastname =  document.querySelector("#lastname").value 
         userInfo.user.address = document.querySelector("#address").value
         userInfo.user.city = document.querySelector("#city").value
         userInfo.user.email =document.querySelector("#email").value
         let index = userData.findIndex(item => item.id === parseInt(currentId));
         if(index>-1){
            userData[index] = userInfo
         }
         detailSection.style.display = "none"
         showUserList()
    })

    //implement the Delete buttons to revise the in-memory data
    document.querySelector("#btnDelete").addEventListener("click",function(e){
        e.preventDefault()
        let index = userData.findIndex(item => item.id === parseInt(currentId));
         if(index>-1){
            userData.splice(index, 1)
         }
        detailSection.style.display = "none"
        showUserList()
    })

})