import React, { Component,lazy } from 'react'

import {    
  CCardHeader,  
  CDataTable,
  CButtonGroup,
  CCard,
  CCardBody,  
  CCol,  
  CRow
  
} from '@coreui/react'

import MainChartExample from '../charts/MainChartExample.js'
var moment = require('moment'); 



const axios = require('axios');

const fields = ['intervalo','ganancia']


const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))

class  Dashboard extends Component {
  state = {
    hoy: [],
    datos : [],
    data : [],
    show: 'none',
    ROL: ''
  }  

  componentDidMount(){
    this.fecthNav()
  }
  
  handleChangeSelec= async (e)=> {
    await this.setState( {
      ROL: e.target.value
    }) 
    
    this.RenderDashboard(true)
  }



  async RenderDashboard(showed) {
    let respuestaDatos
    if (showed){      
    let data = {ID: this.state.ROL}         
      respuestaDatos = await  axios.post(`http://localhost/Api/getUserParametersByID.php`,data)
    }else{
      respuestaDatos = await  axios.get(`http://localhost/Api/getUserParameters.php`)
      let element = document.getElementById('SelectFilter');      
      element.value = respuestaDatos.data[0].Usuario_ID;
    }    
    
    let DatosApi = respuestaDatos.data[0]
    

    let today = new Date();    

     //a las 8 cambia de día

     let d = new Date();
     let h = d.getHours();
     let dayXtra = 0;
     if(h>=20){
       dayXtra = 1
     }else{
       dayXtra = 0
     }
     let tasaDeCambio =  window.Configs.TasaCambioRD
     
    let dateIni = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+ 1
    let dateFin = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+dayXtra)

    let todayWeek = moment(today).format('W')
    let todayMonth = moment(today).format('M')
    
    dateIni = today.getFullYear()+'-'+(today.getMonth()-1)+'-'+today.getDate()
    
    let respuesta
    try {
       respuesta = await  axios.get(`http://Api3.adsterratools.com/publisher/ccbba23135a1a9fdb28b8e7969577544/stats.json?domain=${DatosApi.Domain}&placement=${DatosApi.Placement}&start_date=${dateIni}&finish_date=${dateFin}&group_by%5B%5D=date`)      
    } catch (error) {
      respuesta = {data: {items: []}}
    }
    console.log(respuesta.data)
    
    let days = respuesta.data.items.map(x => {return [moment(x.date).format('D'), (x.revenue - ((x.revenue * DatosApi.Porcentaje) / 100)) ]})
    let weeks = respuesta.data.items.map(x => {return [moment(x.date).format('W'), (x.revenue - ((x.revenue * DatosApi.Porcentaje) / 100))  ]})
    let months = respuesta.data.items.map(x => {return [moment(x.date).format('M'),(x.revenue - ((x.revenue * DatosApi.Porcentaje)/ 100))  ]})
    let indiceHoy = respuesta.data.items.length;    
    let SemanaArray = {}
    let MesArray = {}

    weeks.forEach( x => {
      if( !SemanaArray.hasOwnProperty(x[0])){
        SemanaArray[x[0]] = {
          Semana: []}
      }      
      SemanaArray[x[0]].Semana.push({
          semana: x[0],
          valor: x[1]
        })})    
    
    months.forEach( x => {
      if( !MesArray.hasOwnProperty(x[0])){
        MesArray[x[0]] = {
          Mes: []}
      }            
      MesArray[x[0]].Mes.push({
          Mes: x[0],
          valor: x[1]
        })})
    
    const reducer = (accumulator, currentValue) => accumulator = accumulator + currentValue.valor;

    let semana,semanaPas,mes,mesPas,hoy,ayer

    try {
      hoy = days[days.length - 1][1]
    } catch (error) {
      hoy = 0
    }

    try {
      ayer = days[days.length - 2][1]
    } catch (error) {
      ayer = 0
    }
    
    try {
      semana = SemanaArray[todayWeek].Semana.reduce(reducer,0)  
    } catch (error) {
      semana = 0
    }

    try {
      semanaPas = SemanaArray[todayWeek-1].Semana.reduce(reducer,0)
    } catch (error) {
      semanaPas = 0
    }

