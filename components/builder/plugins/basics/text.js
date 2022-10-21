import {IoTextOutline} from "react-icons/io5";

const Text = (props) => {
    return (
        <div dangerouslySetInnerHTML={{__html: props.content}}/>
    )
}


const textPlugin = {
    name: 'Text',
    key: "text",
    icon: <IoTextOutline size={22}/>,
    category: "Basics",
    component: Text,
    props: [{
        type: "rich-text",
        name: 'content',
        label: "Content",
        default: "Write you content here"
    }]
}

export default textPlugin