import React, {useState} from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import {AccessAlarm,Settings,NavigateNext} from "@mui/icons-material"
import {Stepper, Step, StepIcon, StepLabel, StepContent, StepButton, IconButton, StepConnector} from "@mui/material"

export default function Dashboard(props) {
    const [activeStep,setActiveStep]=useState(0);


    function Connector({step})
    {
        if(step<activeStep)
            return <div className={"h-1 w-80 bg-gradient-to-r from-indigo-200 via-indigo-500 to-indigo-900"}/>
        else
            return <div className={"h-1 w-80 bg-gradient-to-r from-gray-200 via-gray-500 to-gray-900"}/>
    }
    function switchActiveStep()
    {
        switch (activeStep)
        {
            case 0:
                return <div className={"ml-2" +
                ""}>
                    Voici l'etape 1
                    <IconButton onClick={()=>setActiveStep(1)}><NavigateNext/></IconButton>
                </div>
            case 1:
                return <div className={"text-center"}>
                    Voici l'etape 2
                    <IconButton onClick={()=>setActiveStep(2)}><NavigateNext/></IconButton>
                </div>
            case 2:
                return <div className={"text-right"}>
                    Voici l'etape 3
                    <IconButton onClick={()=>setActiveStep(0)}><NavigateNext/></IconButton>
                </div>        }
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Stepper activeStep={activeStep} connector={false} className={"bg-indigo-600"} >
                            <Step >
                                <StepLabel StepIconComponent={()=><Settings/>}>Infos du projet</StepLabel>
                            </Step>
                            <Connector step={0}/>
                            <Step >
                                <StepLabel StepIconComponent={()=><Settings/>}>Details du projet</StepLabel>
                            </Step>
                            <Connector step={1}/>
                            <Step >
                                <StepLabel StepIconComponent={()=><Settings/>}>Coordonées Bancaires</StepLabel>
                            </Step>
                        </Stepper>
                        {
                            switchActiveStep()
                        }
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
