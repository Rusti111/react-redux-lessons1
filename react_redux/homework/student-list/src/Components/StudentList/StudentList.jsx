import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchAllStudents from '../../store/reducers/StudentListCreator';  
import StudentListItem from './StudentListItem';
import { fetchToAddItem } from '../../store/reducers/CartCreator';

const StudentList = () => {

    const dispatch = useDispatch();
    const { students, studentsError, studentListStatus } = useSelector((state) => state.studentList);
    const onAddToCart = (id) => dispatch(fetchToAddItem(id));

    useEffect(() => {
        dispatch(fetchAllStudents());
    }, []);

    const cases = {
        pending: 'loading...',
        fulfilled: students.map((student) => (<StudentListItem key={`student-${student.id}`} student={student} onAddToCart={onAddToCart} />)),
        rejected: studentsError,
    }

    return (
        <ul>
            {cases[studentListStatus]}
        </ul>
    );
}

export default StudentList;