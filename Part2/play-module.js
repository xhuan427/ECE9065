/* In this module, create three classes: Play, Act, and Scene. */
class Play {
    constructor(data){
        this.data = data
    }
    //actList
    makeMarkup(){
        let actSelect = document.querySelector("#actList")
        actSelect.innerHTML = ''
        let data = this.data.acts
        data.forEach(element => {
            let option = document.createElement('option')
            option.textContent = element.name
            option.value = element.name
            actSelect.appendChild(option)
         });
         this.actOptionChange(actSelect.value)
         let that = this
         actSelect.addEventListener("change",function(e){
            that.actOptionChange(e.target.value)
        })
    }
    //actList change option need to change scene list
    actOptionChange(){
       let data = this.data
       let act = new Act(data)
       act.makeMarkup()
    }
}

class Act{
    constructor(data){
        this.data = data
    }
    //sceneList
    makeMarkup(){
        let sceneList = document.querySelector("#sceneList")
        let actSelect = document.querySelector("#actList")
        sceneList.innerHTML = ''
        let data = this.data.acts.find(item=>item.name == actSelect.value)
        data.scenes.forEach(element=>{
           let option = document.createElement('option')
           option.textContent = element.name
           option.value = element.name
           sceneList.appendChild(option)
        })
        //change the showing content
        this.changeContent()
        let that = this
        sceneList.addEventListener("change",function(){
            that.changeContent()
        })

    }
    //modify the content of showing
    changeContent(){
      document.querySelector("#playHere>h2").textContent = this.data.title
      document.querySelector("#actHere>h3").textContent = document.querySelector("#actList").value
      let data = this.data
      let scene = new Scene(data)
      scene.makeMarkup()
    }
}

class Scene{
    constructor(data){
     this.data = data
    }

    //speechList
    makeMarkup(){
        let actSelect = document.querySelector("#actList")
        let data1 = this.data.acts.find(item=>item.name == actSelect.value)
        let sceneList = document.querySelector("#sceneList")
        let data2 = data1.scenes.find(item=>item.name == sceneList.value)
        this.makeSceneElement(data2,data2.speeches)
    }

    //make scene element
     makeSceneElement(data,sppech){
        let sceneHere = document.querySelector("#sceneHere")
        sceneHere.innerHTML = ''
        let h4 =  document.createElement("h4")
        h4.textContent = document.querySelector("#sceneList").value
        sceneHere.appendChild(h4)
        let p1 =  document.createElement("p")
        p1.setAttribute("class","title")
        p1.textContent = data.title
        sceneHere.appendChild(p1)
        let p2 =  document.createElement("p")
        p2.setAttribute("class","direction")
        p2.textContent = data.stageDirection
        sceneHere.appendChild(p2)
        let that = this
        sppech.forEach(item=>{
           let dev =  that.makeElement(item)
           sceneHere.appendChild(dev)
        })
     }

    //make element
     makeElement(data){
        let dev = document.createElement("dev")
        dev.setAttribute('class',"speech")
        let span  = document.createElement("span")
        span.textContent = data.speaker
        dev.appendChild(span)
        if(data.lines.length>1){
            data.lines.forEach(item=>{
               let p = document.createElement("p")
               p.textContent = item
               dev.appendChild(p)
            })
        }else if(data.lines.length>0){
            let p = document.createElement("p")
            p.textContent = data.lines
            dev.appendChild(p)
        }
        return dev
     }
}
export {Play,Act,Scene}
