import React, {useEffect, useState} from 'react';
import {Head, Link} from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import img1 from "../img/4.jpg"
import TouchApp from "@mui/icons-material/TouchApp"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"
import AttachMoney from "@mui/icons-material/AttachMoney"
import AccountBalance from "@mui/icons-material/AccountBalance"
import DoneAll from "@mui/icons-material/DoneAll"


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

    },[])
    useEffect(()=>{
        AOS.refresh()
    },[voirPlus])

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Accueil" />
            <Swiper className={"my-3"} slidesPerView={5} autoplay={{delay:5000}} navigation={true}>
                {secteurs.map((s)=>(
                    <SwiperSlide key={s.id} >
                        <div style={{width:'fit-content'}}><Link className={"font-bold"} href={route("secteur.show",s.id)} ><p style={{width:'fit-content'}} className={"transform hover:scale-125  transition duration-10 hover:text-indigo-600"}>{s.libelle}</p></Link></div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className={"relative w-full font"}>
                <img src="/images/4.jpg" alt="" className={"w-full"} style={{maxHeight:"100vh"}} />
                <div className={"bg-black w-full h-full absolute top-0 opacity-50"}>

                </div>
                <div className={"absolute top-0 w-full h-full flex flex-col items-center"}>
                   <div className={"mt-8 "}>
                       <p className={"md:text-5xl text-2xl text-white p-2"}>
                           Donnons de l'avenir à vos projets
                       </p>
                   </div>
                    <div className={"my-10 flex md:flex-row flex-col md:space-x-2 md:space-y-0 space-y-10"}>
                        <Link href={route("user.projet.create",props.auth.user?.id||0)}>
                           <button className={"btn hover:bg-opacity-70 md:text-lg sm:text-sm border bg-black hover:bg-indigo-600 text-white p-2 rounded duration-500 font-bold"}>
                               <TouchApp/>
                               Demarrer un projet
                           </button>
                        </Link>
                        <Link href={"/"}>
                            <button className={"btn hover:bg-opacity-70 md:text-lg sm:text-sm border bg-black hover:bg-indigo-600 text-white p-2 rounded duration-500 font-bold"}>
                                <MonetizationOnIcon/>
                                Soutenir un projet
                            </button>
                        </Link>

                    </div>
                    <div className={"flex justify-center md:mt-16 mt-2 text-white space-x-3 hidden md:flex "}>
                        <Link href={"/"} className={"border-indigo-600  border-2 p-1 ml-10 w-60 md:text-xl bg-opacity-70 duration-500 hover:transform hover:scale-110"}>
                            <div className={"bg-indigo-600 flex flex-col justify-between text-center h-full w-full p-4 bg-opacity-70"}>
                                <div>
                                    <p>Postez vos projets en besoins de financement</p>
                                </div>
                                <div>
                                    <AccountBalance fontSize="large"/>
                                </div>
                            </div>
                        </Link>
                        <Link href={"/"} className={"border-indigo-600 border-2 p-1 w-60 md:text-xl duration-500 hover:transform hover:scale-110"}>
                            <div className={"bg-indigo-600 flex flex-col justify-between text-center h-full w-full p-4 bg-opacity-70 "}>
                                <div>
                                    <p>Financez des projets et benefiez des retours sur investissement</p>
                                </div>
                                <div>
                                    <AttachMoney fontSize="large"></AttachMoney>
                                </div>
                            </div>
                        </Link>
                    </div>

                </div>
            </div>

            <div>
                <div className={"md:text-4xl sm:text-3xl text-2xl font-bold my-10 text-center font"}>
                    PROJETS EN COURS
                </div>
                <div className={"flex justify-center"}>

                    <div className={"grid md:grid-cols-3 gap-4 mx-10 mb-20"}>
                        {
                            projets.map((p,i)=>(
                                <Link key={p.id} href={route("projet.show",p.id)}>
                                    <div data-aos={"zoom-in"} data-aos-duration={500} className={i>=voirPlus?"":"flex flex-col"} style={{maxWidth:350,height:400,boxShadow:"2px 5px 5px gray"}} hidden={i>=voirPlus}>
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
                                            <IconButton>
                                                <BookmarkBorderIcon/>
                                            </IconButton>
                                        </div>
                                        <div className={"mt-auto ml-2 mb-2"}>
                                            <button className={"text-white bg-indigo-600 hover:bg-indigo-800 transition duration-500 rounded p-2"}>
                                                Soutenir le projet
                                            </button>
                                        </div>
                                    </div>
                                </Link>
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
