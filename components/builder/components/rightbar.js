import {FiLayers, FiMenu, FiPlusCircle} from "react-icons/fi";
import {Option} from "./leftbar";
import {useState} from "react";
import {GrCss3} from "react-icons/gr";

const RightBar = () => {
    const [current, setCurrent] = useState("edit")

    return (
        <>
            <div className="h-[50px] bg-gray-100 border-b border-gray-300 flex">
                <Option icon={FiMenu} name="edit" current={current} setCurrent={setCurrent}/>
                <Option icon={GrCss3} name="styles" current={current} setCurrent={setCurrent}/>
            </div>
            <div className="bg-white w-full h-[calc(100vh-115px)] overflow-auto">

            </div>
        </>
    )
}
export default RightBar