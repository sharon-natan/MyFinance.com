import React,{useState} from 'react'
import axios from "axios"
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal"

function ReplaceIndex(props) {
    const [show, setShow] = useState(false);
    const [indexName, setIndexName] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function onSubmit(e){
        e.preventDefault();
        const newIndexName = indexName;
        
        //Closes window
        handleClose()

        axios.post('http://' + process.env.REACT_APP_MY_HOST_IP  + ':5000/replace_index',{},{headers:{'Access-Control-Allow-Origin': '*'},params:{indexName:newIndexName,previousIndexName:props.indexName}})
        .then (res => {
            console.log(res.data)
            
            //Refresh page
            window.location.reload(false)
        })
    }
    
    return (
        <>
            <button className="btn" style={{backgroundColor:"transparent",position:"absolute",left:"9%",top:"3%"}} onClick={handleShow}>
                <i className="material-icons" style={{fontSize:"1.8em",position:"absolute",left:"9%",top:"3%"}}>edit</i>
            </button>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Replace index</Modal.Title>
                </Modal.Header>
                <form onSubmit={onSubmit}>
                    <Modal.Body>
                        <input type="text"
                            required
                            className="form-control"
                            value={indexName}
                            onChange={(e) => setIndexName(e.target.value)}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">Replace</Button>
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default ReplaceIndex;
