<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">       
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
        <script type="text/javascript" src="System/System_.js"></script>
        <script type="text/javascript" src="WebGL/WebGL.js"></script>
        <script type="text/javascript" src="Physics/Collision.js"></script>
        <script  type="text/javascript" src="gl-matrix-min.js"></script>
       
        <title>Engine_3D</title>
    </head>
    <body>
        
        <canvas id="canvas3D">Ваш браузер не поддерживает элемент canvas</canvas>
  
        <script id="shader-fs" type="x-shader/x-fragment">

            precision highp float;
            uniform sampler2D uSampler;
            varying vec2 vTextureCoords;

            void main(void) {
              gl_FragColor = texture2D(uSampler, vTextureCoords);
            }
        </script>

        <script id="shader-vs" type="x-shader/x-vertex">

            attribute vec3 aVertexPosition;
            attribute vec2 aVertexTextureCoords;
            varying vec2 vTextureCoords;
            uniform mat4 uMVMatrix;
            uniform mat4 uPMatrix;

            void main(void) {
              gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
              vTextureCoords = aVertexTextureCoords;

            }
        </script>
    
    <script type="text/javascript"> 
        
            var webSocket = new WebSocket('ws://127.0.0.1:9595');
 
            webSocket.onopen = function(event) { alert('onopen'); };  
            
            webSocket.onerror = function(event) { alert('Произошла ошибка');  };
            
            webSocket.onclose = function(event){ alert('Соединение закрыто...'); };

    var Time_1 = 0;
    var Time_2 = 0;

    var PosX = Array();
    var PosY = Array();
    var PosZ = Array();
    var PosT = Array();

    var PosMouse = 0;

    PosX[0] = 0.0;
    PosY[0] = 0.0;
    PosZ[0] = 0.0;
    PosT[0] = 0.0;
    
    var  NetPos = Array();
    var NameObj;
    
    NetPos[0] = 0;
    NetPos[1] = 0;
    NetPos[2] = 0;
    NetPos[3] = 0;
    
    function getRandomArbitary(min, max)
    {
      return Math.random() * (max - min) + min;
    }  

    gl = new Object();

        var canvas = document.getElementById("canvas3D");

        canvas.width = $(document).width();
        canvas.height = $(document).height();

        try {
            gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");       
        }
        catch(e) {}

          if (!gl) {
            alert("Ваш браузер не поддерживает WebGL");
          }
        if(gl){
              document.addEventListener('keydown', handleKeyDown, false);       
              document.addEventListener('mousemove', handleMouseDown, false);
              document.addEventListener('mousedown', handleMouseClic, false);

            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
                       
            var sys_ = new System_(gl);

            sys_.Initalize();
            
            webSocket.onmessage = function(event)
            {                             
             var NetObjData = event.data; 
             
             if("Name" == NetObjData.substr(0, 4))
               {     
                   var NewObj_ = NetObjData.substr(4);
                   
                   RegEx=/\s/g;
                   
                   NewObj_ = NewObj_.replace(RegEx,"");
                   
                   //NameObj;
                   
                   NetPos[4] = NewObj_;
                  
               }else if("New" == NetObjData.substr(0, 3))
               {     
                   var NewObj_ = NetObjData.substr(3);
                   
                   RegEx=/\s/g;
                   
                   NewObj_ = NewObj_.replace(RegEx,"");
                   
                   sys_.NewObj(NewObj_);
               }else if("Del" == NetObjData.substr(0, 3)){
                   
                   var DelObj_ = NetObjData.substr(3);
                   
                   RegEx=/\s/g;
                   
                   DelObj_ = DelObj_.replace(RegEx,"");
                         
                   sys_.ObjDel(DelObj_);
                   
               }else if("shot" == NetObjData.substr(0, 4)){
                  
                  NetPos[0] = PosX[0] = getRandomArbitary(-150,150);
                 
                  NetPos[2] = PosZ[0] = getRandomArbitary(-150,150);
                  NetPos[3] = PosT[0] = 0.0;
                  NetPos[1] = PosY[0] = sys_.NewPosY(PosX, PosY, PosZ);
                  webSocket.send(JSON.stringify(NetPos));
               }else{
                   
                var PsNetD =  JSON.parse(event.data);
                
                sys_.NetObjPos(PsNetD);
               }
            };

            window.onload=function(){

                (function animloop(){
                 
                    sys_.Run(PosX, PosY, PosZ, PosT, PosMouse);
                  
                  requestAnimFrame(animloop, canvas);
                })();

            };
        }  
            function handleKeyDown(e){
        switch(e.keyCode)
        {
            case 65: 
                PosT[0]+=0.2;
                                           
                 NetPos[3] = PosT[0];
            webSocket.send(JSON.stringify(NetPos));
                break;
            case 68:  
                PosT[0]-=0.2;

                NetPos[3] = PosT[0];
             webSocket.send(JSON.stringify(NetPos));
                break;
            case 87:  
               PosZ[0] += Math.cos(PosT[0]) * 0.5;
               PosX[0] += Math.sin(PosT[0]) * 0.5;

                NetPos[0] = PosX[0];
                NetPos[1] = sys_.ObjPosY();
           NetPos[2] = PosZ[0];
            webSocket.send(JSON.stringify(NetPos));
                break;
            case 83:  
                PosZ[0] -= Math.cos(PosT[0]) * 0.5;
                PosX[0] -= Math.sin(PosT[0]) * 0.5;

                 NetPos[0] = PosX[0];
                 NetPos[1] = sys_.ObjPosY();
           NetPos[2] = PosZ[0];
            webSocket.send(JSON.stringify(NetPos));
                break;
        }   

    }

    var temp = 0;
    var temp1 = 0;
    function handleMouseDown(e){

        temp = e.clientX;

          if(temp > temp1){ PosMouse+=0.05; }

          if(temp < temp1){ PosMouse-=0.05; }

        temp1 = temp;    
    }
    
    function handleMouseClic(e){
       
       if(event.which == 1){
         webSocket.send("shot");
       }
       
    }

            window.requestAnimFrame = (function(){
          return  window.requestAnimationFrame       || 
                  window.webkitRequestAnimationFrame || 
                  window.mozRequestAnimationFrame    || 
                  window.oRequestAnimationFrame      || 
                  window.msRequestAnimationFrame     ||
             function(callback, element) {
               return window.setTimeout(callback, 1000/60);
             };
    })();
    </script>
   
    </body>
</html>
