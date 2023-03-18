import { Input, InputContainer, Label } from './components';

type LabelledInputProps = {
	id: string;
	label: string;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	type?: string;
};
export const LabelledInput = ({
	id,
	label,
	value,
	onChange,
	type = 'text',
}: LabelledInputProps) => (
	<InputContainer>
		<Label htmlFor={id}>{label}</Label>
		<Input value={value} onChange={onChange} id={id} type={type} />
	</InputContainer>
);
