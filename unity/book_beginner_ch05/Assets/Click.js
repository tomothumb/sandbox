#pragma strict

 public function StopTimer(){
 
       if(TimerCount.stop){
         TimerCount.stop = false;
       }else{
         TimerCount.stop = true;
        }
     }