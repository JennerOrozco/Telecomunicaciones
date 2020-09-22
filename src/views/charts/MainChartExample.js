import React,{ Component } from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils/src'
const axios = require('axios');


const brandInfo = getStyle('info') || '#0ba5e2'
const brandDanger = getStyle('danger') || '#ff4f61'

class MainChartExample extends Component {

  constructor({someProp}){
    super()
    this.state = {
      data : [],
      objetoSend: {},
      dates: [],
      ROL: someProp
    }  
  }

  
  
  componentDidMount(){
    this.fecthNav()
  }  

  fecthNav = async () => {
    this.RenderChart('')
  }


  static getDerivedStateFromProps(props, state) {    
    return {
      ID: props.ID      
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if (!(prevState.ID === this.state.ID)){
    this.RenderChart(this.state.ID)
    }
  }
  
  async RenderChart(datos) {    
    let respuestaDatos
    if (datos===''){
      respuestaDatos= await  axios.get(`http://localhost/Api/getUserParameters.php`)
    }else{
      let data = {ID: datos}         
      respuestaDatos = await  axios.post(`http://localhost/Api/getUserParametersByID.php`,data)
    }
    
    //a las 8 cambia de día

    let d = new Date();
    let h = d.getHours();
    let dayXtra = 0;
    if(h>=20){
      dayXtra = 1
    }else{
      dayXtra = 0
    }



    let DatosApi = respuestaDatos.data[0]    
    let today = new Date();    
    let dateIni = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+ 1
    let dateFin = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+dayXtra)
    let tasaDeCambio =  window.Configs.TasaCambioRD
    let arreglo2 = []
    let arreglo3 = []
    let arreglo4 = []
    
    try {
    let respuesta = await  axios.get(`http://Api3.adsterratools.com/publisher/ccbba23135a1a9fdb28b8e7969577544/stats.json?domain=${DatosApi.Domain}&placement=${DatosApi.Placement}&start_date=${dateIni}&finish_date=${dateFin}&group_by%5B%5D=date`)        
    arreglo2 = respuesta.data.items.map((x => ((x.revenue.toFixed(2) - ((x.revenue.toFixed(2) * DatosApi.Porcentaje) / 100))*tasaDeCambio).toFixed(2)))
    arreglo3 = respuesta.data.items.map(x => x.date)
    arreglo4 = respuesta.data.items.map(x => x.impression)
      
    } catch (error) {
      console.log("Existe un error")
      
    }
    

    let arreglo = [
        {
          label: 'Ganancias RD$',
          backgroundColor: hexToRgba(brandInfo, 10),
          borderColor: brandInfo,
          pointHoverBackgroundColor: brandInfo,
          borderWidth: 2,
          data: arreglo2
        },
        {
          label: 'Impresiones',          
          borderColor: brandDanger,
          backgroundColor: hexToRgba(brandDanger, 10),
          pointHoverBackgroundColor: brandDanger,
          borderWidth: 1,          
          data: arreglo4
        }
      ]

    this.setState({
      data : arreglo
    })

    this.setState({
      dates : arreglo3
    })

    let objeto = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          gridLines: {
            drawOnChartArea: false
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 5,
            stepSize: Math.ceil(250 / 5),
            max: 250
          },
          gridLines: {
            display: true
          }
        }]
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      }
    }

    this.setState({
      objetoSend : objeto
    })

  }
  




    


  // render
  render() {return (
    <CChartLine      
      datasets={this.state.data}
      options={this.defaultOptions}
      labels={this.state.dates}
    />
    )
  }
}


export default MainChartExample
