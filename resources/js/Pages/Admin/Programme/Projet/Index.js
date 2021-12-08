import React from 'react';
import Panel from "@/Layouts/Admin/Panel";
import {minHeight} from "@mui/system";
import {Inertia} from "@inertiajs/inertia";

function Index({auth,programme,projets,success}) {
    return (
        <Panel
            auth={auth}
            success={success}
            active={"programme"}
            sousActive={"voirProgramme"}
        >
            <div className="font p-5">
                <div className={"md:mx-5 mb-10 space-y-5"}>
                    <div className={"text-3xl font-bold uppercase"}>
                        {programme.titre}
                    </div>
                    <div className={"text-xl"}>
                        {programme.description}
                    </div>
                </div>

                <div className={"w-full flex"}>
                   <div className={"w-full md:mx-5 grid gap-5"}>
                       {projets.map((p)=>(
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
