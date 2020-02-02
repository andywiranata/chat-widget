# Sample Chat Dashboard with Firebase RTDB [WORK IN PROGRESS]
https://andywiranata-chat-widget.firebaseapp.com

## Features

- Demo Widget
- Firebase RTDB
- Sample creating ticket
- Sample send message (chat)

## HOW TO USE
- import public url [url will update]
- add snippet code below
```html
 <script>
    function openApp() {
      const widget = window.ChatWidget;
      widget.start({}, ()=>{
        widget.openWindow();
      });
    }
  </script>
  <body>
    <div id="chat-widget"></div>
    <div style="padding-top:400px"></div>
    <button onclick="openApp()">Open Widget</button>
  </body>

```

## TODO
- Feature close ticket
- Migrate to react hooks and context
- Support mobile view


