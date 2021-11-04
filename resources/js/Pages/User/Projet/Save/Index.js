import React from 'react';
import Authenticated from "@/Layouts/Authenticated";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import {capitalize} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import {Inertia} from "@inertiajs/inertia";

function Index(props) {

    function onLike(p) {
        props.auth.user?Inertia.visit(route('likes.liker',[props.auth.user?.id,p?.id]),{preserveScroll:true,preserveState:true}):confirm("connectez-vous avant de liker")&& Inertia.visit(route('login'))

    }

    function onEnregistre(p) {
        props.auth.user?Inertia.visit(route('save.enregistrer',[props.auth.user?.id,p?.id]),{preserveScroll:true,preserveState:true}):confirm("connectez-vous avant d'enregister")&& Inertia.visit(route('login'))
    }

    function soutenir(e, p) {
        props.auth.user?
            p.user_id===props.auth.user?.id?alert("Vous ne pouvez pas soutenir un projet que vous avez créé"):
                Inertia.get(route("projet.show",p.id))
            :confirm("connectez-vous avant de soutenir")&& Inertia.visit(route('login'))
    }
    return (
        <Authenticated
            auth={props.auth}
            active={"projets"}
        >
            <div className={"mt-20"}>
                <div className="md:ml-10 md:justify-start flex justify-center">
                    <div data-aos={"zoom-in"} className={"my-8 md:text-3xl text-2xl projetfont border-indigo-600 border-b-2 border-l-2"} style={{width:"fit-content"}}>
                        <div className={"m-2 p-1 bg-indigo-600 text-white"}>
                            Projets enregistrés
                        </div>
                    </div>
                </div>
            </div>
            <div className={"flex ml-10 xs:justify-center sm:justify-center"}>

                <div className={"grid md:grid-cols-4 grid-cols-1 gap-4 mb-20 w-auto"}>
                    {
                        props?.projets.map((p,i)=>(
                            <div key={p.id} data-aos={"zoom-in"} data-aos-once={true} data-aos-duration={500} className={"flex flex-col"} style={{maxWidth:400,minWidth:"auto",height:600,boxShadow:"2px 5px 5px gray"}}>
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
                                <div className={"mt-auto flex"}>
                                    <div className={"flex items-center space-x mr-4"}>
                                        <IconButton onClick={()=> onLike(p)}>
                                            <FavoriteIcon className={p.like?"text-indigo-600":""}/>
                                        </IconButton>
                                        <span>{p.likeurs.length}</span>
                                    </div>
                                    <IconButton onClick={()=> onEnregistre(p)}>
                                        <BookmarkBorderIcon className={p.enregistre?"text-indigo-600":""}/>
                                    </IconButton>
                                </div>
                                <div className="ml-2 mt-5">
                                    <div>{p.contributeurs_count} {p.contributeurs_count>1?"contributeurs":"contributeur"}</div>
                                </div>
                                <div className="ml-2 mt-2">
                                    {p.joursRestant} {p.joursRestant>1?"jours restants":"jour restant"}
                                </div>
                                <hr/>


                                <div className={"ml-2 mb-2 mt-2"}>
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-10/12">
                                            <div className={"border border-indigo-600 w-full rounded overflow-hidden my-2"}>
                                                <div className={"h-5 bg-indigo-600 taille"} style={{width:`${p.pourcentage}%`}}>

                                                </div>
                                            </div>
                                        </div>
                                        <span>
                                            {p.pourcentage} %
                                        </span>
                                    </div>
                                    <button onClick={(e)=>soutenir(e,p)} className={"text-white bg-indigo-600 hover:bg-indigo-800 transition duration-500 rounded p-2"}>
                                        Soutenir le projet
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
