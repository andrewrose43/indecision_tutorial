
/*
const obj = {
    name: 'Vikram',
    getName() {
        return this.name;
    },
    age: 0
};

//The bind function literally just takes a thing and makes it the "this" referred to by a function
//function.bind(cat) makes the function's "this" CAT, not meaningless anymore
// const getName = obj.getName.bind(obj);
const getName = obj.getName.bind({name: 'Andrew'});

//The below does not work because "this" is meaningless when getName() is removed from its context
//and we're left with a regular function that has not been given a meaning of "this"
console.log(getName());
*/

// stateless functional component
// SFC is really all 3 of those things. it's a React component, a function, and stateless.
//most of our child components - Header, Action, Options, Option - could easily become SFCs
// they're just presentational components, so they do not need states  of their own!

class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        //note: in the next line, we must bind handleDeleteOptions by definition to "this" meaning the IndecisionApp, such that handleDeleteOptions has the correct 'this' in mind - has access to the state - wherever it is called!
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options: props.options
        };
    }
    handleDeleteOptions(){
        this.setState(() => ({options: [] }));
    }
    handleDeleteOption(option){
        this.setState((prevState) => ({
            //filter lets you filter things from an array
            //filter returns the array minus whatever you filtered out
            //the inline function I've filled it with returns true if it's not the one you sought to delete
            options: prevState.options.filter((listed) => listed !== option)
        }));
    }
    handlePick(){
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);
    }
    handleAddOption(option){
        if (!option) { //if empty string
            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(option) > -1) { //if string is already contained
            return 'This option already exists';
        }

        this.setState((prevState) => ({options: prevState.options.concat([option])}));
    }

    //To ensure that the child components can access and alter the state, we're going to pass functions in as props. This will replace the handleDeleteOptions that was previously present in Options, for example.
    //again, we're doing this to give the child components access to the state!
    render() {
        const subtitle = 'Put your life in the hands of a computer!';

        return (
            <div>
                <Header subtitle={subtitle}  />
                <Action
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption
                    handleAddOption = {this.handleAddOption}
                />
            </div>
        );
    }
}

IndecisionApp.defaultProps = {
    options: []
};

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
};

//Default props for components!
Header.defaultProps = {
    title: 'Indecision'
};

//SFC version of Action. Notice how nothing changes in the way that the props are passed in! The SFC/function version knows to take the props as parameters. However, the this keyword is removed from the SFC version.
const Action = (props) => {
    return (
        <div>
            <button
                onClick={props.handlePick}
                disabled={!props.hasOptions}
            >
                What should I do?
            </button>
        </div>
    );
};

// stateful component version
// class Action extends React.Component {
//     render() {
//         return (
//             <div>
//                 <button
//                     onClick={this.props.handlePick}
//                     disabled={!this.props.hasOptions}
//                 >
//                     What should I do?
//                 </button>
//             </div>
//         );
//     }
// }

//note: While a component like Options cannot change its own props, new prop values CAN be passed down from the parent, and those WILL cause the child to be re-rendered!
const Options = (props) => {
    return (
        <div>
            {/* inefficient way: bind to this on every call */}
            {/* <button onClick={this.handleRemoveAll.bind(this)}>Remove all</button> */}
            <button onClick={props.handleDeleteOptions}>Remove all</button>
            {
                props.options.map((option) => 
                    <Option
                    key={option}
                    optionText={option}
                    handleDeleteOption={props.handleDeleteOption}
                    // note how we pass hDO down two levels!
                    />
                )
                //We could not manually alter props.options here because props are read-only. BUT a parent is free to pass down new prop values, and then the child will re-render!
                //This is why the parent, but not the child, must run handleDeleteOptions() - only the parent can alter the state.
                //THE STATE OF ONE COMPONENT WILL OFTEN BECOME THE PROPS OF A CHILD COMPONENT. That's what is happening here.
            }
        </div>
    );
};

const Option = (props) => {
    return (
        <div>
            {props.optionText}
            <button
                onClick={(e) => {
                    // when you click on the button, pass JUST the text (not the Option component!) to the handler
                    props.handleDeleteOption(props.optionText);
                }}
            >
                Remove
            </button>
        </div>
    )
};

class AddOption extends React.Component {
    //WE NEED THIS CONSTRUCTOR because we must 
    constructor(props){
        super(props);
        this.componentHandleAddOption = this.componentHandleAddOption.bind(this); //again: so that we may correctly refer to the component from within a template
        this.state = {
            error: undefined
        };
    }
    //why is the next method still here? In other components, we just referenced the props.
    // BECAUSE...
    // we want to get things off of the form and prevent the default form submission. These are best left to the component!
    // It wouldn't make sense for this sort of behaviour to live in the parent.
    // this.props.handleAddOption is different from this.componentHandleAddOption!
    //cHAO just grabs the form submission trigger thingy. It prevents the default response, trims the input, and adds it if it still exists.
    //cHAO then calls hAO, which actually adds the option.
    componentHandleAddOption(e){
        e.preventDefault();
        const newOption = e.target.elements.newOption.value.trim();
        const error = this.props.handleAddOption(newOption);

        this.setState(() => ({error}));
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.componentHandleAddOption}>
                    <input type="text" name="newOption"/>
                    <button>Add Option</button>

                </form>
            </div>
        );
    }
}

// COMPONENTS
// Options -> render some static text "Options component here" below Action
// AddOption -> more static text "AddOption component here"

//functional component: simply returns the JSX as a function!
//A SFC is just a function returning JSX... you can use it in place of simple components
//SFCs are faster because they don't have class-related baggage
//SFCs are good for simple presentational components
// const User = (props) => {
//     return (
//         <div>
//             <p>Name: {props.name}</p>
//             <p>Age: {props.age}</p>
//         </div>
//     );
// };

// ReactDOM.render(<IndecisionApp options={['Devil\'s Den', 'Second District']}/>, document.getElementById('app')); //element, container
ReactDOM.render(<IndecisionApp/>, document.getElementById('app')); //element, container