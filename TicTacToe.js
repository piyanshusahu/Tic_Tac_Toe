let btn=document.querySelector(".start");   
let boxes=document.querySelectorAll(".box");
let head=document.querySelector("h2");
let wintext1=document.querySelector(".win-message1");  // this is a win message block which remains hidden untill a winner is declared.
let start=false;
let turnx=true;  // by default we consider that first turn is for X.
let draw=true;
let count=0;
btn.addEventListener("click", () =>{
    wintext1.classList.add("hidden"); //hidden is a class applied to certain divs/paras whose code can be seen in TicTacToe.css
    if(start==false){
        turnx=true;
        btn.classList.add("hidden");  // start button will get hidden.
        start=true;
        head.innerText="X's turn";
        head.classList.remove("hidden");  // head paragraph unhides and tells us whose turn it is.
        enable();  // it enables the button.
    }
});
let winarr=[   // winner array in which all the winning sequence is present.
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

let reset=document.querySelector(".reset"); // if we press the reset button, the game resets.
reset.addEventListener("click",startgame);

function startgame(){
    start=false;
    turnx=true;
    draw=true;
    enable();
    head.classList.add("hidden");
    btn.classList.remove("hidden");
    wintext1.classList.add("hidden"); // applying all the initial conditions.
};

function enable(){
    for(box of boxes){
        box.disabled=false;  // after every move button must be disabled so that it cannot be accessed again. after each winner declaration button must be enabled again.
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
    if(count==9){ // check for 9 entries
        count=0;
        if(draw==true){  // if draw variable is true then the match is draw.
            head.innerText="match draw";
        }
    }
};

const disable = ()=>{  // disable function disables the button after every move.
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
    box.addEventListener("click", () =>{  // by clicking each box, it will check for winner.
        if(start===true){
            count++;
            if(turnx){  // X's turn just over
                box.innerText='X';
                head.innerText=`O's turn`;
            }
            else{  // O's turn just over.
                box.innerText='O';
                head.innerText=`X's turn`;
            }
            turnx=!turnx;
            box.disabled=true;
            checkwinnner();
            
        }
    });
});
