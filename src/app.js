import React, {Component} from 'react'
import reactDOM from 'react-dom'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        hello
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
