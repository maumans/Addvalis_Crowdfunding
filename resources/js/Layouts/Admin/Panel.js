import React, {useEffect, useState} from 'react';
import Authenticated from "@/Layouts/Authenticated";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


///Accordion
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Link} from "@inertiajs/inertia-react";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div className={"z-0"}>
            <Toolbar className={"bg-indigo-600"}/>
            <Accordion
                defaultExpanded={props.active==="projet"}
            >
                <AccordionSummary
                    sx={props.active==="projet"?{backgroundColor:"#4f46e5",color:"white"}:null}
                    expandIcon={<ExpandMoreIcon className={props.active==="projet"?"text-white":null}/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Gestion des projets</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        <Link href={route("admin.projet.index",1)}>
                            <ListItem sx={props.sousActive==="listeProjets"?{backgroundColor:"#4f46e5",color:"white"}:null}>
                                <ListItemText primary={"Liste des projets"} />
                            </ListItem>
                        </Link>
                        <Link href={route("admin.projet.validation.index",1)}>
                            <ListItem   sx={props.sousActive==="validation"?{backgroundColor:"#4f46e5",color:"white"}:null}>
                                <ListItemText primary={"Projets à valider"} />
                            </ListItem>
                        </Link>
                        <ListItem sx={props.active==="secteur"?{backgroundColor:"#4f46e5",color:"white"}:null}>
                            <ListItemText primary={"Gestion des secteurs"} />
                        </ListItem>
                    </List>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    sx={props.active==="utilisateur"?{backgroundColor:"#4f46e5",color:"white"}:null}
                    expandIcon={<ExpandMoreIcon className={props.active==="utilisateur"?"text-white":null} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Gestion des utilisateurs</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        <ListItem   sx={props.active==="projet"?{backgroundColor:"#4f46e5",color:"white"}:null}>
                            <ListItemText primary={"Gestion des projets"} />
                        </ListItem>
                        <ListItem sx={props.active==="utilisateur"?{backgroundColor:"#4f46e5",color:"white"}:null}>
                            <ListItemText primary={"Gestion des utilisateurs"} />
                        </ListItem>
                        <ListItem sx={props.active==="secteur"?{backgroundColor:"#4f46e5",color:"white"}:null}>
                            <ListItemText primary={"Gestion des secteurs"} />
                        </ListItem>
                    </List>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    sx={props.active==="secteur"?{backgroundColor:"#4f46e5",color:"white"}:null}
                    expandIcon={<ExpandMoreIcon className={props.active==="secteur"?"text-white":null} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Gestion des secteurs</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        <ListItem   sx={props.active==="secteur"?{backgroundColor:"#4f46e5",color:"white"}:null}>
                            <ListItemText primary={"Gestion des projets"} />
                        </ListItem>
                        <ListItem sx={props.active==="utilisateur"?{backgroundColor:"#4f46e5",color:"white"}:null}>
                            <ListItemText primary={"Gestion des utilisateurs"} />
                        </ListItem>
                        <ListItem sx={props.active==="secteur"?{backgroundColor:"#4f46e5",color:"white"}:null}>
                            <ListItemText primary={"Gestion des secteurs"} />
                        </ListItem>
                    </List>
                </AccordionDetails>
            </Accordion>

        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    marginTop:"64px",
                    backgroundColor:"#4f46e5",
                    zIndex:1
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                       Administration
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
               <div>
                   {props.children}
               </div>
            </Box>
        </Box>
    );
}




function Panel(props) {

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >

            <div className="relative">
                <ResponsiveDrawer sousActive={props.sousActive} active={props.active} children={props.children}/>
            </div>

        </Authenticated>
    );
}


export default Panel;
