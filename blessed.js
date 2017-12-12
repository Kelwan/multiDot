let blessed = require('blessed');

//Render Side using Blessed

let screen = blessed.screen({
  smartCSR: true
});

screen.title = 'multidot';

let box = blessed.box({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: 'Hello {bold}world{/bold}!',
  tags: true

});

let text = blessed.Textarea({

  

});


screen.append(box);

screen.render();
