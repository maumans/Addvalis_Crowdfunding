import React, {useEffect, useState} from 'react';

//////////
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Authenticated from "@/Layouts/Authenticated";
import {Inertia} from "@inertiajs/inertia";
import ShowMoreText from "react-show-more-text";
import {capitalize} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

/////////


function Show(props) {
    const [secteur,setSecteur]=useState({});

    useEffect(()=>{
        setSecteur(props.secteur);
    },[props])

    function onLike(p) {
        props.auth.user?Inertia.visit(route('likes.liker',[props.auth.user?.id,p?.id]),{preserveScroll:true,preserveState:true}):confirm("connectez-vous avant de liker")&& Inertia.visit(route('login'))
    }

    function onEnregistre(p) {
        props.auth.user?Inertia.visit(route('save.enregistrer',[props.auth.user?.id,p?.id]),{preserveScroll:true,preserveState:true}):confirm("connectez-vous avant d'enregister")&& Inertia.visit(route('login'))
    }

    function soutenir(e, p) {
        e.preventDefault()
        Inertia.get(route("projet.show",p.id))
    }

    return (
       <Authenticated
           auth={props.auth}
           errors={props.errors}>
           <div className={"font"}>
               <div>
                   <div className={"flex justify-center"}>
                       <div className={"grid md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-4 md:w-8/10 sm:w-10/12 xs:w-11/12"}>
                           <div className={"text-4xl font-bold my-10 capitalize md:col-span-3 sm:col-span-2 xs:col-span-1"}>
                               {secteur.libelle}
                           </div>
                           {
                               props.secteur.projets.map((p,i)=>(
                                   <div key={p.id} data-aos={"fade-up"} data-aos-once={true} data-aos-duration={500} className={"flex flex-col overflow-hidden"} style={{height:500,boxShadow:"2px 5px 5px gray"}}>
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
                                       <div className={"mt-auto ml-2 mb-2"}>
                                           <button onClick={(e)=>soutenir(e,p)} className={"text-white bg-indigo-600 hover:bg-indigo-800 transition duration-500 rounded p-2"}>
                                               Consulter le projet
                                           </button>
                                       </div>
                                   </div>
                               ))
                           }
                       </div>

                   </div>
               </div>
           </div>
       </Authenticated>
    );
}

export default Show;
