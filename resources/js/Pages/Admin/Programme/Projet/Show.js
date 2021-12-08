import React, {useEffect, useState} from 'react';
import Panel from "@/Layouts/Admin/Panel";
import {Inertia} from "@inertiajs/inertia";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import ReactHtmlParser from "react-html-parser";
import Avatar from "@mui/material/Avatar";
import {Switch, TextField} from "@mui/material";

function Show({auth,success,projet,programme,criteres}) {

    const [critereValidation,setCritereValidation]=useState({}
    )

    useEffect(()=>{
        criteres.map((c)=>(
            setCritereValidation(critereValidation=>({
                ...critereValidation,
                [c.id]:c.genre_critere.libelle === "choix"?false:"",
            }))
        ))
    },[])

    useEffect(()=>{
        console.log(critereValidation)
    })

    function numberFormat(number)
    {
        return new Intl.NumberFormat('de-DE').format(number)
    }

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function handleValidationChange(e, id) {
        setCritereValidation((critereValidation)=>({
            ...critereValidation,
            [id]:e.target.value
        }))
    }

    function switchValidationChange(e, id) {
        setCritereValidation((critereValidation)=>({
            ...critereValidation,
            [id]:e.target.checked
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post(route("admin.programme.projet"),[auth.user.id,programme.id,projet.id])
    }

    return (
        <Panel
            auth={auth}
            success={success}
            active={"programme"}
            sousActive={"voirProgramme"}
        >
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <div className={"fixed w-full bg-white flex justify-center items-center border-b z-10"} style={{height:80}}>
                        <button className={"bg-indigo-600 text-white p-2 rounded"}>Enregistrer</button>
                    </div>
                    <div className={"flex p-5 space-x-5 w-full"} style={{paddingTop:80}}>
                        <img src={projet.image} className={"w-64 h-64 object-cover"} style={{minWidth:200,minHeight:200}} alt=""/>
                        <div className={"w-full"}>
                            <div className={"flex flex-col"}>
                                <div className={"font-bold uppercase"}>
                                    {projet.titre}
                                </div>
                                <div>
                                    {projet.description}
                                </div>
                                <span className={"italic text-xs my-5"}>
                               Pojet de: <span className={"capitalize font-bold"}> {projet.user.name}</span>
                           </span>
                            </div>

                        </div>
                    </div>
                    <div className="flex justify-center p-5">
                        <Box sx={{ width: '100%', typography: 'body1' }} centered>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                                        <Tab label="Details" value="1" />
                                        <Tab label="Validation du projet" value="2" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    <div className={"w-full flex justify-center"}>
                                        <div style={{maxWidth:800}} className={"flex flex-col justify-center"}>
                                            {ReactHtmlParser(projet.details)}
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel value="2">
                                    <div className="flex justify-center">
                                        <div className="w-full space-y-16" style={{maxWidth:1000}}>
                                            <div className="space-y-10">
                                                <div className="w-full border-b border-t text-xl font-bold">
                                                    Critères de presélection
                                                </div>
                                                <div className="space-y-5">
                                                    {criteres.map((c)=>(
                                                        c.type_critere.libelle==="preselection"
                                                        &&
                                                        <div key={c.id} className="flex justify-between items-end">
                                                            <div>{c.description}</div>
                                                            {
                                                                c.genre_critere.libelle==="note"&&
                                                                <div>
                                                                    <TextField onChange={(e)=>handleValidationChange(e,c.id)} type={"number"} inputProps={{max:100,min:1}} variant="standard" label={"Entrez la note"} style={{minWidth:100}}/>
                                                                </div>
                                                            }
                                                            {c.genre_critere.libelle==="choix"&&
                                                            <div>
                                                                <span>Non</span>
                                                                <Switch onChange={(e)=>switchValidationChange(e,c.id)}/>
                                                                <span>Oui</span>
                                                            </div>
                                                            }
                                                        </div>
                                                    ))}

                                                </div>
                                            </div>
                                            <div className="space-y-10">
                                                <div className="w-full border-b border-t text-xl font-bold">
                                                    Critères de sélection
                                                </div>
                                                <div className="space-y-5">
                                                    {criteres.map((c)=>(
                                                        c.type_critere.libelle==="selection"
                                                        &&
                                                        <div key={c.id} className="flex justify-between items-end">
                                                            <div>{c.description}</div>
                                                            {c.genre_critere.libelle==="note"&&
                                                            <div>
                                                                <TextField onChange={(e)=>handleValidationChange(e,c.id)} type={"number"} inputProps={{max:100,min:1}} variant="standard" label={"Entrez la note"} style={{minWidth:100}}/>
                                                            </div>
                                                            }
                                                            {c.genre_critere.libelle==="choix"&&
                                                            <div>
                                                                <span>Non</span>
                                                                <Switch onChange={(e)=>switchValidationChange(e,c.id)}/>
                                                                <span>Oui</span>
                                                            </div>
                                                            }
                                                        </div>
                                                    ))}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                            </TabContext>
                        </Box>

                    </div>
                </div>
            </form>

        </Panel>
    );
}

export default Show;
