export const theme: ThemeType = {
	colors: {
		primary: {
			opacity: (opacity = 1) => `rgba(52, 156, 235, ${opacity})`,
		},
		white: '#ffffff',
		grey: 'rgb(105,105,105)',
		black: 'black',
	},
	sizes: {
		md: '1.5rem',
	},
};

export type ThemeType = {
	colors: {
		[color: string]:
			| {
					opacity: (opacity?: number) => string;
			  }
			| string;
	};
	sizes: { [size: string]: string };
};
