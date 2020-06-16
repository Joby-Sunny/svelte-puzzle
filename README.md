# Building a Puzzle Game using Svelte - For React Developers.
---

Go to [https://modest-wing-964764.netlify.app/](https://modest-wing-964764.netlify.app/) to see the application.

[**Svelte**](https://svelte.dev/) is a new and popular name in the list of javascript frameworks. While there maybe many other popular frameworks out there, I think this one is worth a try. Mostly for the part that this one is more of a **compiler** that a framwork. What you get after you finally build your code is just the ones you wrote and anything you care to add.

Here in this application I have build a simple puzzle game. I will take you through the code and briefly let you in on how to build the same or any other application like this one usin svelte.
Normally I like to refer other code bases and coding patterns before I do one myself. But since svelte is really new, I couldn't find many article telling me to do things this way of the other. The style I have used to write my Store is similar to how react-redux store is written. So If you have worked on react-redux stack this one should feel at home for you.


The application mainly has 2 pages. **Home Page** and **Game Page**. But to make things more clear and descriptive, I will explain the application in terms of differnt parts and components.

### HeaderComponent : [src/Components/Header]
A Simple presentational component. Just display the title of the application. And routes to home page when clicked on the title.

To hold a single source of truth for the routes, I have created a **Router.constants.js** file in *src/* folder and have used the same across the stack.

If you checkout the **RouterLink** component I have used in the header you will see the **Slot** tag. This tag is used for composition in svelte. I am using this as an equallent for *children* prop in react.

### HomePage : [src/Routes/HomePage]
Another presentational componet.

### PlayGround : [src/Routes/PlayGround]
This is one of the core parts of the application. I have used a couple of svelte features here. 
I have used a svelte lifecycle hook here, the **onMount** hook is used to execute a piece of code after the component mounts. I call an action here to setup the puzzle for the game.

All the data for the puzzle is store at, yes you guessed the **src/Data/** folder. The `src/Data/puzzleOne.js` file basically gives the json object used to create the image-puzzle.

The `setPuzzle` function invoked at the component is defined at **src/Store/Actions.js** file. You can see that the function simply calls `Reducer.UpdateStore` function with a type and action argument passed to it. I add an extra `hideItem` props to hide a single piece out of the 16 image pieces. You dont have to stress about what happend inside the `Reducer.UpdateStore` now. We will get to that later. Just know that the function takes in the puzzleOne object and creates the state tree for the application. Yes I am talking about the same large json object we are used to working in react-redux.

Now if you look below the onMount code block you will see a variable declaration and something like this
```javascript
$: puzzleQuestion = $store.puzzleQuestion
```

`$:` is a means to manage reactiveness in svelte applications. What basically happens is , when a variable referenced in the line changes and DOM rerender occurs.

We can also reference a block of code using `$:{}` and this will work the same.

Further below on the html code you can see implementations of `if-else`  control block. The `if` block also accomodates a looping statement. The syntax is straight forward and easly understandable.

The `PuzzleBlock` component referenced inside the loop block also demostrates the minimal syntax for passing props in svelte. `{brick}` is a minimal representation for `brick={brick}`. 

### PuzzleBrick [src/Components/PuzzleBrick/]

The component represents a single piece of movable image in the image-puzzle. The brick is the main component of focus in the whole stack.

I have used yet another lifecycle hook here. The `afterUpdate` hook is used to retain the focus on a moved brick after the position change. This is what is done inside the afterUpdate lifecycle hook.

If you check the Html template you will see another `if-else` block. Where `if` display all the visible and movable image bocks and else display the hidden block.

If you check the div tag you can find how native html events are bound to javascript functions in svelte. `on:eventname={bindingFunction}` is general syntax for event binding in svelte.

I have added a couple of functionality to the bricks. 
* Selecting a brick by clicking on the image block. This also sets the focus on that image block. This focused image block can be moved using keyboard arrow keys.

* You can also drag an drop an image block to adjecent empty spot using your mouse. This is why `dragstart` , `dragover` and `drop` events are connected.

* functions `selectBrick`, `moveBrick` and `dragDropBrick` stays true to their names, `sets a brick as selected`, `moves a brick using keyboard keys` and `drops the dragged brick to the empty position`.

An other major svelte feature to notice in the component is **export let brick**. I believe you remember we passed the prop brick from parent. Apparently this is how we accpet a passed props in svelte. `export let propname`. 

I believe all the javascript codes are self explanatory. Still I will explain how the drag and drop option works as it is not as commonly used. I have used he native javascript api for drag and drop here. When the drag start event is fired I set an **id** value to the event. This is the `id` for the brick that is being dragged. When this is dropped at the vacant box. The id is retrieved and an action is called to update the change in the state tree.

## PuzzleInfo [src/Components/PuzzleInfo]

This is a major container component that displayes the game progress in the **PuzzleDetails** component and a success message when user successfully complete the puzzle at **PuzzleComplete** component.

## PuzzleDetails [src/Components/PuzzleDeatils]

This is just a container for **PuzzleTotalMoves** and **PuzzleMovesList** components.

## PuzzleMovesList [src/Components/PuzzleMovesList]

This is the listing component for recentMoves. The application tracks and store upto the lastest 25 moves of the user. The moves list could be used to reset to a previous puzzle state.

## PuzzleMove [src/Components/PuzzleMove]

Each move in the recent moves list is displayed using this component. `click` event is connected to set to go to the particular puzzle-game-state.

I have used **moment** here to format the timestamp. Actually I have written a utils file where I use moment to format time. The fuction is imported and used here.

## PuzzleComplete And PuzzleTotalMoves [both in src/Components]

Are presentational components in the end.

## App Component [src/App.svelte]

Other than **moment** the only other dependency library that will make it to my final code is **svelte-spa-router**. **svelte-spa-router** is a has based routing library used with svelte.

You can see the **svelte-spa-router** in action at the **src/App.svelte** file. We create a json object with `routePath` for key and `componet` for value and pass it to the **Router** as *route* prop.

## Store [src/Store/]

Store folder has all the code related to application state. The **Actions.js** file defines all the actions that we have used in the components.

Svelte state management is mainly handled by 3 tools
* Content api.
* Writable Store.
* Readable Store.

You can read about these [here](https://flaviocopes.com/svelte-state-management/).

We use `Writable Store` for our implementation. So As I have said, the whole state management mechanism is setup similar to react-redux communication pattern. Actions are called from components with a specific type for the action and the payload for the action.

The Writeable Store has an **update** api. I have created an `UpdateStore` method on the `Reducer` Object. This method is involked by one any action on the Actions page. with a specific type. This type is mapped using switch to particular operation. Each of these Type spedific operation is defined in the **src/store/Helpers** folder.

I have exported the **subscribe** endpoint of the  Writable store from **Store/index.js**. This allows me to import the store variable at any component I wanna use the store value.

The **$store.variableName** representation we saw in the components in a shorthand for the **subsribe** syntax. The reactive varible listens to change in value and also cause rerender of DOM at the subscribing component.

Further speaking. You may find couple of class declarations like `w-7/12` `w-4/12`. These are from the popular styling framework [tailwind](https://tailwindcss.com/).

That covers all the major parts on the code. If you would like to checkout how the application works and how different components interact. Feel free to clone the code and make changes. Afterall the best form of understanding comes only from actually doing it. Especially in coding.

You can start the development server using command:
```bash
npm run dev
```
To Build the stack use command:
```bash
npm run build
```

To Serve the built stack:
``` bash
npm run start
```