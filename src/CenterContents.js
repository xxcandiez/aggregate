import style from './style.js'
import React, {Component} from 'react'

class CenterContent extends Component{
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={style.centerContents}>
        hi
      </div>
    )
  }
}

export default CenterContent
