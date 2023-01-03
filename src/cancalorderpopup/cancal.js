import "./cancal.css"
import Alert_icon from "./triangle-exclamation-solid.svg"
let Cancal = (props) => {
    
    return (
        <>
            <div id="cancal-outer">
                <div id="cancal-inner">

                    <div id="cancalheader">
                        <div id="cancal-alert"><h3 id="css-alert">Alert</h3></div>
                        <div><h1 id="cancal-cross" onClick={()=>props.setcan(false)}>X</h1></div>
                        <div id="cancal-img"><img src={Alert_icon} alt="alert-icon" /></div>
                        <div id="cancal-ptag"><p style={{ marginTop: "-20px" }}>Are you sure you want cancal the order no:123</p></div>
                        <div id="cancal-button"><button style={{ marginTop: "12px", color: "#5861AE" }}>proceed</button></div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Cancal