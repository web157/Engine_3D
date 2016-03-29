
function System_(gl)
{
      this.gl_ = new WebGL(gl);
      
      this.Texture_ = Array();
      
      this.Obj_;
      
      this.Obj_Data = Array();
}

System_.prototype.Initalize = function()
{
    this.ArrTexture();
    this.ArrObj();
    
     this.gl_.InitGl(this.Texture_, this.Obj_Data);
};

System_.prototype.Run = function(PosX, PosZ, PosT, PosMouse)
{
     this.gl_.ObjPos("car", 0, PosX, PosZ, PosT);
          
     this.gl_.DrawGl(PosMouse);
};

System_.prototype.ArrTexture = function()
{        
     this.Texture_["car"] = "Texture/333z.png";
     this.Texture_["mapa"] = "Texture/zzz2.png";
     this.Texture_["zamok"] = "Texture/102.png";
     
};

System_.prototype.ArrObj = function()
{
     this.Obj_ = {
         name: "car",
         way: "Object/car.obj",
         text: "car",
         x: 0,
         y: 0,
         z: 0,
         t: 0,
         hide: false
     };
     
     this.Obj_Data["car"] = this.Obj_;
              
     this.Obj_ = {
         name: "mapa",
         way: "Object/mapa111.obj",
         text: "mapa",
         x: 0,
         y: 0,
         z: 0,
         t: 0,
         hide: false
     };
     
     this.Obj_Data["mapa"] = this.Obj_;
     
     this.Obj_ = {
         name: "zamok",
         way: "Object/zamok.obj",
         text: "zamok",
         x: 0,
         y: 0,
         z: 0,
         t: 0,
         hide: false
     };  
     
     this.Obj_Data["zamok"] = this.Obj_;
     
};