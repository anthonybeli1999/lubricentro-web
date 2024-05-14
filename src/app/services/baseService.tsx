
const rutaPrincipal = 'http://192.168.18.242:8080/api/';

const get = async (ruta: string) => {
    try {
        const response = await fetch(rutaPrincipal + ruta);
        const data = await response.json();
        return data;    
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
};

const postReturn = async (ruta: string, body: any) => {
    try {
        const response = await fetch(rutaPrincipal + ruta, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        return data;    
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

const post = async (ruta: string, body: any) => {
    try {
        const response = await fetch(rutaPrincipal + ruta, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        if (response.ok) {
            await response.json();
            return true;
        } else {
            throw new Error(`Error al realizar la solicitud: ${response.status}`);
        }
    } catch (error) {
        console.error("Error:", error)
        return false
    }
}


const put = async (ruta: string, body: any) => {
    try {
        const response = await fetch(rutaPrincipal + ruta, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        if (response.ok) {
            await response.json();
            return true;
        } else {
            throw new Error(`Error al realizar la solicitud: ${response.status}`);
        }
    } catch (error) {
        console.error("Error:", error)
        return false
    }
}


export { get, post, put, postReturn };