import React, {useEffect, useState} from 'react';
import Panel from "@/Layouts/Admin/Panel";
import Swal from "sweetalert2";
import ReactHtmlParser from "react-html-parser";
import {Inertia} from "@inertiajs/inertia";

function Show({auth,success,programme,criteres}) {

    useEffect(()=>{
        success && Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: success,
            showConfirmButton: false,
            timer: 2000
        })
    },[success,programme])

    return (
        <Panel
            auth={auth}
            success={success}
            active={"programme"}
            sousActive={"voirProgramme"}
        >
            <div className={"flex flex-col items-center font mb-10"}>
                <img src={programme.image} alt="" className={"w-full"} style={{maxHeight:300,objectFit:"cover"}}/>

                <div style={{maxWidth:1000}} className={"px-10"}>
                    <div className={"my-10"}>
                        <div className={"text-2xl font-bold uppercase"}>
                            {programme.titre}
                        </div>
                        <div className={"mt-5 capitalizeFirstLetter text-lg"}>
                            {programme.description}
                        </div>

                    </div>

                    <div className={"mt-5"}>
                        <div className={"flex md:flex-row flex-col mt-5 md:space-x-5"}>
                            <div className={"md:order-none order-2 mt-10 md:mt-0"} style={{maxWidth:800,minWidth:300}}>
                                {ReactHtmlParser(programme.details)}
                            </div>
                            <div className={"space-y-2 md:order-none order-1"} style={{maxWidth:400,minWidth:200}}>
                                <button onClick={()=>Inertia.get(route("admin.programme.projet.index",[auth.user.id,programme.id]))} className={"border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition duration-500 rounded p-1 my-5 md:w-full"}>
                                    Voir les projets soumis
                                </button>
                                <div className={" md:divide-y space-y-1"} style={{height:"fit-content"}}>
                                    <div className={"p-2 md:bg-indigo-600 md:text-white uppercase font-bold"}>
                                        Informations générales
                                    </div>
                                    <div className={"border-l-4 border-indigo-600 p-2"}>
                                       <span>
                                            <span className={"font-bold mr-2"}>
                                                Jours restants: </span>
                                           {programme.joursRestant}
                                       </span>
                                    </div>
                                    <div className={"border-l-4 border-indigo-600 p-2 bg-gray-100"}>
                                       <span>
                                            <span className={"font-bold mr-2"}>
                                            Regions concernées: </span>
                                           {programme.regions.length!==0 ? programme.regions.map((r,i)=>(

                                               (i!==0?",":"")+r.libelle

                                           )):"Toutes les regions"}
                                       </span>
                                    </div>
                                    <div className={"border-l-4 border-indigo-600 p-2"}>
                                       <span>
                                            <span className={"font-bold mr-2"}>
                                            Secteurs concernés: </span>
                                           {programme.secteurs.length!==0 ? programme.secteurs.map((s,i)=>(

                                               (i!==0?",":"")+s.libelle

                                           )):"Tous les secteurs"}
                                       </span>
                                    </div>
                                    <div className={"p-2 border-l-4 border-indigo-600 bg-gray-100"}>
                                        <span className={"space-x-2"}>
                                            <span className={"font-bold mr-2"}> Critères de preselection: </span>
                                            {criteres.length!==0 ? criteres.map((c)=> {
                                                return c.type_critere.libelle === "preselection" && <span className={"underline"}>{c.description} </span>

                                            }):"aucun"}
                                        </span>
                                    </div>
                                    <div className={"p-2 border-l-4 border-indigo-600"}>
                                        <span className={"space-x-2"}>
                                            <span className={"font-bold mr-2"}> Critères de selection: </span>
                                            {criteres.length!==0 ? criteres.map((c)=> {
                                                return c.type_critere.libelle === "selection" && <span className={"underline"}>{c.description } </span>

                                            }):"aucun"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>


        </Panel>
    );
}

export default Show;
