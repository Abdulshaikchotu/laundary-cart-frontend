import './Orderpagesidebar.css'
function Orderpagesidebar() {
    return (
        <>
            <div id="sidebar">
                <div className='img' >
                    <div className='imgsec'>
                        <img src={require('../logo/home.png')}></img>
                    </div>
                </div>
                <div className='img' id='u'>
                    <div className='imgsec'>
                        <img src={require('../logo/more@2x.png')}></img>
                    </div>
                </div>
                <div className='img'>
                    <div className='imgsec'>
                        <img src={require('../logo/list@2x.png')}></img>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Orderpagesidebar