import React, {useEffect, useState} from 'react';
import Authenticated from "@/Layouts/Authenticated";
import {maxWidth} from "@mui/system";
import ShowMoreText from "react-show-more-text";
import {Autocomplete, capitalize, TextField} from "@mui/material";
import NavigationIcon from '@mui/icons-material/Navigation';
import Paginations from "@/Components/Pagination";
import {Inertia} from "@inertiajs/inertia";
import Avatar from "@mui/material/Avatar";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from "@mui/material/IconButton";
import {usePage} from "@inertiajs/inertia-react";

function Index({auth,projets,secteurs,regions,search,previousUrl,components}) {
    const [regionSt,setRegionSt]=useState(null)
    const [projetsSt,setProjetsSt]=useState([])
    const [secteurSt,setSecteurSt]=useState(null)
    const [rechercheText,setRechercheText]=useState("")

    function onLike(p) {
        auth.user?Inertia.visit(route('likes.liker',[auth.user?.id,p?.id]),{preserveScroll:true,preserveState:true}):confirm("connectez-vous avant de liker")&& Inertia.visit(route('login'))
    }

    function onEnregistre(p) {
        auth.user?Inertia.visit(route('save.enregistrer',[auth.user?.id,p?.id]),{preserveScroll:true,preserveState:true}):confirm("connectez-vous avant d'enregister")&& Inertia.visit(route('login'))
    }
    useEffect(()=>{
        sessionStorage.removeItem("rechercheText")
    },[components])

    useEffect(()=>{
        search && sessionStorage.setItem("rechercheText",(search))

        setRechercheText(sessionStorage.getItem("rechercheText")?sessionStorage.getItem("rechercheText"):"")
    },[])

    useEffect(()=>{
        setProjetsSt(projets)
    },[projets])


    function handleSecteurChange(e,val)
    {
        setSecteurSt(val)
    }

    function handleRegionChange(e,val)
    {
        setRegionSt(val)
    }

    useEffect(() => {

        if(secteurSt && regionSt && rechercheText!=="")
        {
            setProjetsSt(projets.filter((p)=>p.secteur.id===secteurSt.id && p.adresse.ville.region.id===regionSt.id && (p.titre.indexOf(rechercheText)>-1 || p.description.indexOf(rechercheText)>-1)))
        }
        else
        {
            if(!secteurSt && !regionSt && rechercheText==="")
            {
                setProjetsSt(projets)
            }
            if(secteurSt && regionSt && rechercheText==="")
            {
                setProjetsSt(projets.filter((p)=>p.secteur.id===secteurSt.id && p.adresse.ville.region.id===regionSt.id))

            }
            else
            {
                if(secteurSt && !regionSt && rechercheText!=="")
                {
                    setProjetsSt(projets.filter((p)=>p.secteur.id===secteurSt.id && (p.titre.indexOf(rechercheText)>-1 || p.description.indexOf(rechercheText)>-1)))
                }
                else
                {
                    if(!secteurSt && regionSt && rechercheText!=="")
                    {
                        setProjetsSt(projets.filter((p)=>p.adresse.ville.region.id===regionSt.id && (p.titre.indexOf(rechercheText)>-1 || p.description.indexOf(rechercheText)>-1)))
                    }
                    else
                    {
                        if(secteurSt)
                        {
                            setProjetsSt(projets.filter((p)=>p.secteur.id===secteurSt.id))
                        }
                        if(regionSt)
                        {
                            setProjetsSt(projets.filter((p)=>p.adresse.ville.region.id===regionSt.id))
                        }
                        if(rechercheText!=="")
                        {
                            setProjetsSt(projets.filter((p)=>p.titre.indexOf(rechercheText)>-1 || p.description.indexOf(rechercheText)>-1))
                        }
                    }
                }

            }

        }

    },[secteurSt,regionSt,rechercheText])


    function projetsPagination(items) {
        return <div className={"space-y-5 flex flex-col items-center mb-10"}>
            <div className={"w-full"}>
                <div className={"my-10 text-2xl "}>
                    Explorez <span className="text-indigo-600">{projetsSt?.length} projets</span>
                </div>
            </div>
            <div className="">
                <div className="grid md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-4">
                    {items.map((p)=>(
                        <div key={p.id} className={"border space-y-4 group"} >
                            <div className={"w-full"} style={{height:255}}>
                                <div className={"space-y-2 p-2 absolute z-10 invisible group-hover:visible"}>
                                    <Avatar sx={{backgroundColor:"white"}} >
                                        <IconButton onClick={()=> onEnregistre(p)}>
                                            <BookmarkIcon className={p.enregistre?"text-indigo-600":"text-black"}/>
                                        </IconButton>
                                    </Avatar>
                                    <Avatar sx={{backgroundColor:"white"}} >
                                        <IconButton onClick={()=> onLike(p)}>
                                            <FavoriteIcon className={p.like?"text-indigo-600":"text-black"}/>
                                        </IconButton>
                                    </Avatar>
                                </div>
                                <img src={p.image} className={"w-full h-full object-cover"}/>
                            </div>
                            <div className={"p-4 space-y-4"} style={{height:200}}>
                                <div className={"space-y-4 group"} role="button" onClick={()=>Inertia.get(route("projet.show",p.id))}>
                                    <div className={"text-xl uppercase group-hover:underline overflow-hidden"} style={{height:55}}>
                                        <ShowMoreText
                                            more=""
                                            lines={2}
                                            className={"w-full"}
                                        >
                                            {p.titre}
                                        </ShowMoreText>
                                    </div>
                                    <div style={{height:100}}>
                                        <ShowMoreText
                                            more=""
                                            lines={3}
                                            className={"w-full"}
                                        >

                                            {capitalize(p.description.toLowerCase())}
                                        </ShowMoreText>
                                    </div>
                                </div>

                                <div className="text-xs">
                                    Par <span className={"font-bold capitalize"}>{p.user.name}</span>
                                </div>
                            </div>
                            <div className={"py-2 px-4"} style={{height:2}}>
                                <div className={"h-1 w-full overflow-hidden bg-gray-200"}>
                                    <div className={"h-full bg-indigo-600"} style={{width:`${Math.round(p.pourcentage)}%`}}>

                                    </div>
                                </div>
                            </div>
                            <div className={"space-y-1 px-4 py-1"}>
                                <div>{Math.round(p.pourcentage)} % financé</div>
                                <div>{p.montantFinance} FG financés</div>
                                <div>{p.joursRestant} jours restants</div>
                            </div>
                            <div className={"px-4 flex space-x-10"}>
                                <button onClick={()=>Inertia.get(route("secteur.show",p.secteur.id))} className={"underline"}>
                                    {p.secteur.libelle}
                                </button>
                                <div className={"space-x-1"}>
                                    <NavigationIcon/> {p.adresse.ville.libelle}, {p.adresse.ville.region.libelle}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>

    }


    return (
        <Authenticated
            auth={auth}
            active={"projets"}
        >
         <div className="flex justify-center font">
             <div className="md:w-8/12 w-10/12">
                 <div className={"border-b p-5 mt-10 flex w-full"}>
                    <div className="space-y-10 pb-5 w-full">
                        <div className={"flex space-x-5 text-xl w-full"}>
                            <div>
                                Filtres:
                            </div>
                            <div className={"w-3/12"}>
                                <TextField value={rechercheText?rechercheText:""} onChange={(e)=>{
                                    setRechercheText(e.target.value)
                                    sessionStorage.setItem("rechercheText",e.target.value)

                                }} label="Entrez un mot "/>
                            </div>
                            <div className={"w-3/12"}>
                                <Autocomplete
                                    onChange={(e,val)=>handleSecteurChange(e,val)}
                                    disablePortal={true}
                                    id={"combo-box-demo"}
                                    options={secteurs}
                                    getOptionLabel={option=>option.libelle}
                                    renderInput={(params)=><TextField fullWidth {...params} placeholder={"Tous les secteurs"} label={params.libelle}></TextField>}
                                />
                            </div>
                            <div className={"w-3/12"}>
                                <Autocomplete
                                    onChange={(e,val)=>handleRegionChange(e,val)}
                                    disablePortal={true}
                                    id={"combo-box-demo"}
                                    options={regions}
                                    getOptionLabel={option=>option.libelle}
                                    renderInput={(params)=><TextField fullWidth {...params} placeholder={"Toutes les regions"} label={params.libelle}></TextField>}
                                />
                            </div>
                        </div>
                    </div>

                 </div>

                 <div>
                     <Paginations perPage={9} lv={"Aucun element"}  list={projetsSt} content={(items)=>projetsPagination(items)} />
                 </div>
             </div>
         </div>
        </Authenticated>
    );
}

export default Index;
