import  React,{useRef,useEffect} from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
 import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {MdDashboard} from'react-icons/md'
import ListItemIcon from "@mui/material/ListItemIcon";
import  './SideBar.scss'

 
 
import { Link } from "react-router-dom";
 import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
} from "react-pro-sidebar";

 import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CircleNotificationsRoundedIcon from '@mui/icons-material/CircleNotificationsRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import TransitionAlerts from "./TransitionAlerts";
import zIndex from "@mui/material/styles/zIndex";
const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));
let left;
export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    let menuRef = useRef();


useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpen(false);
    }

  };
  

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [menuRef]);

    const handleDrawerOpen = () => {
        setOpen(true);
        left=true
    };

    const handleDrawerClose = () => {
        setOpen(false);
        left=false
    };
     

    return (
        
            <ProSidebar style={{backgroundColor:'rgba(220, 136, 255, 0.8)',zIndex:3,
            
}}>

                <Box sx={{ color: "red", display: "flex", backgroundColor: "white" }}>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        style={{ backgroundColor: "#1c84c3", display:'flex'}}
                        open={open}
                    >
                        <Toolbar style={{ display:'flex', alignItems: 'center', width: '100%' }}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{
                                    marginRight: 5,
                                    ...(open && { display: "none" }),
                                    
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                                <Typography variant="h6" noWrap component="div">
                                    Admin Dashboard
                                </Typography>
                                <Link to='/login'
                                        style={{
                                            // alignSelf:'flex-end',
                                            // justifySelf: ' flex-end',
                                            textDecoration: "none",
                                            // marginRight: "100px",
                                            // color: "#1c84c3",
                                            color:'#fff'
                                            // backgroundColor:'#fff'
                                        }}
                                        >
                                        <Typography variant="h6" noWrap component="div">
                                            Logout
                                        </Typography>
                                </Link>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <Drawer variant="permanent" open={open} style={{}}>
                        <DrawerHeader>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === "rtl" ? (
                                    <ChevronRightIcon />
                                ) : (
                                    <ChevronLeftIcon />
                                )}
                            </IconButton>
                        </DrawerHeader>
                        <Divider />

                        {(sessionStorage.getItem('role')!==undefined && sessionStorage.getItem('role')==='admin')&&
                        <>
                        <Link
                            to="/home"
                            style={{
                                textDecoration: "none",
                                marginRight: "100px",
                                color: "#1c84c3",
                                backgroundColor:'#fff'
                            }}
                        >
                                                       
                        <Menu iconShape="square" style={{ backgroundColor:'white', color: '#1c84c3' }}>
                         
                         <ListItemIcon sx={{
                              minHeight: 48,
                              justifyContent: open ? "initial" : "center",
                              px: 2.5,
                                             minWidth: 0,
                                             mr: open ? 3 : "auto",
                                             backgroundColor: 'white',
                                             
                                         }} >
                            
                             <HomeRoundedIcon style={{position:'relative',
                                             top:'55px', color: '#ff9800'
                                             }} onClick={()=> open ? setOpen(false): setOpen(true)} />
                         </ListItemIcon>
                          <div style={{backgroundColor:'#fff'}}>
                         <MenuItem title="Home" style={{ backgroundColor: 'white', color: '#1c84c3',position:'relative',
                                                                     left:'50px'
                                                                 }}
                                                                 onClick={()=> open ? setOpen(false): setOpen(true)}                                                                 >Home</MenuItem>

                                                                 </div>
                                                                 </Menu>
                        </Link>
 
                        <Menu iconShape="square" style={{ backgroundColor:'white', color: '#1c84c3' }}>
                         
                            <ListItemIcon sx={{
                                 minHeight: 48,
                                 justifyContent: open ? "initial" : "center",
                                 px: 2.5,
                                                minWidth: 0,
                                                mr: open ? 3 : "auto",
                                                 backgroundColor: 'white',
                                                
                                            }}  >
                               
                                <ManageAccountsIcon style={{position:'relative',
                                                top:'55px', color: '#ff9800'
                                                }}  onClick={()=> open ? setOpen(false): setOpen(true)}/>
                            </ListItemIcon>
                             <div style={{backgroundColor:'#fff'}}>
                            <SubMenu  title=" Manage Users" style={{ backgroundColor: 'white', color: '#1c84c3',position:'relative',
                                                                        left:'50px'
                                                                    }}
                                                                   >
                            <MenuItem title="User List" style={{ backgroundColor: 'white', color: '#1c84c3' }} >
                                        <Link
                                        to="/manageuser/userlist"
                                        style={{
                                            textDecoration: "none",
                                            marginRight: "100px",
                                            color: "#1c84c3",
                                            backgroundColor: 'white'
                                        }}
                                        onClick={handleDrawerClose}
                                    >User List</Link>
                                        </MenuItem>
                                        <MenuItem title="User Group Info" style={{ backgroundColor: 'white', color: '#1c84c3' }} >
                                        <Link
                                        to="/manageuser/usergroupsinfo"
                                        style={{
                                            textDecoration: "none",
                                            marginRight: "100px",
                                            color: "#1c84c3",
                                            backgroundColor: 'white'
                                        }}
                                        onClick={handleDrawerClose}
                                    >User Group Info</Link>
                                        </MenuItem>
                                <MenuItem title="Add Users" style={{ backgroundColor: 'white', color: '#1c84c3' }}   >
                                    <Link
                                        to="/manageuser/bulkaddusers"
                                        style={{
                                            textDecoration: "none",
                                            marginRight: "100px",
                                            color: "#1c84c3",
                                            backgroundColor: 'white'
                                        }}
                                        onClick={handleDrawerClose}

                                    >Add Users</Link>
                                </MenuItem>

                                 <MenuItem title="Inactivate Users" style={{ backgroundColor: 'white', color: '#1c84c3' }} >
                                    <Link
                                        to="/manageuser/bulkinactivateusers"
                                        style={{
                                            textDecoration: "none",
                                            marginRight: "100px",
                                            color: "#1c84c3",
                                            backgroundColor: 'white'
                                        }}
                                        onClick={handleDrawerClose}

                                    >Inactivate Users</Link>
       
                                </MenuItem>
                                <MenuItem title="Add User Details" style={{ backgroundColor: 'white', color: '#1c84c3' }} >
                                    <Link
                                        to="/manageuser/adduserdetails"
                                        style={{
                                            textDecoration: "none",
                                            marginRight: "100px",
                                            color: "#1c84c3",
                                            backgroundColor: 'white'
                                        }}
                                        onClick={handleDrawerClose}

                                    >Add User Details</Link>
       
                                </MenuItem>



                            </SubMenu>
                            </div>
                       </Menu>

                       <Menu iconShape="round" style={{ backgroundColor: 'white', color: '#1c84c3' }}>
                  
                  <ListItemIcon sx={{
                       minHeight: 48,
                       justifyContent: open ? "initial" : "center",
                       px: 2.5,
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                             backgroundColor: 'white'
                                        }} >
                            {/* <Icons2.GrUserSettings /> */}
                            <CircleNotificationsRoundedIcon style={{position:'relative',
                                            top:'55px', color: '#ff9800',
                                            marginRight:'10px'}}  onClick={()=> open ? setOpen(false): setOpen(true)}/>
                        </ListItemIcon>
                         <div style={{backgroundColor:'#fff'}}>
                        <SubMenu title="Manage Payment" style={{ backgroundColor: 'white', color: '#1c84c3',position:'relative',
                                                                    left:'50px' }}>


                                <MenuItem title="Manage payments" style={{ backgroundColor: 'white', color: '#1c84c3' }}   >

                                <Link
                                    to="/managepayments"
                                    style={{
                                        textDecoration: "none",
                                        // marginRight: "100px",
                                        color: "#1c84c3",
                                        backgroundColor: 'white'
                                    }}
                                    onClick={handleDrawerClose}

                                >  Manage payments</Link>
                                </MenuItem>
                                <MenuItem title="User Subscription" style={{ backgroundColor: 'white', color: '#1c84c3' }}   >

                                    <Link
                                        to="/managepayments/usersubscription"
                                        style={{
                                            textDecoration: "none",
                                            // marginRight: "100px",
                                            color: "#1c84c3",
                                            backgroundColor: 'white'
                                        }}
                                        onClick={handleDrawerClose}

                                    >  User Subscriptions</Link>
                                    </MenuItem>
                                <MenuItem title="Update Package" style={{ backgroundColor: 'white', color: '#1c84c3' }}   >

                                    <Link
                                        to="/managepayments/bulkupdatepackage"
                                        style={{
                                            textDecoration: "none",
                                            // marginRight: "100px",
                                            color: "#1c84c3",
                                            backgroundColor: 'white'
                                        }}
                                        onClick={handleDrawerClose}

                                    >  Update Package</Link>
                                    </MenuItem>
                                <MenuItem title="Add Free Package" style={{ backgroundColor: 'white', color: '#1c84c3' }}   >

                                    <Link
                                        to="/managepayments/addfreepackage"
                                        style={{
                                            textDecoration: "none",
                                            // marginRight: "100px",
                                            color: "#1c84c3",
                                            backgroundColor: 'white'
                                        }}
                                        onClick={handleDrawerClose}

                                    >  Add Free Package</Link>
                                    </MenuItem>

                            </SubMenu>
                        
                            </div>
                        
                    </Menu>

                      <Menu iconShape="round" style={{ backgroundColor: 'white', color: '#1c84c3' }}>
                  
                      <ListItemIcon sx={{
                           minHeight: 48,
                           justifyContent: open ? "initial" : "center",
                           px: 2.5,
                                                minWidth: 0,
                                                mr: open ? 3 : "auto",
                                                 backgroundColor: 'white'
                                            }} >
                                {/* <Icons2.GrUserSettings /> */}
                                <CircleNotificationsRoundedIcon style={{position:'relative',
                                                top:'55px', color: '#ff9800',
                                                marginRight:'10px'}}  onClick={()=> open ? setOpen(false): setOpen(true)}/>
                            </ListItemIcon>
                             <div style={{backgroundColor:'#fff'}}>
                            <SubMenu title="Notify Users" style={{ backgroundColor: 'white', color: '#1c84c3',position:'relative',
                                                                        left:'50px' }}>

 
                                    <MenuItem title="Test Notificaton" style={{ backgroundColor: 'white', color: '#1c84c3' }}   >

                                    <Link
                                        to="/notify/test"
                                        style={{
                                            textDecoration: "none",
                                            // marginRight: "100px",
                                            color: "#1c84c3",
                                            backgroundColor: 'white'
                                        }}
                                        onClick={handleDrawerClose}

                                    >  Test Notification</Link>
                                    </MenuItem>

                                </SubMenu>
                                </div>
                            
                        </Menu>
                        </>}


                        <Menu iconShape="round" style={{ backgroundColor: 'white', color: '#1c84c3' }}>
                  
                  <ListItemIcon sx={{
                       minHeight: 48,
                       justifyContent: open ? "initial" : "center",
                       px: 2.5,
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                             backgroundColor: 'white'
                                        }} >
                            {/* <Icons2.GrUserSettings /> */}
                            <CircleNotificationsRoundedIcon style={{position:'relative',
                                            top:'55px', color: '#ff9800',
                                            marginRight:'10px'}}  onClick={()=> open ? setOpen(false): setOpen(true)}/>
                        </ListItemIcon>
                         <div style={{backgroundColor:'#fff'}}>
                        <SubMenu title="Content Manager" style={{ backgroundColor: 'white', color: '#1c84c3',position:'relative',
                                                                    left:'50px' }}>


                                <MenuItem title="Generate Evaluation" style={{ backgroundColor: 'white', color: '#1c84c3' }}   >

                                <Link
                                    to="/content/Evaluation"
                                    style={{
                                        textDecoration: "none",
                                        // marginRight: "100px",
                                        color: "#1c84c3",
                                        backgroundColor: 'white'
                                    }}
                                    onClick={handleDrawerClose}

                                >  Generate Evaluation</Link>
                                </MenuItem>

                                
                                <MenuItem title="Generate Question" style={{ backgroundColor: 'white', color: '#1c84c3' }}   >

                                <Link
                                    to="/content/Question"
                                    style={{
                                        textDecoration: "none",
                                        // marginRight: "100px",
                                        color: "#1c84c3",
                                        backgroundColor: 'white'
                                    }}
                                    onClick={handleDrawerClose}

                                > Generate Question</Link>
                                </MenuItem>


                                <MenuItem title="Generate Question" style={{ backgroundColor: 'white', color: '#1c84c3' }}   >

<Link
    to="/content/Browse"
    style={{
        textDecoration: "none",
        // marginRight: "100px",
        color: "#1c84c3",
        backgroundColor: 'white'
    }}
    onClick={handleDrawerClose}

> Browse Code</Link>
</MenuItem>


<MenuItem title="Generate Question" style={{ backgroundColor: 'white', color: '#1c84c3' }}   >

<Link
    to="/content/dryrunjson"
    style={{
        textDecoration: "none",
        // marginRight: "100px",
        color: "#1c84c3",
        backgroundColor: 'white'
    }}
    onClick={handleDrawerClose}

> Generate Dryrun_json</Link>
</MenuItem>

                            </SubMenu>
                            </div>
                        
                    </Menu>
                    </Drawer>
                    {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <DrawerHeader />
                        <Typography paragraph>

                        </Typography>
                        <Typography paragraph></Typography>
                    </Box> */}
                    <TransitionAlerts/>
                </Box>

            </ProSidebar>
        
    );
}
export {left}
