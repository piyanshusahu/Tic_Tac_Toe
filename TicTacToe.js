let btn=document.querySelector(".start");
let boxes=document.querySelectorAll(".box");
let head=document.querySelector("h2");
let wintext1=document.querySelector(".win-message1");
let start=false;
let turnx=true;
let draw=true;
let count=0;
btn.addEventListener("click", () =>{
    wintext1.classList.add("hidden");
    if(start==false){
        turnx=true;
        btn.classList.add("hidden");
        start=true;
        head.innerText="X's turn";
        head.classList.remove("hidden");
        enable();
    }
});
let winarr=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

let reset=document.querySelector(".reset");
reset.addEventListener("click",startgame);

function startgame(){
    start=false;
    turnx=true;
    draw=true;
    enable();
    head.classList.add("hidden");
    btn.classList.remove("hidden");
    wintext1.classList.add("hidden");
};

function enable(){
    for(box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

function checkwinnner(){
    for(let pattern of winarr){
        let a=boxes[pattern[0]].innerText;
        let b=boxes[pattern[1]].innerText;
        let c=boxes[pattern[2]].innerText;
        if(a!="" && b!="" && c!=""){
            if(a===b && b===c){
                head.classList.add("hidden");
                draw=false;
                showwinner(a);
            }
        }
    }
    if(count==9){
        count=0;
        if(draw==true){
            head.innerText="match draw";
        }
    }
};

const disable = ()=>{
    for(box of boxes){
        box.disabled=true;
    }
};

const showwinner =((winner) => {
    wintext1.innerText=`congratulations, player ${winner} won the game`;
    wintext1.classList.remove("hidden");
    disable();
    btn.classList.remove("hidden");
    start=false;
});

boxes.forEach(box => {
    box.addEventListener("click", () =>{
        if(start===true){
            count++;
            if(turnx){
                box.innerText='X';
                head.innerText=`O's turn`;
            }
            else{
                box.innerText='O';
                head.innerText=`X's turn`;
            }
            turnx=!turnx;
            box.disabled=true;
            checkwinnner();
            
        }
    });
});