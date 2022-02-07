import React, {useEffect, useState} from 'react';
import Authenticated from "@/Layouts/Authenticated";
import ReactHtmlParser from "react-html-parser";
import {Inertia} from "@inertiajs/inertia";
import {Accordion, AccordionDetails, Modal} from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FeedIcon from "@mui/icons-material/Feed";
import Box from "@mui/material/Box"


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function Show({auth,success,programme,criteres,errors}) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            active={"programmes"}
        >
            <div className={"w-full flex flex-col items-center font mb-10"}>
                <img src={programme.image} alt="" className={"w-full"} style={{maxHeight:300,objectFit:"cover"}}/>

                <div style={{maxWidth:1000}}>
                   <div className={"m-10"}>
                       <div className={"text-2xl font-bold uppercase"}>
                           {programme.titre}
                       </div>
                       <div className={"mt-5 capitalizeFirstLetter text-lg"}>
                           {programme.description}
                       </div>

                   </div>

                    <div className={"mt-5 mx-10"}>
                        <div className={"flex md:flex-row flex-col mt-5 md:space-y-0 md:space-x-5 space-y-5"}>
                            <div className={"md:order-none order-2 mt-10 md:mt-0"} style={{maxWidth:800,minWidth:400}}>
                                {ReactHtmlParser(programme.details)}
                            </div>
                            <div className={"space-y-2 md:order-none order-1"} style={{maxWidth:400,minWidth:300}}>
                                <button disabled={programme.joursRestant<1} onClick={()=>Inertia.get(route("programme.projet",programme.id))} className={`border-2 rounded p-1 my-5 md:w-full ${programme.joursRestant>0?"border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition duration-500":" bg-gray-200 border-gray-400 text-gray-400"}`}>
                                    Soumettre sa candidature
                                </button>
                                {
                                    programme.fichiers.length!==0 &&
                                    <div>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <div className={"gap-4"}>
                                                    <FeedIcon/> Documents associés
                                                </div>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div>
                                                    {
                                                        programme.fichiers.map((f,i)=>(
                                                            <div key={i} className={i%2===0?"bg-indigo-100 p-2":"p-2"}>
                                                                <a href={f.url} className="hover:text-indigo-600 hover:underline">
                                                                    {f.nom}.{f.extension}
                                                                </a>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box  sx={style}>
                                                <div>
                                                    {
                                                        programme.fichiers.map((f,i)=>(
                                                            <div className={i%2===0?"bg-indigo-600":""}>
                                                                <a href={f.url} className="hover:text-indigo-600 hover:underline">
                                                                    {f.nom}.{f.extension}
                                                                </a>
                                                            </div>
                                                        ))
                                                    }
                                                </div>

                                            </Box>
                                        </Modal>
                                    </div>
                                }
                                <div className={" md:divide-y space-y-1"} style={{height:"fit-content"}}>
                                    <div className={"p-2 md:bg-indigo-600 md:text-white uppercase font-bold"}>
                                        Informations générales
                                    </div>
                                    <div className={"border-l-4 border-indigo-600 p-2"}>
                                       <span>
                                            <span className={"font-bold mr-2"}>
                                                Jours restants: </span> {programme.joursRestant}
                                       </span>
                                    </div>
                                    <div className={"border-l-4 border-indigo-600 p-2 bg-gray-100"}>
                                       <span>
                                            <span className={"font-bold mr-2"}>
                                            Regions concernées: </span>
                                           {programme.regions.length!==0 ? programme.regions.map((r,i)=>(

                                               (i!==0?", ":"")+r.libelle

                                           )):"Toutes les regions"}
                                       </span>
                                    </div>
                                    <div className={"border-l-4 border-indigo-600 p-2"}>
                                       <span>
                                            <span className={"font-bold mr-2"}>
                                            Secteurs concernés: </span>
                                           {programme.secteurs.length!==0 ? programme.secteurs.map((s,i)=>(

                                               (i!==0?", ":"")+s.libelle

                                           )):"Tous les secteurs"}
                                       </span>
                                    </div>
                                    <div className={"p-2 border-l-4 border-indigo-600 bg-gray-100"}>
                                        <span>
                                            <span className={"font-bold mr-2"}> Critères de preselection: </span>
                                            {criteres.length!==0 ? criteres.map((c)=> {
                                                return c.type_critere.libelle === "preselection" && c.description+", "

                                            }):"aucun"}
                                        </span>
                                    </div>
                                    <div className={"p-2 border-l-4 border-indigo-600"}>
                                        <span>
                                            <span className={"font-bold mr-2"}> Critères de selection: </span>
                                            {criteres.length!==0 ? criteres.map((c)=> {
                                                let a=0
                                                a++
                                                return c.type_critere.libelle === "selection" && c.description+", "

                                            }):"aucun"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </Authenticated>
    );
}

export default Show;
