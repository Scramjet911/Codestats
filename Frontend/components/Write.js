import React, { Component, createRef } from "react";
import dynamic from "next/dynamic";
import style from "./write.module.scss";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

let taglist=[];

class InputTag extends Component {
    constructor() {
        super();
        this.state = {
            tags: [],
            inputvalue: ""
        };
        this.tagInput = createRef();
    }

    removeTag = (i) => {
        const newTags = [...this.state.tags];
        newTags.splice(i, 1);
        this.setState({ tags: newTags });
    };

    inputKeyDown = (e) => {
        let val = e.target.value;
        val = val.replace(/\s/g,"");
        this.tagInput.current.value = this.tagInput.current.value.replace(/\s/g,"");
        if ((e.key==="," || e.key===' ' || e.key === "Enter") && val && val!=="") {
            this.tagInput.current.value = "";
            if (
                this.state.tags.find(
                    (tag) => tag.toLowerCase() === val.toLowerCase()
                )
            ) {
                return;
            }
            if(e.key===','){
                val = val.slice(0,-1);
            }
            val = val.replace(/\s/g,"");
            if(val!==""){
                taglist = [...this.state.tags,val];
                this.setState({ tags: taglist });
            }
        } else if (e.key === "Backspace" && !val) {
            this.removeTag(this.state.tags.length - 1);
        }
    };

    handleBlur = ()=>{
        if(this.tagInput.current.value!==''){
            taglist = [...this.state.tags,this.tagInput.current.value];
            this.setState({tags:taglist});
            this.tagInput.current.value = "";
        }
    }

    render() {
        const { tags } = this.state;
        return (
            <div className={style["input-tag"]}>
                <ul className={style["input-tag__tags"]}>
                    {tags.map((tag, i) => (
                        <li key={tag}>
                            {tag}
                            <button
                                type="button"
                                onClick={() => {
                                    this.removeTag(i);
                                }}
                            >+
                            </button>
                        </li>
                    ))}
                    <li className={style["input-tag__tags__input"]}>
                        <input
                            type="text"
                            onKeyUp={this.inputKeyDown}
                            ref={this.tagInput}
                            onBlur={this.handleBlur}
                        />
                    </li>
                </ul>
            </div>
        );
    }
}

export default class Write extends Component {
    constructor(props) {
        super(props);
        this.quillEditorRef = null;
        this.quillRef = null;
        this.titleInput = createRef();
    }
    state = {
        url: "",
        quillhtml:null,
        modules: {
            toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                ],
                ["link", "image", "video"],
                ["clean"],
                [
                    {
                        color: [
                            "#000000",
                            "#e60000",
                            "#ff9900",
                            "#ffff00",
                            "#008a00",
                            "#0066cc",
                            "#9933ff",
                            "#ffffff",
                            "#facccc",
                            "#ffebcc",
                            "#ffffcc",
                            "#cce8cc",
                            "#cce0f5",
                            "#ebd6ff",
                            "#bbbbbb",
                            "#f06666",
                            "#ffc266",
                            "#ffff66",
                            "#66b966",
                            "#66a3e0",
                            "#c285ff",
                            "#888888",
                            "#a10000",
                            "#b26b00",
                            "#b2b200",
                            "#006100",
                            "#0047b2",
                            "#6b24b2",
                            "#444444",
                            "#5c0000",
                            "#663d00",
                            "#666600",
                            "#003700",
                            "#002966",
                            "#3d1466",
                            "custom-color",
                        ],
                    },
                ],
            ],
            clipboard: {
                // toggle to add extra line breaks when pasting HTML:
                matchVisual: false,
            },
        },
        /*
         * Quill editor formats
         * See https://quilljs.com/docs/formats/
         */
        formats: [
            "header",
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "bullet",
            "indent",
            "link",
            "image",
            "video",
            "color",
        ],
    };

    handleChange = (content, delta, source, editor)=>{
        this.setState({quillhtml:editor.getHTML()});
    }

    sendFetch = () => {
        let localval = localStorage.getItem("jwt");

        if (localval) {
            localval = JSON.parse(localval);
            console.log(this.titleInput.current.value);
            if(this.titleInput.current.value.length>0 && taglist.length>0 && this.state.quillhtml.length>0){
                fetch(this.props.url + localval.user._id, {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + localval.token,
                        'Content-Type': 'application/json',
                        'Accept' : 'application/json'
                    },
                    body: JSON.stringify({
                        title:this.titleInput.current.value,
                        body:this.state.quillhtml,
                        category:taglist
                    }),
                });
            }
        }
    }

    render() {
        return (
            <>
                <div className={style.question}>
                    <label> Title : </label>
                    <div>
                        <input ref={this.titleInput} type="text" className={style.input} />
                    </div>
                    <br />
                    <label> Tags : </label>
                    <InputTag />
                </div>
                <div className={style.content}>
                    <div className={style.editor}>
                        <QuillNoSSRWrapper
                            modules={this.state.modules}
                            formats={this.state.formats}
                            onChange={this.handleChange}
                            theme="snow"
                        />
                    </div>
                    <div className={style.bottom}>
                        <button className="btn btn-success mb-3" onClick={this.sendFetch}>Submit</button>
                    </div>
                </div>
            </>
        );
    }
}
