import React, {useState,useEffect} from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import {AccessAlarm,Settings,NavigateNext,NavigateBefore,Check} from "@mui/icons-material"
import {
    Stepper, Step, StepIcon, StepLabel, StepContent, StepButton, IconButton,
    Autocomplete, TextField,TextareaAutosize, MenuItem, InputAdornment,Button
} from "@mui/material"
import {Inertia} from "@inertiajs/inertia";
import {useForm} from "@inertiajs/inertia-react";



import { Editor } from '@tinymce/tinymce-react';

// TinyMCE so the global var exists
// eslint-disable-next-line no-unused-vars

import tinymce from 'tinymce/tinymce';

// Theme
import 'tinymce/themes/silver/theme';
// Toolbar icons
import 'tinymce/icons/default';
// Editor styles
import 'tinymce/skins/ui/oxide-dark/skin.css';


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
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/visualchars';
import 'tinymce/plugins/save';
//import 'tinymce/plugins/contextmenu';
import 'tinymce/plugins/directionality';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/textpattern';
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/toc';


//LANGUE DE TINYMCE

import "../../../lang/fr_FR"
import {styles} from "dom7";
import {maxWidth} from "@mui/system";


export default function Create(props) {

    const [activeStep,setActiveStep]=useState(0);

    const { data, setData, post, progress, errors } = useForm({
        titre: '',
        description: '',
        secteur: 0,
        montantInitial: '',
        montantRechercher: '',
        dateDebut: today(),
        dateFin: today(),
        details:"",
        image:""
    })
    const [secteurs,setSecteurs]=useState([]);

    useEffect(()=>{
        setSecteurs(props.secteurs);
    },[])

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


    function infosProjet()
    {
        return <div className={"ml-2 flex flex-col"}>

            <div className={"flex justify-center"}>
                <div className={"grid md:grid-cols-2 grid-cols-1 gap-3 my-4 md:mx-10 mx-10"}>
                    <TextField style={{maxWidth:400}} value={data.titre}  onChange={e=>setData("titre",e.target.value)} label="titre du projet"/>
                    <Autocomplete
                        style={{maxWidth:400}}
                        onChange={(e,val)=>setData("secteur",val?.id)}
                        disablePortal={true}
                        id={"combo-box-demo"}
                        options={secteurs}
                        getOptionLabel={option=>option.libelle}

                        renderInput={(params)=><TextField fullWidth {...params} placeholder={"secteur d'activite"} label={params.libelle}></TextField>}
                    />

                    <TextField  style={{maxWidth:400}} value={data.montantInitial} onChange={e=>setData("montantInitial",e.target.value)} label="Montant initial" />
                    <TextField style={{maxWidth:400}} value={data.montantRechercher} onChange={e=>setData("montantRechercher",e.target.value)} label="Montant à financer" />
                    <div style={{maxWidth:400}} className={"flex flex-col mt-3"}>
                        <label className={"text-gray-500 font-bold"} htmlFor="">
                            Date de debut
                        </label>
                        <TextField
                            value={data.dateDebut} onChange={e=>setData("dateDebut",e.target.value)}
                            id="standard-search"
                            type="date"
                        />
                    </div>
                    <div style={{maxWidth:400}} className={"flex flex-col mt-3"}>
                        <label className={"text-gray-500 font-bold"} htmlFor="">
                            Date de fin
                        </label>
                        <TextField
                            value={data.dateFin} onChange={e=>setData("dateFin",e.target.value)}
                            id="standard-search"
                            type="date"
                        />
                    </div>
                    <div style={{maxWidth:400}} className={"flex flex-col mt-3"}>
                        <label className={"text-gray-500 font-bold"} htmlFor="">
                            Choisissez une image pour le projet
                        </label>
                        <TextField type={"file"} onChange={e=>setData("image",e.target.files[0])} />
                    </div>
                    <div style={{maxWidth:800}} className={"flex flex-col mt-3"}>
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

                    <div style={{maxWidth:400}} className={"mt-3"}>
                        Details du projets
                        <IconButton onClick={()=>setActiveStep(1)}><NavigateNext/></IconButton>
                    </div>


                </div>
            </div>

        </div>
    }
    function detailsProjet()
    {
        return <div className={"ml-1"}>
                    <div className={"text-2xl my-10"}>
                        Parlez nous en details de votre projet
                    </div>
                    <Editor
                        placeholder={"hjkl"}
                        value={data.details} onEditorChange={handleEditorChange}

                        init={{
                            plugins: [
                                'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                                'searchreplace wordcount visualblocks visualchars code fullscreen',
                                'insertdatetime media nonbreaking save table directionality',
                                'template paste textpattern imagetools codesample toc help image code'
                            ],
                            language:'fr_FR',
                            height:500,
                            toolbar: 'undo redo | formatselect | link image media | code ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                            // enable title field in the Image dialog
                            image_title: true,
                            // enable automatic uploads of images represented by blob or data URIs
                            automatic_uploads: true,
                            media_live_embeds: true,
                            // add custom filepicker only to Image dialog
                            file_picker_types: 'media image',
                            file_picker_callback: function(cb, value, meta) {
                                var input = document.createElement('input');
                                input.setAttribute('type', 'file');
                                input.setAttribute('accept', 'image/* audio/* video/*');

                                input.onchange = function() {
                                    var file = this.files[0];
                                    var reader = new FileReader();

                                    reader.onload = function () {
                                        var id = 'blobid' + (new Date()).getTime();
                                        var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                                        var base64 = reader.result.split(',')[1];
                                        var blobInfo = blobCache.create(id, file, base64);
                                        blobCache.add(blobInfo);

                                        // call the callback and populate the Title field with the file name
                                        cb(blobInfo.blobUri(), { title: file.name });
                                    };
                                    reader.readAsDataURL(file);
                                };

                                input.click();
                            },


                        }}
                    />

                <div>

                    <IconButton onClick={()=>setActiveStep(0)}><NavigateBefore/></IconButton>
                        Coordonnés Bancaires
                    <IconButton onClick={()=>setActiveStep(2)}><NavigateNext/></IconButton>
                </div>

                <div className={"flex justify-center mx-5"}>
                    <button style={{minWidth:380, maxWidth:410}} className={"btn bg-indigo-600 text-white my-4 p-2 rounded hover:bg-indigo-800 mt-3 md:w-full"}>
                        Soumettre
                    </button>
                </div>
        </div>
    }

    function coordonneesBancaire()
    {
        return <div className={"ml-2"}>

            <div className={"text-area"}>

            </div>
            <IconButton onClick={()=>setActiveStep(1)}><NavigateBefore/></IconButton>
            <IconButton onClick={()=>setActiveStep(0)}><NavigateNext/></IconButton>
        </div>
    }

    function handleSubmit(e) {
        e.preventDefault()
        post(route("user.projet.store",props.auth.user.id),data)
    }

    function today()
    {
        var curr = new Date();
        curr.setDate(curr.getDate());
        var date = curr.toISOString().substr(0,10);
        return date
    }

    useEffect(()=>{
        console.log(progress)
    })

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}>

            <div className="py-12 flex justify-center">
                <div className="max-w-9xl sm:px-6 lg:px-8 w-full flex justify-center">

                    <div className={"md:flex justify-center md:w-9/12"}>
                            <div className={"md:border-r md:border-b-0 border-b pr-5 md:mr-5 md:space-y-5 md:space-x-0 space-x-5 flex md:flex-col md:justify-start justify-center pb-5 md:w-3/12"}>
                                <button onClick={()=>setActiveStep(0)} className={activeStep===0?"text-white bg-indigo-600 p-2 rounded transition duration-500":"text-indigo-600 border border-indigo-600 p-2 rounded transition duration-500"}>
                                    Infos
                                </button>
                                <button onClick={()=>setActiveStep(1)} className={activeStep===1?"text-white bg-indigo-600 p-2 rounded transition duration-500":activeStep===2?"text-indigo-600 border border-indigo-600 p-2 rounded transition duration-500":"text-gray-600 border border-gray-600 p-2 rounded transition duration-500"}>
                                    Details
                                </button>
                                <button onClick={()=>setActiveStep(2)} className={activeStep===2?"text-white bg-indigo-600 p-2 rounded transition duration-500":"text-gray-600 border border-gray-600 p-2 rounded transition duration-500"}>
                                    Finance
                                </button>
                            </div>
                            <div className={"w-7/12"}>
                                <form action="" onSubmit={handleSubmit} className={"container mx-auto my-4"}>
                                    {
                                        switchActiveStep()
                                    }
                                    {
                                        progress && (
                                            <progress value={progress.percentage} max={100}>
                                                {progress.percentage}%
                                            </progress>
                                        )
                                    }
                                </form>
                            </div>
                        </div>
                </div>
            </div>
        </Authenticated>
    );
}
