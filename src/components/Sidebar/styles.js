import styled from 'styled-components';

export const Page = styled.li`
    ${props => props.active && `font-weight:bold;`}
`;