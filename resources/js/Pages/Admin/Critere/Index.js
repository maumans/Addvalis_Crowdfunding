import React, {useEffect, useLayoutEffect, useState} from 'react';

import Panel from "@/Layouts/Admin/Panel";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import DeleteIcon from "@mui/icons-material/Delete";

import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import {Inertia} from "@inertiajs/inertia";
import Swal from "sweetalert2";
import ClearIcon from '@mui/icons-material/Clear';

import {Modal, Switch, TextareaAutosize, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {borderRadius} from "@mui/system";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        textAlign: "center",
        maxWidth:100
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        textAlign: "center",
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}))

function Index({success,auth,criteres,errors}) {

    const [open, setOpen] = React.useState(false);


    const [critereSelect,setCritereSelect] =useState(null)

    const [data,setData] =useState({
        "descriptionEd":"",
        "genreCritere":false,
        "typeCritere":false,
        "noteMaximaleEd":0
    })
    const [dataAdd,setDataAdd] =useState({
        "description":"",
        "genreCritere":false,
        "typeCritere":false,
        "noteMaximale":0
    })

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    function handleOpen(e,s){
        setCritereSelect(s)
        setData((data) => ({
            ...data,
            "descriptionEd":s.description,
            "noteMaximaleEd":s.notemax?s.notemax:"",
            "genreCritere":s.genre_critere.libelle==="choix",
            "typeCritere":s.type_critere?.libelle==="selection"
        }))
        setOpen(true)
    }

    useEffect(()=>{
       (errors.descriptionEd || errors.noteMaximaleEd) && setOpen(true)
    })

    function handleClose(){
        setOpen(false)
        setCritereSelect(null)
    }
    useLayoutEffect(()=>{
        success && Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: success,
            showConfirmButton: false,
            timer: 2000
        })
        setData((data) => ({
            ...data,
            "descriptionEd":"",
            "noteMaximaleEd":"",
            "genreCritere":false,
            "typeCritere":false
        }))
    },[success,criteres])

    useEffect(()=>{
        console.log(errors)
    })
    function handleSubmit(e){
        e.preventDefault();
        Inertia.post(route("admin.critere.store",auth.user.id),dataAdd)
    }

    return (
        <Panel
            auth={auth}
            success={success}
            active={"critere"}
            sousActive={"listeCriteres"}
        >
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div style={style} className={"bg-white p-5 space-y-5 flex flex-col"}>
                    <TextareaAutosize className={"w-full"} style={{ height:100 }} value={data.descriptionEd} onChange={(e)=> setData((data)=>({
                        ...data,
                        "descriptionEd":e.target.value}))} variant="standard"/>
                    <div className="text-red-600">
                        {errors?.descriptionEd}
                    </div>
                    <div className={"w-full"}>
                        <span>Note</span>
                        <Switch checked={data.genreCritere} onChange={(e)=> setData((data)=>({
                            ...data,
                            "genreCritere":e.target.checked
                        }))} variant="standard"/>
                        <span>Choix</span>
                    </div>
                    <div className={"flex space-x-2 items-center"}>
                        <span>Preselection</span>
                        <Switch checked={data.typeCritere} onChange={(e)=> setData((dataAdd)=>({
                            ...data,
                            "typeCritere":e.target.checked
                        }))}/>
                        <span>Selection</span>
                    </div>

                    <TextField value={data.noteMaximaleEd}  style={{ minWidth:150}} onChange={(e)=> setData((dataAdd)=>({
                        ...data,
                        "noteMaximaleEd":e.target.value }))}
                               type={"number"} inputProps={{ min: 1, max: 100 }}  disabled={data.genreCritere} label={"note maximale"} variant={"standard"}/>
                    <div className="text-red-600">
                        {errors?.noteMaximaleEd}
                    </div>


                    <button onClick={()=>{
                        Inertia.patch(route("admin.critere.update",[auth.user.id,critereSelect.id]),data,{preserveScroll:true})
                        handleClose()
                        }} className={"p-2 w-full text-white border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition duration-500 rounded"}>
                        Modifier
                    </button>
                </div>
            </Modal>
            <div className="flex justify-center space-y-5 p-5 w-full">
                <TableContainer  className={"flex flex-col justify-center w-full space-y-5 w-full"}>
                    <div className={"w-full"}>
                        <div className={"border p-5"}>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col space-y-5">
                                    <TextareaAutosize placeholder={"Description du secteur"} onChange={(e)=> setDataAdd((dataAdd)=>({
                                        ...dataAdd,
                                        "description":e.target.value
                                    }))} variant={"standard"}/>
                                    <div className="text-red-600">
                                        {errors?.description}
                                    </div>
                                    <div className={"flex space-x-2 items-center"}>
                                        <span>Note</span>
                                        <Switch onChange={(e)=> setDataAdd((dataAdd)=>({
                                            ...dataAdd,
                                                "genreCritere":e.target.checked
                                        }))}/>
                                        <span>Choix</span>
                                    </div>
                                    <div className={"flex space-x-2 items-center"}>
                                        <span>Preselection</span>
                                        <Switch onChange={(e)=> setDataAdd((dataAdd)=>({
                                            ...dataAdd,
                                            "typeCritere":e.target.checked
                                        }))}/>
                                        <span>Selection</span>
                                    </div>
                                    <div>
                                        <TextField style={{ width:150}} onChange={(e)=> setDataAdd((dataAdd)=>({
                                            ...dataAdd,
                                            "noteMaximale":e.target.value }))}
                                                   type={"number"} inputProps={{ min: 1, max: 100 }}  disabled={dataAdd.genreCritere} label={"note maximale"} variant={"standard"}/>
                                    </div>
                                    <div className="text-red-600">
                                        {errors?.noteMaximale}
                                    </div>
                                    <div>
                                        <button type={"submit"} className={"text-white rounded bg-indigo-600 p-2 font-bold"}>
                                            Ajouter le secteur
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <Table className={"border border-indigo-600 rounded"} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell align="right">description</StyledTableCell>
                                <StyledTableCell align="right">note max</StyledTableCell>
                                <StyledTableCell align="right">type</StyledTableCell>
                                <StyledTableCell align="right">Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {criteres.map((s) => (
                                <StyledTableRow
                                    key={s.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell component="th" scope="row">
                                        {s.id}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{s.description}</StyledTableCell>
                                    <StyledTableCell align="right">{s.notemax}</StyledTableCell>
                                    <StyledTableCell align="right">{s.type_critere?.libelle}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <div className={"flex space-x-1 w-full justify-center"}>
                                            <button onClick={()=>confirm("Voulez-vous supprimer ce critere") && Inertia.delete(route("admin.critere.destroy",[auth.user.id,s?.id]),{preserveScroll:true})} className={"rounded bg-red-600 p-2"}>
                                                <DeleteIcon className={"text-white"}/>
                                            </button>
                                            <button onClick={(e)=>handleOpen(e,s)
                                            }  className={"rounded bg-indigo-600 p-2"}>
                                                <EditIcon className={"text-white"}/>
                                            </button>
                                        </div>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </Panel>
    );
}

export default Index;
