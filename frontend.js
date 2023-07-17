const urlParams = new URLSearchParams(window.location.search);
const displayName = urlParams.get('name');
const displayEmail = urlParams.get('email');


// Use the name and email however you need in your chat application
console.log(`Name: ${displayName}`);
console.log(`Email: ${displayEmail}`);

//connecting with backend using websocket
const ws= new WebSocket ('wss://chatttingappp.onrender.com')
document.querySelector('main').innerHTML=`<div style= "font-size:24px; margin:10px">loading....</div>`
ws.addEventListener('open',(event)=>{
    document.querySelector('main').textContent=``
})


function msgsend(displayName,displayEmail){
const msg = document.querySelector('#message').value;

var obj={
    name:displayName,
    email:displayEmail,
    message:msg
}

ws.send(JSON.stringify(obj))
document.querySelector('#message').value=null
}


var arr=[]
ws.addEventListener('message',(event)=>{
   
        const objfromserver=JSON.parse(event.data)
        console.log(objfromserver)
    if (objfromserver.email === displayEmail){
        console.log(objfromserver)
        document.querySelector('main').innerHTML+=`<div class="cover">
        <div class="messagebox">
        ${objfromserver.message}
        
        <div class="messagename">
        ${objfromserver.name}
        </div>
    </div>
    </div>`
    }
    else {
        document.querySelector('main').innerHTML+=`<div class="cover">
        <div class="messagebox2">
        ${objfromserver.message}
        
        <div class="messagename">
        ${objfromserver.name}
        </div>
    </div>
    </div>`
    }
    
    document.querySelector('main').scrollTop=document.querySelector('main').scrollHeight
    })
    document.querySelector('input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            msgsend(displayName,displayEmail)
        }
        });




