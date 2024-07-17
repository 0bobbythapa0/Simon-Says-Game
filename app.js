let max=0;
let gameSeq=[];
let userSeq=[];
const body=document.querySelector("body");

let started=false;
let level=0;

const btns=["red","yellow","green","purple"];

const h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false)
    {
        // console.log("game has started");
        started=true;

        levelUp();
    }
});

function gameFlash(btn)
{
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    },200);
}

function userFlash(btn)
{
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash")
    },200);
}

function checkAns(idx){
    
    if(gameSeq[idx]==userSeq[idx])
    {
        if(gameSeq.length==userSeq.length)
        {
            setTimeout(levelUp,1000);
        }
    }else{
        h2.innerHTML=`GAME OVER! your score was <b>${level-1}</b> </br> Press any key to start`;
        if(max<level-1)
        {
            max=level;
        }
        highScore();
        sign();
        reset();
    }
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`level ${level}`;

    let ranIdx=Math.floor(Math.random()*3);
    let ranColor=btns[ranIdx];
    const ranBtn=document.querySelector(`.${ranColor}`);
    gameSeq.push(ranColor);
    console.log(gameSeq);
    // console.log(ranIdx);
    // console.log(ranColor);
    gameFlash(ranBtn);
}

function btnPress(){
    // console.log("button pressed by user");
    console.log(this);
    let btn=this;
    userFlash(btn);

    let Usercolor=btn.getAttribute("id");
    userSeq.push(Usercolor);
    // console.log(userSeq);

    checkAns(userSeq.length-1);
}

const allBtns=document.querySelectorAll(".btn");
for(btn of allBtns)
{
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    level=0;
    gameSeq=[];
    userSeq=[];
}

function sign(){
    body.classList.add("sign");
    setTimeout(function(){
        body.classList.remove("sign")
    },200);
}

function highScore(){
    const p=document.querySelector("p");
    p.innerHTML=`<b>Your Highest Score: ${max}</b> `;
}