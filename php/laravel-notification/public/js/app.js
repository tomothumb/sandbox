webpackJsonp([1],{0:function(e,t,n){n("sV/x"),e.exports=n("xZZD")},WRGp:function(e,t,n){(function(e,t){window._=n("M4fF");try{n("7t+N"),n("jf49")}catch(e){}window.axios=n("mtWM"),window.axios.defaults.headers.common["X-Requested-With"]="XMLHttpRequest";var o=document.head.querySelector('meta[name="csrf-token"]');o?window.axios.defaults.headers.common["X-CSRF-TOKEN"]=o.content:console.error("CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token")}).call(t,n("7t+N"),n("7t+N"))},XBIV:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("U7vG"),a=n.n(o),r=n("O27J"),i=n.n(r),c=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();firebase.initializeApp({apiKey:"AIzaSyDMKzFbqvmRVtw7UJSUZ58o5WYwf9p0U8M",authDomain:"sampleproj-5274f.firebaseapp.com",databaseURL:"https://sampleproj-5274f.firebaseio.com",projectId:"sampleproj-5274f",storageBucket:"sampleproj-5274f.appspot.com",messagingSenderId:"501777206805"});var u=firebase.messaging(),s=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={notification_count:0,notification_message:[]},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o["Component"]),c(t,[{key:"componentDidMount",value:function(){var e=this;u.onMessage(function(t){e.handleMessage(t)})}},{key:"handleMessage",value:function(e){this.setState({notification_count:this.state.notification_count+1})}},{key:"render",value:function(){return a.a.createElement("div",null,this.state.notification_count)}}]),t}();t.default=s,document.getElementById("app_notification")&&i.a.render(a.a.createElement(s,null),document.getElementById("app_notification"))},ZmbL:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("U7vG"),a=n.n(o),r=n("O27J"),i=n.n(r),c=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();var u=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o["Component"]),c(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"container"},a.a.createElement("div",{className:"row"},a.a.createElement("div",{className:"col-md-8 col-md-offset-2"},a.a.createElement("div",{className:"panel panel-default"},a.a.createElement("div",{className:"panel-heading"},"Example Component"),a.a.createElement("div",{className:"panel-body"},"I'm an example component!")))))}}]),t}();t.default=u,document.getElementById("example")&&i.a.render(a.a.createElement(u,null),document.getElementById("example"))},"sV/x":function(e,t,n){n("WRGp"),n("ZmbL"),n("XBIV")},xZZD:function(e,t){}},[0]);