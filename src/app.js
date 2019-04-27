import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log('render')
    return (
      <div>
        my name is bobby lee
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
