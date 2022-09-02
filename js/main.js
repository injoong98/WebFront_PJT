


let cntListJson = localStorage.getItem("cnt");
let cntList = JSON.parse(cntListJson)

wholeList() // cntList 초기화 됨.


//cntList 정렬해서 조회수 높은 순으로 ㅜㄹ력하는 반복문?


function popularList() {

  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if(xhttp.readyState == 4 && xhttp.status == 200){
      jsonfunc(xhttp.responseText);
    }
  }
  xhttp.open("GET","../data/video.json", true);
  xhttp.send();
  function jsonfunc( jsonText ) {
    // console.log(jsonText)

    let json = JSON.parse(jsonText); 
    const ulTag = document.querySelector("#popularList")
    ulTag.innerHTML=""
    let idx = 0;
    while(idx<4){
      for(i=0; i<json.length; i++){
        if(json[i].id === cntList[idx][0]){
          let liTag = document.createElement("li")
          let imgTag = document.createElement("img")
          let spanTag = document.createElement("span")
          let id = json[i].id
          imgTag.src= "https://img.youtube.com/vi/"+ id + "/0.jpg"
          imgTag.onclick = () => {
            for(let j = 0; j<json.length; j++){
              if(cntList[j][0]===id){
                cntList[j][1]++;
              }
            }
            let tmpListJson = JSON.stringify(cntList);
            localStorage.setItem("cnt", tmpListJson);
            location.href="./reviewList.html?postId="+id;
          }
          imgTag.width = 300
          imgTag.height = 200
          spanTag.innerHTML = "("+(idx+1)+"위) "+json[i].title;
          spanTag.setAttribute("class", "videoTitle")
          liTag.appendChild(imgTag)
          liTag.appendChild(spanTag)
          ulTag.appendChild(liTag)
          
          break;
        } // if
      } //for
      idx++;
    } //while
  }

}



//



// 모든 리스트 반환
function wholeList() {

  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if(xhttp.readyState == 4 && xhttp.status == 200){
      jsonfunc(xhttp.responseText);
    }
  }
  xhttp.open("GET","../data/video.json", true);
  xhttp.send();
  function jsonfunc( jsonText ) {
    // console.log(jsonText)

    let json = JSON.parse(jsonText); 
    const ulTag = document.querySelector("#searchList")
    ulTag.innerHTML=""
    let num = 0;
    if(!cntList){
      cntList = new Array(json.length);
      num = 1;
    }
    

    for(i=0; i<json.length; i++){
      let liTag = document.createElement("li")
      let imgTag = document.createElement("img")
      let spanTag = document.createElement("span")
      let id = json[i].id
      imgTag.src= "https://img.youtube.com/vi/"+ id + "/0.jpg"
      
      imgTag.width = 300
      imgTag.height = 200
      spanTag.innerHTML = json[i].title;
      spanTag.setAttribute("class", "videoTitle")
      liTag.appendChild(imgTag)
      liTag.appendChild(spanTag)
      ulTag.appendChild(liTag)

      if(num===1){
        cntList[i] = new Array(2);
        cntList[i][0] = id;
        cntList[i][1] = 0;
      }

      imgTag.onclick = () => {
        for(let j = 0; j<json.length; j++){
          if(cntList[j][0]===id){
            cntList[j][1]++;
          }
        }
        let tmpListJson = JSON.stringify(cntList);
        localStorage.setItem("cnt", tmpListJson);
        location.href="./reviewList.html?postId="+id;
      }
    }
    console.log(cntList);
    cntList.sort((arr1, arr2) => arr2[1]-arr1[1]);
    popularList();
  }

}




const btnWhole = document.querySelector("#btn-whole")
const btnUpper = document.querySelector("#btn-upper")
const btnLower = document.querySelector("#btn-lower")
const btnStomach = document.querySelector("#btn-stomach");
const btns = [btnWhole, btnUpper, btnLower, btnStomach]


btnWhole.addEventListener("click",()=>{
  if(btnWhole.className === "part-btn-off"){
    btns.forEach((btn)=>{
      btn.setAttribute("class","part-btn-off")
    })
    btnWhole.setAttribute("class","part-btn-on")
    btnFilter("전신")
  } else {
    btnWhole.setAttribute("class","part-btn-off")
    wholeList()
  }
})
btnUpper.addEventListener("click",()=>{
  if(btnUpper.className === "part-btn-off"){
    btns.forEach((btn)=>{
      btn.setAttribute("class","part-btn-off")
    })
    btnUpper.setAttribute("class","part-btn-on")
    btnFilter("상체")
  } else {
    btnUpper.setAttribute("class","part-btn-off")
    wholeList()
  }
})
btnLower.addEventListener("click",()=>{
  if(btnLower.className === "part-btn-off"){
    btns.forEach((btn)=>{
      btn.setAttribute("class","part-btn-off")
    })
    btnLower.setAttribute("class","part-btn-on")
    btnFilter("하체")
  } else {
    btnLower.setAttribute("class","part-btn-off")
    wholeList()
  }
})
btnStomach.addEventListener("click",()=>{
  if(btnStomach.className === "part-btn-off"){
    btns.forEach((btn)=>{
      btn.setAttribute("class","part-btn-off")
    })
    btnStomach.setAttribute("class","part-btn-on")
    btnFilter("복부")
  } else {
    btnStomach.setAttribute("class","part-btn-off")
    wholeList()
  }
})



// 버튼을 누르면 함수를 반환
function btnFilter (part){
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
	if(xhttp.readyState == 4 && xhttp.status == 200){
		  partjsonfunc(xhttp.responseText, part);
	  }
  }
  xhttp.open("GET","../data/video.json", true);
  xhttp.send();

  function partjsonfunc(jsonText, part) {
    // console.log(jsonText)
  
    let json = JSON.parse(jsonText); 
    const ulTag = document.querySelector("#searchList")
    ulTag.innerHTML=""
  
    for(i=0; i<json.length; i++){
      if(json[i].part === part){
        let liTag = document.createElement("li")
        let imgTag = document.createElement("img")
        let spanTag = document.createElement("span")
        let id = json[i].id
        imgTag.src= "https://img.youtube.com/vi/"+ id + "/0.jpg"
        imgTag.onclick = () => {
          for(let j = 0; j<json.length; j++){
            if(cntList[j][0]===id){
              cntList[j][1]++;
            }
          }
          let tmpListJson = JSON.stringify(cntList);
          localStorage.setItem("cnt", tmpListJson);
          location.href="./reviewList.html?postId="+id;
        }
        imgTag.width = 300
        imgTag.height = 200
        spanTag.innerHTML = json[i].title;
        spanTag.setAttribute("class", "videoTitle")
        liTag.appendChild(imgTag)
        liTag.appendChild(spanTag)
        ulTag.appendChild(liTag)
      }
    }
  }

}