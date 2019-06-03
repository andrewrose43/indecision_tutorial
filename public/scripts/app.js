'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var IndecisionApp = function (_React$Component) {
    _inherits(IndecisionApp, _React$Component);

    function IndecisionApp(props) {
        _classCallCheck(this, IndecisionApp);

        //note: in the next line, we must bind handleDeleteOptions by definition to "this" meaning the IndecisionApp, such that handleDeleteOptions has the correct 'this' in mind - has access to the state - wherever it is called!
        var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

        _this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
        _this.handlePick = _this.handlePick.bind(_this);
        _this.handleAddOption = _this.handleAddOption.bind(_this);
        _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
        _this.state = {
            options: props.options
        };
        return _this;
    }

    _createClass(IndecisionApp, [{
        key: 'handleDeleteOptions',
        value: function handleDeleteOptions() {
            this.setState(function () {
                return { options: [] };
            });
        }
    }, {
        key: 'handleDeleteOption',
        value: function handleDeleteOption(option) {
            this.setState(function (prevState) {
                return {
                    //filter lets you filter things from an array
                    //filter returns the array minus whatever you filtered out
                    //the inline function I've filled it with returns true if it's not the one you sought to delete
                    options: prevState.options.filter(function (listed) {
                        return listed !== option;
                    })
                };
            });
        }
    }, {
        key: 'handlePick',
        value: function handlePick() {
            var randomNum = Math.floor(Math.random() * this.state.options.length);
            var option = this.state.options[randomNum];
            alert(option);
        }
    }, {
        key: 'handleAddOption',
        value: function handleAddOption(option) {
            if (!option) {
                //if empty string
                return 'Enter valid value to add item';
            } else if (this.state.options.indexOf(option) > -1) {
                //if string is already contained
                return 'This option already exists';
            }

            this.setState(function (prevState) {
                return { options: prevState.options.concat([option]) };
            });
        }

        //To ensure that the child components can access and alter the state, we're going to pass functions in as props. This will replace the handleDeleteOptions that was previously present in Options, for example.
        //again, we're doing this to give the child components access to the state!

    }, {
        key: 'render',
        value: function render() {
            var subtitle = 'Put your life in the hands of a computer!';

            return React.createElement(
                'div',
                null,
                React.createElement(Header, { subtitle: subtitle }),
                React.createElement(Action, {
                    hasOptions: this.state.options.length > 0,
                    handlePick: this.handlePick
                }),
                React.createElement(Options, {
                    options: this.state.options,
                    handleDeleteOptions: this.handleDeleteOptions,
                    handleDeleteOption: this.handleDeleteOption
                }),
                React.createElement(AddOption, {
                    handleAddOption: this.handleAddOption
                })
            );
        }
    }]);

    return IndecisionApp;
}(React.Component);

IndecisionApp.defaultProps = {
    options: []
};

var Header = function Header(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            props.title
        ),
        props.subtitle && React.createElement(
            'h2',
            null,
            props.subtitle
        )
    );
};

//Default props for components!
Header.defaultProps = {
    title: 'Indecision'
};

//SFC version of Action. Notice how nothing changes in the way that the props are passed in! The SFC/function version knows to take the props as parameters. However, the this keyword is removed from the SFC version.
var Action = function Action(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            {
                onClick: props.handlePick,
                disabled: !props.hasOptions
            },
            'What should I do?'
        )
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
var Options = function Options(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { onClick: props.handleDeleteOptions },
            'Remove all'
        ),
        props.options.map(function (option) {
            return React.createElement(Option, {
                key: option,
                optionText: option,
                handleDeleteOption: props.handleDeleteOption
                // note how we pass hDO down two levels!
            });
        })
        //We could not manually alter props.options here because props are read-only. BUT a parent is free to pass down new prop values, and then the child will re-render!
        //This is why the parent, but not the child, must run handleDeleteOptions() - only the parent can alter the state.
        //THE STATE OF ONE COMPONENT WILL OFTEN BECOME THE PROPS OF A CHILD COMPONENT. That's what is happening here.

    );
};

var Option = function Option(props) {
    return React.createElement(
        'div',
        null,
        props.optionText,
        React.createElement(
            'button',
            {
                onClick: function onClick(e) {
                    // when you click on the button, pass JUST the text (not the Option component!) to the handler
                    props.handleDeleteOption(props.optionText);
                }
            },
            'Remove'
        )
    );
};

var AddOption = function (_React$Component2) {
    _inherits(AddOption, _React$Component2);

    //WE NEED THIS CONSTRUCTOR because we must 
    function AddOption(props) {
        _classCallCheck(this, AddOption);

        var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

        _this2.componentHandleAddOption = _this2.componentHandleAddOption.bind(_this2); //again: so that we may correctly refer to the component from within a template
        _this2.state = {
            error: undefined
        };
        return _this2;
    }
    //why is the next method still here? In other components, we just referenced the props.
    // BECAUSE...
    // we want to get things off of the form and prevent the default form submission. These are best left to the component!
    // It wouldn't make sense for this sort of behaviour to live in the parent.
    // this.props.handleAddOption is different from this.componentHandleAddOption!
    //cHAO just grabs the form submission trigger thingy. It prevents the default response, trims the input, and adds it if it still exists.
    //cHAO then calls hAO, which actually adds the option.


    _createClass(AddOption, [{
        key: 'componentHandleAddOption',
        value: function componentHandleAddOption(e) {
            e.preventDefault();
            var newOption = e.target.elements.newOption.value.trim();
            var error = this.props.handleAddOption(newOption);

            this.setState(function () {
                return { error: error };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.state.error && React.createElement(
                    'p',
                    null,
                    this.state.error
                ),
                React.createElement(
                    'form',
                    { onSubmit: this.componentHandleAddOption },
                    React.createElement('input', { type: 'text', name: 'newOption' }),
                    React.createElement(
                        'button',
                        null,
                        'Add Option'
                    )
                )
            );
        }
    }]);

    return AddOption;
}(React.Component);

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


ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app')); //element, container
