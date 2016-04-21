# Angular2 searchbox

## Reference
- [angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter) by AngularClass
- [Observables and Reactive Programming in Angular 2](http://blog.rangle.io/observables-and-reactive-programming-in-angular-2/) by Tyler Borchert

---

## Objectives
- Become accustomed with angular2-webpack-starter.
- Learn Observables.
- Build a simple searchbox component.

---

## Start the development server
- `npm start`
- `npm run server:dev:hmr` to use Hot Module Replacement.
- [http://0.0.0.0:3000](http://0.0.0.0:3000) or [http://localhost:3000](http://localhost:3000)

---

```
.
├── LICENSE
├── README.md
├── config
├── karma.conf.js
├── node_modules
├── package.json
├── protractor.conf.js
├── src
│   ├── app
│   ├── assets
│   ├── custom-typings.d.ts
│   ├── index.html
│   ├── main.browser.ts
│   ├── platform
│   ├── polyfills.ts
│   └── vendor.ts
├── tsconfig.json
├── tslint.json
├── typedoc.json
├── typings
├── typings.json
└── webpack.config.js
```

---

## Observable
- [Angular 2: HTTP, Observables, and concurrent data loading](http://www.metaltoad.com/blog/angular-2-http-observables)
- Part of the [JavaScript Reactive Extensions library (RxJS)](https://github.com/Reactive-Extensions/RxJS).
- Will be an included in ES7.
- Acts as an event emitter, sending a stream of events to any subjects that have subscribed to it
- We can get an asynchronous stream of values that can be operated on using common iteration patterns.

### Observer pattern
- A single piece of state (the Observable) is watched by one or more Observers which can react as it changes over time.

### The main purpose of using Observables
- Observe the behavior of a variable.
- A variable is only changed when its state is mutated by assigning a new or updated value.
- The reactive approach allows variables to develop a history of evolving change, asynchronously being updated to the values of other points of data.
- Reactive programming as opposed to imperative programming.

### Angular2 Pipes
- Angular2 components have access to pipes.
- Can be used to transform values via simple expressions.
- Can be used to connect component data across our application.

### A common way of separating components
- http://blog.rangle.io/creating-angular-2-style-components-using-angular-1-part-2/
- Break the design up into dumb and smart components.
- Using **Observables** and **AsyncPipe** we can set up a bridge of data to flow between our smart and dumb components.

**dumb component**
- Only present data to the UI view and emit any UI events

**smart component**
- Concerned with what the dumb components should be displaying.

### Transforming data from http.get to JSON
- The http.get uses an Observable to subscribe to the incoming network response. - In getting our response, we use map to transform the contents of our data.
- Our HTTP request only returns a single value, so our Observable stream will only have one element that map will iterate over.
- We transform this item into an object suitable for consumption by converting the response object into a JSON object, and returning the artists.items property, which contains an array of the artist objects we want to be displayed.

---

## Things I learned

### Where routes are defined?
- `src/app/app.component.ts`

### How to include external stylesheets with Webpack?
```typescript
@Component({
  selector: 'app',
  styles: [
    require('normalize.css'),
    require('app/app.component.css')
   ],
  ...
})
```

### [ShadowDOM](http://www.html5rocks.com/en/search?q=Shadow+DOM)
- Part of the Web Components standard.
- Enables DOM tree and style encapsulation.
- Enables us to build a web component with hidden DOM logic under the hood, whose styles only apply to that element.

### How to apply parent's styles to a child component?
- Apply ViewEncapsulation.Native to parent.
- Read [View Encapsulation in Angular 2](http://blog.thoughtram.io/angular/2015/06/29/shadow-dom-strategies-in-angular2.html)
- All our component styles are appended to the document head, but usually would end up in the component’s template in case we use native Shadow DOM.
- Configure view encapsulation solutions (3 types):
  + **ViewEncapsulation.None** - No Shadow DOM at all. Unscoped strategy. All the styles apply to the entire document.
  + **ViewEncapsulation.Emulated** - Default. No Shadow DOM but style encapsulation emulation.
  + **ViewEncapsulation.Native** - Native Shadow DOM with all it’s goodness.


### Angular material design
- [mdCard API](https://material.angularjs.org/latest/api/directive/mdCard)

### [What Is 508 Compliance?](http://www.508checker.com/what-is-508-compliance)
- government agencies
- federal-funded nonprofits
- public higher education institutions
- public K-12 schools

### [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)
- Analyze a website's speed

### [BEM naming convention](http://getbem.com/naming/)
#### Element
- Parts of a block and have no standalone meaning. Any element is semantically tied to its block.
- e.g., `.block__elem`

#### Modifier
- Flags on blocks or elements. Use them to change appearance, behavior or state.
- e.g., `.block--mod`
