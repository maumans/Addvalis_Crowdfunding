import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import Authenticated from "@/Layouts/Authenticated";
import ReactHtmlParser from "react-html-parser";
//import { keyframes } from "styled-components";
import AOS from "aos"
import {TextField} from "@mui/material"
import {withStyles} from "@mui/styles";
import {useForm} from "@inertiajs/inertia-react";
import Swal from 'sweetalert2';
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import {Inertia} from "@inertiajs/inertia";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Avatar from "@mui/material/Avatar";
import {minHeight} from "@mui/system";


const TextFieldCustom = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'white',
        },
        '& label': {
            color: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'yellow',
            },
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: 'white',
            color: 'white',
        },
        '& .MuiInput-underline': {
            borderBottomColor: 'white',
            color: 'white',
        },

    },
})(TextField);

function Show({auth,errors,projet,createur,contributeurs,contributeur,pourcentage,montantFinance,success}) {
    const [voirSoutien,setVoirSoutien]=useState(false)

    const {data,setData,post}=useForm({
        montant:contributeur?contributeur.pivot.montant:0,
        projetId:projet.id
    })

    useLayoutEffect(()=>{
        success && Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: success,
            showConfirmButton: false,
            timer: 2000
        })
    },[projet])

    //var taille = keyframes`from {width: 0%;}to {width: 50%;}`

    useEffect(() => {
        AOS.refresh()
    },[voirSoutien])


    const myref=useRef(null);
    function handleSoutienClick()
    {
        setVoirSoutien(voirSoutien===false)
        setSoutienContributeurs(false)
        !voirSoutien && myref.current.scrollIntoView({behavior: 'smooth',block: 'center'})


    }

    function numberFormat(number)
    {
        return new Intl.NumberFormat('de-DE').format(number)
    }


    function handleSubmit(e)
    {
        e.preventDefault()

        post("/projet/contribuer",{preserveScroll:true})
    }
    function capitalize(str) {
        const arr = str.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        return arr.join(" ");
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function onEnregistre(p) {
        auth.user?Inertia.visit(route('save.enregistrer',[auth.user?.id,p?.id]),{preserveScroll:true,preserveState:true}):confirm("connectez-vous avant d'enregister")&& Inertia.visit(route('login'))
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [value, setValue] = useState('1');
    const [soutienContributeurs, setSoutienContributeurs] = useState(false);


    return (
        <Authenticated
            auth={auth}
            errors={errors}
        >
            <div className={"m-5 flex flex-col md:items-center"}>
                <div className="font text-center mt-20 mb-5">
                    <div className={"text-3xl font-bold"}>
                        {projet.titre.toUpperCase()}
                    </div>
                    <div>
                        {capitalizeFirstLetter(projet.description)}
                    </div>
                </div>
                <div className={"flex md:flex-row flex-col md:space-x-5 space-y-5 md:space-y-0 md:max-h-96"} style={{maxWidth:1000}}>
                    <img src={projet.image} className="flex-1 md:w-8/12"  style={{minHeight:300,objectFit:"cover"}}/>
                    <div className={"xs:mr-0 flex md:w-6/12 h-full flex-col items-between justify-between"}>
                       <div className={"flex w-full"}>
                           <div className={"border border-indigo-600 w-full rounded overflow-hidden"}>
                               <div className={"h-full bg-indigo-600"} style={{width:`${Math.round(pourcentage)}%`}}>

                               </div>
                           </div>
                           {Math.round(pourcentage)}%
                       </div>
                        <div>
                            <div className="text-indigo-600 text-2xl font font-bold">
                                {numberFormat(montantFinance)} FG
                            </div>
                            <span>
                                financé sur {numberFormat(projet.montantRechercher)} FG
                            </span>
                        </div>
                        <div>
                            <div className="text-indigo-600 text-2xl font font-bold">
                                {numberFormat(projet.montantInitial)} FG
                            </div>
                            <span>
                                Apport initial
                            </span>
                        </div>
                        <div>
                            <div className={"text-2xl text-indigo-600 font-bold font"}>
                                {contributeurs}
                            </div>
                            <div>
                                {contributeurs>1?" Contributeurs":" Contributeur"}
                            </div>
                        </div>
                        <div>
                            <div className={"text-2xl text-indigo-600 font-bold font"}>
                                {projet.joursRestant}
                            </div>
                            <div>
                                {projet.joursRestant>1?"jours restants":"jour restant"}
                            </div>
                        </div>
                        <div  className={"w-full flex justify-center mt-auto"}>
                            <button onClick={handleSoutienClick} className={"w-full border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition duration-500 rounded py-2 px-10"} >
                                {voirSoutien?"Fermer":"Soutenir le projet"}
                            </button>
                        </div>
                        <div className={"mt-5"}>
                            <button onClick={()=> onEnregistre(projet)} className={projet.enregistre?"text-green-600 border border-green-600 rounded p-2 flex items-center":"border p-2 flex items-center"}>
                                <BookmarkBorderIcon className={projet.enregistre?"text-green-600":""}/>
                                {
                                    projet.enregistre?"Enregistré":"Rappel"
                                }
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <div ref={myref}  className={voirSoutien||soutienContributeurs?"flex justify-center":""} >
                <div hidden={!voirSoutien && !soutienContributeurs} data-aos={voirSoutien || soutienContributeurs?"fade-up":"fade-down"} data-aos-duration={1000} className={"h-96 w-full p-10 border my-10 bg-indigo-600"}>
                    <div className={"w-80 text-white font text-lg"}>
                        Votre contribution n'est prélevée que si l'objectif de financement du projet est atteint avant la date limite.
                    </div>

                    <div className={"my-10 flex justify-center"}>
                        <form onSubmit={handleSubmit} className={"flex flex-col space-y-5"}>
                            <TextFieldCustom
                                value={data.montant}
                                onChange={(e)=>setData("montant",e.target.value)}
                                label={"montant"}
                                variant={"standard"}
                            />
                            <div className={"text-red-600"}>{errors?.montant }</div>

                            <button type={"submit"} className={"text-white border border-white p-2 rounded hover:text-indigo-600 hover:bg-white"}>
                                financer
                            </button>

                        </form>
                    </div>
                    <div>
                        <div className={"text-white"}>
                            Vous recevrez <span className={"text-xl"}>{(data.montant*100/(projet.montantInitial+projet.montantRechercher)).toFixed(2)}</span> % des parts en cas de bénéfices
                        </div>

                    </div>
                </div>
            </div>

            <div className={"flex md:flex-row flex-col md:justify-around md:space-y-0 space-y-5 px-5 my-20 py-5 md:space-x-5 space-x-0 items-center font-bold crimson text-lg"}>
                <div data-aos={"fade-up"} data-aos-once={true} data-aos-duration={500} data-aos-delay={400} style={{maxHeight:600}} className={"flex md:flex-col md:space-x-0 space-x-5"}>
                    <img src={"/images/arbreargent.jpg"} className={"md:w-full w-6/12"} style={{height:200,objectFit:"cover"}} alt=""/>
                    <div className="md:w-full w-6/12">
                        Addvalis crowfunding réunit le créateur et ses contributeurs autour du financement d'un projet.
                    </div>
                </div>
                <div data-aos={"fade-up"} data-aos-once={true} data-aos-duration={500} data-aos-delay={800}  style={{maxHeight:600}} className={"flex md:flex-col md:space-x-0 space-x-5"}>
                    <img src={"/images/bourse.jpg"} className={"md:w-full w-6/12"} style={{height:200,objectFit:"cover"}} alt=""/>
                    <div className="md:w-full w-6/12">
                        Les bénéfices ne sont pas garanties, mais le créateur s'engage à informer ses contributeurs régulièrement.
                    </div>
                </div>
                <div data-aos={"fade-up"} data-aos-once={true} data-aos-duration={500} data-aos-delay={1200} style={{maxHeight:600}} className={"flex md:flex-col md:space-x-0 space-x-5"}>
                    <img src={"/images/paiement.jpg"} className={"md:w-full w-6/12"} style={{height:200,objectFit:"cover"}}  alt=""/>
                    <div className="md:w-full w-6/12">
                        Votre contribution n'est prélevée que si l'objectif de financement du projet est atteint avant la date limite.
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <Box sx={{ width: '100%', typography: 'body1' }} centered>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                                <Tab label="Details" value="1" />
                                <Tab label="Contributeurs" value="2" />
                                <Tab label="Avis" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                           <div className={"w-full flex justify-center"}  style={{minHeight:500}}>
                               <div style={{maxWidth:800}} className={"flex flex-col justify-center"}>
                                   {ReactHtmlParser(projet.details)}
                               </div>
                           </div>
                        </TabPanel>
                        <TabPanel value="2">

                                <div style={{minHeight:500}}>
                                    {
                                        projet.contributeurs.map((c)=>(
                                        <div key={c.id} className={"flex justify-between w-full border-b border-indigo-500 p-5"}>
                                            <div>
                                                <Avatar sx={{backgroundColor:"black"}}>
                                                    M
                                                </Avatar>
                                                <div>
                                                    <span>{c.name}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <span>Montant financé </span>
                                                <div className={"p-2 text-white text-center rounded bg-black"}>
                                                    {numberFormat(c.pivot.montant)} FG
                                                </div>
                                            </div>
                                        </div>
                                        ))
                                    }
                                    {
                                        projet.contributeurs.length ===0 &&
                                            <div className={"flex flex-col justify-center items-center space-y-5"}>
                                                <div>
                                                    Aucun contributeur pour le moment
                                                </div>
                                                <button onClick={()=>{
                                                    setSoutienContributeurs(true)
                                                    myref.current.scrollIntoView({behavior: 'smooth',block: 'center'})
                                                }} className={"w-max border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition duration-500 rounded py-2 px-10"} >
                                                    Soutenir le projet
                                                </button>
                                            </div>

                                    }
                                </div>

                        </TabPanel>
                        <TabPanel value="3">Avis</TabPanel>
                    </TabContext>
                </Box>

            </div>
        </Authenticated>
    );
}

export default Show;
