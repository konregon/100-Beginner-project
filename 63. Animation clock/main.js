let CurrentSec = GetSecondsToday();  
let Seconds = (CurrentSec / 60) % 1;  
let Minutes = (CurrentSec / 3600) % 1;  
let Hours = (CurrentSec / 43200) % 1;  
SetTime(60 * Seconds, "Second");  
SetTime(3600 * Minutes, "Minute");  
SetTime(43200 * Hours, "Hour");  
Function SetTime(Left, Hand) {  
 $(".Clock__" + Hand).Css("Animation-Delay", "" + Left * -1 + "S");  
}  
Function GetSecondsToday() {  
 Let Now = New Date();  
 Let Today = New Date(Now.GetFullYear(), Now.GetMonth(), Now.GetDate());  
 Let Diff = Now - Today;   
 Return Math.Round(Diff)