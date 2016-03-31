
function Collision()
{
    this.Vert = Array();  
}

Collision.prototype.AssemblyTriangle = function(Vert)
{
    this.Vert = Vert;
    
};

function s2(x1,y1,x2,y2,x3,y3)
	{
		return ((x1 - x2)*(y3 - y2) - (y1 - y2)*(x3 - x2));
	}

Collision.prototype.ObjPosition = function(PosX, PosY, PosZ)
{
   var x1, y1, x2, y2, x3, y3, z1, z2, z3;
    
    for(var i = 0; i < this.Vert.length; i++){
        
                        x1 = this.Vert[i];
                        i += 2;
			y1 = this.Vert[i++];
                        
                        x2 = this.Vert[i];
                         i += 2;
			y2 = this.Vert[i++];

			x3 = this.Vert[i];
                         i += 2;
			y3 = this.Vert[i];

			var x = PosX[0];
			var y = PosZ[0];

			var f1 = s2(x, y, x1, y1, x2, y2);
			var f2 = s2(x, y, x2, y2, x3, y3);
			var f3 = s2(x, y, x3, y3, x1, y1);




			if ((f1*f2) > 0 && (f2*f3) > 0){
                         
                                x1 = this.Vert[i - 8];
				y1 = this.Vert[i- 7];
				z1 = this.Vert[i-6];

				x2 = this.Vert[i-5];
				y2 = this.Vert[i-4];
				z2 = this.Vert[i-3];

				x3 = this.Vert[i-2];
				y3 = this.Vert[i-1];
				z3 = this.Vert[i];

				var X2 = PosX[0];
				var Z2 = PosZ[0];

				var a = -(z3*y2 - z1*y2 - z3*y1 + y1*z2 + y3*z1 - z2*y3);
				var b = (z1*x3 + z2*x1 + z3*x2 - z2*x3 - z1*x2 - z3*x1);
				var c = (y2*x3 + y1*x2 + y3*x1 - y1*x3 - y2*x1 - x2*y3);
				var d = -a*x1 - b*y1 - c*z1;



				
				var Y1 = ((-(a*X2 + c*Z2 + d) / b));
                                
                                return Y1;
                        }

				
    }
    return PosY[0];
};