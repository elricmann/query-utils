import { ComputedRef, Ref, _ } from "./";

_('.selected').css('background-color', 'yellow');

_('#app')
  .addClass('active')
  .css('background-color', 'lightgray')
  .css('padding', '20px');

// _('h1')
//   .text('Updated Title')
//   .css('color', 'blue');

_('.text').html('This is <strong>bold</strong> text');

_('#toggle').on('click', (e: Event) => {
  _('.container').toggleClass('highlighted');
});

// _('.input-field')
//   .attr('placeholder', 'Type something...')
//   .val('New value')
//   .on('input', (e: Event) => {
//     const value = _(e.target as Element).val() as string;
//     _('.text').text(`You typed: ${value}`);
//   });

_('.list')
  .find('li')
  .each((index, element) => {
    _(element)
      .addClass('list-item')
      .css('color', index % 2 === 0 ? 'blue' : 'red');
  });

_('.list').append('<li>New Item</li>');

const newElement = document.createElement('p');
newElement.textContent = 'Appended paragraph';
_('.container').append(newElement);

_('button')
  .attr('disabled', 'true')
  .css('opacity', '0.5');

const bgColor = _('.container').css('background-color');
console.log('Container background:', bgColor);

_('li').each((_n, element) => {
  const _element = _(element);
  _element.parent().css('border', '1px solid black');
  _element.siblings().css('opacity', '0.7');
});

_('.container')
  .find('p')
  .addClass('paragraph')
  .css('font-size', '16px')
  .css('line-height', '1.5');

_('.list')
  .find('li:last-child')
  .remove();

_('.container')
  .find('.temp')
  .css('border', '1px solid green')
  .empty();

_('<div>')
  .addClass('new-element')
  .html('Created dynamically')
  .css({
    'background': '#f0f0f0',
    'padding': '10px',
    'margin': '10px 0'
  })
  .appendTo('.container');

_('.list').on('click', (e: Event) => {
  const _target = _(e.target as Element);
  if (_target.hasClass('list-item')) {
    _target.toggleClass('selected');
  }
});

const count = new Ref(0);
const computed = new ComputedRef(count, () => count.get() * 2);

count.track(() => _(".count").text(count.get() as unknown as string));
computed.track(() => _(".computed").text(computed.get() as unknown as string));

setInterval(() => count.set(count.get() + 1), 2000);

_.define("sidebar", ({ host, mount, unmount }) => {
  mount(() => {
    console.log("Mounted sidebar", host);
    _(host).html("This is the sidebar");
  });

  unmount(() => {
    console.log("unmounted sidebar");
  });
});
