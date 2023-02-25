import styled from 'styled-components';

export const Label = styled.label`
	text-align: left;
`;

export const Input = styled.input`
	text-align: left;
	border: none;
	border-bottom: 1px solid black;

	&:focus {
		outline: none;
	}
`;

export const InputContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	justify-content: flex-start;
	gap: 0.5rem;
`;
