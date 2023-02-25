import styled from 'styled-components';

export const Tab = ({ label, clickHandler }: TabProps) => (
	// eslint-disable-next-line @typescript-eslint/no-use-before-define
	<StyledTabButton onClick={clickHandler}>{label}</StyledTabButton>
);

const StyledTabButton = styled.button`
	border: 1px solid ${({ theme }) => theme.colors.black};
	border-bottom: none;
	border-radius: 10px 10px 0 0;
	background-color: transparent;
	width: 5rem;
	padding: 0.25rem 1rem;
`;

type TabProps = {
	label: string;
	clickHandler: () => void;
};

export default Tab;
