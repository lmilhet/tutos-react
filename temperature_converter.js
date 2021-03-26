const scale = {
    'c': 'celsius',
    'f' : 'fahrenheit'
}

function convertToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9
}

function convertToFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32
}

function BoilingVerdict({temperature}) {
    if (temperature >= 100) {
        return (<p>L'eau bout</p>)
    }
    return <p>L'eau ne bout pas</p>
}

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
  
    handleChange(e) {
        this.props.onTemperatureChange(e.target.value, this.props.scaleName)
    }

    render() {
        const scaleName = scale[this.props.scaleName]
        return (<div className="form-group">
            <label htmlFor={`temperature-${scaleName}`} className="form-label">Température en {scaleName} :</label>
            <input id={`temperature-${scaleName}`} type="text" value={this.props.temperature} onChange={this.handleChange} className="form-control"
            />
        </div>
        )
    }
}

class Calculator extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            temperature: 20,
            scaleName: 'c'
        }
        this.onTemperatureChange = this.onTemperatureChange.bind(this)
    }

    onTemperatureChange(temperature, scaleName) {
        this.setState({temperature, scaleName})
    }

    render () {
        const {temperature, scaleName} = this.state
        const temperatureInC = scaleName === 'c' ? temperature : convertToCelsius(temperature)
        const temperatureInF = scaleName === 'f' ? temperature : convertToFahrenheit(temperature)
        return (
            <div className="container">
            <form>
                <TemperatureInput scaleName={'c'} temperature={temperatureInC} onTemperatureChange={this.onTemperatureChange}/>
                <TemperatureInput scaleName={'f'} temperature={temperatureInF} onTemperatureChange={this.onTemperatureChange}/>
                <BoilingVerdict temperature={temperatureInC}/>
            </form>
            </div>
        )
    }
}

ReactDOM.render(<Calculator/>, document.querySelector("#app-container"))