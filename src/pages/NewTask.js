import React, {useState, useEffect} from 'react';
import {fire, auth, db} from '../fire';
import {collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc} from 'firebase/firestore';

const NewTask = ({user}) => {

    

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [creator, setCreator] = useState('');
    const uid = user.uid;


    // const handleTitleChange = (e) => {
    //     setTitle(e.target.value);
    // }

    // const handleDescriptionChange = (e) => {
    //     setDescription(e.target.value);
    // }

    // const handleCreatorChange = (e) => {
    //     setCreator(e.target.value);
    // }


    const createTask = () => {
        const taskRef = collection(db, "Tasks");
        const task = {
            title,
            description,
            creator,
            uid
        }
        return addDoc(taskRef, task);
    }

    return(
        <>
        <table class="table">
        <thead>
            <tr>
            <th scope="col">New Task</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="col">Title</th>
                <td>
                <input type='text' onChange={(e) => setTitle(e.target.value)} value={title}/>
                </td>
            </tr>
            <tr>
                <th scope="col">Description</th>
                <td>
                <input type='text' onChange={(e) => setDescription(e.target.value)} value={description}/>
                </td>
            </tr>
            <tr>
                <th scope="col">Creator</th>
                <td>
                <input type='text' onChange={(e) => setCreator(e.target.value)} value={creator}/>
                </td>
            </tr>
            <tr>
            <td>
                <button type="button" class='btn btn-primary' onClick={createTask}>Submit</button>
            </td>
            </tr>
        </tbody>
        </table>
        <a href='/created'>Back</a>
        </>
    )

}

export default NewTask;