    try {
      mes = MesArray[todayMonth].Mes.reduce(reducer,0)
    } catch (error) {
      mes = 0
    }
    try {
      mesPas = MesArray[todayMonth-1].Mes.reduce(reducer,0)
    } catch (error) {
      mesPas = 0
    }
    
    
    let GananciaDeHoy 

    try {
      GananciaDeHoy = respuesta.data.items[indiceHoy-1];
      GananciaDeHoy.revenue = ((GananciaDeHoy.revenue - ((GananciaDeHoy.revenue.toFixed(2) * DatosApi.Porcentaje) / 100 )).toFixed(2)*tasaDeCambio).toFixed(2)
    } catch (error) {
      GananciaDeHoy = {revenue: 0,impression: 0}
    }
    
    
    
    this.setState({
        hoy : {...GananciaDeHoy,countryRevenue: (semana.toFixed(2)*tasaDeCambio).toFixed(2)},
        datos:[
        {id: 0, intervalo: 'Ganancias de hoy', ganancia: 'RD$' +(hoy.toFixed(2)*tasaDeCambio).toFixed(2)},
        {id: 1, intervalo: 'Ganancias de ayer', ganancia: 'RD$' +(ayer.toFixed(2)*tasaDeCambio).toFixed(2)},
        {id: 2, intervalo: 'Ganancias de esta semana', ganancia: 'RD$' +(semana.toFixed(2)*tasaDeCambio).toFixed(2)},
        {id: 3, intervalo: 'Ganancias de la semana pasada', ganancia: 'RD$' +(semanaPas.toFixed(2)*tasaDeCambio).toFixed(2)},
        {id: 4, intervalo: 'Ganancias de este mes', ganancia: 'RD$' +(mes.toFixed(2)*tasaDeCambio).toFixed(2)},
        {id: 5, intervalo: 'Ganancias del mes pasado', ganancia: 'RD$' +(mesPas.toFixed(2)*tasaDeCambio).toFixed(2)}
        
      ]
  })
  
  this.forceUpdate()
  }


  
  fecthNav = async () => {
    let respuestaUsuarios = await  axios.get(`http://localhost/Api/getUserListSecure.php`)
    
    if (respuestaUsuarios.data.length > 0){
      this.setState({
        show: "block"
      })
      
      
      let empty = []
      respuestaUsuarios.data.forEach(element => {
        empty.push({ID: element.ID,Nombre: element.Nombre + " " + element.Apellido})
      });

      this.setState({
        data: empty
      })

      
      
    }

    this.RenderDashboard(false)
    
  }
  
 render() {
   return (
    <>
      <WidgetsDropdown value={this.state.hoy} />      
      <CRow>
      <CCol xs="8">
      <CCard>
        <CCardBody style={{"background-color": "#192131"}}>
          <CRow >
            <CCol sm="5">
              <h4 id="traffic" style={{"color": "white"}} className="card-title mb-0">Grafica de ganancias del mes</h4>              
            </CCol>
            <CCol sm="7" className="d-none d-md-block">                            
              <CButtonGroup className="float-right mr-3">               
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChartExample ID={this.state.ROL} style={{height: '300px', marginTop: '40px'}}/>
        </CCardBody>        
      </CCard>
      </CCol>

      <CCol xs="4" className="float-right">
          <CCard style={{display: this.state.show}}>
            <CCardHeader>
              Filtrar por usuario
            </CCardHeader>
            <CCardBody>
            <select id='SelectFilter'
                        className="form-control"                        
                        onChange={this.handleChangeSelec}
                        >
                          {
                            this.state.data.map((i)=>(
                              <option key={i.ID} value={i.ID}>{i.Nombre}</option>
                            ))
                          }
                        </select>
            </CCardBody>
            
            
          </CCard>
          <CCard>
            <CCardHeader>
              Ganancias
            </CCardHeader>
            
            <CDataTable
              size="sm"
              hover
              striped
              dark
              items={this.state.datos}
              fields={fields}
              itemsPerPage={5}                            
            />            
          </CCard>
        </CCol>
      </CRow>
    

    </>
  )
}
}

export default Dashboard
