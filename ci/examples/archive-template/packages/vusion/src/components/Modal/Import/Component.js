import "./Index.scss";

import { useState } from "react";
import {
    Button,
    UnorderedList,
    ListItem
} from "@carbon/react";
/// import { ImportModal } from "@carbon/ibm-cloud-cognitive";

const Types = [
    "image/jpeg",
    "image/png",
    "text/plain"
];

const Component = (Properties) => {
//    const { Type } = Properties;
//
//    const [modalVisible, setModalVisible] = useState(false);
//    const [inTransit, setInTransit] = useState(false);
//
//    const Submission = ({ File }) => {
//        console.debug(File);
//    };
//
//    return (
//        <>
//            <ImportModal
//                accept={ Types }
//                className="io-import-modal"
//                defaultErrorBody="Select a new file and try again."
//                defaultErrorHeader="Import failed"
//                // description={"Specify a file for by either dragging it into the drag and drop area, or by specifying a URL"}
//                fetchErrorBody="Unable to fetch URL."
//                fetchErrorHeader="Import failed"
//                fileDropLabel={ "Drag or Select to Upload Item(s)" }
//                fileUploadLabel={ "File(s) Imported" }
//                inputButtonText={ "Import" }
//                // fileDropHeader={"File-Drop-Header"}
//                inputId="Import-Field-ID"
//                // inputLabel="Add a Single File via External URL"
//                inputPlaceholder={ "External URL" }
//                invalidFileTypeErrorBody="Invalid file type."
//                invalidFileTypeErrorHeader="Import failed"
//                invalidIconDescription="Delete"
//                //                maxFileSize={500000}
//                maxFileSize={ 0 }
//                maxFileSizeErrorBody="500kb max file size. Select a new file and try again."
//                maxFileSizeErrorHeader="Import failed"
//                open={ modalVisible }
//                onClose={ () => setModalVisible(false) }
//                // onRequestSubmit={(file) => Submission(file)}
//                primaryButtonText="Submit"
//                secondaryButtonText="Cancel"
//                title="File(s) Upload + Importer"
//            />
//            <Button onClick={ () => setModalVisible(true) }>
//                {
//                    (Type === "Import")
//                        ? (<>Import</>)
//                        : (<>Upload</>)
//                }
//            </Button>
//        </>
//    );

    return null;
};

export default Component;