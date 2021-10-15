import React, {useEffect,useState} from 'react';
import Panel from "@/Layouts/Admin/Panel";
import ReactHtmlParser from "react-html-parser";
import {useForm,Link} from "@inertiajs/inertia-react";
import AOS from "aos"
import {TextField} from "@mui/material"
import {withStyles} from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import {Inertia} from "@inertiajs/inertia";
import DeleteIcon from "@mui/icons-material/Delete";

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
            sousActive={"validation"}
        >
            <div>

                <div className={"fixed right-0 bottom-10 z-30 space-y-2"}>
                    <button className={"text-white mr-10 p-2 bg-indigo-600 rounded hover:w-80 hover:bg-indigo-900 transition duration-500"} onClick={()=>Inertia.get(route("admin.projet.validation",[auth.user.id,projet.id]))}> valider</button>
                    <button className={"text-white mr-10 p-2 bg-red-600 rounded hover:w-80 hover:bg-red-900 transition duration-500"} onClick={()=>Inertia.delete(route("admin.projet.validation.destroy",[auth.user.id,projet?.id]))}> retirer</button>
                </div>
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
                            {joursRestant}
                        </div>
                        <div>
                            jours restants
                        </div>
                    </div>
                </div>
                <div className={"w-full mt-32 flex justify-center"}>
                    <div style={{width:"90%"}}>
                        {ReactHtmlParser(projet.details)}
                    </div>
                </div>
            </div>

        </Panel>
    );
}

export default Show;
