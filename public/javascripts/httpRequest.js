const accessToken = localStorage.getItem('accessToken');
const DEFAULT_HEADERS = {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
};

const DEFAULT_METHOD = 'GET';

async function httpRequest(url, method = DEFAULT_METHOD, headers = {}, data = {}) {
        const response = await fetch(url, {
            method: method,
            headers: Object.assign(DEFAULT_HEADERS, headers),
            body: JSON.stringify(data)
        });
        const d = await response.json();
     
        if (!response.ok) {
            throw new Error(`${d.message}`);
            // throw new Error(JSON.stringify({ name: 'zss', id: 1}));
        }
        return d;
   
}
