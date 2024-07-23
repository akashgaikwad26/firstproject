import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';
// import Select from './Select'

import React from 'react'
function createUser() {
  alert("users Created successfully")
  console.log("ceated ")
}

function deleteUser() {
  alert("users removed successfully")
  console.log("deleted")
}

function ProSideBar() {
  return (
    <div><ProSidebar sx={{ heigth: '100%', backgroundColor: '#1c84c3' }}>
      <Menu iconShape="round">
        <MenuItem style={{ heigth: '1000px' }} >Dashboard</MenuItem>

        <SubMenu title="User Manage">



          <MenuItem title="Dashboard" style={{ heigth: '1000px' }}>
            Dashboard
          </MenuItem>
          {/* {/* you can have more nested submenus ... */}
          <MenuItem title="Bulk Add User" onClick={() => { createUser() }} >

            {/* <Select /> */}
            Bulk Add Users
          </MenuItem>
          <MenuItem title="Bulk Remove Users" onClick={() => { deleteUser() }}  >
            Bulk Remove Users
          </MenuItem>


        </SubMenu>
        <SubMenu title="Notify">

          <MenuItem>Test Competition Notification</MenuItem>
          <MenuItem>Password Send Notification</MenuItem>
        </SubMenu>

      </Menu>
      <Menu iconShape="square">

      </Menu>
      <SidebarFooter>

      </SidebarFooter>
    </ProSidebar></div>
  )
}

export default ProSideBar


