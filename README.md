# Building a Puzzle Game using Svelte - For React Developers.
---

Go to [https://modest-wing-964764.netlify.app/](https://modest-wing-964764.netlify.app/) to see the application and [https://github.com/Joby-Sunny/svelte-puzzle](https://github.com/Joby-Sunny/svelte-puzzle) for the code.

[**Svelte**](https://svelte.dev/) is a new and popular name in the list of javascript frameworks. While there may be many other popular frameworks out there, I think this one is worth a try. Mostly for the part that this one is more of a **compiler** than a framework. What you get after you finally build your code is just the ones you wrote and anything you care to add.

This application was intended as a starter for svelte. But as things progressed this one became a little complex and It would be a little tough for you, if you may not have worked on a React-Redux application before. Still, I believe the code is mostly readable, so you will understand it, but will have to sort out why things are done as is.

Here in this application, I have build a simple puzzle game. I will take you through the code and briefly let you in on how to build the same or any other application like this one using svelte.
Normally I like to refer other code bases and coding patterns before I do one myself. But since svelte is fairly new, I couldn't find many articles telling me to do things this way or the other. The style I have used to write my Store is similar to how the react store would be set up in react applications. So If you have worked on react-redux stack this one should feel at home for you.

So before going into the application, I will tell you what this article offers and what It doesn't. I believe this article or more like this project will help you, curious developers, to go in and try to develop a complete svelte application on your own. The article doesn't follow you a step by step approach on how to build this application because it is similar to any other SPA you build and I don't particularly remember a step by step approach, all I can make out is that it had a lot of styling (and am terrible at it). Also, this article won't tell you how to set up the boilerplate for svelte application. You will get that from the [**Svelte Official Page**](https://svelte.dev/). And while you are at it also try and setup [**tailwind**](https://tailwindcss.com/), the CSS framework I have used in this framework. This article will help you to do it - [Setting up Svelte & Integrating Tailwind CSS](https://medium.com/javascript-in-plain-english/setting-up-svelte-integrating-tailwind-css-dde927edfb20). The article simply takes you through the code and explain various svelte features used in places. I hope this will help give you an idea of how a completed svelte application would look like.

The application mainly has 2 pages. **Home Page** and **Game Page**. But to make things more clear and descriptive, I will explain the application in terms of different parts and components.

### HeaderComponent : [src/Components/Header]
A Simple presentational component. Just display the title of the application. And routes to the home page when clicked on the title.

To hold a single source of truth for the routes, I have created a **Router.constants.js** file in *src/* folder and have used the same across the stack.

If you check out the **RouterLink** component I have used in the header you will see the **Slot** tag. This tag is used for composition in svelte. I am using this as an equivalent for *children* prop in react.

### HomePage : [src/Routes/HomePage]
Another presentational componet.

### PlayGround : [src/Routes/PlayGround]
This is one of the core parts of the application. I have used a couple of svelte features here. 
I have used a svelte lifecycle hook here, the **onMount** hook is used to execute a piece of code after the component mounts. I call an action here to set up the puzzle for the game.

All the data for the puzzle is stored at, yes you guessed the **src/Data/** folder. The `src/Data/puzzleOne.js` file basically gives the JSON object used to create the image-puzzle.

The `setPuzzle` function invoked at the component is defined at **src/Store/Actions.js** file. You can see that the function simply calls `Reducer.UpdateStore` function with a type and action argument passed to it. I add an extra `hideItem` props to hide a single piece out of the 16 image pieces. You don't have to stress about what happens inside the `Reducer.UpdateStore` now. We will get to that later. Just know that the function takes in the puzzleOne object and creates the state tree for the application. Yes, I am talking about the same large JSON object we are used to working with react-redux, the **Redux-State-Tree**.

Now if you look below the onMount code block you will see a variable declaration and something like this
```javascript
$: puzzleQuestion = $store.puzzleQuestion
```

`$:` is a means to manage reactiveness in svelte applications. What basically happens is, when a variable referenced in the line changes and DOM rerender occurs.

We can also reference a block of code using `$:{}` and this will work the same.

Further below on the HTML code, you can see implementations of `if-else`  control block. The `if` block also accommodates a looping statement. The syntax is straight forward and easily understandable.

The `PuzzleBlock` component referenced inside the loop block also demonstrates the minimal syntax for passing props in svelte. `{brick}` is a minimal representation for `brick={brick}`. 

### PuzzleBrick : [src/Components/PuzzleBrick/]

The component represents a single piece of movable image in the image-puzzle. The brick is the main component of focus in the whole stack.

I have used yet another lifecycle hook here. The `afterUpdate` hook is used to retain the focus on a moved brick after the position change. This is what is done inside the `afterUpdate` lifecycle hook.

If you check the Html template you will see another `if-else` block. Where `if` display all the visible and movable image bocks and else display the hidden block.

If you check the div tag you can find how native HTML events are bound to javascript functions in svelte. `on:eventname={bindingFunction}` is the general syntax for event binding in svelte.

I have added a couple of functionality to the bricks. 
* Selecting a brick by clicking on the image block. This also sets the focus on that image block. This focused image block can be moved using keyboard arrow keys.

* You can also drag and drop an image block to adjacent empty spot using your mouse. This is why `dragstart` , `dragover`, and `drop` events are connected.

* functions `selectBrick`, `moveBrick`, and `dragDropBrick` stays true to their names, `sets a brick as selected`, `moves a brick using keyboard keys` and `drops the dragged brick to the empty position`.

Another major svelte feature to notice in the component is **export let brick**. I believe you remember we passed the prop brick from the parent. Apparently, this is how we accept a passed props in svelte. `export let propname`. 

I believe all the javascript codes are self-explanatory. Still, I will explain how the drag and drop option works as it is not as commonly used. I have used the native javascript API for drag and drop here. When the drag start event is fired I set an **id** value to the event. This is the `id` for the brick that is being dragged. When this is dropped at the vacant box. The id is retrieved and an action is called to update the change in the state tree.

## PuzzleInfo : [src/Components/PuzzleInfo]

This is a major container component that displays the game progress in the **PuzzleDetails** component and a success message when the user successfully solves the puzzle at **PuzzleComplete** component.

## PuzzleDetails : [src/Components/PuzzleDeatils]

This is just a container for **PuzzleTotalMoves** and **PuzzleMovesList** components.

## PuzzleMovesList : [src/Components/PuzzleMovesList]

This is the listing component for recent moves. The application tracks and stores up to the lastest 25 moves of the user. The moves list could be used to reset to a previous puzzle state.

## PuzzleMove : [src/Components/PuzzleMove]

Each move in the recent moves list is displayed using this component. `click` event is connected to set to go to the particular puzzle-game-state.

I have used **moment** here to format the timestamp. Actually, I have written a utils file where I use moment to format time. The function is imported and used here.

## PuzzleComplete And PuzzleTotalMoves : [both in src/Components]

Are presentational components in the end.

## App Component : [src/App.svelte]

Other than **moment** the only other dependency library that will make it to my final code is **svelte-spa-router**. **svelte-spa-router** is a has based routing library used with svelte.

You can see the **svelte-spa-router** in action at the **src/App.svelte** file. We create a JSON object with `routePath` for key and `component` for value and pass it to the **Router** as *route* prop.

## Store [src/Store/]

Store folder has all the code related to the application state. The **Actions.js** file defines all the actions that we have used in the components.

Svelte state management is mainly handled by 3 tools
* Content API.
* Writable Store.
* Readable Store.

You can read about these [here](https://flaviocopes.com/svelte-state-management/).

I have used the `Writable Store` for our implementation. So As I have said, the whole state management mechanism is setup similar to the redux pattern for react applications. Actions are called from components with a specific type for the action and the payload for the action.

The Writeable Store has an **update** API. I have created an `UpdateStore` method on the `Reducer` Object. This method is invoked by one any action on the Actions page. with a specific type. This type is mapped using the switch conditional to a particular operation. Each of these type-specific operations are defined in the **src/store/Helpers** folder.

I have exported the **subscribe** endpoint of the  Writable store from **Store/index.js**. This allows me to import the store variable at any component I wanna use the store value.

The **$store.variableName** representation we saw in the components in a shorthand for the **subscribe** syntax. The reactive variable listens to change in value and also causes the rerender of DOM at the subscribing component.

Further speaking. You may find a couple of class declarations like `w-7/12` `w-4/12`. These are from the popular styling framework [tailwind](https://tailwindcss.com/).

That covers all the major parts of the code. If you would like to check out how the application works and how different components interact. Feel free to clone the code and make changes. After all the best form of understanding comes only from actually doing it. Especially in coding.

You can start the development server using the command:
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