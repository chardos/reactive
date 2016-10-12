import $ from 'jquery'
window.$ = $;
import Rx from 'rxjs/Rx'

const $title = $('#title')
const $results = $('#results')

const keyUps$ = Rx.Observable.fromEvent($title, 'keyup')
const queries$ = keyUps$
        .map(e => e.target.value)
        .distinctUntilChanged()
        .debounceTime(250)

queries$.subscribe(query => {
  getItems(query)
    .then(items => {
      $results.empty();
      $results.append(items.map( r => $('<li />').text(r) ))
    })
})

function getItems(title){
  console.log(`Querying ${title}`);
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve([title, "Item 2", `Another ${Math.random()}`])
    }, 500 + (Math.random() * 2000))
  })
}
