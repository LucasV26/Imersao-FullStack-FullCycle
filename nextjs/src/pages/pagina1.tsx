import { GetServerSideProps, NextPage } from "next";

type Pagina1PageProps = {
    name: string;
}

// Atualmente, o Next está considerando a nossa página como uma página estática (Pois ela só apresenta HTML puro, sem processamento)
const Pagina1Page: NextPage<Pagina1PageProps> = (props) => {
    return (
        <h1>
           Salve, {props.name}
        </h1>
    );
};

// Para tornar a nossa página em uma SSR (Server Side Render), precisamos da seguinte função
export const getServerSideProps: GetServerSideProps = async(context) => {
    return {
        props: {
            name: 'Full Cycle'
        }
    }
}

// Apenas por exportar a página de maneira default, ela já está roteada ao meu servidor (/pagina1)
// Caso eu coloque este arquivo dentro de um diretório, o roteamento será /<diretorio>/pagina1 e assim por diante...
export default Pagina1Page