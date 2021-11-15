import React, {useEffect, useRef, useState} from 'react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import {Link, usePage} from '@inertiajs/inertia-react';
import {Inertia} from "@inertiajs/inertia";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import List from "@mui/material/List";
import Accordion from "@mui/material/Accordion";
import {TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import {withStyles} from "@mui/styles";


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

export default function Authenticated({ auth, header, children,active, }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [isAdmin, SetIsAdmin] = useState(false);
    const {AllProjets,secteurs}=usePage().props

    const [anchorEl, setAnchorEl] = useState(false);
    const [see, setSee] = useState(false);



    const [searchProjetList, setSearchProjetList] = useState(null);
    const [searchSecteurList, setSearchSecteurList] = useState(null);
    const [search, setSearch] = useState("");
    const inputEl = useRef(null);

    useEffect(() => {
        see && inputEl.current.focus();
    },[see])


    function handleClick(){
        setSee(true)
        setAnchorEl(true)
        inputEl.current.focus()
    }

    function handleClose(){
        setSee(false)
        setTimeout(() =>{
                setAnchorEl(false)
                setSearch("")
            },500
        )
    }

    function handleSearchChange(e) {
        setSearch(e.target.value)
    }

    useEffect(()=>{
        setSearchProjetList(search===""?null:AllProjets.filter((p)=>p.titre.toLowerCase().indexOf(search.toLowerCase()) > -1))
        setSearchSecteurList(search===""?null:secteurs.filter((s)=>s.libelle.toLowerCase().indexOf(search.toLowerCase()) > -1))
    },[search])

   const unFocusSearch=()=> {
        setSee(false)
        setTimeout(() =>{
                setAnchorEl(false)
                setSearch("")
            },500
        )
    }

    return (
        <div className="min-h-screen flex flex-col justify-between z-40">
            <div onBlur={unFocusSearch} hidden={!anchorEl} className="z-50 fixed w-full bg-black font" style={{height:66}}>
                <div className={`${see?"search":"searchHidden"} flex h-full justify-center items-center searchZindex`}>
                    <div className="flex w-6/12 space-x-5">
                        <TextFieldCustom  inputRef={inputEl} value={search} onChange={handleSearchChange} className="w-full" variant={"standard"} label="Rechercher un projet ou un secteur"/>
                        <div>
                            <IconButton onClick={handleClose}>
                                <CloseIcon className="text-white"/>
                            </IconButton>
                        </div>
                    </div>
                </div>
                {(searchProjetList!==null || searchSecteurList!==null)&&
                <div  className={`${see?"search":"searchHidden"} flex flex-col items-center bg-gray-100 overflow-auto`}>

                    {
                        searchSecteurList.length > 0 &&
                        <div className="w-6/12 text-black p-2 border-b">
                            <span>Secteurs</span>
                            {
                                searchSecteurList.map((s)=>(
                                        <div role={"button"} onClick={()=>Inertia.get(route("secteur.show",s.id))} key={s.id} className="w-full p-2 hover:bg-blue-600 hover:text-white transition duration-500">
                                            {s.libelle}
                                        </div>
                                    )
                                )
                            }
                        </div>

                    }

                    {
                        searchProjetList.length > 0 &&  <div className="w-6/12 text-black p-2">
                            <span>Projets</span>
                            {
                                searchProjetList.map((p)=>(

                                        <div role="button" onClick={()=>Inertia.get(route("projet.show",p.id))} key={p.id} className="w-full p-2 hover:bg-blue-600 hover:text-white transform hover:scale-105 transition duration-500 flex">
                                            <div className={"w-5/12"}>
                                                <img src={p.image} alt="" className="w-full h-4/12" style={{objectFit:"cover"}}/>
                                            </div>
                                            <div className="space-y-2 ml-2 w-full">
                                                <p className="font-bold">
                                                    {p.titre}
                                                </p>
                                                <p>
                                                    {p.description}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    }

                </div>

                }
            </div>

            <nav className="bg-black fixed w-full z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/" className={"text-white"}>
                                    <div className={"text-lg font-bold"}>
                                        <span>Addv</span>
                                        <span className={"p-2 bg-indigo-600 text-white"}>Crowd</span>
                                    </div>
                                </Link>
                            </div>

                            <div className="hidden space-x-8 md:-my-px md:ml-10 md:flex">
                                <NavLink href={route('accueil')} active={route().current('accueil') || route().current('home')}>
                                    Accueil
                                </NavLink>
                                {
                                    auth.user &&
                                        <>
                                            <div
                                                className={
                                                    active&&active==="projets"
                                                        ? 'flex items-center  border-b-4  border-indigo-600 text-sm font-medium leading-5 text-indigo-600 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out'
                                                        : 'flex items-center border-b-2 border-transparent text-sm font-medium leading-5 text-white hover:text-gray-400 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out'
                                                }
                                            >
                                                <Dropdown>
                                                    <Dropdown.Trigger>
                                                        <div className="flex items-center" role={"button"}>
                                                            <button className={"text-white text-sm h-full py-5"}>Projets</button>
                                                            <ArrowDropDownIcon className={"text-white"}/>
                                                        </div>
                                                    </Dropdown.Trigger>

                                                    <Dropdown.Content>
                                                        <Dropdown.Link href={route('user.projet.create',auth.user.id)} method="get" as="button">
                                                            Créer un projet
                                                        </Dropdown.Link>
                                                        <Dropdown.Link href={route('user.projet.index',auth.user.id)} method="get" as="button">
                                                            Mes projets
                                                        </Dropdown.Link>
                                                        <Dropdown.Link href={route('user.projet.save',auth.user.id)} method="get" as="button">
                                                            Projets enregistrés
                                                        </Dropdown.Link>

                                                    </Dropdown.Content>
                                                </Dropdown>
                                            </div>

                                            <NavLink href={route('user.contribution.index',auth.user.id)} active={active&&active==="contributions"}>
                                                Mes contributions
                                            </NavLink>
                                            {

                                                auth?.admin &&
                                                <NavLink href={route('admin.projet.index',auth.user.id)} active={route().current().split('.')[0]==="admin"}>
                                                    Administration
                                                </NavLink>
                                            }
                                            <div className="h-full flex items-center">
                                                <div>
                                                    <IconButton onClick={handleClick}>
                                                       <SearchIcon className="text-white"/>
                                                    </IconButton>
                                                </div>
                                            </div>
                                        </>
                                }
                            </div>
                        </div>

                        <div className="hidden md:flex md:items-center md:ml-6">
                            <div className="ml-3 relative">
                                {auth.user?
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-indigo-600 text-sm leading-4 font-medium rounded-md text-white hover:text-gray-400 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {auth.user.name}

                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                                Deconnexion
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>:
                                    <>
                                        <Link href={route('login')} className="text-sm text-white">
                                            connexion
                                        </Link>

                                        <Link href={route('register')} className="ml-4 text-sm text-white">
                                            Inscription
                                        </Link>
                                    </>
                                }
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center md:hidden">
                            <div className="h-full flex items-center">
                                <div>
                                    <IconButton onClick={handleClick}>
                                        <SearchIcon className="text-white"/>
                                    </IconButton>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' md:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('accueil')} active={route().current('accueil')||route().current('home')}>
                            Accueil
                        </ResponsiveNavLink>
                        {auth.user &&
                            <>
                                <Accordion
                                    defaultExpanded={active==="projets"}
                                >
                                    <AccordionSummary
                                        className={"hover:border-l-5 border-indigo-600"}
                                        sx={active==="projets"?{backgroundColor:"white",color:"black",borderLeft:"5px solid #3949AB"}:{backgroundColor:"black",color:"white", "&:hover":{borderLeft:"5px solid #757575",backgroundColor:"white",color:"black"}}}
                                        expandIcon={<ExpandMoreIcon className={"text-white"} />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>Projets</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className={"bg-black"}>
                                        <List>
                                            <ResponsiveNavLink href={route('user.projet.create',auth.user.id)} active={route().current()==="user.projet.create"}>
                                                Créer un projet
                                            </ResponsiveNavLink>
                                            <ResponsiveNavLink href={route('user.projet.index',[auth.user.id])} active={route().current()==="user.projet.index"}>
                                                Mes projets
                                            </ResponsiveNavLink>
                                            <ResponsiveNavLink href={route('user.projet.save',auth.user.id)} active={route().current()==="user.projet.save"}>
                                                Projets enregitrés
                                            </ResponsiveNavLink>
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                                <ResponsiveNavLink href={route('user.contribution.index',auth.user.id)} active={active&&active==="contributions"}>
                                    Mes contributions
                                </ResponsiveNavLink>
                            </>
                        }
                        {

                            auth?.admin &&
                            <ResponsiveNavLink href={route('admin.projet.index',auth.user.id)} active={route().current().split('.')[0]==="admin"}>
                                Administration
                            </ResponsiveNavLink>
                        }
                    </div>
                    {auth.user ?
                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                <div className="font-medium text-base text-white">{auth.user.name}</div>
                                <div className="font-medium text-sm text-white">{auth.user.email}</div>
                            </div>

                            <div className="mt-3 space-y-1 z-20">
                                <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                    Deconnexion
                                </ResponsiveNavLink>
                            </div>
                        </div>:
                        <div className={"z-20"}>
                            <ResponsiveNavLink href={route('login')} as="button">
                                Connexion
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('register')} as="button">
                                Inscription
                            </ResponsiveNavLink>
                        </div>
                    }
                </div>
            </nav>
            <div  className={"flex-1"} style={{paddingTop:64}}>{children}</div>

            <div className="w-full bg-black z-10 h-full">
                <div className="text-center xs:text-xs text-white font-bold">
                    © Copyright Addvalis crowdfunding - GUINÉE - Tous droits réservés.
                </div>
            </div>
        </div>
    );
}
