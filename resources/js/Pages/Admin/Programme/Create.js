import React, {useEffect} from 'react';
import Panel from "@/Layouts/Admin/Panel";
import {TextareaAutosize, TextField} from "@mui/material";
import {Editor} from "@tinymce/tinymce-react";

// TinyMCE so the global var exists
// eslint-disable-next-line no-unused-vars

import tinymce from 'tinymce/tinymce';

// Theme
import 'tinymce/themes/silver/theme';
// Toolbar icons
import 'tinymce/icons/default';
// Editor styles
import 'tinymce/skins/ui/oxide-dark/skin.css';

//TinyMce plugings
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
import 'tinymce/plugins/directionality';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/textpattern';
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/toc';
import 'tinymce/plugins/autoresize';

//LANGUE DE TINYMCE

import "../../../lang/fr_FR"
import {minWidth} from "@mui/system";
import {useForm} from "@inertiajs/inertia-react";

function Create({auth,success}) {

    const {data,setData,post}=useForm({
        "titre":"",
        "description":"",
        "dateDebut":today(),
        "dateFin":today(),
        "details":"",
    })

    function today()
    {
        var curr = new Date();
        curr.setDate(curr.getDate());
        var date = curr.toISOString().substr(0,10);
        return date
    }

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
    }

    function handleEditorChange(content) {
        setData("details",content)
    }

    function handleSubmit(e) {

        e.preventDefault()
        post(route("admin.programme.store",auth.user.id),data)

    }

    return (
        <Panel
            auth={auth}
            success={success}
            active={"programme"}
            sousActive={"creationProgramme"}
        >
            <div className={"mt-20 justify-center flex"}>
                <form onSubmit={handleSubmit} action="" className={"grid space-y-10 md:w-7/12 w-full"}>
                    <span className="text-2xl font-bold font">
                        Creation de programme
                    </span>
                    <TextField label={"titre du programme"} variant={"standard"}/>
                    <div className={"space-y-5"}>
                        <div>Description du programme</div>
                        <TextareaAutosize
                            value={data.description} onChange={e=>setData("description",e.target.value)}
                            aria-label="minimum height"
                            maxRows={4}
                            className={"w-full"} style={{height:100}} label={"description du programme"} variant={"standard"}/>
                    </div>
                    <TextField type={"date"} value={data.dateDebut} onChange={e=>setData("dateDebut",e.target.value)} variant={"standard"}/>
                    <TextField  value={data.dateFin} onChange={e=>setData("dateFin",e.target.value)} type="date" variant={"standard"}/>

                    <div className={"space-y-5"}>
                        <div>Details du programme</div>
                        <Editor
                            value={data.details} onEditorChange={handleEditorChange}
                            init={{
                                plugins: [
                                    'autoresize advlist autolink lists link image charmap print preview hr anchor pagebreak',
                                    'searchreplace wordcount visualblocks visualchars code fullscreen',
                                    'insertdatetime media nonbreaking save table directionality',
                                    'template paste textpattern imagetools codesample toc help image code'
                                ],
                                language:'fr_FR',
                                min_height:400,
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
                                // add custom filepicker only to Image dialog
                                //images_upload_credentials: true,
                                paste_data_images: true,
                                paste_as_text: true,
                                convert_urls: false,
                                images_upload_url: "/uploadImage",
                                image_advtab: true,
                                images_upload_handler:example_image_upload_handler,
                                image_dimensions:false,
                            }}
                        >

                        </Editor>

                        <button type="submit" className={"border-2 border-indigo-600 text-indigo-600 hover:bg-blue-600 hover:text-white transition duration-500 rounded p-2"}>
                            Soumettre
                        </button>
                    </div>
                </form>

            </div>

        </Panel>
    );
}

export default Create;
