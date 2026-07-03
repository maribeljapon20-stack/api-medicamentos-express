// Filtro de seguridad interceptor (Middleware)
const SecurityConfig = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
        return res.status(401).json({ error: "No autorizado. Ingrese usuario y contraseña." });
    }

    // Decodificar las credenciales que viajan en la cabecera HTTP
    const credencialesValidas = Buffer.from('admin:12345').toString('base64');
    
    if (authHeader === `Basic ${credencialesValidas}`) {
        next(); // Credenciales correctas, permite pasar al Controlador
    } else {
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
        res.status(401).json({ error: "Usuario o contraseña incorrectos." });
    }
};

module.exports = SecurityConfig;