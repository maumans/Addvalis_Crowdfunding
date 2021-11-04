import React, {useEffect, useState} from 'react';
import {Head, Link} from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import img1 from "../img/4.jpg"
import TouchApp from "@mui/icons-material/TouchApp"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"
import AttachMoney from "@mui/icons-material/AttachMoney"
import AccountBalance from "@mui/icons-material/AccountBalance"


//SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import 'swiper/css/bundle';

//////////

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

/////////


// import Swiper core and required modules
import SwiperCore, {Navigation, Pagination,Autoplay} from 'swiper';
import {Inertia} from "@inertiajs/inertia";
import {maxWidth} from "@mui/system";
import {capitalize} from "@mui/material";
// install Swiper modules
SwiperCore.use([Pagination,Navigation,Autoplay]);
//SWIPER

import AOS from "aos"


function Accueil(props) {

    const [secteurs,setSecteurs]=useState([]);
    const [projets,setProjets]=useState([]);
    const [voirPlus,setVoirPlus]=useState(3)

    useEffect(()=>{
        setSecteurs(props.secteurs);
        setProjets(props.projets);
        console.log(props.projets);

    },[])
    useEffect(()=>{
        AOS.refresh()
    },[voirPlus])

    function onLike(p) {
        props.auth.user?Inertia.visit(route('likes.liker',[props.auth.user?.id,p?.id]),{preserveScroll:true,preserveState:true}):confirm("connectez-vous avant de liker")&& Inertia.visit(route('login'))

    }

    function onEnregistre(p) {
        props.auth.user?Inertia.visit(route('save.enregistrer',[props.auth.user?.id,p?.id]),{preserveScroll:true,preserveState:true}):confirm("connectez-vous avant d'enregister")&& Inertia.visit(route('login'))
    }

    function soutenir(e, p) {
        Inertia.get(route("projet.show",p.id))

    }



    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Accueil" />
            <Swiper hidden={true} className={"my-3 w-full"} slidesPerView={5} autoplay={{delay:5000}} navigation={true}>
                {secteurs.map((s)=>(
                    <SwiperSlide key={s.id}>
                        <div style={{width:'fit-content'}}><Link className={"font-bold"} href={route("secteur.show",s.id)} ><p style={{width:'fit-content'}} className={"transform hover:scale-125  transition duration-10 hover:text-indigo-600"}>{s.libelle}</p></Link></div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className={"relative w-full font flex justify-center"}>
                <img src="/images/5.jpg" alt="" className={"w-full"} style={{maxHeight:500,objectFit:"cover"}}  />
               <div className={"absolute z-10 h-full flex items-center text-center"}>
                   <div className={"space-y-5"}>
                       <p className={"text-white md:text-4xl text-2xl"}>
                           Les travaux créatifs révèlent un monde de possibilités.
                       </p>
                       <div className={"text-white md:text-xl"}>
                           Financez-les ici
                       </div>

                       <button onClick={()=>props.auth.user?Inertia.get(route('user.projet.create',props.auth.user.id)):Inertia.get(route('login'))} className={"md:p-4 p-2 md:text-xl text-sm rounded border border-white font-bold text-white hover:border-0 hover:bg-black hover:text-white transition duration-500"}>
                           demarrer un projet
                       </button>
                   </div>
               </div>
                <div className={"absolute top-0 w-full h-full flex flex-col items-center bg-black opacity-30"}>


                </div>
            </div>

           <div className={"flex w-full justify-center text-center"}>
               <div className={"md:w-8/12 w-10/12 md:flex md:space-x-5 my-32 md:space-y-0 space-y-5 font"}>
                   <img hidden={true} src="/images/1.jpg" className={"flex-1"} alt="" style={{objectFit:"contain",minWidth:300}} />
                   <div data-aos={"fade-up"} data-aos-duration={1000} className={"flex-1 md:text-xl text-lg font"}>
                       Un projet AddvCrowd, c'est bien plus qu'une collecte de fonds. Mobilisez toute une communauté autour de votre idée
                   </div>
                   <div data-aos={"fade-up"} data-aos-duration={1000} className={"flex-1 md:text-xl text-lg font"}>
                       Vous recherchez des solutions de financement pour vos projets ?
                       Nous pouvons vous aider en capital, en mobilisant une communauté d’investisseurs
                   </div>
                   <div data-aos={"fade-up"} data-aos-duration={1000} className={"flex-1 md:text-xl text-lg font"}>
                       AddvCrowd fait partie des plateformes qui offrent un espace de travail ouvert à ceux qui vous connaissent, qui aiment votre travail et qui vous soutiennent
                   </div>
               </div>
           </div>

            <div hidden={true} className={"w-full"}>
                <div className={"md:text-3xl sm:text-2xl text-xl font-bold my-10 text-center font"}>
                    COMMENT ÇA MARCHE ?
                </div>

            </div>

            <div>
                <div className={"md:text-3xl underline sm:text-2xl text-xl font-bold my-10 text-center font"}>
                    PROJETS EN COURS
                </div>
                <div className={"flex justify-center"}>

                    <div className={"grid md:grid-cols-3 grid-cols-1 gap-4 mx-10 mb-20 w-auto"}>
                        {
                            props?.projets.map((p,i)=>(
                                    <div key={p.id} data-aos={"zoom-in"} data-aos-once={true} data-aos-duration={500} className={i>=voirPlus?"":"flex flex-col"} style={{maxWidth:400,minWidth:"auto",height:450,boxShadow:"2px 5px 5px gray"}} hidden={i>=voirPlus}>
                                        <div className={"overflow-hidden"}>
                                            <img className={"transform hover:scale-110 transition duration-300 ease-in"} src={p.image} alt="" style={{height:200,width:"100%",objectFit:"cover"}}/>
                                        </div>
                                        <div className={"text-xl p-2"}>
                                            {p.titre}
                                        </div>
                                        <div className={"p-2"} style={{height:50}}>
                                            {capitalize(p.description.toLowerCase())}
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
                <div className={voirPlus<projets.length? "flex justify-center my-10":""} hidden={voirPlus>=projets.length}>
                    <button onClick={()=>setVoirPlus(voirPlus+3)} className={"border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition duration-500 rounded py-2 px-10 mb-10"} >
                        Voir plus
                    </button>
                </div>
                <div className={"w-full px-5 my-10 bg-black flex space-x-5 justify-center text-white items-center"} style={{height:400}}>
                    <div>
                        AddvCrowd réunit le créateur et ses contributeurs autour du financement d'un projet.
                    </div>
                    <div>
                        Les bénéfices ne sont pas garanties, mais le créateur s'engage à informer ses contributeurs régulièrement.
                    </div>
                    <div>
                        Votre contribution n'est prélevée que si l'objectif de financement du projet est atteint avant la date limite.
                    </div>

                </div>

            </div>

        </Authenticated>
    );
}

export default Accueil;
