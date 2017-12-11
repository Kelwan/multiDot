let blessed = require('blessed');

//Render Side using Blessed

let screen = blessed.screen({
  smartCSR: true
});

screen.title = 'multidot';

var box = blessed.box({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: 'Hello {bold}world{/bold}!',
  tags: true

  input:

});


screen.append(box);

screen.render();
