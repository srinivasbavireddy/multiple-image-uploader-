import React, { useState } from "https://cdn.skypack.dev/react@17.0.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import shortid from "https://cdn.skypack.dev/shortid@2.2.16";

const App = () => {
  const [selectedfile, SetSelectedFile] = useState([]);
  const [Files, SetFiles] = useState([]);


  const filesizes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const InputChange = e => {
    // --For Multiple File Input
    let images = [];
    for (let i = 0; i < e.target.files.length; i++) {
      images.push(e.target.files[i]);
      let reader = new FileReader();
      let file = e.target.files[i];
      reader.onloadend = () => {
        SetSelectedFile(preValue => {
          return [
          ...preValue,
          {
            id: shortid.generate(),
            filename: e.target.files[i].name,
            filetype: e.target.files[i].type,
            fileimage: reader.result,
            datetime: e.target.files[i].lastModifiedDate.toLocaleString('en-IN'),
            filesize: filesizes(e.target.files[i].size) }];


        });
      };
      if (e.target.files[i]) {
        reader.readAsDataURL(file);
      }
    }
  };

  const DeleteSelectFile = id => {
    if (window.confirm("Are you sure you want to delete this Image?")) {
      const result = selectedfile.filter(data => data.id !== id);
      SetSelectedFile(result);
    } else {
      alert('No');
    }

  };

  const FileUploadSubmit = async e => {
    e.preventDefault();

    // form reset on submit 
    e.target.reset();
    if (selectedfile.length > 0) {
      for (let index = 0; index < selectedfile.length; index++) {
        SetFiles(preValue => {
          return [
          ...preValue,
          selectedfile[index]];

        });
      }
      SetSelectedFile([]);
    } else {
      alert('Please select atlease one image!');
    }
  };

  const DeleteFile = async id => {
    if (window.confirm("Are you sure you want to delete this Image?")) {
      const result = Files.filter(data => data.id !== id);
      SetFiles(result);
    } else {
      alert('No');
    }
  };

  return (

    React.createElement("div", { className: "fileupload-view" }, 
    React.createElement("div", { className: "row justify-content-center m-0" }, 
    React.createElement("div", { className: "col-md-6" }, 
    React.createElement("div", { className: "card mt-5" }, 
    React.createElement("div", { className: "card-body" }, 
    React.createElement("div", { className: "kb-data-box" }, 
    React.createElement("div", { className: "kb-modal-data-title" }, 
    React.createElement("div", { className: "kb-data-title" }, 
    React.createElement("h5", null, "Multiple Images Upload with Preview Using React"))), 


    React.createElement("form", { onSubmit: FileUploadSubmit }, 
    React.createElement("div", { className: "kb-file-upload" }, 
    React.createElement("div", { className: "file-upload-box" }, 
    React.createElement("input", { type: "file", id: "fileupload", className: "file-upload-input", onChange: InputChange, multiple: true }), 
    React.createElement("span", null, "Drag and drop or ", React.createElement("span", { className: "file-link" }, "Choose your files or images")))), 

    React.createElement("div", { className: "kb-attach-box mb-3" },

    selectedfile.map((data, index) => {
      const { id, filename, filetype, fileimage, datetime, filesize } = data;
      return (
        React.createElement("div", { className: "file-atc-box", key: id },

        filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ? 
        React.createElement("div", { className: "file-image" }, " ", React.createElement("img", { src: fileimage, alt: "" })) : 
        React.createElement("div", { className: "file-image" }, React.createElement("i", { className: "far fa-file-alt" })), 

        React.createElement("div", { className: "file-detail" }, 
        React.createElement("h6", null, filename), 
        React.createElement("p", null), 
        React.createElement("p", null, React.createElement("span", null, "Size : ", filesize), React.createElement("span", { className: "ml-2" }, "Modified Time : ", datetime)), 
        React.createElement("div", { className: "file-actions" }, 
        React.createElement("button", { type: "button", className: "file-action-btn", onClick: () => DeleteSelectFile(id) }, "Delete")))));
    })), 


    React.createElement("div", { className: "kb-buttons-box" }, 
    React.createElement("button", { type: "submit", className: "btn btn-primary form-submit" }, "Upload Images"))),

    Files.length > 0 ? 
    React.createElement("div", { className: "kb-attach-box" }, 
    React.createElement("hr", null),

    Files.map((data, index) => {
      const { id, filename, filetype, fileimage, datetime, filesize } = data;
      return (
        React.createElement("div", { className: "file-atc-box", key: index },

        filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ? 
        React.createElement("div", { className: "file-image" }, " ", React.createElement("img", { src: fileimage, alt: "" })) : 
        React.createElement("div", { className: "file-image" }, React.createElement("i", { className: "far fa-file-alt" })), 

        React.createElement("div", { className: "file-detail" }, 
        React.createElement("h6", null, filename), 
        React.createElement("p", null, React.createElement("span", null, "Size : ", filesize), React.createElement("span", { className: "ml-3" }, "Modified Time : ", datetime)), 
        React.createElement("div", { className: "file-actions" }, 
        React.createElement("button", { className: "file-action-btn", onClick: () => DeleteFile(id) }, "Delete"), 
        React.createElement("a", { href: fileimage, className: "file-action-btn", download: filename }, "Download")))));
    })) :


    '')))))));

};

ReactDOM.render( React.createElement(App, null), document.getElementById("root"));