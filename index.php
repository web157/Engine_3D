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

    var date = new Date();

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

            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;

            var sys_ = new System_(gl);

            sys_.Initalize();

            window.onload=function(){

                (function animloop(){

                    //Time_1 = date.getMilliseconds();

                    sys_.Run(PosX, PosY, PosZ, PosT, PosMouse);

                    //Time_2 = Time_1 - Time_2;

                  requestAnimFrame(animloop, canvas);
                })();

            };
        }  
            function handleKeyDown(e){
        switch(e.keyCode)
        {
            case 65:  // стрелка вправо
                PosT[0]+=0.2;

                break;
            case 68:  // стрелка влево
                PosT[0]-=0.2;


                break;
            case 87:  // стрелка вниз
               PosZ[0] += Math.cos(PosT[0]) * 0.5;
               PosX[0] += Math.sin(PosT[0]) * 0.5;

                break;
            case 83:  // стрелка вверх
                PosZ[0] -= Math.cos(PosT[0]) * 0.5;
                PosX[0] -= Math.sin(PosT[0]) * 0.5;

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
