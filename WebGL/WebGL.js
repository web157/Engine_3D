
function WebGL(gl)
{
      this.gl = gl; 
      this.shaderProgram = new Object();
       
      this.vertexBuffer = Array();
      this.indexBuffer = Array();
      this.textureCoordsBuffer = Array();
        
      this.texture = Array();
       
      this.mvMatrix = mat4.create(); 
      this.pMatrix = mat4.create();
          
      this.Obj_;    
      
      this.vertices1 = Array();
}

WebGL.prototype.GetVert = function()
{
    return this.vertices1;
};

WebGL.prototype.initShaders = function()
{
    var fragmentShader = this.getShader(this.gl.FRAGMENT_SHADER, 'shader-fs');
    var vertexShader = this.getShader(this.gl.VERTEX_SHADER, 'shader-vs');
 
   // shaderProgram = gl.createProgram();
 
    this.gl.attachShader(this.shaderProgram, vertexShader);
    this.gl.attachShader(this.shaderProgram, fragmentShader);
 
    this.gl.linkProgram(this.shaderProgram);
      
    if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
        alert("Не удалось установить шейдеры");
    }
      
    this.gl.useProgram(this.shaderProgram);
 
    this.shaderProgram.vertexPositionAttribute = this.gl.getAttribLocation(this.shaderProgram, "aVertexPosition");
    this.gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute); 
    this.shaderProgram.vertexTextureAttribute = this.gl.getAttribLocation(this.shaderProgram, "aVertexTextureCoords");
    this.gl.enableVertexAttribArray(this.shaderProgram.vertexTextureAttribute);
     
    this.shaderProgram.MVMatrix = this.gl.getUniformLocation(this.shaderProgram, "uMVMatrix");
    this.shaderProgram.ProjMatrix = this.gl.getUniformLocation(this.shaderProgram, "uPMatrix");
};

WebGL.prototype.setMatrixUniforms = function()
{
    this.gl.uniformMatrix4fv(this.shaderProgram.ProjMatrix,false, this.pMatrix);
    this.gl.uniformMatrix4fv(this.shaderProgram.MVMatrix, false, this.mvMatrix);  
};

WebGL.prototype.getShader = function(type,id)
{
     var source = document.getElementById(id).innerHTML;
 
    var shader = this.gl.createShader(type);
     
    this.gl.shaderSource(shader, source);
 
    this.gl.compileShader(shader);
   
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
        alert("Ошибка компиляции шейдера: " + this.gl.getShaderInfoLog(shader));
        this.gl.deleteShader(shader);   
        return null;
    }
    return shader;  
};

WebGL.prototype.setupWebGL = function(i, PosMouse)
{
    this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
    mat4.perspective(this.pMatrix, 1.04, this.gl.viewportWidth / this.gl.viewportHeight, 0.1, 1000.0);
    mat4.identity(this.mvMatrix);
    mat4.lookAt(this.mvMatrix, [this.Obj_["car"]["x"] + Math.sin(PosMouse) * 25,this.Obj_["car"]["y"] + 10,this.Obj_["car"]["z"] + Math.cos(PosMouse) * 25], [this.Obj_["car"]["x"],this.Obj_["car"]["y"],this.Obj_["car"]["z"]], [0,1,0]);
     mat4.translate(this.mvMatrix,this.mvMatrix,[this.Obj_[i]["x"], this.Obj_[i]["y"], this.Obj_[i]["z"]]);
     mat4.rotate(this.mvMatrix,this.mvMatrix, this.Obj_[i]["t"], [0, 1, 0]); 
};

