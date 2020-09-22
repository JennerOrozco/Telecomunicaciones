import React from 'react'
import {    
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink  
  
} from '@coreui/react'

const TheHeaderDropdown = (value) => {  

  return (
    <CHeaderNav className="d-md-down-none mr-auto">
    <CHeaderNavItem className="px-3" >
      <CHeaderNavLink to="/dashboard">{value.value.Nombre} / Log in</CHeaderNavLink>
    </CHeaderNavItem>        
    
  </CHeaderNav>
  )
}

export default TheHeaderDropdown
