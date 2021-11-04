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
import ValidationErrors from "@/Components/ValidationErrors";
import {maxWidth} from "@mui/system";


export default function Create(props) {

    const [activeStep,setActiveStep]=useState(0);

    const { data, setData, post, progress} = useForm({
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

    function example_image_upload_handler (blobInfo, success, failure, progress) {
        var xhr, formData;
        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open('POST', '/uploadImage');

        xhr.upload.onprogress = function (e) {
            progress(e.loaded / e.total * 100);
        };

        xhr.onload = function() {
            var json;

            if (xhr.status === 403) {
                failure('HTTP Error: ' + xhr.status, { remove: true });
                return;
            }
            if (xhr.status === 500) {
                failure('HTTP Error: ' + xhr.status, { remove: true });
                return;
            }

            if (xhr.status < 200 || xhr.status >= 300) {
                failure('HTTP Error: ' + xhr.status);
                return;
            }

            json = JSON.parse(xhr.responseText);

            if (!json || typeof json.location != 'string') {
                failure('Invalid JSON: ' + xhr.responseText);
                return;
            }

            success(json.location);
        };

        xhr.onerror = function () {
            failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
        };

        formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());

        xhr.send(formData);
    };




    const [secteurs,setSecteurs]=useState([]);

    useEffect(()=>{
        setSecteurs(props.secteurs);
    },[])

    function handleEditorChange(content)
    {
        setData("details",content)
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
        return <div className={"flex flex-col"}>

            <div className="text-center my-5 text-xl font-bold">
                Commençons par les infos de bases
            </div>
            <div className="text-center my-5 text-lg">
                Facilitez la tâche de ceux qui veulent en savoir plus.
            </div>

            <div className={"mt-5 flex flex-col items-center md:mx-10 mx-5"}>
                <div className={"grid md:grid-cols-2 grid-cols-1 gap-5 border-t py-2 w-full"} style={{maxWidth:1000}}>
                    <div className={"flex flex-col space-y-3"}>
                        <span className={"text-xl font-bold"}>Titre du projet</span>
                        <span>Choisissez un titre clair pour aider votre public à comprendre votre projet rapidement. Cet élément sera visibles sur votre page de pré-lancement et de projet.</span>
                    </div>
                    <div>
                        <TextField variant={"standard"} className={"w-full"}  value={data.titre}  onChange={e=>setData("titre",e.target.value)} label="titre du projet"/>
                        <div className={"text-red-600"}>{props.errors?.titre}</div>
                    </div>
                </div>
                <div className={"grid md:grid-cols-2 grid-cols-1 gap-5 border-t py-2 w-full"} style={{maxWidth:1000}}>
                    <div className={"flex flex-col space-y-3"}>
                        <span className={"text-xl font-bold"}>Secteur du projet</span>
                        <span>
                            Choisissez le secteur qui se rapproche le plus de votre projet.
                            Pensez aux endroits où vos contributeurs découvriront votre projet.
                        </span>
                    </div>

                    <div>
                        <Autocomplete
                            onChange={(e,val)=>setData("secteur",val?.id)}
                            disablePortal={true}
                            id={"combo-box-demo"}
                            options={secteurs}
                            getOptionLabel={option=>option.libelle}

                            renderInput={(params)=><TextField variant={"standard"} fullWidth {...params} placeholder={"secteur d'activite"} label={params.libelle}></TextField>}
                        />
                        <div className={"text-red-600"}>{props.errors?.secteur}</div>

                    </div>
                </div>
                <div className={"grid md:grid-cols-2 grid-cols-1 gap-5 border-t py-2 w-full"} style={{maxWidth:1000}}>
                    <div className={"flex flex-col space-y-3"}>
                        <span className={"text-xl font-bold"}>Montant Initial</span>
                        <span>Saisissez le montant initial donc vous disposez</span>
                    </div>
                    <div>
                        <TextField variant={"standard"} className={"w-full"} value={data.montantInitial} onChange={e=>setData("montantInitial",e.target.value)} label="Montant initial" />

                        <div className={"text-red-600"}>{props.errors?.montantInitial}</div>
                    </div>
                </div>

                <div className={"grid md:grid-cols-2 grid-cols-1 gap-5 border-t py-2 w-full"} style={{maxWidth:1000}}>
                    <div className={"flex flex-col space-y-3"}>
                        <span className={"text-xl font-bold"}>Montant Recherché</span>
                        <span>Saisissez le montant à financer</span>
                    </div>
                    <div>
                        <TextField variant={"standard"} className={"w-full"} value={data.montantRechercher} onChange={e=>setData("montantRechercher",e.target.value)} label="Montant recherché" />
                        <div className={"text-red-600"}>{props.errors?.montantRechercher}</div>
                    </div>
                </div>

                <div className={"grid md:grid-cols-2 grid-cols-1 gap-5 border-t py-2 w-full"} style={{maxWidth:1000}}>
                    <div className={"flex flex-col space-y-3"}>
                        <span className={"text-xl font-bold"}>Date de debut</span>
                        <span>Saisissez la date de lancement de la campagne</span>
                    </div>
                    <div>
                        <TextField
                            className={"w-full"}
                            variant="standard"
                            value={data.dateDebut} onChange={e=>setData("dateDebut",e.target.value)}
                            id="standard-search"
                            type="date"
                        />
                        <div className={"text-red-600"}>{props.errors?.dateDebut}</div>
                    </div>
                </div>

                <div className={"grid md:grid-cols-2 grid-cols-1 gap-5 border-t py-2 w-full"} style={{maxWidth:1000}}>
                    <div className={"flex flex-col space-y-3"}>
                        <span className={"text-xl font-bold"}>Date de fin</span>
                        <span>Saisissez la fin de lancement de la campagne</span>
                    </div>
                    <div>
                        <TextField
                            className={"w-full"}
                            variant="standard"
                            value={data.dateFin} onChange={e=>setData("dateFin",e.target.value)}
                            id="standard-search"
                            type="date"
                        />
                        <div className={"text-red-600"}>{props.errors?.dateFin}</div>
                    </div>
                </div>

                <div className={"grid md:grid-cols-2 grid-cols-1 gap-5 border-t py-2 w-full"} style={{maxWidth:1000}}>
                    <div className={"flex flex-col space-y-3"}>
                        <span className={"text-xl font-bold"}>Image du projet</span>
                        <span>
                            Ajoutez une image qui représente clairement votre projet. Choisissez une image qui supportera d'être redimensionnée. Elle sera visible sur votre page de projet et sur le site.
                        </span>
                    </div>
                    <div>
                        <div className={"mt-2"}>
                            {
                                data.image&& <img src={URL.createObjectURL(data.image)} alt=""/>
                            }
                        </div>
                        <TextField
                            className={"w-full"}
                            type={"file"} onChange={e=>setData("image",e.target.files[0])}
                        />
                        <div className={"text-red-600"}>{props.errors?.image}</div>
                    </div>
                </div>
                <div className={"grid md:grid-cols-2 grid-cols-1 gap-5 border-t py-2 w-full"} style={{maxWidth:1000}}>
                    <div className={"flex flex-col space-y-3"}>
                        <span className={"text-xl font-bold"}>Description du projet</span>
                        <span>
                            Decrivez brièvement votre projet
                        </span>
                    </div>
                    <div>
                        <TextareaAutosize
                            className={"w-full"}
                            variant="standard"
                            value={data.description} onChange={e=>setData("description",e.target.value)}
                            aria-label="minimum height"
                            maxRows={4}
                            placeholder="Decrivez brièvement votre projet"
                            style={{height:80}}
                        />
                        <div hidden={data.description.length <=100} className={"text-red-600"}>caractères max 100</div>
                    </div>
                </div>

                <div className="self-end mt-5">
                    <button onClick={()=>setActiveStep(1)} className={"border-2 border-indigo-600 text-indigo-600 hover:bg-blue-600 hover:text-white transition duration-500 rounded p-2"}>
                        Details du projets <NavigateNext/>
                    </button>
                </div>
            </div>


            <div className={"flex justify-center"}>
                <div className={"grid md:grid-cols-2 gap-3 my-4 md:mx-10 mx-10"}>
                    <div hidden={true} style={{maxWidth:400}}>
                        <TextField className={"w-full"}  value={data.titre}  onChange={e=>setData("titre",e.target.value)} label="titre du projet"/>
                        <div className={"text-red-600"}>{props.errors?.titre}</div>
                    </div>
                    <div hidden={true} style={{maxWidth:400}}>
                        <Autocomplete
                            onChange={(e,val)=>setData("secteur",val?.id)}
                            disablePortal={true}
                            id={"combo-box-demo"}
                            options={secteurs}
                            getOptionLabel={option=>option.libelle}

                            renderInput={(params)=><TextField fullWidth {...params} placeholder={"secteur d'activite"} label={params.libelle}></TextField>}
                        />
                        <div className={"text-red-600"}>{props.errors?.secteur}</div>

                    </div>

                    <div hidden={true} style={{maxWidth:400}}>
                        <TextField className={"w-full"} value={data.montantInitial} onChange={e=>setData("montantInitial",e.target.value)} label="Montant initial" />

                        <div className={"text-red-600"}>{props.errors?.montantInitial}</div>
                    </div>

                    <div hidden={true} style={{maxWidth:400}}>
                        <TextField className={"w-full"} value={data.montantRechercher} onChange={e=>setData("montantRechercher",e.target.value)} label="Montant à financer" />

                        <div className={"text-red-600"}>{props.errors?.montantRechercher}</div>
                    </div>

                    <div hidden={true} style={{maxWidth:400}}>
                        <div className={"flex flex-col mt-3"}>
                            <label className={"text-gray-500 font-bold"} htmlFor="">
                                Date de debut
                            </label>
                            <TextField
                                value={data.dateDebut} onChange={e=>setData("dateDebut",e.target.value)}
                                id="standard-search"
                                type="date"
                            />
                        </div>

                        <div className={"text-red-600"}>{props.errors?.dateDebut}</div>
                    </div>

                    <div hidden={true} style={{maxWidth:400}}>
                        <div className={"flex flex-col mt-3"}>
                            <label className={"text-gray-500 font-bold"} htmlFor="">
                                Date de fin
                            </label>
                            <TextField
                                value={data.dateFin} onChange={e=>setData("dateFin",e.target.value)}
                                id="standard-search"
                                type="date"
                            />
                        </div>
                        <div className={"text-red-600"}>{props.errors?.dateFin}</div>
                    </div>


                    <div hidden={true} style={{maxWidth:400}}>
                        <div className={"flex flex-col mt-3"}>
                            <label className={"text-gray-500 font-bold"} htmlFor="">
                                Choisissez une image pour le projet
                            </label>

                            <TextField type={"file"} onChange={e=>setData("image",e.target.files[0])} />
                        </div>

                        <div className={"text-red-600"}>{props.errors?.image}</div>
                    </div>


                    <div hidden={true} style={{maxWidth:800}}>
                        <div className={"flex flex-col mt-3"}>
                            <label className={"text-gray-500 font-bold"} htmlFor="">
                                Description du projet
                            </label>
                            <TextareaAutosize
                                value={data.description} onChange={e=>setData("description",e.target.value)}
                                aria-label="minimum height"
                                maxRows={4}
                                placeholder="Decrivez brièvement votre projet"
                                style={{height:80}}
                            />
                        </div>

                        <div hidden={data.description.length <=100} className={"text-red-600"}>caractères max 100</div>
                    </div>



                </div>
            </div>

        </div>
    }
    function detailsProjet()
    {
        return <div>

               <div className="border-b py-5">
                   <div className="text-center my-5 text-xl font-bold">
                       La présentation de votre projet
                   </div>
                   <div className="text-center my-5 text-lg">
                       Qu'est-ce qui donnera envie à votre public de se rassembler autour de votre projet ? Ici, clarté, concision et précision sont de mise.
                   </div>
               </div>
                <div className={"flex justify-center"}>
                    <div className={"w-10/12 xs:w-11/12 space-y-3"}>
                        <div>
                            <span className="text-xl font-bold">
                                Details du projet
                            </span>
                            <p style={{maxWidth:500}}>
                                Décrivez ce que vous souhaitez financier en évoquant l'importance que votre projet revêt à vos yeux et comment vous comptez le réaliser. Parlez aussi un peu de vous. Une description complète informe les contributeurs sur l'ensemble de votre projet. Si possible, ajoutez des images pour montrer votre travail.
                            </p>

                        </div>
                        <div>
                            <Editor
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
                                        //images_upload_credentials: true,
                                        paste_data_images: true,
                                        paste_as_text: true,
                                        convert_urls: false,
                                        images_upload_url: "/uploadImage",
                                        image_advtab: true,
                                        images_upload_handler:example_image_upload_handler

                                    }
                                }
                            />
                            <div className={"text-red-600 my-3"}>{props.errors?.details}</div>
                        </div>
                        <div className={"flex justify-between w-full"}>
                            <button role="button" onClick={()=>setActiveStep(0)}>
                                <NavigateBefore/> revenir vers: Infos de bases
                            </button>
                            <button onClick={()=>setActiveStep(1)} className={"border-2 border-indigo-600 text-indigo-600 hover:bg-blue-600 hover:text-white transition duration-500 rounded p-2"}>
                                Enregistrer
                            </button>
                        </div>

                    </div>

                </div>


                <div hidden={true}>

                    <IconButton role="button" onClick={()=>setActiveStep(0)}><NavigateBefore/></IconButton>
                        Coordonnés Bancaires
                    <IconButton  onClick={()=>setActiveStep(2)}><NavigateNext/></IconButton>
                </div>
        </div>
    }

    function coordonneesBancaire()
    {
        return <div className={"ml-2"}>

            <div className={"text-area"}>

            </div>
            <IconButton role="button" onClick={()=>setActiveStep(1)}><NavigateBefore/></IconButton>
            <IconButton role="button" onClick={()=>setActiveStep(0)}><NavigateNext/></IconButton>
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

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            active={"projets"}
        >

            <div className="py-12 flex justify-center font">
                <div className="max-w-9xl sm:px-6 lg:px-8 w-full flex justify-center">

                    <div className={"justify-center"}>
                            <div className={"border-b pr-5  space-x-5 flex  justify-center pb-5"}>
                                <button onClick={()=>setActiveStep(0)} className={activeStep===0?"text-white bg-indigo-600 p-2 rounded transition duration-500":"text-indigo-600 border border-indigo-600 p-2 rounded transition duration-500"}>
                                    Infos de base
                                </button>
                                <button onClick={()=>setActiveStep(1)} className={activeStep===1?"text-white bg-indigo-600 p-2 rounded transition duration-500":activeStep===2?"text-indigo-600 border border-indigo-600 p-2 rounded transition duration-500":"text-gray-600 border border-gray-600 p-2 rounded transition duration-500"}>
                                    Details du projet
                                </button>
                            </div>
                            <div>
                                <form action="" onSubmit={handleSubmit} className={"mx-auto my-4"}>
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
