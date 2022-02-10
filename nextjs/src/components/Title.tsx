type TitleProps = {
    
};

export const Title: React.FunctionComponent<TitleProps> = (props) => {
    return (
        <h1 className="text-5xl leading-normal text-gray-700">
            { props.children }
        </h1>
    );
};