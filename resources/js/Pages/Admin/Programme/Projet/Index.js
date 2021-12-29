import React, {useEffect, useState} from 'react';
import Panel from "@/Layouts/Admin/Panel";
import {minHeight} from "@mui/system";
import {Inertia} from "@inertiajs/inertia";
import {MenuItem, Select} from "@mui/material";

function Index({auth,programme,projets,success,page}) {
    const [projetsSt, setProjetsSt] = useState([]);
    const [recherche, setRecherche] = useState(0);

    const handleChange = (event) => {
        setRecherche(event.target.value);
    };

    useEffect(()=>{
        setProjetsSt(projets)
    },[])

    useEffect(()=>{
        switch(recherche)
        {
            case 1:
                setProjetsSt(projets.filter((p)=>(p.etape==="preselection")))
                break
            case 2:
                setProjetsSt(projets.filter((p)=>(p.etape==="selection")))
                break
            case 3:
                setProjetsSt(projets.filter((p)=>(p.etape==="valide")))
                break
            default:
                setProjetsSt(projets)
        }
    },[recherche])


    return (
        <Panel
            auth={auth}
            success={success}
            active={"programme"}
            sousActive={"voirProgramme"}
        >
            <div className="font p-5 h-full">
                <div className={"md:mx-5 mb-10 space-y-5"}>
                    <div className={"text-3xl font-bold uppercase"}>
                        {programme.titre}
                    </div>
                    <div className={"text-xl"}>
                        {programme.description}
                    </div>
                </div>

                {
                    projets.length ===0 &&
                    <div className={"flex mt-36 w-full justify-center items-center"}>
                        <div>
                            Aucun projet {page==="valide"?"validé":"soumis"} pour le moment
                        </div>
                    </div>
                }

                {
                    projets.length !==0 &&
                    <div className={"w-full flex space-x-5 my-5 items-center"}>
                        <div>
                            filtre:
                        </div>
                        <div>
                            <Select
                                value={recherche}
                                onChange={handleChange}
                            >
                                <MenuItem value={0}>Tous les projets</MenuItem>
                                <MenuItem value={1}>Preselection</MenuItem>
                                <MenuItem value={2}>Selection</MenuItem>
                                <MenuItem value={3}>validé</MenuItem>
                            </Select>
                        </div>
                    </div>
                }

                <div className={"w-full flex"}>
                   <div className={"w-full md:mx-5 grid gap-5"}>
                       {projetsSt.length>0 && projetsSt.map((p)=>(
                           <div className={"flex h-80 space-x-5"} key={p.id}>
                               <div className={"md:w-5/12 w-6/12"}>
                                   <img className={"w-full h-full"} style={{objectFit:"cover",minHeight:"100%"}} src={p.image}/>
                               </div>
                               <div className={"flex w-7/12 flex-col"}>
                                   <div className={"font-bold uppercase"}>
                                       {p.titre}
                                   </div>
                                   <div>
                                       {p.description}
                                   </div>
                                   <span className={"italic text-xs my-5"}>
                                       Pojet de: <span className={"capitalize font-bold"}> {p.user.name}</span>
                                   </span>
                                   <div className={"p-2 my-5 bg-black text-white w-max"}>
                                       {p.etape}
                                   </div>
                                   <div className={"mt-auto md:w-6/12 w-full"}>
                                       <button onClick={()=>Inertia.get(route("admin.programme.projet.show",[auth.user.id,programme.id,p.id]))} className={"bg-indigo-600 text-white hover:text-indigo-600 hover:border-indigo-600 border hover:bg-white p-2 w-full transition duration-500"}>
                                           Voir les details
                                       </button>
                                   </div>
                               </div>
                           </div>
                       ))}
                   </div>
                </div>

            </div>
        </Panel>
    );
}

export default Index;
