import { useEffect, useState } from "react";

import styles from './ReposList.module.css';

const ReposList = ({ nomeUsuario }) => {
    const [repos, setRepos] = useState([]);
    const [estaCarregando, setEstaCarregando] = useState(true);

    useEffect(() => {
        setEstaCarregando(true);
        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
        .then(res => res.json())
        .then(resJson => {
            setTimeout(() => {
                setEstaCarregando(false);
                setRepos(resJson);
            }, 3000);
        })
    }, [nomeUsuario]);

    return (
        <div className="container">
            {estaCarregando ? (
                <h1>Carregando...</h1>
            ) : (
                <ul className={styles.list}>
                    {repos.map(({ id, name, language, html_url}) => (
                        <li className={styles.listItem} key={id}>
                            <div>
                                <b className={styles.itemName}>Nome:</b> {name}
                            </div>
                            <div>
                                <b className={styles.itemLanguage}>Linguagem:</b> {language}
                            </div>
                            <div>
                                <a className={styles.itemLink} target="_blank" href={html_url}>Visistar no Github</a>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default ReposList;