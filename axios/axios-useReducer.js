import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

//useReducer는 액션을 관리할 때 사용
// 1 -> 2 -> 3
// 리듀서

function reducer(state, action) { // 2 state는 useReducer에서 받아온 초기데이터 action은 타입에 따른 바뀔 데이터
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: null,
            }
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null,
            }
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.error,
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

function Users() {

    const [state, dispatch] = useReducer(reducer, { // 1 state는 초기상태 dispatch는 바뀔상태 useReducer 첫 파라미터는 스위치문있는 관리함수 두번째 초기데이터
        loading: false,
        data: null,
        error: null,
    });

    const fetchUsers = async () => { // 3 사용시 정해놓은 타입을 넣어주고 바뀌는 데이터를 넣어준다.
        dispatch({ type: 'LOADING' });
        try {
            const response = await axios.get(
                'https://jsonplaceholder.typicode.com/users'
            );
            dispatch({ type: 'SUCCESS', data: response.data });
        } catch (error) {
            dispatch({ type: 'ERROR', error });
        }

    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const { loading, data:users, error } = state;

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