import React, {useEffect} from 'react';
import Panel from "@/Layouts/Admin/Panel";
import Swal from "sweetalert2";
import {Inertia} from "@inertiajs/inertia";

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

                    <div className={"space-y-5"}>
                        {
                            programmes?
                                programmes.map((p)=>(
                                    <div key={p.id} className={"w-full group border relative overflow-hidden"}>

                                        <div className={"bg-black bg-opacity-80 transform -translate-y-full absolute w-full h-full group-hover:translate-y-0 transition duration-500 flex items-center justify-center "}>
                                            <button onClick={(e)=>handleClick(e,p.id)} className={"border-2 border-white text-white hover:bg-indigo-600 hover:border-0 hover:text-white transition duration-500 rounded p-2"}>
                                                Consulter le programme
                                            </button>
                                        </div>
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
