
function System_(gl)
{
      this.gl_ = new WebGL(gl);
      
      this.Texture_ = Array();
      
      this.Obj_ = Array();
}

System_.prototype.Initalize = function()
{
    this.ArrTexture();
    this.ArrObj();
    
     this.gl_.InitGl(this.Texture_, this.Obj_);
};

System_.prototype.Run = function(PosX, PosZ, PosT, PosMouse)
{
     this.gl_.ObjPos(0, 0, PosX, PosZ, PosT);
          
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
     this.Obj_[0] = {
         name: "car",
         way: "Object/car.obj",
         text: "car",
         x: 0,
         y: 0,
         z: 0,
         t: 0
     };
     
     this.Obj_[1] = {
         name: "car",
         way: "Object/car.obj",
         text: "car",
         x: 0,
         y: 0,
         z: 0,
         t: 0
     };
     
     this.Obj_[2] = {
         name: "mapa",
         way: "Object/mapa111.obj",
         text: "mapa",
         x: 0,
         y: 0,
         z: 0,
         t: 0
     };
     
     this.Obj_[3] = {
         name: "zamok",
         way: "Object/zamok.obj",
         text: "zamok",
         x: 0,
         y: 0,
         z: 0,
         t: 0
     };        
};