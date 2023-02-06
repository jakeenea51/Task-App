import {useState, useEffect} from 'react';
import AssignedTasks from './AcceptedTasks';
import {db} from '../fire';
import {collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc} from 'firebase/firestore';

const CreatedTasks = ({handleLogout, user}) => {

    const [tasks, setTasks] = useState([]);

    const getAllTasks = () => {
        const taskRef = collection(db, "Tasks");
        return getDocs(taskRef)
    }

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = async() => {
        const data = await getAllTasks();
        setTasks(data.docs.map((doc) => ({...doc.data(), id : doc.id})))
    }

    const deleteTask = (id) => {
        const taskDoc = doc(db, "Tasks", id);
        return deleteDoc(taskDoc);
    }

    const deleteHandler = async(id) => {
        await deleteTask(id);
        getTasks();  
    }

    return(
        <>
        <nav class="navbar navbar-expand bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="/dashboard">Tasks Dashboard</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="/accepted">Accepted</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/created">Created</a>
                    </li>
                </ul>
            </div>
            <div class="text-right">
                <button class="btn btn-primary btn-md" onClick={getTasks}>Refresh List</button>
            </div>
            <div class="text-right">
                <button class='btn btn-danger btn-md pull-right m-2' onClick={handleLogout}>Logout</button>
            </div>
            </div>
        </nav>

            <div class="text-left m-3">
                <a href='/newtask'>Create new task</a>
            </div>

        <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Creator</th>
                        </tr>
                    </thead>
            { tasks.map((doc, index) => {
                if (doc.uid == user.uid){
                    return(
                        <tbody>
                            <tr key={doc.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{doc.title}</td>
                            <td>{doc.description}</td>
                            <td>{doc.creator}</td>
                            <td>
                            <button type="button" class="btn btn-danger" onClick={(e) => deleteHandler(doc.id)}>Delete</button>
                            </td>
                            </tr>
                            </tbody>
                    )
            }})}
            </table> 
        
        </>
    );

};

export default CreatedTasks;