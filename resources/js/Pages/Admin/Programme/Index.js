import React, {useEffect, useState} from 'react';
import Panel from "@/Layouts/Admin/Panel";
import Swal from "sweetalert2";
import {Inertia} from "@inertiajs/inertia";

import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Index({auth,success,programmes}) {

    useEffect(()=>{
        success && Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: success,
            showConfirmButton: false,
            timer: 2000
        })
    },[success])

    function handleClick(e,id) {
        Inertia.get(route("admin.programme.show",[auth.user.id,id]))
    }

    return (
        <Panel
            auth={auth}
            success={success}
            active={"programme"}
            sousActive={"listeProgrammes"}
        >
            <div className={"justify-center flex p-5"}>
                <div className={"grid space-y-10 md:w-7/12 w-full"}>
                    <div className={"font-bold text-xl"}>
                        Liste des programmes
                    </div>

                    <div className={"space-y-10"}>
                        {
                            programmes?
                                programmes.map((p)=>(
                                    <div key={p.id} className={"w-full group border relative overflow-hidden shadow-lg"}>

                                        <div className={"bg-indigo-600 text-white p-2 font-bold uppercase"}>
                                            {p.titre}
                                        </div>
                                        <div className={"p-2 space-y-5"}>

                                            <div>
                                                { p.description}
                                            </div>
                                            <div className={"font-bold text-sm bg-black text-white w-max p-1"}>
                                                Du {p.dateDebut} au {p.dateFin}
                                            </div>

                                           <div className={"flex flex-wrap gap-2 py-2 border-t"}>
                                               <button onClick={(e)=>handleClick(e,p.id)} className={"border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:border-0 hover:text-white transition duration-500 rounded p-1"}>
                                                   <VisibilityIcon/> details
                                               </button>
                                               <button onClick={(e)=>Inertia.get(route("admin.programme.edit",[auth.user.id,p.id]))} className={"border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:border-0 hover:text-white transition duration-500 rounded p-1"}>
                                                  <EditIcon/> modifier
                                               </button>
                                               <button onClick={()=>Inertia.get(route("admin.programme.projet.index",[auth.user.id,p.id]))} className={"border-2 border-indigo-800 text-indigo-800 hover:bg-indigo-800 hover:text-white transition duration-500 rounded p-1"}>
                                                   <VisibilityIcon/> les projets
                                               </button>

                                               <button onClick={()=>confirm("Voulez-vous supprimer ce programme?")&&Inertia.delete(route("admin.programme.destroy",[auth.user.id,p.id]))} className={"border-2 border-red-600 text-red-600 hover:bg-red-600 hover:border-0 hover:white hover:bg-red-600 hover:border-0 hover:text-white transition duration-500 rounded p-1"}>
                                                   <DeleteIcon/> supprimer
                                               </button>
                                           </div>
                                        </div>
                                    </div>
                                    ) ):
                                ""
                        }
                    </div>
                </div>
           </div>

        </Panel>

    );
}

export default Index;
