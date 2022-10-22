import {FiMenu} from "react-icons/fi";
import {Option} from "./leftbar";
import {useState} from "react";
import {GrCss3} from "react-icons/gr";
import {useBuilder} from "../context/builder";
import TextEditor from "../inputs/rich-text-editor";
import plugins from "../plugins";

const RightBar = () => {
    const [current, setCurrent] = useState("edit")

    return (
        <>
            <div className="h-[50px] bg-gray-100 border-b border-gray-300 flex">
                <Option icon={FiMenu} name="edit" current={current} setCurrent={setCurrent}/>
                <Option icon={GrCss3} name="styles" current={current} setCurrent={setCurrent}/>
            </div>
            <div className="bg-white w-full h-[calc(100vh-115px)] overflow-auto">
                <BlockEditor/>
            </div>
        </>
    )
}
export default RightBar


const BlockEditor = () => {
    const {current} = useBuilder()
    let editProps = current?.block_ids !== undefined ? plugins?.find(d => d.key === current?.component)?.props : undefined

    return (
        <>
            {current?.block_ids !== undefined && (
                <div className="p-4">
                    <p className="text-xl mb-4">Block Options</p>
                    {editProps?.map((d, index) => (
                        <Inputs blockIds={current?.block_ids} {...d} key={index}/>
                    ))}


                </div>
            )}
        </>
    )
}


const Inputs = ({blockIds, name, type, label, customInput: Custom}) => {
    const {blocks, refresh} = useBuilder()
    let props = blocks[blockIds[0]].props
    for(let i = 1; i < blockIds.length; i ++) {
        props = props.childList[blockIds[i]].props
    }
    let value = props[name]
    const onChange = value => {
        props[name] = value
        refresh()
    }

    let input =  <input className="border w-full p-2 rounded" value={value} onChange={e => onChange(e.target.value)}/>
    if(type === "rich-text") {
       input = <TextEditor value={value} onChange={onChange}/>
    }


    return (
        <div>
            <label className="mb-2 block text-base">{label}</label>
            {!!Custom ? (
                <Custom value={value} onChange={onChange}/>
            ) : input}
        </div>
    )
}