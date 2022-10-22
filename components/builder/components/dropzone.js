import {useBuilder} from "../context/builder";

const DropZone = ({index, blockIds}) => {
    const {current, blocks, refresh} = useBuilder()

    return (
        <>
            <div
                className="border border-dashed h-48 flex items-center justify-center rounded"
                onDrop={e => {
                    e.stopPropagation()
                    if(blockIds.length > 0) {
                        let props = blocks[blockIds[0]].props
                        for(let i = 1; i < blockIds.length; i ++) {
                            props = props.childList[blockIds[i]].props
                        }
                        if(!props.childList) {
                            props.childList = []
                        }
                        props.childList[index] = {
                            name: current?.name,
                            component: current?.key,
                            props: current?.props?.reduce((acc, d) => ({
                                ...acc,
                                [d.name]: d.default
                            }), {})
                        }
                    }
                    refresh()
                }} onDragOver={e => e.preventDefault()}>
                <p className="text-center text-gray-700">Drag And Drop Your Block
                    Here</p>
            </div>
        </>
    )
}
export default DropZone