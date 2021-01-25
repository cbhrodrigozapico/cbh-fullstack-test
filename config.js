
const devConfig = {
	apiurl: 'http://localhost:3000'
}

const prodConfig = {
	apiurl: 'https://cbh-fullstack-test.vercel.app/'
}

const config = process.env.ENV === 'PROD' ? prodConfig : devConfig

export default config