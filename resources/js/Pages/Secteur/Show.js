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

/////////


function Show(props) {
    const [secteur,setSecteur]=useState({});

    useEffect(()=>{
        setSecteur(props.secteur);
    },[])

    function onLike(p) {
        Inertia.visit(route('likes.liker',[props.auth.user.id,p?.id]),{preserveScroll:true,preserveState:true})
    }

    function soutenir(e, p) {

        p.user_id===props.auth.user.id?alert("Vous ne pouvez pas soutenir un projet que vous avez créé"):
            Inertia.get(route("projet.show",p.id))
    }

    return (
       <Authenticated
           auth={props.auth}
           errors={props.errors}>
           <div>
               <div>
                   <div className={"text-4xl font-bold my-10 text-center"}>
                       {secteur.libelle}
                   </div>
                   <div className={"flex justify-center"}>
                       <div className={"grid md:grid-cols-3 gap-4 mx-10"}>
                           {
                               props.secteur.projets.map((p)=>(
                                   <Card  data-aos={"zoom-in"} data-aos-duration={500}  sx={{ maxWidth: 345 }} key={p.id} className={"my-10"}>
                                       <CardHeader
                                           className="bg-indigo-600 text-white bg-transparent"
                                           avatar={
                                               <Avatar sx={{ bgcolor: red[600] }} className={"border-2"} aria-label="recipe">
                                                   M
                                               </Avatar>
                                           }
                                           action={
                                               <IconButton aria-label="settings">
                                                   <MoreVertIcon className={"text-white"} />
                                               </IconButton>
                                           }
                                           title={(<div className={"latofont"}>{p.titre}</div>)}
                                           subheader={<span className={"text-white"}>{p.created_at.split("T")[0]}</span>}
                                       />
                                       <CardMedia
                                           className={"transform hover:scale-110 transition duration-300 ease-in"}
                                           component="img"
                                           height="194"
                                           image={p.image}
                                       />
                                       <CardContent>
                                           <Typography variant="body2">
                                               {p.description}
                                           </Typography>
                                       </CardContent>
                                       <CardActions disableSpacing>
                                           <IconButton onClick={()=> onLike(p)}>
                                               <FavoriteIcon className={p.like?"text-indigo-600":""}/>
                                           </IconButton>
                                           <div>
                                               { p.likeurs.length}
                                           </div>
                                           <button onClick={(e)=> soutenir(e, p)} className={"ml-auto text-white bg-indigo-600 rounded p-2"}>
                                               Soutenir le projet
                                           </button>

                                       </CardActions>
                                   </Card>
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
