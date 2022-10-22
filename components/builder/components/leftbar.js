import {useState} from "react";
import {FiLayers, FiPlusCircle} from "react-icons/fi";
import plugins from "../plugins";
import {useBuilder} from "../context/builder";

const LeftBar = () => {
    const [current, setCurrent] = useState("add")

    const categories = plugins.reduce((acc, d) => {
        let plugins = acc[d?.category] || []
        return {
            ...acc,
            [d?.category]: [...plugins, d]
        }
    }, {})

    return (
        <>
            <div className="h-[50px] bg-gray-100 border-b border-gray-300 flex">
                <Option icon={FiPlusCircle} name="add" current={current} setCurrent={setCurrent}/>
                <Option icon={FiLayers} name="layers" current={current} setCurrent={setCurrent}/>
            </div>
            <div className="bg-white w-full h-[calc(100vh-115px)] overflow-auto">
                {Object.keys(categories)?.map((key, index) => (
                    <Category category={key} options={categories[key]} index={index} key={index}/>
                ))}

            </div>
        </>
    )
}
export default LeftBar

const Category = ({category, options, index}) => {
    const [show, setShow] = useState(index === 0)
    const {setCurrent, setAction} = useBuilder()

    return (
        <div className="p-4">
            <span className="text-lg">{category}</span>
            <div className="flex flex-wrap -mx-2">
                {options?.map((option, index) => (
                    <div className="w-1/3 p-2" key={index}>
                        <div className="bg-gray-100 rounded shadow-sm h-16 flex flex-col justify-center items-center" role="button" onDragStart={() => {
                            setAction('add')
                            setCurrent(option)
                        }} draggable>
                            {option.icon}
                            <span className="text-gray-600 text-xs mt-1">{option.name}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div></div>
        </div>
    )
}


export const Option = ({icon: Icon, name, current, setCurrent}) => {
    return (
        <div
            className={`w-1/2 h-[50px] flex justify-center pt-4 ${current === name ? 'text-blue-500 border-b-2 border-blue-500' : ''}`}
            role="button" onClick={() => setCurrent(name)}>
            <Icon size={20}/>
        </div>
    )
}