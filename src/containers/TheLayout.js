import React,{ Component } from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import navigation from './_nav'
const axios = require('axios');

class TheLayout extends Component {
  state = {
    data : [],
    datos : {Nombre: ''}
  }  
  componentDidMount(){
    this.fecthNav()
  }  
  fecthNav = async () => {
    let session = await  axios.get(`http://localhost/Api/Session.php`)        
    
    if ((session.data === 'SessionOFF')){
      this.props.history.push('/Login')
      this.setState({
        data: []
     })
    }else{
    let respuestaDatos = await  axios.get(`http://localhost/Api/getUserBySession.php`)
    let  nav = await navigation()        
    this.setState({
       data: nav,
       datos: {Nombre: respuestaDatos.data[0].Nombre + ' - ' + respuestaDatos.data[0].Usuario} 
    })
  }
  }
 
  render() { return (
    <div className="c-app c-default-layout">
      <TheSidebar value={this.state.data}/>
      <div className="c-wrapper">
        <TheHeader value={this.state.datos}/>
        <div  style={{"background-color": "#303c54"}} className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}
}
export default TheLayout;
