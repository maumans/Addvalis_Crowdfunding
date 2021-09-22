import React, {useState,useEffect} from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import {AccessAlarm,Settings,NavigateNext,Check} from "@mui/icons-material"
import {
    Stepper, Step, StepIcon, StepLabel, StepContent, StepButton, IconButton,
    StepConnector, TextField,TextareaAutosize, MenuItem, InputAdornment,Button
} from "@mui/material"
import {Inertia} from "@inertiajs/inertia";
import {useForm} from "@inertiajs/inertia-react";


import { Editor } from '@tinymce/tinymce-react';

// TinyMCE so the global var exists
// eslint-disable-next-line no-unused-vars
import tinymce from 'tinymce/tinymce';

// Theme
import 'tinymce/themes/silver';
// Toolbar icons
import 'tinymce/icons/default';
// Editor styles
import 'tinymce/skins/ui/oxide/skin.min.css';

// importing the plugin js.
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/spellchecker';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/table';
import 'tinymce/plugins/template';
import 'tinymce/plugins/help';
import 'tinymce/plugins/print';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/paste';


// Content styles, including inline UI like fake cursors
/* eslint import/no-webpack-loader-syntax: off */
// Content styles, including inline UI like fake cursors
/* eslint import/no-webpack-loader-syntax: off */
//import contentCss from 'tinymce/skins/content/default/content.min.css';
//import contentUiCss from 'tinymce/skins/ui/oxide/content.min.css';




export default function Create(props) {
    const [activeStep,setActiveStep]=useState(0);
    const [nom,setNom]=useState("");

    const { data, setData, post, processing, errors } = useForm({
        nom: '',
        description: '',
        secteur: 0,
        montantInitial: '',
        montantRechercher: '',
        dateDebut: today(),
        dateFin: today(),
        details:""
    })



    useEffect(()=>{
        console.log(data)
    })

    function handleEditorChange(content)
    {
        setData("details",content)
    }


    function Connector({step})
    {
        if(step<activeStep)
            return <div className={"h-1 w-80 bg-gradient-to-r from-indigo-200 via-indigo-500 to-indigo-900"}/>
        else
            return <div className={"h-1 w-80 bg-gradient-to-r from-gray-200 via-gray-500 to-gray-900 transition duration-1000"}/>
    }
    function switchActiveStep()
    {
        switch (activeStep)
        {
            case 0:
                return infosProjet()
            case 1:
                return detailsProjet()
            case 2:
                return coordonneesBancaire()
        }
    }

    function handleChange(e)
    {
        setNom(e.target.value)
    }


    function infosProjet()
    {
        return <div className={"ml-2 flex flex-col"}>

            <div className={"grid grid-cols-2 gap-3 my-4"}>
                <TextField variant="standard" value={data.nom}  onChange={e=>setData("nom",e.target.value)} label="Nom du projet" />
                <TextField value={data.secteur} onChange={e=>setData("secteur",e.target.value)} variant="standard" select label={"Secteur d'activité"}>
                    <MenuItem value={0}>
                        art
                    </MenuItem>
                    <MenuItem value={1}>
                        Technologie
                    </MenuItem>
                    <MenuItem value={2}>
                        Design
                    </MenuItem>
                </TextField>

                <TextField value={data.montantInitial} onChange={e=>setData("montantInitial",e.target.value)} label="Montant initial" variant="standard" />
                <TextField value={data.montantRechercher} onChange={e=>setData("montantRechercher",e.target.value)} label="Montant à financer" variant="standard" />
                <div className={"flex flex-col mt-3"}>
                    <label className={"text-gray-500 font-bold"} htmlFor="">
                        Date de debut
                    </label>
                    <TextField
                        value={data.dateDebut} onChange={e=>setData("dateDebut",e.target.value)}
                        id="standard-search"
                        type="date"
                        variant="standard"
                    />
                </div>
                <div className={"flex flex-col mt-3"}>
                    <label className={"text-gray-500 font-bold"} htmlFor="">
                        Date de fin
                    </label>
                    <TextField
                        value={data.dateFin} onChange={e=>setData("dateFin",e.target.value)}
                        id="standard-search"
                        type="date"
                        variant="standard"
                    />
                </div>


            </div>
            <div className={"flex flex-col mt-3"}>
                <label className={"text-gray-500 font-bold"} htmlFor="">
                    Description du projet
                </label>
                <TextareaAutosize
                    value={data.description} onChange={e=>setData("description",e.target.value)}
                    aria-label="minimum height"
                    maxRows={4}
                    placeholder="Parlons peu parlons bien"
                    style={{height:80}}
                />
                <p className={"my-2 text-indigo-600"}>
                    135 caracteres max
                </p>
            </div>


            <div>
                Details du projets
                <IconButton onClick={()=>setActiveStep(1)}><NavigateNext/></IconButton>
            </div>
        </div>
    }
    function detailsProjet()
    {
        return <div className={"ml-1"}>
                    <Editor
                        value={data.details} onEditorChange={handleEditorChange}

                        init={{
                            height: 500,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
            <div>
                Coordonnés Bancaires
                <IconButton onClick={()=>setActiveStep(2)}><NavigateNext/></IconButton>
            </div>
        </div>
    }

    function coordonneesBancaire()
    {
        return <div className={"ml-2"}>
            Voici l'etape 3
            <IconButton onClick={()=>setActiveStep(0)}><NavigateNext/></IconButton>
        </div>
    }

    function handleSubmit(e) {
        e.preventDefault()
        alert("SUBMIT")
        post(route("projet.store"),data)
    }

    function today()
    {
        var curr = new Date();
        curr.setDate(curr.getDate());
        var date = curr.toISOString().substr(0,10);
        return date
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Stepper activeStep={activeStep} connector={null} >
                            <Step >
                                <StepLabel StepIconComponent={()=>activeStep>0?<Check/>:<Settings/>}>Infos du projet</StepLabel>
                            </Step>
                            <Connector step={0}/>
                            <Step >
                                <StepLabel StepIconComponent={()=>activeStep>1?<Check/>:<Settings/>}>Details du projet</StepLabel>
                            </Step>
                            <Connector step={1}/>
                            <Step >
                                <StepLabel StepIconComponent={()=>activeStep>2?<Check/>:<Settings/>}>Coordonées Bancaires</StepLabel>
                            </Step>
                        </Stepper>
                        <form action="" onSubmit={handleSubmit} className={"container mx-auto my-4"}>
                            {
                                switchActiveStep()
                            }

                            <button className={"btn bg-indigo-600 text-white my-4 p-2 rounded hover:bg-indigo-800"}>
                                Soumettre <Check/>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
