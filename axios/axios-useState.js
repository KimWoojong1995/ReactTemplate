import React, { useState, useEffect } from 'react';
import axios from 'axios';

//useEffect는 함수가 처음 실행될 때 해야할 작업이 있을 때 사용

function Users() {
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            setUsers(null);
            setError(null);
            setLoading(true);
            const response = await axios.get(
                'https://jsonplaceholder.typicode.com/users'
            );
            setUsers(response.data);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return <div>로딩중...</div>
    if (error) return <div>에러...</div>
    if (!users) return null;



    return (
        <>
            <ul>
                {users.map(user =>
                    <li key={user.id}>
                        {user.username}({user.name})
                    </li>
                )}
            </ul>
            <button onClick={fetchUsers}>다시불러오기</button>
        </>
    );
};

export default Users;