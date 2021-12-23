import React, {useState} from 'react';
import Authenticated from "@/Layouts/Authenticated";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import ReactHtmlParser from "react-html-parser";
import Avatar from "@mui/material/Avatar";
import {Link} from "@inertiajs/inertia-react";
import {Inertia} from "@inertiajs/inertia";
import {maxWidth} from "@mui/system";

function Show({auth,projetsSoutenus,dateInscription}) {

    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function numberFormat(number)
    {
        return new Intl.NumberFormat('de-DE').format(number)
    }

    return (
       <Authenticated
        auth={auth}
       >
           <div>
               <div className="flex w-full flex-col items-center mt-10 font space-y-10">
                   <div className={"p-2 flex justify-between items-center space-x-5 xs:space-x-2 bg-indigo-100 mx-1"}>
                       <div>
                           <VisibilityIcon className="text-indigo-600"/> La page de profil n'est visible que par vous
                       </div>
                       <button onClick={()=>Inertia.get(route("user.edit",auth.user.id))} className={"text-white xs:text-sm bg-indigo-600 hover:text-indigo-600 hover:bg-white border border-0 hover:border-indigo-600 p-2 transition duration-500"}>
                           Vos parametres
                       </button>
                   </div>
                   <div>
                       <Avatar src={auth.user.photoProfil} sx={{ width: 150, height: 150 }}/>
                   </div>

                   <div className={"text-3xl font-bold capitalize"}>
                        {auth.user.name}
                    </div>

                   <div className={"flex  items-center space-x-5"}>
                        <div className={"text-indigo-600"}>
                            {console.log(projetsSoutenus)}
                            {projetsSoutenus.length} projets soutenus
                        </div>
                       <div>
                           .
                       </div>
                       <div>
                           Inscription: <span className={"text-indigo-600"}>
                                {dateInscription}
                            </span>
                       </div>
                   </div>
               </div>

               <div className="flex w-full justify-center mt-60">
                   <Box sx={{ width: '100%', typography: 'body1' }} centered>
                       <TabContext value={value}>
                           <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                               <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                                   <Tab label="A propos de moi" value="1" />
                                   <Tab label="Projets soutenus" value="2" />
                               </TabList>
                           </Box>
                           <TabPanel value="1">
                               <div className={"flex justify-center gap-10 mt-10"}>
                                   <div>
                                       Biographie
                                   </div>
                                   <div className={"flex flex-col gap-4"} style={{maxWidth:500}}>
                                       {
                                           auth.user.biographie?
                                               auth.user.biographie
                                               :
                                               <>
                                                   <div>
                                                       Présentez-vous aux autres.
                                                   </div>
                                                   <div>
                                                       <button className={"text-indigo-600"} onClick={()=>{
                                                           Inertia.get(route("user.edit",[auth.user.id,true]))
                                                       }}>Ajouter une biographie</button>

                                                   </div>
                                               </>
                                       }
                                   </div>
                               </div>
                           </TabPanel>
                           <TabPanel value="2">
                               <div className={"flex flex-col space-y-4 items-center divide-y-1 mt-10"}>
                                   {projetsSoutenus.length>0 ? projetsSoutenus.map((p)=>(
                                       <div className={"flex h-80 space-x-5 py-4"} style={{maxWidth:1000}} key={p.id}>
                                           <div className={"md:w-5/12 w-6/12"}>
                                               <img className={"w-full h-full"} style={{objectFit:"cover",minHeight:"100%"}} src={p.image}/>
                                           </div>
                                           <div className={"flex w-7/12 flex-col"}>
                                               <div className={"flex flex-col space-y-2"}>
                                                   <div className={"font-bold uppercase"}>
                                                       {p.titre}
                                                   </div>
                                                   <div className={"xs:text-sm"}>
                                                       {p.description}
                                                   </div>
                                                   <span className={"italic text-xs my-5"}>
                                                        Projet de: <span className={"capitalize font-bold"}> {p.user.name}</span>
                                                    </span>
                                                   <span>
                                                        Montant total: <span className={"text-indigo-600 font-bold"}> {numberFormat(p.montantRechercher)} FG</span>
                                                    </span>
                                                   <span>
                                                       Votre contribution: <span className={"text-indigo-600 font-bold"}> {numberFormat(p.pivot.montant)} FG</span>
                                                    </span>
                                               </div>
                                               <div className={"mt-auto md:w-6/12 w-full"}>
                                                   <button onClick={()=>Inertia.get(route("projet.show",p.id))} className={"bg-indigo-600 text-white hover:text-indigo-600 hover:border-indigo-600 border hover:bg-white p-2 w-full transition duration-500"}>
                                                       Voir les details
                                                   </button>
                                               </div>
                                           </div>
                                       </div>
                                   )):
                                   <div className="flex flex-col items-center w-full">
                                       <div>
                                           <span className="font-bold">Vous n'avez soutenu aucun projet.</span> Changeons ça !
                                       </div>
                                       <Link className={"text-indigo-600 hover:underline transition duration-500"} href={route("projet.index")}>Découvrez des projets</Link>
                                   </div>}
                               </div>
                           </TabPanel>
                       </TabContext>
                   </Box>

               </div>
           </div>
       </Authenticated>
    );
}

export default Show;
