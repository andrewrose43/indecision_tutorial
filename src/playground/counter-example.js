//count - setup default prop value to 0


class Counter extends React.Component {
    constructor(props){
        super(props);
        // the next three lines are only needed in order for those functions to access the correct this
        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.state = {
            count: props.count
        };
    }
    handleAddOne() {
        //setState is a built-in part of React components!
        //setState specifically alters the prop named "state" in the component.
        //We only need to provide the pieces of state that we actually need to change. Everything else defaults to unchanged.
        this.setState((prevState) => {
            return {
                count: prevState.count+1
            };
        });
    }
    handleMinusOne() {
        this.setState((prevState) => {
            return {
                count: prevState.count-1
            };
        });
    }
    handleReset() {
        this.setState(() => {
            return {
                count: 0
            };
        });
        // old, bad syntax that still works:
        // this.setState({
        //     count: 0
        // });
        // //UH OH. this next block of code does not work
        // //because setState is asynchronous! "this.state.count+1" is grabbed before count has been reset to 0!
        // this.setState({
        //     count: this.state.count+1
        // });
        //how to avoid that: grab it anew after the count: 0 setting
        // this.setState((prevState) => {
        //     return {
        //         count: prevState.count+1
        //     };
        // });
    }
    render(){
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.handleAddOne}>+1</button>
                <button onClick={this.handleMinusOne}>-1</button>
                <button onClick={this.handleReset}>Reset</button>
            </div>
        )
    }
}

Counter.defaultProps = {
    count: 0
}

//challenge - create 3 methods handleAddOne, handleMinusOne, handleReset
//use console.log to print the method name. That's it.
//then wire up onClick and bind in the constructor function.

ReactDOM.render(<Counter count={-123123}/>, document.getElementById('app'));


// //Make a button through events!
// let count = 0;
// const addOne = () => {
//     count++;
//     renderCounterApp();
// };
// const minusOne = () => {
//     count--;
//     renderCounterApp();
// };
// const reset = () => {
//     count = 0;
//     renderCounterApp();
// };

// //use the document API
// const appRoot = document.getElementById('app');

// /*
// Every time you run renderCounterApp, here's what happens:
// the templateTwo is NOT regenerated from scratch.
// The virtual DOM algorithm automatically decides what actually needs to be replaced!
// Holy heck!
// */
// const renderCounterApp = () => {
// //class has been renamed className by JSX
// //for renaming scheme, google 'react dom elements'
// const templateTwo = (
//     <div>
//         <h1>Count: {count}</h1>
//         <button onClick={addOne}>+1</button>
//         <button onClick={minusOne}>-1</button>
//         <button onClick={reset}>Reset</button>
//     </div>
// );

// //ReactDom.render renders a react element into the DOM
// //in the supplied container and returns a reference to the component
// //(or returns null for stateless components)
// //ReactDOM.render(element, container[, callback])
// ReactDOM.render(templateTwo, appRoot);
// };

// renderCounterApp();

