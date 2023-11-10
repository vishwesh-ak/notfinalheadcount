
import Diversity from "./Diversity/Diversity";
import EmpType from "./EmpType/EmpType";
import Location from "./Location/Location";
import OnboardingSeparation from "./OnboardingSeparation/OnboardingSeparation";
import { Content } from "@carbon/react";


export default function Dashboard(){
    return(
        <Content>
            <h1 className="home__heading">Dashboards</h1>
            <EmpType/>
            <Diversity/>
            <Location/>
            <OnboardingSeparation/>
        </Content>
    )
}