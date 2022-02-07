import React, {useEffect, useLayoutEffect, useState} from 'react';
import Authenticated from "@/Layouts/Authenticated";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {Autocomplete, IconButton, TextareaAutosize, TextField} from "@mui/material";
import {NavigateNext} from "@mui/icons-material";
import {useForm} from "@inertiajs/inertia-react";


///////////////////////
//TinyMCE
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
import {Inertia} from "@inertiajs/inertia";
import Swal from "sweetalert2";





function Edit(props) {
    const [value, setValue] = React.useState('1');

    const { data, setData, post, progress, errors } = useForm({
        titre: props.projet.titre,
        description: props.projet.description,
        secteur: 0,
        montantInitial: props.projet.montantInitial,
        montantRechercher: props.projet.montantRechercher,
        dateDebut: props.projet.dateDebut,
        dateFin: props.projet.dateFin,
        details:props.projet.details,
        image:"",
        prevImage:"",
        region:0,
        ville:0,
        villes:[],
    })

    useEffect(()=>{
        setData("prevImage",props.projet.image)
    },[props])


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


    const [secteur,setSecteur]=useState({})

    useEffect(()=>{
        setSecteur(props.secteur)
    },[])

    useLayoutEffect(()=>{
        props.success && Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: props.success,
            showConfirmButton: false,
            timer: 2000
        })
    },[props])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function handleEditorChange(content)
    {
        setData("details",content)
    }

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post(route("user.projet.update",[props.auth.user.id,props.projet.id]),{
            _method:"put",
            projet:data
        })
    }

    useEffect(()=>{
        if(data.region)
        {
            setData("villes",data.region.villes)
        }
        else
        {
            setData("villes",props.villes)
        }


    },[data.region])

    return (
        <Authenticated
            auth={props.auth}
            active={"projets"}
        >
            <form onSubmit={handleSubmit}>
                <Box sx={{ width: '100%', typography: 'body1',position:"sticky"}}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList centered onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Infos de base" value="1" />
                                <Tab label="Details du projet" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <div className={"flex flex-col"}>

                                <div className={"flex justify-center"}>
                                    <div className={"grid md:grid-cols-2 gap-3 my-4 md:mx-10 mx-10"}>
                                        <div style={{maxWidth:400}}>
                                            <TextField variant={"standard"} className={"w-full"}  value={data.titre}  onChange={e=>setData("titre",e.target.value)} label="titre du projet"/>
                                            <div className={"text-red-600"}>{props.errors["projet.titre"]}</div>
                                        </div>
                                        <div style={{maxWidth:400}}>
                                            <Autocomplete
                                                onChange={(e,val)=>setData("secteur",val?.id)}
                                                disablePortal={true}
                                                options={props.secteurs}
                                                getOptionLabel={option=>option.libelle}
                                                renderInput={(params)=><TextField fullWidth {...params} placeholder={"secteur d'activite"} label={params.libelle}/>}
                                            />
                                            <div className={"text-red-600"}>{props.errors?.secteur}</div>

                                        </div>

                                        <div style={{maxWidth:400}}>
                                            <TextField variant={"standard"} className={"w-full"} value={data.montantInitial} onChange={e=>setData("montantInitial",e.target.value)} label="Montant initial" />

                                            <div className={"text-red-600"}>{props.errors["projet.montantInitial"]}</div>
                                        </div>

                                        <div style={{maxWidth:400}}>
                                            <TextField variant={"standard"} className={"w-full"} value={data.montantRechercher} onChange={e=>setData("montantRechercher",e.target.value)} label="Montant à financer" />

                                            <div className={"text-red-600"}>{props.errors["projet.montantRechercher"]}</div>
                                        </div>

                                        <div style={{maxWidth:400}}>
                                            <div className={"flex flex-col mt-3"}>
                                                <label className={"text-gray-500 font-bold"} htmlFor="">
                                                    Date de debut
                                                </label>
                                                <TextField
                                                    value={data.dateDebut} onChange={e=>setData("dateDebut",e.target.value)}
                                                    id="standard-search"
                                                    type="date"
                                                    variant={"standard"}
                                                />
                                            </div>

                                            <div className={"text-red-600"}>{props.errors["projet.dateDebut"]}</div>
                                        </div>

                                        <div style={{maxWidth:400}}>
                                            <div className={"flex flex-col mt-3"}>
                                                <label className={"text-gray-500 font-bold"} htmlFor="">
                                                    Date de fin
                                                </label>
                                                <TextField
                                                    value={data.dateFin} onChange={e=>setData("dateFin",e.target.value)}
                                                    id="standard-search"
                                                    type="date"
                                                    variant={"standard"}
                                                />
                                            </div>
                                            <div className={"text-red-600"}>{props.errors["projet.dateFin"]}</div>
                                        </div>

                                        <div style={{maxWidth:400}}>
                                            <div className={"flex flex-col mt-3"}>
                                                <label className={"text-gray-500 font-bold"} htmlFor="">
                                                    Region
                                                </label>
                                                <Autocomplete
                                                    defaultValue={props.projet.adresse.ville.region}
                                                    onChange={(e,val)=>{
                                                        setData("region",val)
                                                    }}
                                                    disablePortal={true}
                                                    options={props.regions}
                                                    getOptionLabel={option=>option.libelle}
                                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                                    renderInput={(params)=><TextField variant={"standard"} fullWidth {...params} placeholder={"region"} label={params?.libelle} />}
                                                />
                                            </div>

                                            <div className={"text-red-600"}>{props.errors["projet.region"]}</div>
                                        </div>

                                        <div style={{maxWidth:400}}>
                                            <div className={"flex flex-col mt-3"}>
                                                <label className={"text-gray-500 font-bold"} htmlFor="">
                                                    Ville
                                                </label>
                                                <Autocomplete
                                                    defaultValue={props.projet.adresse.ville}
                                                    onChange={(e,val)=>setData("ville",val)}
                                                    disablePortal={true}
                                                    options={data.villes}
                                                    getOptionLabel={option=>option.libelle}
                                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                                    renderInput={(params)=><TextField variant={"standard"} fullWidth {...params} placeholder={"ville"} label={params?.libelle}/>}
                                                />
                                            </div>
                                            <div className={"text-red-600"}>{props.errors["projet.ville"]}</div>
                                        </div>


                                        <div style={{maxWidth:400}}>
                                            <div className={"space-y-2"}>
                                                <div className={"text-gray-500 font-bold"}>
                                                    Image actuelle
                                                </div>
                                                <img src={data.prevImage} className={"w-6/12"}  alt=""/>
                                            </div>
                                            <div className={"flex flex-col mt-3"}>
                                                <label className={"text-gray-500 font-bold"} htmlFor="">
                                                    Changer l'image du projet
                                                </label>
                                                <TextField type={"file"} onChange={e=>setData("image",e.target.files[0])} />
                                            </div>
                                            <div className={"mt-2"}>
                                                {
                                                    data.image&& <img className={"w-6/12"} src={URL.createObjectURL(data.image)} alt=""/>
                                                }
                                            </div>

                                        </div>


                                        <div style={{maxWidth:800}}>
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
                                            <div className={"text-red-600"}>{props.errors["projet.description"]}</div>

                                            <div hidden={data.description.length <=500} className={"text-red-600"}>caractères max 500</div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </TabPanel>
                        <TabPanel value="2">
                            <div className={"md:mx-20 z-50"}>
                                <Editor
                                    value={data.details} onEditorChange={handleEditorChange}

                                    init={{
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                                            'searchreplace wordcount visualblocks visualchars code fullscreen',
                                            'insertdatetime media nonbreaking save table directionality',
                                            'template paste textpattern imagetools codesample toc help image code'
                                        ],
                                        mobile: {
                                            menubar: true
                                        },
                                        language:'fr_FR',
                                        skin: false,
                                        content_css: false,
                                        height:600,
                                        toolbar_sticky: true,
                                        toolbar: 'undo redo | formatselect | link image media | code ' +
                                            'bold italic backcolor | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat | help',
                                        content_style: 'img {max-width: 600px;height:"auto";},body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                        // enable title field in the Image dialog
                                        image_title: true,
                                        // enable automatic uploads of images represented by blob or data URIs
                                        automatic_uploads: true,
                                        media_live_embeds: true,
                                        //
                                        //  add custom filepicker only to Image dialog
                                        //images_upload_credentials: true,
                                        paste_data_images: true,
                                        paste_as_text: true,
                                        convert_urls: false,
                                        images_upload_url: "/uploadImage",
                                        image_advtab: true,
                                        images_upload_handler:example_image_upload_handler
                                    }}
                                />
                            </div>
                        </TabPanel>
                    </TabContext>
                </Box>
                <div className="mb-20 text-center">
                    <button type={"submit"} className={"p-2 bg-white text-indigo-600 w-60 border border-indigo-600 hover:bg-indigo-600 hover:text-white border-0 transition duration-500 ml-20"}>
                        Enregistrer les modifications
                    </button>
                </div>
            </form>
        </Authenticated>
    );
}

export default Edit;
