
import Diversity from "./diversity/diversity";
import EmpType from "./empType/empType";
import Location from "./location/location";
import OnboardingSeparation from "./onboardingSeparation/onboardingSeparation";
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