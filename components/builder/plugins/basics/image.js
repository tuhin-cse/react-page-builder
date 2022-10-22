import {FiImage} from "react-icons/fi";

const Image = (props) => {
    return (
        <img src={props?.image} alt="Give a image url" className="w-full h-full"/>
    )
}


const imagePlugin = {
    name: 'Image',
    key: "image",
    icon: <FiImage size={22}/>,
    category: "Basics",
    component: Image,
    props: [{
        type: "input",
        name: 'image',
        label: "Image",
        default: "https://images.unsplash.com/photo-1661771962693-63a98fa1ee8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
    }]
}

export default imagePlugin