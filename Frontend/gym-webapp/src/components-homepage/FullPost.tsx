import { useState, useEffect } from "react";
import { Post } from "../components/post/List";
import { getOneObjectNoToken } from "../utils/ApiRequests";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { useParams } from "react-router";

export default function FullPost() {
    const [postData, setPostData] = useState<Post>({
        id: 0,
        title: "",
        body: "",
        category: {
            id: 1,
            name: "",
            active: false
        },
        author: "",
        active: false
    });

    const { id } = useParams();

    const getPost = () => {
        getOneObjectNoToken(id, "posts", setPostData);
    }

    const editorToHtml = () => {
        if (postData.body) {
            const rawBody = convertFromRaw(JSON.parse(postData.body))
            return stateToHTML(rawBody)
        }
        return "Brak tekstu"
    }

    useEffect(() => {
        getPost();
    }, []);

    return (
        <div className="offers-container">
            <div className="container border rounded m-3 p-2">
                <div className="border-bottom p-1">
                    <h1>{postData.title}</h1>
                </div>
                <div className="border-bottom p-2">
                    <h3>{postData.category.name}</h3>
                </div>
                <div className="px-3 pt-3 h5">
                    <p dangerouslySetInnerHTML={{ __html: editorToHtml() }} />
                </div>
            </div>
        </div>
    )
}
