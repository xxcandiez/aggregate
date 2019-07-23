import style from './style.js'
import React, {Component} from 'react'
import Banner from './banner/Art.js'

class CenterContent extends Component{
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={style.centerContents}>
        <Banner/>
      </div>
    )
  }
}

export default CenterContent
