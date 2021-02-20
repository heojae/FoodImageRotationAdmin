import React, {useRef, useState, useEffect} from 'react';

const DropZone = React.memo((props) => {
    const fileInputRef = useRef();

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [validFiles, setValidFiles] = useState([]);


    useEffect(() => {
        let filteredArr = selectedFiles.reduce((acc, current) => {
            const x = acc.find(item => item.name === current.name);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);
        setValidFiles([...filteredArr]);

    }, [selectedFiles]);

    const preventDefault = (e) => {
        e.preventDefault();
        // e.stopPropagation();
    }

    const dragOver = (e) => {
        preventDefault(e);
    }

    const dragEnter = (e) => {
        preventDefault(e);
    }

    const dragLeave = (e) => {
        preventDefault(e);
    }

    const fileDrop = async (e) => {
        preventDefault(e);
        const files = e.dataTransfer.files;
        if (files.length) {
            await handleFiles(files);
        }
    }

    const filesSelected = async () => {
        if (fileInputRef.current.files.length) {
            await handleFiles(fileInputRef.current.files);
        }
    }

    const fileInputClicked = () => {
        fileInputRef.current.click();
    }

    const handleFiles = async (files) => {
        const file_list = [];
        for (let i = 0; i < files.length; i++) {
            if (validateFile(files[i])) {
                let blob = new Blob([files[i]]);
                file_list.push({file: files[i], blob: blob});
            }
        }
        props.handleSetRunDemoFileList(file_list)
    }

    const validateFile = (file) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (validTypes.indexOf(file.type) === -1) {
            return false;
        }
        const mb = 1024 * 1024
        if (file.size > 10 * mb) {
            return false
        }
        return true;
    }

    return (
        <div className={"Tool-main-run_demo-dropzone-flex"}>
            <div className="Tool-main-run_demo-dropzone">
                <div className="Tool-main-run_demo-dropzone-container"
                     onDragOver={dragOver}
                     onDragEnter={dragEnter}
                     onDragLeave={dragLeave}
                     onDrop={fileDrop}
                     onClick={fileInputClicked}
                >
                    <div className="Tool-main-run_demo-dropzone-container-message">
                        Drag & Drop files here or click to select file(s)
                    </div>
                    <input
                        ref={fileInputRef}
                        className="Tool-main-run_demo-dropzone-container-file_input"
                        type="file"
                        multiple
                        onChange={filesSelected}
                    />
                </div>
            </div>


        </div>
    );
}, (prevProps, nextProps) => {
    return true;
});

export default DropZone;


