import styled from 'styled-components'

export const Nav = styled.nav`
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 10px 20px;
        max-width: 1200px;
        margin: 0 auto;
`;

export const Logo = styled.div`
        margin: 10px;

        h2 {
                font-size: 1.5rem;
                font-weight: 700;
        }
`

export const Items = styled.div`
        margin: 10px;

        .items {
                display: inline-block;
                margin: 0 20px;
                cursor: pointer;
                font-weight: 600;
                font-size: 0.9rem;
                color: #3a3a3a;
                letter-spacing: 1px;
                text-decoration: none;
                transition: ease 0.4s;

                &:hover {
                        color: red;
                }
        }
`