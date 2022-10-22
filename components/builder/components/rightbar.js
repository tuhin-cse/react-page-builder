import {FiMenu} from "react-icons/fi";
import {Option} from "./leftbar";
import {useState} from "react";
import {GrCss3} from "react-icons/gr";
import {useBuilder} from "../context/builder";
import TextEditor from "../inputs/rich-text-editor";
import plugins from "../plugins";
import {SketchPicker} from "react-color";

const RightBar = () => {
    const [section, setSection] = useState("edit")
    const {current} = useBuilder()

    return (
        <>
            <div className="h-[50px] bg-gray-100 border-b border-gray-300 flex">
                <Option icon={FiMenu} name="edit" current={section} setCurrent={setSection}/>
                <Option icon={GrCss3} name="styles" current={section} setCurrent={setSection}/>
            </div>
            <div className="bg-white w-full h-[calc(100vh-115px)] overflow-auto">
                <div style={{display: section === 'edit' ? 'block' : 'none'}}>
                    <BlockEditor/>
                </div>
                <div style={{display: section === 'styles' ? 'block' : 'none'}}>
                    {current?.block_ids && (
                        <StyleEditor/>
                    )}

                </div>
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

const StyleEditor = () => {
    const {current, blocks, refresh} = useBuilder()
    let block = blocks[current?.block_ids[0]]
    for (let i = 1; i < current?.block_ids.length; i++) {
        block = block.props.childList[current?.block_ids[i]]
    }
    let styles = block?.style || {}
    const onChange = value => {
        block.style = {
            ...styles,
            ...value,
        }
        refresh()
    }

    return (
        <>
            <div className="p-4">
                <p className="text-xl mb-4">Styles</p>
                <p className="mb-2">Background</p>
                <SketchPicker className="!shadow-none border" width={350} direction={null}
                              color={styles.backgroundColor || '#00000000'} onChange={value => {
                    onChange({
                        backgroundColor: `rgba(${value.rgb.r},${value.rgb.g},${value.rgb.b},${value.rgb.a})`
                    })
                }}/>
                <p className="mb-2 text-lg mt-8">Typography</p>
                <p className="mb-2">Text Color</p>
                <SketchPicker className="!shadow-none border" width={350} direction={null}
                              color={styles.color || '#00000000'} onChange={value => {
                    onChange({
                        color: `rgba(${value.rgb.r},${value.rgb.g},${value.rgb.b},${value.rgb.a})`
                    })
                }}/>
            </div>
        </>
    )
}


const Inputs = ({blockIds, name, type, label, customInput: Custom}) => {
    const {blocks, refresh} = useBuilder()
    let props = blocks[blockIds[0]]?.props || {}
    for (let i = 1; i < blockIds.length; i++) {
        props = props.childList[blockIds[i]]?.props || {}
    }
    let value = props[name]
    const onChange = value => {
        props[name] = value
        refresh()
    }

    let input = <input className="border w-full p-2 rounded" value={value} onChange={e => onChange(e.target.value)}/>
    if (type === "rich-text") {
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