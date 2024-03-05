import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
*,
*::before,
*::after {
	padding: 0;
	margin: 0;
	border: none;
	box-sizing: border-box;
}

a {
	color: inherit;
	text-decoration: none;
	display: inline-block;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
	font-size: inherit;
	font-weight: inherit;
}

ul,
ul li {
	list-style: none;
}

img {
	max-width: 100%;
	height: auto;
	vertical-align: top;
}

input,
textarea,
button,
select {
	font-family: inherit;
	font-size: inherit;
	color: inherit;

	&:focus {
		outline: none;
	}
}

button {
	cursor: pointer;
	background-color: transparent;
}

:root {
	--NEUTRAL_1: #F7F8F9;
	--NEUTRAL_2: #DCDFE4;
	--NEUTRAL_3:#8590A2;
	--NEUTRAL_4: #626F86;
	--NEUTRAL_5: #2C3E5D;
	--NEUTRAL_6: #091E42;
	--TEXT_COLOR: #1D2125;
	--BLACK: #000;
	--WHITE: #fff;
	--RED_1: #cc171a;
	--RED_2: #a01113;
	--BLUE_1: #1919da;
	--BLUE_2: #1212a7;
	
	font-family: "Roboto", system-ui, Arial, sans-serif;
	font-size: 62.5%;
	font-weight: 400;
	line-height: 1.5;
  color: var(--TEXT_COLOR);
	text-size-adjust: 100%;

	background-color: var(--NEUTRAL_1);
	scroll-behavior: smooth;
	scrollbar-gutter: stable;
	transition: background-color .3s ease-in-out;

	&.dark-mode {
		--NEUTRAL_1: #1D2125;
		--NEUTRAL_2:#2C333A;
		--NEUTRAL_3:#596773;
		--NEUTRAL_4: #8C9BAB;
		--NEUTRAL_5: #B6C2CF;
		--NEUTRAL_6: #DEE4EA;
		--TEXT_COLOR: #F7F8F9;
	}
}

body {
	font-size: 1.6rem;
}

body.blocked {
	overflow-y: hidden;
	touch-action: none;
}

#root {
	display: flex;
	flex-direction: column;
	min-height: 100dvh;
}

@media (max-width: 510px) {
	.recharts-text:not(.recharts-label) {
	font-size: 1rem;
	}
}
`;
