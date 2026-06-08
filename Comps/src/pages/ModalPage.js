import Modal from "../components/modal";
import Button from "../components/Button";
import { useState } from "react";

// we want to make sure that our modal is not inside of a positioned parent, because
// we need it to cover the entire screen. To get around this, we create a "portal" to 
// our document so that it is not a child of any element. see index.html
function ModalPage() {
    const[showModal, setShowModal] = useState(false);

    const handleClick = () => {
        setShowModal(true);
    }

    const handleClose = () => {
        setShowModal(false);
    }

    const actionBar = <Button primary onClick={handleClose}>I accept</Button>;

    const modal = <Modal onClose={handleClose} actionBar={actionBar}>
        <p>
            Here is an important agreement for you to accept
        </p>
    </Modal>;
    
    return (
        <div>
            <Button primary onClick={handleClick}>Open Modal</Button>
            {showModal && modal}
            <p>some text on this page that you can read</p>
            <p>some text on this page that you can read</p>
            <p>some text on this page that you can read</p>
            <p>some text on this page that you can read</p>
            <p>some text on this page that you can read</p>
            <p>some text on this page that you can read</p>
            <p>some text on this page that you can read</p>
            <p>some text on this page that you can read</p>
            <p>some text on this page that you can read</p>
            <p>some text on this page that you can read</p>
            <p>some text on this page that you can read</p>
            <p>some text on this page that you can read</p>
            <p>some text on this page that you can read</p>
            <p>some text on this page that you can read</p>
            <p>some text on this page that you can read</p>
            <p>some text on this page that you can read</p>
            <p>some text on this page that you can read</p>
            <p>some text on this page that you can read</p>
            <p>some text on this page that you can read</p>
            <p>some text on this page that you can read</p>
            <p>some text on this page that you can read</p>
            <p>some text on this page that you can read</p>
            <p>some text on this page that you can read</p>
            <p>some text on this page that you can read</p>
            <p>some text on this page that you can read</p>
            <p>some text on this page that you can read</p>
            <p>some text on this page that you can read</p>
            <p>some text on this page that you can read</p>
            <p>some text on this page that you can read</p>
            <p>some text on this page that you can read</p>
        
        </div>
    );
}
export default ModalPage;