<?php

require_once 'Math/Vector3.php';
require_once 'Math/Vec3Dot.php';

function Pick($px, $py, $pz, $pt, $px1, $py1, $pz1, $pt1){

$m_Origin = new Vector3($px, $py, $pz);
$m_Direction = new Vector3(sin($pt), 0, cos($pt));

$ObjPos = new Vector3($px1, $py1, $pz1);

$v_ = new Vector3(0, 0, 0);

$v_->x = $m_Origin->x - $ObjPos->x;
$v_->y = $m_Origin->y - $ObjPos->y;
$v_->z = $m_Origin->z - $ObjPos->z;

$b = 2 * V3Dot($m_Direction, $v_);

$c = V3Dot($v_, $v_) - (3 * 3);

$discriminant = ($b*$b) - (4 * $c);

if ($discriminant < 0){
			
			return false;
		}
		$discriminant = sqrt($discriminant);

		$s0 = (-$b + $discriminant) / 2;
		$s1 = (-$b - $discriminant) / 2;

		if ($s0 >= 0 || $s1 >= 0)
		{
                    return true;
                }
return false;
}