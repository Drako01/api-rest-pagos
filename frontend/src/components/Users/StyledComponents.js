import styled from 'styled-components';

export const Titulo = styled.section`
    text-align: center;
    padding: 2rem;
    background-color: #f0f0f0;
`;

export const Titular = styled.h1`
    font-size: 2rem;
    font-weight: bold;
`;

export const UserList = styled.div`
    margin: 2rem auto;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    height: 60vh;

    h2 {
        font-size: 1.8rem;
        margin-bottom: 2rem;
    }

    ul li {
        height: 2.5rem;
        color: darkblue;
        font-weight: bold;

        &.green {
            color: green;
        }
    }
`;
