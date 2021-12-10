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
import {InputAdornment, Switch, TextField} from "@mui/material";

function Show({auth,success,projet,programme,criteres}) {

    const [critereValidation,setCritereValidation]=useState({})

    const [value, setValue] = useState('1');
    const [noteTotalePreselection, setNoteTotalePreselection] =useState(0);
    const [noteTotaleSelection, setNoteTotaleSelection] =useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(()=>{
        criteres.map((c)=> {
            setCritereValidation(critereValidation => ({
                ...critereValidation,
                [c.id]: c.genre_critere.libelle === "choix" ? c.pivot.choix : c.pivot.note,
            }))
        })
    },[projet])


    function numberFormat(number)
    {
        return new Intl.NumberFormat('de-DE').format(number)
    }

    function handleValidationChange(e, id) {
        setCritereValidation((critereValidation)=>({
            ...critereValidation,
            [id]:e.target.value,
        }))

    }

    function switchValidationChange(e, id) {
        setCritereValidation((critereValidation)=>({
            ...critereValidation,
            [id]:e.target.checked
        }))
    }


    useEffect(()=>{
        let sumPreselection = 0
        let sumSelection = 0
        for(const [key, val] of Object.entries(critereValidation))
        {
            criteres.filter((c)=>(c.id.toString()===key.toString() && c.type_critere.libelle==="preselection")).length===1 && (sumPreselection =sumPreselection+(val===null||val===""|| val===false?0:val===true?1:parseInt(val)))

            criteres.filter((c)=>(c.id.toString()===key.toString() && c.type_critere.libelle==="selection")).length===1 && (sumSelection =sumSelection+(val===null||val===""|| val===false?0:val===true?1:parseInt(val)))
        }
        setNoteTotalePreselection(sumPreselection)
        setNoteTotaleSelection(sumSelection)

    },[critereValidation])

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.patch(route("admin.programme.projet.update",[auth.user.id,programme.id,projet.id]),critereValidation,{preserveScroll:true})
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
                        <button type={"submit"} className={"border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition duration-500 rounded p-2"}>Enregistrer</button>
                    </div>
                    <div className={"flex p-5 space-x-5 w-full"} style={{paddingTop:80}}>
                        <img src={projet.image} className={"w-6/12 h-3/6 object-cover"} style={{minWidth:200,minHeight:200}} alt=""/>
                        <div className={"w-full"}>
                            <div className={"flex flex-col"}>
                                <div className={"font-bold md:text-2xl uppercase"}>
                                    {projet.titre}
                                </div>
                                <div className={"md:text-2xl"}>
                                    {projet.description}
                                </div>
                                <span className={"italic md:text-sm text-xs my-5"}>
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
                                                        <div key={c.id} className="grid grid-cols-2 items-end">
                                                            <div>{c.description}</div>
                                                            {
                                                                c.genre_critere.libelle==="note"&&
                                                                <div className="ml-auto">
                                                                    <TextField
                                                                        InputProps={{
                                                                            endAdornment: <InputAdornment position="end">/{c.notemax}</InputAdornment>,
                                                                        }}
                                                                        defaultValue={c.pivot.note} onChange={(e)=>handleValidationChange(e,c.id)} type={"number"} inputProps={{max:100,min:1}} variant="standard" label={"Entrez la note"} style={{minWidth:140}}/>
                                                                </div>
                                                            }
                                                            {c.genre_critere.libelle==="choix"&&
                                                            <div className="ml-auto">
                                                                <span>Non</span>
                                                                <Switch defaultChecked={c.pivot.choix===1} onChange={(e)=>switchValidationChange(e,c.id)}/>
                                                                <span>Oui</span>
                                                            </div>
                                                            }
                                                        </div>
                                                    ))}

                                                </div>
                                                <div className={"grid grid-cols-2 gap-4"}>
                                                    <div>
                                                        <span className={"font-bold"}>Note totale minimale de preselection:</span> {programme.noteMinPreselection}
                                                    </div>
                                                    <div className={"ml-auto"}>
                                                       <span className={"font-bold"}>Note totale:</span> {noteTotalePreselection}
                                                    </div>

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
                                                        <div key={c.id} className="grid grid-cols-2 items-end">
                                                            <div>{c.description}</div>
                                                            {c.genre_critere.libelle==="note"&&
                                                            <div className="ml-auto">
                                                                <TextField
                                                                    InputProps={{
                                                                        endAdornment: <InputAdornment position="end">/{c.notemax}</InputAdornment>,
                                                                    }}

                                                                    defaultValue={c.pivot.note} onChange={(e)=>handleValidationChange(e,c.id)} type={"number"} inputProps={{max:100,min:1}} variant="standard" label={"entrez la note"}  style={{minWidth:140}}/>
                                                            </div>
                                                            }
                                                            {c.genre_critere.libelle==="choix"&&
                                                            <div className="ml-auto">
                                                                <span>Non</span>
                                                                <Switch defaultChecked={c.pivot.choix===1} onChange={(e)=>switchValidationChange(e,c.id)}/>
                                                                <span>Oui</span>
                                                            </div>
                                                            }
                                                        </div>
                                                    ))}

                                                </div>
                                                <div className={"grid grid-cols-2 gap-4"}>
                                                    <div>
                                                        <span className={"font-bold"}>Note totale minimale de preselection:</span> {programme.noteMinSelection}
                                                    </div>
                                                    <div className={"ml-auto"}>
                                                        <span className={"font-bold"}>Note totale:</span> {noteTotaleSelection}
                                                    </div>

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