WebGL.prototype.initBuffers = function(i, string)
{
    var vertices = Array();
 
 var indices = Array();
 
 var textureCoords = Array();
            
            $.ajax({
                   async: false,
                   type: "POST",
                   url: "LoadGeometry.php",
                   data: {fname:"Vert", ffile:string},
                   success: function(data) {
                   vertices = $.parseJSON(data);                  
                   }
               });
               
               
 
    $.ajax({
                   async: false,
                   type: "POST",
                   url: "LoadGeometry.php",
                   data: {fname:"Ind", ffile:string},
                   success: function(data) {
                   indices = $.parseJSON(data); 
                  // document.write(indices.length+ "</br>");
                   }
               });
               
               $.ajax({
                   async: false,
                   type: "POST",
                   url: "LoadGeometry.php",
                   data: {fname:"Text", ffile:string},
                   success: function(data) {
                   textureCoords = $.parseJSON(data);                  
                   }
               });
             
    if(i == "mapa"){
        this.vertices1 = vertices;
    }
 
  this.vertexBuffer[i] = this.gl.createBuffer();
  this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer[i]);
  this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
  this.vertexBuffer[i].itemSize = 3;
  
 
    this.indexBuffer[i] = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer[i]);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.gl.STATIC_DRAW);
    this.indexBuffer[i].numberOfItems = indices.length; 
   
 
  // Создание буфера координат текстуры
  this.textureCoordsBuffer[i] = this.gl.createBuffer();
  this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureCoordsBuffer[i]);
  this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(textureCoords), this.gl.STATIC_DRAW);
    this.textureCoordsBuffer[i].itemSize=2;
};

WebGL.prototype.draw = function(i)
{
    if(this.Obj_[i]["hide"] === true) { return; }
    
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer[this.Obj_[i]["name"]]);
    this.gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, 
                         this.vertexBuffer[this.Obj_[i]["name"]].itemSize, this.gl.FLOAT, false, 0, 0);
 
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.textureCoordsBuffer[this.Obj_[i]["name"]]);
  this.gl.vertexAttribPointer(this.shaderProgram.vertexTextureAttribute,
                         this.textureCoordsBuffer[this.Obj_[i]["name"]].itemSize, this.gl.FLOAT, false, 0, 0);
  this.gl.activeTexture(this.gl.TEXTURE0);
  this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture[this.Obj_[i]["text"]]);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.drawArrays(this.gl.TRIANGLES,this.indexBuffer[this.Obj_[i]["name"]], this.indexBuffer[this.Obj_[i]["name"]].numberOfItems);
};

WebGL.prototype.RenderBegin = function()
{
     this.gl.clearColor(0.0, 0.9, 0.5, 1.0);  
    this.gl.clear(this.gl.COLOR_BUFFER_BIT || this.gl.DEPTH_BUFFER_BIT);
};

WebGL.prototype.setTextures = function(i, string)
{
    this.texture[i] = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture[i]);
    var image = new Image();
      
     var Text = this.texture[i];
      
     var handleTextureLoaded1 = this.handleTextureLoaded;
      
    image.onload = function() {
     
        handleTextureLoaded1(image, Text);
  };
  
   image.src = string;
  
    this.shaderProgram.samplerUniform = this.gl.getUniformLocation(this.shaderProgram, "uSampler");
    this.gl.uniform1i(this.shaderProgram.samplerUniform, 0);
};

WebGL.prototype.handleTextureLoaded = function(image, texture)
{
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
    this.gl.generateMipmap(this.gl.TEXTURE_2D);
    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
};

WebGL.prototype.InitGl = function(Texture_, Obj_)
{
    
        this.shaderProgram = this.gl.createProgram();
   
        this.initShaders();
       
       for(var i in Obj_){
        this.initBuffers(Obj_[i]["name"],Obj_[i]["way"]);      
    }
    
        
        for(var data_ in Texture_){
        this.setTextures(data_, Texture_[data_]);
    }
        this.Obj_ = Obj_;         
};

WebGL.prototype.DrawGl = function(PosMouse)
{      
    this.RenderBegin();
    
        for(var i in this.Obj_){
            this.setupWebGL(i, PosMouse);
            this.setMatrixUniforms();
            this.draw(i);            
        }
};

WebGL.prototype.ObjPos = function(i, j, PosX, PosY, PosZ, PosT)
{
    this.Obj_[i]["x"] = PosX[j];
    this.Obj_[i]["y"] = PosY[j];
    this.Obj_[i]["z"] = PosZ[j];
    this.Obj_[i]["t"] = PosT[j];
             
};
