import {Fragment, useEffect, useState} from "react";
import {FiArrowLeft, FiPlus} from "react-icons/fi";
import EditorPane from "./components/editor_pane";
import LeftBar from "./components/leftbar";
import BuilderContext from "./context/builder";
import RightBar from "./components/rightbar";

const PageBuilder = () => {
    const [blocks, setBlocks] = useState([])
    const [reload, setReload] = useState(false)
    const refresh = () => setReload(!reload)
    const [current, setCurrent] = useState()
    const [action, setAction] = useState('')

    useEffect(() => {
        console.log(blocks)
        if (blocks?.length === 0) {
            let history = localStorage.getItem('block_history')
            if (!!history) {
                setBlocks(JSON.parse(history))
            }
        } else {
            localStorage.setItem('block_history', JSON.stringify(blocks))
        }
    }, [blocks])



    return (
        <BuilderContext.Provider value={{blocks, setBlocks, current, setCurrent, action, setAction, refresh}}>
            <div className="h-screen">
                <div className="h-[65px] !border-b border-gray-300 p-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <FiArrowLeft size={18} className="mr-2"/>
                        <span className="text-base">Page Builder</span>
                    </div>
                    <div>
                        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded">Publish</button>
                    </div>
                </div>
                <div className="flex">
                    <div className="w-[350px] !border-r border-gray-300">
                        <LeftBar/>
                    </div>
                    <div className=" min-w-[600px] w-[calc(100vw-750px)] bg-gray-100">
                        <EditorPane/>
                    </div>
                    <div className="w-[400px] !border-l border-gray-300">
                        <RightBar/>
                    </div>
                </div>
            </div>
        </BuilderContext.Provider>
    )
}

export default PageBuilder