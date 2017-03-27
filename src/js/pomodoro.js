
'use strict';

/*
function Pomodoro(task, rest){
  this.current = task;
  this.next = rest;
  this.segment = 'task';
  this.counter = 0;
  
}

Pomodoro.prototype.start = function() {
  var self = this;
  console.log(this.current, this.next)
  this.interval = setInterval(function(){

    self.counter++;
    console.log(self.segment, self.counter);

    if (self.counter >= self.current){
      var store = self.current;
      self.current = self.next;
      self.next = store;
      self.segment === 'task' ? self.segment = 'rest' : self.segment = 'task';
      clearInterval(self.interval);
      self.counter = 0;
      self.start();
    }    
  }, 1000)
};

var test = new Pomodoro(10,5);
test.start();


var timeout;

function alarm(){
  console.log(this.counter)
};


var clock = {
  counter: 0,
  duration: 10,
  alarm: alarm
}

clock.counter = 220;
clock.alarm();

*/

function pomodoro(timekeeper) {

  var obj = timekeeper;
  var phase = obj.phases.shift();
  obj.phases.push(phase);

  obj[phase].output(obj.counter);

  obj.timer = setInterval(function timerFn() {
    obj.counter++;
    obj[phase].output(obj.counter);
    if (obj.counter >= obj[phase].duration){
      phase = obj.phases.shift();
      obj.phases.push(phase);
      obj.counter = 0;
    }
    return timerFn;
  }, 1000);

}

var timekeeper = {
  counter: 1,
  task: {
    duration: 10,
    output: console.log
  },
  rest: {
    duration: 5,
    output: console.log
  },
  phases: ['task', 'rest'],
  timer: undefined
}

pomodoro(timekeeper);


