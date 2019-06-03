console.log('App.js is running!');

/*
CHALLENGE
create an app object. it has 2 properties: title, subtitle
use the title and subtitle in the template
render template
*/

// JSX - JS XML
// a JS syntax extension provided by React
// Babel compiles JSX stuff down to plain React
// it will use React.createElement
// var template = <p>This is JSX UPDATED from app.js!</p>;
// the wrapping parens here are just for readability
// the list below auto-creates a bunch of React.createElement instances

/*
challenge: only render the subtitle and p tag if the subtitle exists (use &&)
render new p tag - if options.length > 0 "Here are your options" "No options"
*/

//use the document API
const appRoot = document.getElementById('app');

const app = {
    title: "Indecision App",
    subtitle: "Put your life in the hands of a computer",
    options: []
};

//e is the EVENT OBJECT
const onFormSubmit = (e) => {
    e.preventDefault(); //prevent the full-page refresh
    const option = e.target.elements.option.value;
    //in the above line:
    //target points to the element that the event started on
    //option is the name of the input field
    //value is the contents of option
    if (option){
        app.options.push(option); //add option to list
        e.target.elements.option.value = '';
        renderApp();
    }
};

const onRemoveAll = (e) => {
    e.preventDefault(); //prevent the full-page refresh
    app.options = [];
    renderApp();
};

const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * app.options.length);
    const option = app.options[randomNum];
    alert(option);
};

const numbers = [55,101,1000];

const renderApp = () => {
    //buttons submit their forms by default
    const template = (
        <div>
            <h1>{app.title}</h1>
                {app.subtitle && <p>{app.subtitle}</p>}
                {app.options.length ? <p>Here are your options</p> : <p>No options</p>}
            <button disabled={!app.options.length} onClick={onMakeDecision}>What should I do?</button>
            <button onClick={onRemoveAll}>Remove All</button>
            <ol>
            {
            /*map over app.options getting back an array of lis (set key and text)*/
            //Yeah, you can just use a map function to create a new HTML item from every thing in an array
            //problem: identical options cause identical keys
                app.options.map((option) => <li key={option}>{option}</li>)
            }
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option"/>
                <button>Add Option</button>
            </form>
        </div>
    )

    ReactDOM.render(template, appRoot);
};

/*
const user = {
    name: "Madeon",
    age: 25,
    location: "Nantes",
};

function getLocation(location){
    if (location){
        return <p>Location: {location}</p>;
    }
}

const templateTwo = (
    <div>
        <h1>{user.name ? user.name : 'Anonymous'}</h1>
        {(user.age >= 18) && <p>Age: {user.age}</p>}
        {getLocation(user.location)}
    </div>
);
*/

/*
create render function that renders the new JSX
call it right away AND after the options array is added to
*/


renderApp();