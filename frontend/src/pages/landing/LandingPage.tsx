import { Navbar } from "../../components/common/Navbar"
import { VerticalSlider } from "../auth/components/VerticalSlider"
import { Features } from "./components/Features"
import { HowWorks } from "./components/HowWorks"
import { Insights } from "./components/Insights"
import './css/landing-page.css'

export const LandingPage = () => {
    
    return (
        <div>

            <Navbar />
            <div className="mt-[70px]"></div>

            <header>
                {/* <VerticalSlider /> */}
            </header>

            <main className="max-w-5xl mx-auto">
                <Features />
                <HowWorks />
                <Insights />
            </main>
            
        </div>
    )

}