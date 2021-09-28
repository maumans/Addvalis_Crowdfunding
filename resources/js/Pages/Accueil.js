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

/////////


// import Swiper core and required modules
import SwiperCore, {Navigation, Pagination,Autoplay} from 'swiper';
import {Inertia} from "@inertiajs/inertia";
// install Swiper modules
SwiperCore.use([Pagination,Navigation,Autoplay]);
//SWIPER


function Accueil(props) {

    const [secteurs,setSecteurs]=useState([]);
    const [projets,setProjets]=useState([]);

    useEffect(()=>{
        setSecteurs(props.secteurs);
        setProjets(props.projets);

    },[])


    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Accueil" />
            <Swiper className={"my-3"} slidesPerView={5} autoplay={{delay:5000}} zoom={true} navigation={true}>
                {secteurs.map((s)=>(
                    <SwiperSlide key={s.id}><div style={{width:'fit-content'}}><Link className={"font-bold"} href={route("secteur.show",s.id)} ><p style={{width:'fit-content'}} className={"transform hover:scale-125 transition duration-10 hover:text-indigo-600"}>{s.libelle}</p></Link></div></SwiperSlide>
                ))}
            </Swiper>

            <div className={"relative w-full"}>
                <div className={"h-full w-full"}>
                    <img src={img1} alt="" className={"w-full"} style={{maxHeight:"100vh"}} />
                </div>
                <div className={"bg-black w-full h-full absolute top-0 opacity-50"}>

                </div>
                <div className={"absolute top-0 w-full h-full flex flex-col items-center"}>
                   <div className={"mt-8 "}>
                       <p className={"md:text-5xl text-2xl text-white p-2"}>
                           Donnons de l'avenir à vos projets
                       </p>
                   </div>
                    <div className={"my-10 flex md:flex-row flex-col md:space-x-2 md:space-y-0 space-y-10"}>
                        <Link href={route("user.projet.create",props.auth.user.id)}>
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
                    <div className={" flex justify-center md:mt-16 mt-2 text-white space-x-3 hidden md:flex "}>
                        <Link href={"/"} className={"border-indigo-600  border-2 p-1 ml-10 w-60 md:text-xl font-semibold bg-opacity-70 duration-500 hover:transform hover:scale-110"}>
                            <div className={"bg-indigo-600 flex flex-col justify-between text-center h-full w-full p-4 bg-opacity-70"}>
                                <div>
                                    <p>Postez vos projets en besoins de financement</p>
                                </div>
                                <div>
                                    <AccountBalance fontSize="large"/>
                                </div>
                            </div>
                        </Link>
                        <Link href={"/"} className={"border-indigo-600 border-2 p-1 w-60 md:text-xl font-semibold duration-500 hover:transform hover:scale-110"}>
                            <div className={"bg-indigo-600 flex flex-col justify-between text-center h-full w-full p-4 bg-opacity-70 "}>
                                <div>
                                    <p>Financez des projets afin de beneficier des royalties suivant les conditions imposées</p>
                                </div>
                                <div>
                                    <AttachMoney fontSize="large"></AttachMoney>
                                </div>
                            </div>
                        </Link>
                        <Link href={"/"} className={"border-indigo-600 border-2 p-1 mr-10 w-60 md:text-xl font-semibold duration-500 hover:transform hover:scale-110"}>
                            <div className={"bg-indigo-600 flex flex-col justify-between text-center h-full w-full p-4 bg-opacity-70"}>

                                <div><p>Testez les possibilités d'investissements</p></div>
                                <div><DoneAll fontSize="large"/></div>
                            </div>
                        </Link>
                    </div>

                </div>
            </div>

            <div>
                <div className={"text-4xl font-bold my-10 text-center"}>
                    Projet en cours
                </div>
                <div className={"flex justify-center"}>

                    <div className={"grid md:grid-cols-3 gap-4 mx-10"}>

                        {
                            projets.map((p)=>(
                                <Card data-aos={"zoom-in"} data-aos-duration={500}  sx={{ maxWidth: 345 }} key={p.id} className={"my-10"}>
                                    <CardHeader
                                        className="bg-indigo-600 text-white bg-transparent"
                                        avatar={
                                            <Avatar sx={{ bgcolor: red[600] }} className={"border-2"} aria-label="recipe">
                                                M
                                            </Avatar>
                                        }
                                        action={
                                            <IconButton aria-label="settings">
                                                <MoreVertIcon />
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
                                       <IconButton aria-label="add to favorites">
                                           <FavoriteIcon />
                                       </IconButton>
                                       <IconButton aria-label="share">
                                           <ShareIcon />
                                       </IconButton>
                                        <button className={"ml-auto text-white bg-indigo-600 rounded p-2"}>
                                            Soutenir le projet
                                        </button>

                                    </CardActions>
                                </Card>
                            ))
                        }
                    </div>
                </div>
            </div>




        </Authenticated>
    );
}

export default Accueil;
