
import CenterContents from './CenterContents.js'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import style from './style'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log('render')
    return (
      <div style={style.app}>
        <CenterContents/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
