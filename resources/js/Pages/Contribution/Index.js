import React from 'react';
import Authenticated from "@/Layouts/Authenticated";
//import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import {NavigateBefore,NavigateNext} from "@mui/icons-material";

import img1 from "../../img/1.jpg"
import img2 from "../../img/2.jpg"
import img3 from "../../img/3.jpg"
import img4 from "../../img/4.jpg"

function Index(props) {

    function Example()
    {
        var items = [
            {
                name: "Random Name #1",
                description:img1
            },
            {
                name: "Random Name #2",
                description: img2
            },
            {
                name: "Random Name #3",
                description: img3
            },
            {
                name: "Random Name #2",
                description: img4
            }
        ]

        return (
            <div>

            </div>
        )
    }

    function Item(props)
    {
        return (
            <Paper>
                <h2>{props.item.name}</h2>
                <div className={"h-80 w-auto"}>
                    <img src={props.item.description} alt=""/>
                </div>

                <Button className="CheckButton">
                    Check it out!
                </Button>
            </Paper>
        )
    }
    return (
        <Authenticated auth={props.auth}>
            <div>CONTRIBUTION</div>
            {Example()}
        </Authenticated>
    );
}

export default Index;
