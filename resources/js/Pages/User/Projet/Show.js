import React, {useEffect, useLayoutEffect, useState} from 'react';
import Authenticated from "@/Layouts/Authenticated";
import ReactHtmlParser from "react-html-parser";
//import { keyframes } from "styled-components";
import AOS from "aos"
import {TextField} from "@mui/material"
import {withStyles} from "@mui/styles";
import {useForm} from "@inertiajs/inertia-react";
import Swal from 'sweetalert2';
import Avatar from "@mui/material/Avatar";


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

function Show({auth,errors,projet,createur,contributeurs,pourcentage,montantFinance,success}) {
    console.log(success)
    const [voirSoutien,setVoirSoutien]=useState(false)
    const [joursRestant,setJoursRestant]=useState(0)

    const {data,setData,post}=useForm({
        montant:0,
        projetId:projet.id
    })

    //var taille = keyframes`from {width: 0%;}to {width: 50%;}`

    useEffect(() => {
        AOS.refresh()
    },[voirSoutien])

    useEffect(()=>{
        let difference= Math.abs(Date.parse(projet.dateFin)-Date.parse(projet.dateDebut));
        let days = difference/(1000 * 3600 * 24)
        setJoursRestant(days)
    },[])

    function handleSoutienClick()
    {
        setVoirSoutien(voirSoutien===false)

    }

    function numberFormat(number)
    {
        return new Intl.NumberFormat('de-DE').format(number)
    }


    function handleSubmit(e)
    {
        e.preventDefault()

        post("/projet/contribuer")
    }

    return (
        <Authenticated
            auth={auth}
            errors={errors}
        >


            <div className={"relative w-full projetfont"}>
                <img src={projet.image} className={"w-full"} style={{maxHeight:500,objectFit:"cover"}}/>

                <div className={"absolute z-1 md:w-auto w-full top-10 md:left-60 md:block flex justify-center" }>
                    <div data-aos={"flip-left"} className={"md:text-6xl sm:text-4xl text-2xl text-white bg-indigo-600 p-2"} style={{width:"fit-content"}}>
                        {projet.titre}
                    </div>
                </div>
            </div>
            <div className={"flex xs:flex-col justify-center space-x-10 xs:space-x-0 xs:space-y-5 mt-20 text-center projetfont"}>
                <div data-aos={"fade-up"} data-aos-duration={1000} className={"space-y-5"}>
                    <div >
                        <div className={"text-2xl text-indigo-600 font"}>{numberFormat(projet.montantRechercher)} FG</div>
                        <div>
                            à financer au Total
                        </div>
                    </div>
                    <div>
                        <div className={"text-2xl text-indigo-600 font"}>{numberFormat(projet.montantInitial)} FG</div>
                        <div>
                            montant Initial
                        </div>
                    </div>
                </div>
                <div data-aos={"fade-up"} data-aos-duration={1000}>
                    <div className={"text-2xl text-indigo-600 font"}>
                        {contributeurs}
                    </div>
                    <div>
                        Contributeurs
                    </div>
                </div>
                <div data-aos={"fade-up"} data-aos-duration={1000}>
                    <div className={"text-2xl text-indigo-600 font"}>
                        {joursRestant}
                    </div>
                    <div>
                        jours restants
                    </div>
                </div>
                <div data-aos={"fade-up"} data-aos-duration={1000} className={"mr-20 xs:mr-0 flex flex-col items-center "}>
                    <div>
                        Financé à {Math.round(pourcentage)} %
                    </div>
                    <div className={"border border-indigo-600 w-60 rounded overflow-hidden"}>
                        <div className={"h-5 bg-indigo-600 taille"} style={{width:`${Math.round(pourcentage)}%`}}>

                        </div>
                    </div>
                </div>
            </div>

            <div data-aos-once={true} data-aos={"fade-up"} data-aos-duration={1000} className={"flex justify-center mt-10"}>
                <button onClick={handleSoutienClick} className={"border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition duration-500 rounded py-2 px-10"} >
                    {voirSoutien?"Fermer":"Voir les contributeurs"}
                </button>
            </div>
            <div  className={voirSoutien?"flex justify-center":""} >
                <div  hidden={!voirSoutien} className={"w-full p-10 my-10 bg-indigo-100"}>
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
                </div>
            </div>
            <div className={"w-full mt-32 flex justify-center"}>
                <div style={{width:"90%"}}>
                    {ReactHtmlParser(projet.details)}
                </div>
            </div>


        </Authenticated>
    );
}

export default Show;
