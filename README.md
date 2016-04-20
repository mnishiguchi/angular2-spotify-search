# Angular2 searchbox

- [angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter) by AngularClass
- [Observables and Reactive Programming in Angular 2](http://blog.rangle.io/observables-and-reactive-programming-in-angular-2/) by Tyler Borchert

---

## Start the development server
- `npm start`
- `npm run server:dev:hmr` to use Hot Module Replacement.
- [http://0.0.0.0:3000](http://0.0.0.0:3000) or [http://localhost:3000](http://localhost:3000)

---

## Objectives
- Become accustomed with angular2-webpack-starter.
- Learn observables.
- Build a simple searchbox component.

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
  templateUrl: 'app/app.component.html'
})
```

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
