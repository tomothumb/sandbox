#pragma strict
import UnityEngine.UI;

private var timerText : Text;
private var time : float;
private var currentTime : int;
public static var stop : boolean = false;


function Start () {
timerText = GetComponent.<Text>();

}

function Update () {
if(stop){
time += Time.deltaTime;
currentTime = time;
timerText.text = "Timer :" + currentTime;
}
}



