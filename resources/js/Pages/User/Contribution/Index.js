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
        <Authenticated auth={props.auth}>
           <div className={"mt-20"}>
               <div data-aos={"zoom-in"} className={"self-start my-8 ml-10 md:text-3xl text-xl projetfont border-indigo-600 border-b-2 border-l-2"} style={{width:"fit-content"}}>
                   <div className={"m-2 p-1 bg-indigo-600 text-white"}>
                       MES CONTRIBUTIONS
                   </div>
               </div>
           </div>
            <div className={"flex"}>

                <div className={"projetfont grid md:grid-cols-3 sm:grid-cols-2  grid-cols-1 gap-2 mx-10 mb-10"}>
                    {
                        projets.map((p,i)=>(

                                <div key={p.id} data-aos={"zoom-in"} data-aos-duration={500} className={"flex flex-col"} style={{maxWidth:350,height:400,boxShadow:"2px 5px 5px gray"}}>
                                    <div className={"flex space-x-2 bg-black p-2"}>
                                        <Avatar sx={{ bgcolor: red[600] }} className={"border-2 bg-indigo-600"}>
                                            M
                                        </Avatar>
                                        <div>
                                            <div className={"font text-white"}>{p.titre}</div>
                                            <span className={"text-white"}>{p.created_at.split("T")[0]}</span>
                                        </div>
                                    </div>
                                    <div className={"overflow-hidden"}>
                                        <img className={"transform hover:scale-110 transition duration-300 ease-in"} src={p.image} alt="" style={{height:200,width:"100%",objectFit:"cover"}}/>
                                    </div>
                                    <div className={"p-2"}>
                                        {capitalize(p.description.toLowerCase())}
                                    </div>
                                    <div className={"mt-auto"}>
                                        <IconButton>
                                            <FavoriteIcon />
                                        </IconButton>
                                    </div>
                                    <div className={"mt-auto ml-2 mb-2"}>
                                        <button onClick={()=>Inertia.delete(route("user.contribution.destroy",[props.auth.user.id,p?.id]))} className={"mr-5 text-white bg-indigo-600 hover:bg-indigo-800 transition duration-500 rounded p-2"} href={route("projet.show",p.id)}>
                                           Annuler
                                        </button>
                                        <Link className={"text-white bg-blue-600 hover:bg-blue-800 transition duration-500 rounded p-2"} href={route("projet.show",p.id)}>
                                            voir plus
                                        </Link>
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
