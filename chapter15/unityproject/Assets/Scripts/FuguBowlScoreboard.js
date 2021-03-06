/*
Copyright (c) 2013 Technicat, LLC. All Rights Reserved. MIT License.
http://github.com/technicat/LearnUnity
*/

#pragma strict

var style:GUIStyle; // customize the appearance
var baseScreenWidth:float = 320.0; // for iOS, the screen width we think we're rendering on
 

function OnGUI() {
#if UNITY_IPHONE
	var guiScale:float = Screen.width/baseScreenWidth;
	GUI.matrix = Matrix4x4.TRS (Vector3.zero, Quaternion.identity, Vector3(guiScale, guiScale, 1));
#endif
	for (var f:int=0; f<10; f++) {
		var score:String="";
		var roll1:int = FuguBowl.player.scores[f].ball1;
		var roll2:int = FuguBowl.player.scores[f].ball2;
		var roll3:int = FuguBowl.player.scores[f].ball3;
		switch (roll1) {
			case -1: score += " "; break;
			case 10: score +="X"; break;
			default: score += roll1;
		}
		score+="/";
		if (FuguBowl.player.IsSpare(f)) {
			score +="I";
		} else {
			switch (roll2) {
				case -1: score += " "; break;
				case 10: score +="X"; break;
				default: score += roll2;
			}
		}
		if (f==9) {
			score+="/";
			if (10==roll2+roll3) {
				score +="I";
			} else {
				switch (roll3) {
					case -1: score += " "; break;
					case 10: score +="X"; break;
					default: score += roll3;
				}
			}
		}
		GUI.Label(Rect(f*30+5,5,50,20),score,style);
		var total:int=FuguBowl.player.GetScore(f);
		if (total != -1) {
			GUI.Label(Rect(f*30+5,20,50,20)," "+total,style);
		}
	}
}