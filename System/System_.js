
function System_(gl)
{
      this.gl_ = new WebGL(gl);
      
      this.collis = new Collision();
      
      this.Texture_ = Array();
      
      this.Obj_;
      
      this.Obj_Data = Array();
      
      this.PY;
}

System_.prototype.Initalize = function()
{
    this.ArrTexture();
    this.ArrObj();
    
     this.gl_.InitGl(this.Texture_, this.Obj_Data);
     
     this.collis.AssemblyTriangle(this.gl_.GetVert());
};

System_.prototype.Run = function(PosX, PosY, PosZ, PosT, PosMouse)
{
    PosY[0] = this.collis.ObjPosition(PosX, PosY, PosZ);
    
    this.PY = PosY[0];
    
     this.gl_.ObjPos("car", 0, PosX, PosY, PosZ, PosT);
          
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

System_.prototype.NewObj = function(str)
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
     this.Obj_Data[str] = this.Obj_;  
};

System_.prototype.NetObjPos = function(str)
{
      
        this.Obj_Data[str[4]]["x"] = str[0];
        this.Obj_Data[str[4]]["y"] = str[1];
        this.Obj_Data[str[4]]["z"] = str[2];
        this.Obj_Data[str[4]]["t"] = str[3];
};

System_.prototype.ObjPosY = function()
{
    return this.PY;
};

System_.prototype.ObjDel = function(str)
{
    delete this.Obj_Data[str];     
};

System_.prototype.NewPosY = function(PosX, PosY, PosZ)
{
    var res_ = this.collis.ObjPosition(PosX, PosY, PosZ);
    
    return res_;     
};