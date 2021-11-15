import React, {useEffect, useState,useLayoutEffect} from 'react';
import Authenticated from "@/Layouts/Authenticated";
import {Link} from "@inertiajs/inertia-react";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import {capitalize} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import {Inertia} from "@inertiajs/inertia";
import Swal from "sweetalert2";

function Index(props) {
    const [projets,setProjets]=useState([]);

    useLayoutEffect(()=>{
        setProjets(props.projets);
    },[props.projets])

    useEffect(()=>{
        props.success && Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: props.success,
            showConfirmButton: false,
            timer: 2000
        })
    },[props.success])

    return (
        <Authenticated
            auth={props.auth}
            active={"contributions"}
        >
            <div className={"flex justify-center mt-20"}>

                <div className={"projetfont grid grid md:grid-cols-3 grid-cols-1 gap-4 mx-10 mb-20 w-auto"}>

                    <div data-aos={"zoom-in"} className={"my-8 md:col-span-3 font md:text-3xl text-2xl projetfont border-indigo-600 border-b-2 border-l-2"} style={{width:"fit-content"}}>
                        <div className={"m-2 p-1 bg-indigo-600 text-white"}>
                            Mes contributions
                        </div>
                    </div>
                    {
                        projets.map((p,i)=>(
                                <div key={p.id} data-aos={"zoom-in"} data-aos-duration={500} className={"flex flex-col"} style={{maxWidth:400,height:500,boxShadow:"2px 5px 5px gray"}}>
                                    <div className={"flex space-x-2 bg-black p-2"}>
                                        <div>
                                            <div className={"font text-white text-xl"}>{p.titre}</div>
                                            <span className={"text-white"}>{p.created_at.split("T")[0]}</span>
                                        </div>
                                    </div>
                                    <div className={"overflow-hidden"}>
                                        <img className={"transform hover:scale-110 transition duration-300 ease-in"} src={p.image} alt="" style={{height:200,width:"100%",objectFit:"cover"}}/>
                                    </div>
                                    <div className={"p-2"}>
                                        {capitalize(p.description.toLowerCase())}
                                    </div>
                                    <div className={"flex space-x-2 ml-5 py-2 mt-auto border-b border-t"}>
                                        <FavoriteIcon/>
                                        <div>
                                            {p.likeurs.length}
                                        </div>
                                    </div>
                                    <div className={"mt-auto ml-2 mb-2"}>
                                        <button onClick={()=>Inertia.delete(route("user.contribution.destroy",[props.auth.user.id,p?.id]))} className={"mr-5 text-white bg-indigo-600 hover:bg-indigo-800 transition duration-500 rounded p-2"} href={route("projet.show",p.id)}>
                                           Annuler
                                        </button>
                                        <button className={"text-white bg-blue-600 hover:bg-blue-800 transition duration-500 rounded p-2"} onClick={()=>Inertia.get(route("projet.show",p.id))}>
                                            voir plus
                                        </button>
                                    </div>
                                </div>

                        ))
                    }
                </div>
            </div>

        </Authenticated>
    );
}

export default Index;
