import React from 'react'
import CIcon from '@coreui/icons-react';
import {  
  CRow,
  CCol  ,
  CWidgetBrand
} from '@coreui/react'
import ChartLineSimple from '../charts/ChartLineSimple'

const WidgetsDropdown = (valores) => {
  const valor = valores.value;    
  // render
  return (
    <CRow>
     <CCol sm="6" lg="4">
      <CWidgetBrand
        color="gradient-primary"
        rightHeader="Impresiones"
        rightFooter="de hoy"
        leftHeader={'' +valor.impression}
        //  leftFooter="feeds"
      >
        <CIcon
          name="cilUser"
          height="52"
          className="my-4"
        />
        <ChartLineSimple
          className="position-absolute w-100 h-100"
          backgroundColor="rgba(255,255,255,.1)"
          dataPoints={[65, 59, 84, 84, 51, 55, 40]}
          label="Friends"
          labels="months"
        />
      </CWidgetBrand>
    </CCol>

    <CCol sm="6" lg="4">
      <CWidgetBrand
        color="gradient-info"
        rightHeader="Ganancias"
        rightFooter="de hoy"
        leftHeader={'RD$ '+ valor.revenue}
         leftFooter="pesos"
      >
        <CIcon
          name="cilDollar"
          height="52"
          className="my-4"
        />
        <ChartLineSimple
          className="position-absolute w-100 h-100"
          backgroundColor="rgba(255,255,255,.1)"
          dataPoints={[65, 59, 84, 84, 51, 55, 40]}
          label="Friends"
          labels="months"
        />
      </CWidgetBrand>
    </CCol>

    <CCol sm="6" lg="4">
      <CWidgetBrand
        color="gradient-white bg-dark"
        rightHeader="Ganancias"
        rightFooter="de esta semana"
        leftHeader={'RD$ '+ valor.countryRevenue}
         leftFooter="pesos"
      >
        <CIcon
          name="cilDollar"
          height="52"
          className="my-4"
        />
        <ChartLineSimple
          className="position-absolute w-100 h-100"
          backgroundColor="rgba(255,255,255,.1)"
          dataPoints={[65, 59, 84, 84, 51, 55, 40]}
          label="Friends"
          labels="months"
        />
      </CWidgetBrand>
    </CCol>

    
      {/* <CCol sm="6" lg="4">
        <CWidgetDropdown
          color="gradient-primary"
          header="IMPRESIONES DE HOY"
          text={''+valor.impression}
          className ='font-xl'          
          footerSlot={
            <ChartLineSimple
            className="mt-3"
            style={{height: '70px'}}
            backgroundColor="rgba(255,255,255,.2)"
            dataPoints={[78, 81, 80, 45, 34, 12, 40]}
            options={{ elements: { line: { borderWidth: 2.5 }}}}            
            label="Members"
            labels="months"
          />
          }
        >                 
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="4">
        <CWidgetDropdown
          color="gradient-info"
          header="GANANCIAS DE HOY"
          text={'$ '+ valor.revenue}
          className ='font-xl'
          footerSlot={
            <ChartLineSimple
            className="mt-3"
            style={{height: '70px'}}
            backgroundColor="rgba(255,255,255,.2)"
            dataPoints={[78, 81, 80, 45, 34, 12, 40]}
            options={{ elements: { line: { borderWidth: 2.5 }}}}
            pointHoverBackgroundColor="warning"
            label="Members"
            labels="months"
          />
          }
        >
         
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="4">
        <CWidgetDropdown
          color="gradient-success"
          header={"GANANCIAS DE ESTA SEMANA "}
          text={'$ '+ valor.countryRevenue}
          className ='font-xl'
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{height: '70px'}}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={[78, 81, 80, 45, 34, 12, 40]}
              options={{ elements: { line: { borderWidth: 2.5 }}}}
              pointHoverBackgroundColor="warning"
              label="Members"
              labels="months"
            />
          }
        >
          
        </CWidgetDropdown>
      </CCol> */}

    </CRow>
  )
}

export default React.memo(WidgetsDropdown)
