import { useState } from 'react';

const UserContext = () => {
    const [usuarioId, setUsuarioId] = useState(0);
    const [usuarioNome, setUsuarioNome] = useState('');

    return {
        usuarioId,
        usuarioNome,
        setUsuarioId,
        setUsuarioNome
    };
};

export default UserContext;