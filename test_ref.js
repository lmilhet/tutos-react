const Field = React.forwardRef(function Field (props, ref) {
    return <input type="text" ref={ref}/>
})

class FieldClass extends React.Component {
    render () {
        return <div>
            <label>{this.props.label}</label>
            <input type="text" ref={this.props.forwardRef}/>
        </div>
    }
}

const FieldClassWithRef = React.forwardRef((props, ref) => {
    return <FieldClass forwardRef={ref} {...props}/>
})

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.input = React.createRef()
    }

    handleClick(e) {
        console.log(this.input.current.value)
    }

    render () {
        return <div>
            <FieldClassWithRef ref={this.input} label="Toto"/>
            <button onClick={this.handleClick}>Tester</button>
        </div>
    }
}

ReactDOM.render(<Home/>, document.querySelector('#app-container'))