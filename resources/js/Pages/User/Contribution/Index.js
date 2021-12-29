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

import ShowMoreText from "react-show-more-text";

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

    function onLike(p) {
        props.auth.user?Inertia.visit(route('likes.liker',[props.auth.user?.id,p?.id]),{preserveScroll:true,preserveState:true}):confirm("connectez-vous avant de liker")&& Inertia.visit(route('login'))
    }

    function onEnregistre(p) {
        props.auth.user?Inertia.visit(route('save.enregistrer',[props.auth.user?.id,p?.id]),{preserveScroll:true,preserveState:true}):confirm("connectez-vous avant d'enregister")&& Inertia.visit(route('login'))
    }

    function soutenir(e, p) {
        e.preventDefault()
        Inertia.get(route("projet.show", p.id))
    }

    return (
        <Authenticated
            auth={props.auth}
            active={"contributions"}
        >
            <div className={"flex justify-center"}>
                <div className={"grid md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-4 md:w-8/10 sm:w-10/12 xs:w-8/12 font"}>
                    <div data-aos={"zoom-in"} className={"my-8 md:col-span-3 sm:col-span-2 xs:col-span-1 font md:text-3xl text-2xl projetfont border-indigo-600 border-b-2 border-l-2"} style={{width:"fit-content"}}>
                        <div className={"m-2 p-1 bg-indigo-600 text-white"}>
                            Mes contributions
                        </div>
                    </div>
                    {
                        projets.map((p,i)=>(
                            <div key={p.id} data-aos={"fade-up"} data-aos-once={true} data-aos-duration={500} className={"flex flex-col overflow-hidden"} style={{height:550,boxShadow:"2px 5px 5px gray"}}>
                                <div className={"overflow-hidden"}>
                                    <img className={"transform hover:scale-110 transition duration-300 ease-in"} src={p.image} alt="" style={{height:250,width:"100%",objectFit:"cover"}}/>
                                </div>
                                <div className={"text-xl p-2"}>
                                    {p.titre}
                                </div>
                                <div className={"p-2"} style={{height:55}}>
                                    <ShowMoreText
                                        more=""
                                        lines={3}
                                        className={"w-full"}
                                    >

                                        {capitalize(p.description.toLowerCase())}
                                    </ShowMoreText>
                                </div>
                                <div className={"mt-auto flex justify-between border-b border-t p-2"}>
                                    <div>
                                        <IconButton onClick={()=> onLike(p)}>
                                            <FavoriteIcon className={p.like?"text-indigo-600":""}/>
                                        </IconButton>
                                        {p.likeurs.length}
                                    </div>
                                    <button onClick={()=> onEnregistre(p)} className={p.enregistre?"text-indigo-600 border border-indigo-600 rounded px-2 flex items-center":"border px-2 flex items-center"}>
                                        <BookmarkBorderIcon className={p.enregistre?"text-indigo-600":""}/>
                                        {
                                            p.enregistre?"Enregistré":"Rappel"
                                        }
                                    </button>
                                </div>
                                <div className={"mt-auto ml-2 mb-2 space-y-2"}>
                                    <button onClick={()=>Inertia.delete(route("user.contribution.destroy",[props.auth.user.id,p?.id]))} className={"mr-5 text-white bg-red-600 hover:bg-red-800 transition duration-500 rounded p-2"} href={route("projet.show",p.id)}>
                                        Annuler
                                    </button>
                                    <button onClick={(e)=>soutenir(e,p)} className={"text-white bg-indigo-600 hover:bg-indigo-800 transition duration-500 rounded p-2"}>
                                        Voir plus
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
