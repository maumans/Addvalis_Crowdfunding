import React, {useEffect, useLayoutEffect, useState} from 'react';
import Authenticated from "@/Layouts/Authenticated";
import ReactHtmlParser from "react-html-parser";
//import { keyframes } from "styled-components";
import AOS from "aos"
import {TextField} from "@mui/material"
import {withStyles} from "@mui/styles";
import {useForm} from "@inertiajs/inertia-react";
import Swal from 'sweetalert2';
import Panel from "@/Layouts/Admin/Panel";
import {Inertia} from "@inertiajs/inertia";


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
        <Panel
            auth={auth}
            errors={errors}
            projet={projet}
            createur={createur}
            contributeurs={contributeurs}
            pourcentage={pourcentage}
            montantFinance={montantFinance}
            success={success}
            active={"projet"}
            sousActive={"listeProjets"}
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
                <div data-aos={"fade-up"} data-aos-duration={1000}>
                    <div className={"text-2xl text-indigo-600 font"}>{numberFormat(projet.montantRechercher)} FG</div>
                    <div>
                        à financer au Total
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
                <button onClick={()=>Inertia.delete(route("admin.projet.destroy",[auth.user.id,projet?.id]))} className={"border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition duration-500 rounded py-2 px-10"} >
                    Supprimer
                </button>
            </div>

            <div className={"w-full mt-32 flex justify-center"}>
                <div style={{width:"90%"}}>
                    {ReactHtmlParser(projet.details)}
                </div>
            </div>
        </Panel>
    );

}

export default Show;
