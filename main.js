document.querySelector(".control-buttons span").onclick = function(){
  let yourName = window.prompt("What's Your Name")
  if (yourName == "" || yourName == null){
    document.querySelector(".name span").innerHTML = "Unknown"
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove()
  document.getElementById("start").play()
}


let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children)
let orderRange =Array.from(blocks.keys())

shuffle(orderRange)
blocks.forEach((block,index)=>{
block.style.order = orderRange[index] ;

block.addEventListener("click" , function() {
  flipBlock(block)
})
})










function flipBlock(block) {
  block.classList.add("is-flipped") ;

  let allFlippedBlock = blocks.filter((block)=>block.classList.contains("is-flipped"))
  if (allFlippedBlock.length===2){
    
    stopClicking()
    checkMatchedBlocks(allFlippedBlock[0],allFlippedBlock[1])
  }
  let flippedall=blocks.filter((block)=>block.classList.contains("has-match"))
  if (flippedall.length === blocks.length) {
    setTimeout(() => {
      document.querySelector(".well-played").style.display="block"
    }, 2000);
    setTimeout(() => {
      document.querySelector(".well-played").style.display="none"
    }, 3000);
    setTimeout(() => {
      document.querySelector(".play-again").style.display="block"
      document.querySelector(".play-again span").onclick = function(){
        location.reload()
      }
    }, 4000);
  }
}


function stopClicking(){
  blocksContainer.classList.add("no-clicking")
  setTimeout(()=>{
  blocksContainer.classList.remove("no-clicking")

  },duration)
}
function shuffle(array){
let current = array.length ,
    temp,
    random
    while(current > 0){
      random = Math.floor(Math.random()*current) ;

      current-- ;

      temp = array[current] ;

      array[current] = array[random] ;

      array[random] = temp
    }
}


function checkMatchedBlocks(firstBlocks , secondBlocks) {
  let triesElement = document.querySelector(".tries span")
  if (firstBlocks.dataset.technology === secondBlocks.dataset.technology){
    firstBlocks.classList.remove("is-flipped")
    secondBlocks.classList.remove("is-flipped")
    firstBlocks.classList.add("has-match")
    secondBlocks.classList.add("has-match")
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1 ;
    setTimeout(() => {
      firstBlocks.classList.remove("is-flipped")
      secondBlocks.classList.remove("is-flipped")
    }, duration);
  }

}

