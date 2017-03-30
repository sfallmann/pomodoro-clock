;
(function(){

  var alarm = document.getElementById("alarm"); 
  var start = document.getElementById('start');
  var work = document.getElementById('work');
  var rest = document.getElementById('rest');
  var min10s = document.getElementById('min-10s');
  var min1s = document.getElementById('min-1s');
  var sec10s = document.getElementById('sec-10s');
  var sec1s = document.getElementById('sec-1s');
  var workLight = document.getElementById('work-light');
  var restLight = document.getElementById('rest-light');
  var controls = document.getElementById('control-panel');

  var timekeeper = {
    counter: 1,
    work: {
      duration: 0,
    },
    rest: {
      duration: 0,
    },
    phases: ['work', 'rest'],
    timer: undefined,
    cb: function(){
      playAlarm();
      workLight.classList.toggle('light-on');
      restLight.classList.toggle('light-on');
    }
  }

  var timer = pomodoro(timekeeper);
  controls.addEventListener("click", controlRouter);

  function playAlarm() { 
      alarm.currentTime = 0;
      alarm.play(); 
  } 

  function displayTime(arr){
    min10s.innerHTML = arr[0];
    min1s.innerHTML = arr[1];
    sec10s.innerHTML = arr[2];
    sec1s.innerHTML = arr[3];
  }

  function parseCounter(counter){

    var time = ['0', '0', '0', '0'];
    var str;
    var mod;
    
    if (counter - 10 < 0){
      time[3] = String(counter);
    }
    else if (counter - 10 > -1 && counter - 60 < 0) {
      str = String(counter);
      time[2] = str[0];
      time[3] = str[1];
    }
    else if (counter >= 60 && counter < 600){
      time[1] = String(Math.floor(counter/60));
      mod = counter % 60;
      if (mod < 10){
        time[3] = String(mod);
      } else {
        mod = String(mod);
        time[2] = mod[0];
        time[3] = mod[1];
      }  
    }
    else {
      var mod = counter % 60;
      if (mod < 10){
        time[1] = String(mod);
      } else {
        mod = String(mod);
        time[0] = mod[0];
        time[1] = mod[1];
      }  
    }

    return time;
  }

  function controlRouter(event){
    var id = event.target.id;
    var value;

    switch(event.target.id){
      case "start":
        
        startTimer(work.innerHTML, rest.innerHTML);
        start.disabled = true;
        break;
      case "reset":
        resetTimer();
        start.disabled = false;
        break;
      case "work-btn-up":
        value = Number(document.querySelector("#work").innerHTML);
        if(value < 60){
          value = String(value + 1);
          document.querySelector("#work").innerHTML = value.length > 1 ? value : "0" + String(value);
        }
        break;
      case "rest-btn-up":
        value = Number(document.querySelector("#rest").innerHTML);
        if(value < 60){
          value = String(value + 1);
          document.querySelector("#rest").innerHTML = value.length > 1 ? value : "0" + String(value);
        }
        break;   
      case "work-btn-down":
        value = Number(document.querySelector("#work").innerHTML);
        if(value > 1){
          value = String(value - 1);
          document.querySelector("#work").innerHTML = value.length > 1 ? value : "0" + String(value);
        }
        break;
      case "rest-btn-down":
        value = Number(document.querySelector("#rest").innerHTML);
        if(value > 1){
          value = String(value - 1);
          document.querySelector("#rest").innerHTML = value.length > 1 ? value : "0" + String(value);
        }
        break;                       
    }        
  }

  function startTimer(work, rest) {
    timer.setDurations(work, rest);
    playAlarm();
    timer.start();
  }

  function resetTimer() {
    timer.reset();
  }    

  function pomodoro(timekeeper) {

    var obj = Object.assign({}, timekeeper);
    var phase = obj.phases.shift();
    var _initial = obj.counter;
    obj.phases.push(phase);

    return {
      setDurations: function setDurations(t, r){
        obj.work.duration = Number(t) * 60;
        obj.rest.duration = Number(r)* 60;
      },
      start: function start(){
        obj.counter = _initial;
        
        if (obj.timer !== undefined){
          clearInterval(obj.timer);
        }

        displayTime(['0', '0', '0', '1']);

        restLight.classList.remove('light-on');
        workLight.classList.add('light-on');
        
        obj.timer = setInterval(function timerFn() {
          
          if (obj.counter >= obj[phase].duration){
            phase = obj.phases.shift();
            obj.phases.push(phase);
            obj.counter = 0;
            obj.cb();
          }

          obj.counter++;
          displayTime(parseCounter(obj.counter));
          return timerFn;
        }, 1000);
      },
      reset: function reset(){
        obj.counter = _initial;
        
        if (obj.timer !== undefined){
          clearInterval(obj.timer);
        }

        displayTime(['0', '0', '0', '0']);

        restLight.classList.remove('light-on');
        workLight.classList.remove('light-on');            
      }
    }
  }  
})()