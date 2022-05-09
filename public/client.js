const socket= io();

// login for chat

    // get
        var textarea=document.getElementById('textarea'); // 6. textarea ko blank krne ke liye
        var messageArea=document.querySelector('.message');

    // 1. for name
        let namee;
        do{
           namee= prompt("Your Name");
        }
        while(!namee)

    // 2. send message  
            // msg ke andar value index.html se ayegi ek bar check krna
        function send(message)
        {
            let msg={
                user:namee,
                message:message
            }
            // append the msg
            appendMsg(msg,'out'); // ek trha ka call krna
            
            // 3. send to server
            socket.emit('sts',msg) // also send object msg to server and listen to index.js
            
            textarea.value=""; // 6. taki send krne ke bad textarea khali ho jaye            
            // 7.
            stb();
        }

        function appendMsg(msg,type)
        {
            let mainDiv=document.createElement('div'); //create div
            let className=type; // classname dynamicaly
            mainDiv.classList.add(className); // add css in div

            let markup = `
            <h3>${msg.user}</h3>
            <p>${msg.message}</p>
            ` 
            // jab bhi hum msg ke bhej rhe hai toh object pass ho rha hai 
            // console.log(msg)
            
            // now main append
            mainDiv.innerHTML = markup;
            messageArea.appendChild(mainDiv);

        }

        // 4. Recieve msg from broadcast in index.js

        socket.on('sts',(msg)=>{
            // console.log(msg); // check on browser console not on terminal
            appendMsg(msg,'in'); // jab bhi msg recieve hoga appendMsg ko call krenge 
            // 7.
            stb();
        })

        // 7. scroll to botton ke liye taki jab bhi user msg bhejo toh automatic chat bottom mai aa jaye
        function stb(){
            messageArea.scrollTop = messageArea.scrollHeight;
            // jo hamara messagearea ka top hai use messagearea ke height se match kr do
        }